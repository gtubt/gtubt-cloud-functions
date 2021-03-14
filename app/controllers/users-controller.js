const { User } = require("../models");
const utils = require("../utils");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const path = require("path");
const env = process.env.NODE_ENV || "development";
const APP_PATH = path.resolve(__dirname, "..");
const { PROFILE_PHOTO_PATH, BASE_URL } = require(APP_PATH + "/config/config.json")[env];

const get_all_users = async (req, res) => {
  await User.findAll().then((result) => {
    res.status(200).json(result);
  });
};

const get_user = async (req, res, next) => {
  res.status(200).json(utils.get_response_object(req.user, "User received.", 200));
};

const create_user = async (req, res, next) => {
  const user_data = req.body;

  await User.create(user_data)
    .then((result) => {
      res.status(200).json(utils.get_response_object(user_data, "User successfully created.", 200));
    })
    .catch((error) => {
      res.status(404).json(utils.get_response_object(null, `User can not be created. Reason: ${error.errors[0].message}`, 404));
    });
};

const upload_user_photo = async (req, res, next) => {
  const photo = req.body;
  const newGuid = `${uuidv4()}.jpeg`;
  const photoPath = `${PROFILE_PHOTO_PATH}/${newGuid}`;

  console.log(`Writing photo for user [${req.user.email}] to "${photoPath}".`);
  fs.writeFile(photoPath, photo, "binary", async (err) => {
    if (err) {
      res.status(500).json(utils.get_response_object(null, `Could not save photo. Reason: ${err}`, 500));
    } else {
      console.log(`Photo saved to '${photoPath}'. Updating user...`);
      const oldPhotoUrl = req.user.photoUrl;

      req.user.photoUrl = `${BASE_URL}/images/profile/${newGuid}`;
      await req.user
        .save()
        .then((result) => {
          if (result[0] === 0) {
            res.status(404).json(utils.get_response_object(null, "User can not be updated.", 404));
          } else {
            res.status(200).json(utils.get_response_object(req.user, "Photo updated successfully.", 200));

            clearOldPhoto(oldPhotoUrl);
          }
        })
        .catch((error) => {
          console.log(error);
          res.status(404).json(utils.get_response_object(null, `User can not be updated. Reason: ${error.errors[0].message}`, 404));
        });
    }
  });
};

const clearOldPhoto = (url) => {
  if (url && url.trim()) {
    const urlParts = url.split("/");
    const uuid = urlParts[urlParts.length - 1];
    const path = `${PROFILE_PHOTO_PATH}/${uuid}`;
    console.log(`Removing old photo ${path}.`);
    fs.rm(path, { force: true }, (err) => {
      if (err) {
        console.log(`Error while removing old photo, err: ${err}`);
      }
    });
  }
};

const update_user = async (req, res, next) => {
  const user = req.user;
  const body = req.body;

  const user_data = {
    name: body.name == null ? user.name : body.name,
    lastname: body.lastname == null ? user.lastname : body.lastname,
    department: body.department == null ? user.department : body.department,
    year: body.year == null ? user.year : body.year,
    email: user.email,
    studentId: body.studentId == null ? user.studentId : body.studentId,
    phone: body.phone == null ? user.phone : body.phone,
    photoUrl: req.photoUrl,
  };

  await User.update(user_data, {
    where: {
      id: user.id,
    },
  })
    .then((result) => {
      if (result[0] === 0) {
        res.status(404).json(utils.get_response_object(null, "User can not be updated.", 404));
      } else {
        res.status(200).json(utils.get_response_object(user_data, "User successfully updated.", 200));
      }
    })
    .catch((error) => {
      res.status(404).json(utils.get_response_object(null, `User can not be updated. Reason: ${error.errors[0].message}`, 404));
    });
};

const delete_user = async (req, res, next) => {
  const id = req.user.id;

  await User.destroy({
    where: {
      id: id,
    },
  })
    .then((result) => {
      res.status(200).json(utils.get_response_object(null, "User successfully deleted.", 200));
    })
    .catch((error) => {
      console.log(error);
      res.status(404).json(utils.get_response_object(null, `User can not be deleted. Reason: ${error.errors[0].message}`, 404));
    });
};

// export handlers
module.exports = {
  get_all_users: get_all_users,
  get_user: get_user,
  create_user: create_user,
  upload_user_photo: upload_user_photo,
  update_user: update_user,
  delete_user: delete_user,
};
