const { Event } = require("../../models");
const utils = require("../../utils");

const event_param_handler = async (req, res, next, value) => {
  let event;

  if (!isNaN(value)) {
    const event_id = parseInt(value, 10);
    event = await Event.findByPk(event_id);
  }

  if (event === null) {
    res.status(404).json(utils.get_response_object(null, "Event can not be retrieved.", 404));
  } else {
    req.event = event;
    next();
  }
};

module.exports = {
  event_param_handler: event_param_handler,
};
