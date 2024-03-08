const express = require('express');
const expressConfig = require('./config/expressConfig');
const handlebarsConfig = require('./config/handlebarsConfig');
const dbConnect = require('./config/dbConfig');

const router = require('./routes');


const app = express();
const PORT = 3000;


expressConfig(app);
handlebarsConfig(app);
dbConnect()
    .then(() => console.log('DB connected successfully'))
    .catch((err) => console.log(`DB err: ${err}`));



app.use(router);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));