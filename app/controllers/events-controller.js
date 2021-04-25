const { Event } = require("../models");
const utils = require("../utils");

const get_all_events = async (req, res) => {
  Event.findAll()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(404).json(utils.get_response_object(null, `Events can not be retrieved.`, 404));
    });
};

const get_event = async (req, res, next) => {
  res.status(200).json(utils.get_response_object(req.event, "Event received.", 200));
};

const create_event = async (req, res, next) => {
  const event_data = req.body;

  Event.create(event_data)
    .then((result) => {
      res.status(200).json(utils.get_response_object(event_data, "Event successfully created.", 200));
    })
    .catch((error) => {
      res.status(404).json(utils.get_response_object(null, `Event can not be created. Reason: ${error.errors[0].message}`, 404));
    });
};

const update_event = async (req, res, next) => {
  const event = req.event;
  const body = req.body;

  const event_data = {
    title: body.title == null ? event.title : body.title,
    description: body.description == null ? event.description : body.description,
    coverImageUrl: body.coverImageUrl == null ? event.coverImageUrl : body.coverImageUrl,
    date: body.date == null ? event.date : body.date,
  };

  Event.update(event_data, {
    where: {
      id: event.id,
    },
  })
    .then((result) => {
      if (result[0] === 0) {
        res.status(404).json(utils.get_response_object(null, "Event can not be updated.", 404));
      } else {
        res.status(200).json(utils.get_response_object(event_data, "Event successfully updated.", 200));
      }
    })
    .catch((error) => {
      res.status(404).json(utils.get_response_object(null, `Event can not be updated. Reason: ${error.errors[0].message}`, 404));
    });
};

const delete_event = async (req, res, next) => {
  const id = req.event.id;

  Event.destroy({
    where: {
      id: id,
    },
  })
    .then((result) => {
      res.status(200).json(utils.get_response_object(null, "Event successfully deleted.", 200));
    })
    .catch((error) => {
      console.log(error);
      res.status(404).json(utils.get_response_object(null, `Event can not be deleted. Reason: ${error.errors[0].message}`, 404));
    });
};

// export handlers
module.exports = {
  get_all_events: get_all_events,
  get_event: get_event,
  create_event: create_event,
  update_event: update_event,
  delete_event: delete_event,
};
