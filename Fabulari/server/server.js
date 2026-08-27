const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
        origin: 'http://localhost:4200',
        methods: ['GET', 'POST'],
    },
});

app.use(cors());
app.use(express.json());

const initializeRoutes = require('./index');
initializeRoutes(app);

const initializeSockets = require('./socket');
initializeSockets(io);

module.exports = http;