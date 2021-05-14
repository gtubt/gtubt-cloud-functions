const { Ticket } = require("../models");
const { Event } = require("../models");
const utils = require("../utils");

const get_all_tickets = async (req, res) => {
  Ticket.findAll({
    where: {
      userId: req.firebase_user.id,
    },
  })
    .then(async (result) => {
      let events = [];

      for (i = 0; i < result.length; i++) {
        ticket = result[i];
        await Event.findByPk(ticket.dataValues.eventId)
          .then((event) => {
            events.push(event);
          })
          .catch((error) => {
            // If one event is corrupt or not found, don't cancel whole operation, just continue for now.
          });
      }

      res.status(200).json(utils.get_response_object(events, "Events of tickets retrieved.", 200));
    })
    .catch((error) => {
      res.status(404).json(utils.get_response_object(null, `Events of tickets can not be retrieved. Reason: ${error.errors[0].message}`, 404));
    });
};

const get_ticket = async (req, res, next) => {
  if (req.firebase_user.id == req.ticket.userId) {
    Event.findByPk(req.ticket.eventId)
      .then((result) => {
        res.status(200).json(utils.get_response_object(result.dataValues, "Event of the ticket is received.", 200));
      })
      .catch((error) => {
        res.status(404).json(utils.get_response_object(null, "Event of the ticket can not be retrieved.", 404));
      });
  } else {
    res.status(401).json(utils.get_response_object(null, "User is not autohrized for the ticket.", 401));
  }
};

const create_ticket = async (req, res, next) => {
  const ticket_data = {
    userId: req.firebase_user.id,
    eventId: req.event.id,
  };

  Ticket.create(ticket_data, {
    include: [
      {
        association: Ticket.UserAssociation,
        as: "userId",
      },
      {
        association: Ticket.EventAssociation,
        as: "eventId",
      },
    ],
  })
    .then((result) => {
      res.status(200).json(utils.get_response_object(ticket_data, "Ticket successfully created.", 200));
    })
    .catch((error) => {
      res.status(404).json(utils.get_response_object(null, `Ticket can not be created. Reason: ${error}`, 404));
    });
};

const update_ticket = async (req, res, next) => {
  res.status(200);

  const ticket = req.ticket;
  const body = req.body;

  const ticket_data = {
    userId: body.user_id == null ? ticket.userId : body.user_id,
    eventId: body.event_id == null ? ticket.eventId : body.event_id,
  };

  Ticket.update(ticket_data, {
    where: {
      id: ticket.id,
    },
  })
    .then((result) => {
      if (result[0] === 0) {
        res.status(404).json(utils.get_response_object(null, "Ticket can not be updated.", 404));
      } else {
        res.status(200).json(utils.get_response_object(ticket_data, "Ticket successfully updated.", 200));
      }
    })
    .catch((error) => {
      res.status(404).json(utils.get_response_object(null, `Ticket can not be updated. Reason: ${error.errors[0].message}`, 404));
    });
};

const delete_ticket = async (req, res, next) => {
  res.status(200);
  const id = req.ticket.id;

  Ticket.destroy({
    where: {
      id: id,
    },
  })
    .then((result) => {
      res.status(200).json(utils.get_response_object(null, "Ticket successfully deleted.", 200));
    })
    .catch((error) => {
      res.status(404).json(utils.get_response_object(null, `Ticket can not be deleted. Reason: ${error.errors[0].message}`, 404));
    });
};

// export handlers
module.exports = {
  get_all_tickets: get_all_tickets,
  get_ticket: get_ticket,
  create_ticket: create_ticket,
  update_ticket: update_ticket,
  delete_ticket: delete_ticket,
};
