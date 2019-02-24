const net = require('net');

let client = net.createConnection({port: 5000}, () => {
    console.log('Connected');
});

client.on('data', data => {
    console.log(data.toString());
});

process.stdin.on('data', data => {
    client.write(data);
});

