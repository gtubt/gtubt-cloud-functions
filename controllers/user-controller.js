const user_model = require("../models").User;
const utils = require("../utils");

const get_all_users = async (req, res) => {
  await user_model.findAll().then((result) => {
    res.status(200).json(result);
  });
};

const get_user_with_email = async (req, res) => {
  const user_email = req.body.email;

  await user_model
    .findAll({
      where: {
        email: user_email,
      },
    })
    .then((result) => {
      const user_data = result[0];

      if (result.length == 0) {
        res.status(404).json(utils.getResponseObj(null, "User can not be retrieved.", 404));
      } else {
        res.status(200).json(utils.getResponseObj(user_data, "User received.", 200));
      }
    })
    .catch((error) => {
      res.status(404).json(utils.getResponseObj(null, `User can not be retrieved. Reason: ${error.errors[0].message}`, 404));
    });
};

const create_user = async (req, res) => {
  const user_data = req.body;

  await user_model
    .create(user_data)
    .then((result) => {
      console.log(result);
      res.status(200).json(utils.getResponseObj(user_data, "User successfully created.", 200));
    })
    .catch((error) => {
      console.log(error);
      res.status(404).json(utils.getResponseObj(null, `User can not be created. Reason: ${error.errors[0].message}`, 404));
    });
};

const update_user = async (req, res) => {
  const body = req.body;

  // Creating this object to isolate id from request body
  const user_data = {
    name: body.name,
    lastName: body.lastName,
    department: body.department,
    year: body.year,
    email: body.email,
    studentId: body.studentId,
    phone: body.phone,
  };

  await user_model
    .update(user_data, {
      where: {
        id: body.id,
      },
    })
    .then((result) => {
      console.log(result);
      if (result[0] == 0) {
        res.status(404).json(utils.getResponseObj(null, "User can not be updated.", 404));
      } else {
        res.status(200).json(utils.getResponseObj(user_data, "User successfully updated.", 200));
      }
    })
    .catch((error) => {
      res.status(404).json(utils.getResponseObj(null, "User can not be updated.", 404));
    });
};

const delete_user = async (req, res) => {
  const user_email = req.body.email;

  await user_model
    .destroy({
      where: {
        email: user_email,
      },
    })
    .then((result) => {
      res.status(200).json(utils.getResponseObj(null, "User successfully deleted.", 200));
    })
    .catch((error) => {
      console.log(error);
      res.status(404).json(utils.getResponseObj(null, `User can not be deleted. Reason: ${error.errors[0].message}`, 404));
    });
};

// export handlers
module.exports = {
  get_all_users: get_all_users,
  get_user_with_email: get_user_with_email,
  create_user: create_user,
  update_user: update_user,
  delete_user: delete_user,
};
