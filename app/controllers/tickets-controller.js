const { Ticket } = require("../models");
const utils = require("../utils");

const get_all_tickets = async (req, res) => {
  Ticket.findAll({
    where: {
      ownerId: req.firebase_user.id,
    },
  })
    .then((result) => {
      res.status(200).json(utils.get_response_object(result, "Tickets retrieved.", 200));
    })
    .catch((error) => {
      res.status(404).json(utils.get_response_object(null, `Tickets can not be retrieved. Reason: ${error.errors[0].message}`, 404));
    });
};

const get_ticket = async (req, res, next) => {
  res.status(200).json(utils.get_response_object(req.ticket, "Ticket received.", 200));
};

const create_ticket = async (req, res, next) => {
  const ticket_data = {
    ownerId: req.firebase_user.id,
    eventId: req.event.id,
  };

  Ticket.create(ticket_data, {
    include: [
      {
        association: Ticket.OwnerAssociation,
        as: "ownerId",
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
    ownerId: body.owner_id == null ? ticket.ownerId : body.owner_id,
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
