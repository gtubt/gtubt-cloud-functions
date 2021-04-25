const { Ticket } = require("../../models");
const utils = require("../../utils");

const ticket_param_handler = async (req, res, next, value) => {
  if (!isNaN(value)) {
    const ticket_id = parseInt(value, 10);
    Ticket.findByPk(ticket_id)
      .then((result) => {
        req.ticket = result.dataValues;
        next();
      })
      .catch((error) => {
        res.status(404).json(utils.get_response_object(null, "Ticket can not be retrieved.", 404));
      });
  } else {
    res.status(404).json(utils.get_response_object(null, "No ticket ID provided.", 404));
  }
};

module.exports = {
  ticket_param_handler: ticket_param_handler,
};
