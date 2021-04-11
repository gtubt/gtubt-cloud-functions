# GTUBT Backend

## NodeJS Backend for GTUBT

Using following stack:

- NodeJS
- Sequelize
- SQLite 3

### Create Development Database

```bash
sqlite3 gtubt_db_dev ";"
```

### Runnning The Server (Docker)

```bash
docker-compose up
```

to run the server.

### Runnning The Server (Local)

```bash
npm install
```

to retrieve necessary packages.

```bash
npm start
```

to run the server.

----

## Tips

### Code-First DB Schema

To create new models or add new fields to existing models you just need to edit model files.

If you're changing structure of an existing field, be sure to add migration manually. Code first approach may create destructive queries.
Following command should be used to generate new empty migration.

_Be sure to run under the **app** folder._

```bash
cd app
npx sequelize-cli migration:generate --name migration-name
```
