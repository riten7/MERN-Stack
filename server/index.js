const express = require('express');
const app = express();
const route = require("./routes");

const port = 9000;
app.use("/", route);

app.listen(port, () => console.log(`Server running on port ${port}`));