"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const Umzug = require("umzug");

const APP_PATH = path.resolve(__dirname, "..");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(APP_PATH + "/config/config.json")[env];

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const umzug = new Umzug({
  migrations: {
    // indicates the folder containing the migration .js files
    path: APP_PATH + "/migrations",
    // inject sequelize's QueryInterface in the migrations
    params: [sequelize.getQueryInterface(), Sequelize],
  },
  storage: "sequelize",
  storageOptions: {
    sequelize: sequelize,
  },
});

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf(".") === -1 && file !== basename;
  })
  .forEach((dir) => {
    const model_dirname = path.join(__dirname, dir);
    fs.readdirSync(model_dirname)
      .filter((file) => {
        return file.indexOf(".") !== 0 && file.slice(-3) === ".js";
      })
      .forEach((file) => {
        const model = require(path.join(__dirname, dir, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
      });
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

(async () => {
  // Try to migrate pending migrations.
  await umzug.up();

  if (env != 'development') {
    return;
  }
  // Sync models with table, can be destructive.
  // Instead, create a migration for changes on field types.
  await sequelize.sync({ alter: true });
})();

module.exports = db;
