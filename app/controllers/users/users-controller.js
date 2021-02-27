const { User } = require("../../models");
const utils = require("../../utils");

const get_all_users = async (req, res) => {
  await User.findAll().then((result) => {
    res.status(200).json(result);
  });
};

const get_user_with_email = async (req, res, next) => {
  res.status(200).json(utils.getResponseObj(req.user, "User received.", 200));
};

const create_user = async (req, res, next) => {
  const user_data = req.body;

  await User
    .create(user_data)
    .then((result) => {
      res.status(200).json(utils.getResponseObj(user_data, "User successfully created.", 200));
    })
    .catch((error) => {
      res.status(404).json(utils.getResponseObj(null, `User can not be created. Reason: ${error.errors[0].message}`, 404));
    });
};

const update_user = async (req, res, next) => {
  const user = req.user;
  const body = req.body;

  // Creating this object to isolate id from request body
  const user_data = {
    name: body.name == null ? user.name : body.name,
    lastname: body.lastname == null ? user.lastname : body.lastname,
    department: body.department == null ? user.department : body.department,
    year: body.year == null ? user.year : body.year,
    email: user.email,
    studentId: body.studentId == null ? user.studentId : body.studentId,
    phone: body.phone == null ? user.phone : body.phone
  };

  await User
    .update(user_data, {
      where: {
        id: user.id
      }
    })
    .then((result) => {
      if (result[0] === 0) {
        res.status(404).json(utils.getResponseObj(null, "?User can not be updated.", 404));
      } else {
        res.status(200).json(utils.getResponseObj(user_data, "User successfully updated.", 200));
      }
    })
    .catch((error) => {
      res.status(404).json(utils.getResponseObj(null, `User can not be updated. Reason: ${error.errors[0].message}`, 404));
    });
};

const delete_user = async (req, res, next) => {
  const id = req.user.id;

  await User
    .destroy({
      where: {
        id: id
      }
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
  delete_user: delete_user
};
