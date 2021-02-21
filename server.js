const express = require('express');
const body_parser = require('body-parser');

const app = express();
const json_parser = body_parser.json();

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`gtubt server is running at port ${port}`);
});
