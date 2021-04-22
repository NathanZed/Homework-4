const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const bodyParser = require('body-parser');
const winston = require('winston');
const Mongoose = require('mongoose');

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Winston Logger
const Logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});

// Messager Stuff
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
    Logger.log('info', msg);
  });
});

http.listen(port, () => {
  Logger.log('info', `Auto-complete server running at http://localhost:${port}/`);
});

// Mongoose Connections
(async () => {
  await Mongoose.connect('mongodb+srv://ComAd:Admin@database.n8bk7.mongodb.net/Database?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
})();

const db = Mongoose.connection;
db.on('error', Logger.error.bind(console, 'connection error:'));
db.once('open', () => {
  Logger.log('info', 'It Connects!');
});
