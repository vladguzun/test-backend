const express = require('express');
const cors = require('cors');
require('dotenv').config();
const authenticateToken = require("./src/middlewares/authenticateToken");
const authRoutes = require("./src/routes/authRoutes");
const studentRoutes = require("./src/routes/studentRoutes");
const subjectRoutes = require("./src/routes/subjectRoutes");
const markRoutes = require("./src/routes/markRoutes");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(authRoutes);
app.use(authenticateToken);
app.use('/students', studentRoutes);
app.use('/subjects', subjectRoutes);
app.use('/marks', markRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
