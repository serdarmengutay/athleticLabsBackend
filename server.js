const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const errorHandler = require("./middleware/errorHandler");
const { logger } = require("./middleware/logEvents");

dotenv.config();
connectDB();

const app = express();
app.use(logger);

app.use(cors(corsOptions));

app.use(express.json());
app.use("/api/clubs", require("./routes/clubs"));
app.use("/api/athletes", require("./routes/athletes"));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
