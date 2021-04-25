const { Event } = require("../../models");
const utils = require("../../utils");

const event_param_handler = async (req, res, next, value) => {
  if (!isNaN(value)) {
    const event_id = parseInt(value, 10);
    Event.findByPk(event_id)
      .then((result) => {
        req.event = result.dataValues;
        next();
      })
      .catch((error) => {
        res.status(404).json(utils.get_response_object(null, "Event can not be retrieved.", 404));
      });
  } else {
    next();
  }
};

module.exports = {
  event_param_handler: event_param_handler,
};
