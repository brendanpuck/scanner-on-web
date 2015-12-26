var express = require('express');
var http = require('http');
var serialport = require("serialport").SerialPort;

var portName = '/dev/ttyUSB0';
var readData = '';

var sp = new serialport(portName, {
  baudRate: 115200,
  dataBits: 8,
  parity: 'none',
  stopBits: 1,
  flowControl: false
});

var app = express();
var server = http.createServer(app).listen(3000);

app.use(express.static("./public"));

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket){
  console.log("Socket connected");
  sp.write('RX\r');
  socket.emit('connected');

  socket.on('sendSerial', function(data) {
    console.log("Client sent us: " + data + " to send to serial");
    sp.write(data + '\r');
  });

  sp.on('data', function (data) {
    console.log('' + data);
    socket.emit('receiveSerial', data.toString());
  });

  sp.on('close', function (err) {
    console.log('port closed');
  });

  sp.on('error', function (err) {
    console.error("error", err);
  });

  sp.on('open', function () {
    console.log('port opened...');
  });
});

console.log("Starting Socket App - http://localhost:3000");
