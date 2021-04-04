const { Ticket } = require("../../models");
const utils = require("../../utils");

const ticket_param_handler = async (req, res, next, value) => {
  let ticket;

  if (!isNaN(value)) {
    const ticket_id = parseInt(value, 10);
    ticket = await Ticket.findByPk(ticket_id);
  }

  if (ticket === null) {
    res.status(404).json(utils.get_response_object(null, "Ticket can not be retrieved.", 404));
  } else {
    req.ticket = ticket;
    next();
  }
};

module.exports = {
  ticket_param_handler: ticket_param_handler,
};
