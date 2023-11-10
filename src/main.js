let express = require("express");
require('dotenv').config();
const cors = require("cors")

let app = express();

const port = process.env.PORT || 4002;
app.use(cors())
app.use(express.json());

let messageRoutes = require("./routes/messageRoutes");
let authRoutes = require("./routes/authRoutes");

app.use('/', messageRoutes);
app.use('/', authRoutes);

app.listen(port, () => {
    console.log(`Web server listening on port ${port}`);
}); 