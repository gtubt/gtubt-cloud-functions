const { Ticket } = require("../models");
const utils = require("../utils");

const get_all_tickets = async (req, res) => {
  if (req.body == null || req.body.owner_id == null) {
    res.status(404).json(utils.get_response_object(null, `Owner not found`, 404));
  }

  await Ticket.findAll({
    where: {
      owner_id: req.body.owner_id,
    },
  }).then((result) => {
    res.status(200).json(result);
  });
};

const get_ticket = async (req, res, next) => {
  res.status(200).json(utils.get_response_object(req.ticket, "Ticket received.", 200));
};

const create_ticket = async (req, res, next) => {
  const ticket_data = req.body;

  await Ticket.create(ticket_data)
    .then((result) => {
      res.status(200).json(utils.get_response_object(ticket_data, "Ticket successfully created.", 200));
    })
    .catch((error) => {
      res.status(404).json(utils.get_response_object(null, `Ticket can not be created. Reason: ${error.errors[0].message}`, 404));
    });
};

const update_ticket = async (req, res, next) => {
  res.status(200);

  const ticket = req.ticket;
  const body = req.body;

  const ticket_data = {
    owner_id: body.owner_id == null ? ticket.owner_id : body.owner_id,
    title: body.title == null ? ticket.title : body.title,
    name: body.name == null ? ticket.name : body.name,
    location: body.location == null ? ticket.location : body.location,
    codeUrl: body.codeUrl == null ? ticket.codeUrl : body.codeUrl,
    date: body.date == null ? ticket.date : body.date,
  };

  await Ticket.update(ticket_data, {
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

  await Ticket.destroy({
    where: {
      id: id,
    },
  })
    .then((result) => {
      res.status(200).json(utils.get_response_object(null, "Ticket successfully deleted.", 200));
    })
    .catch((error) => {
      console.log(error);
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
