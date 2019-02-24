const net = require('net');
const fs = require('fs');
let users = [];
let u = 0;
let usernames = [];
let ws = fs.createWriteStream('./chat.log');

let server = net.createServer(client => {
    users.push(client);
    let username = 'Guest' + u;
    usernames.push(username);
    u++;
    client.write(`Welcome to the chat room! ${username}`, 'utf8');
    for (let i = 0 ; i < users.length; i++) {
        if (users[i] !== client){
        users[i].write(`${username} has joined chat`)}
    }
    ws.write(`${username} has joined chat` + `\r\n`);

    client.on('data', data => {
        for (let i = 0; i < users.length; i++) {
            if (users[i] !== client){
                users[i].write(`${username}: ` + data.toString()
                )}
        }
        ws.write(`${username}: ` + data.toString());
        console.log(`${username}: ` + data.toString());
    });

    client.on('error', err => {
        if (err.toString().includes("read ECONNRESET")){
            for (let i = 0; i < users.length; i++) {
                users[i].write(`${username} has left chat`)
            }
            console.log(`${username} has left chat`);
            ws.write(`${username} has left chat` + `\r\n`);
            let uIndex = usernames.indexOf(username);
            users.splice(uIndex,1);
            usernames.splice(uIndex, 1);
        }
    });

    client.on('end', () => {

    });

}).listen(5000);


console.log('Listening on port 5000');

