const express = require('express');
const path = require('path');

const logger = require('./middleWare/logger');
const membersRoutes = require('./routes/members');
const app = express();


// Init middleware
app.use(logger);

// Body parser middleware

app.use(express.json());

app.use(express.urlencoded({ extended: false }))

// Set a static folder
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/members', membersRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));