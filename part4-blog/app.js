const express = require('express');
const cors = require('cors');
const app = express();
const BlogRouter = require('./routes/BlogRouter');

app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

app.use('/api/blogs', BlogRouter);

module.exports = app;