/* Uso de WebSockets para criação de um chat interativo 
   Maiores informações sobre webSocket 
   https://developer.mozilla.org/pt-BR/docs/Web/API/WebSockets_API
   Biblioteca ws do node.js
   https://www.npmjs.com/package/ws
*/

const { WebSocketServer } = require('ws')
const dotenv = require('dotenv');

dotenv.config()

const wss = new WebSocketServer({ port: process.env.PORT || 8080 });

wss.on('connection', (ws) => {
    ws.on('error', console.error)
    ws.on('message', (data) =>{
        wss.clients.forEach((client) => client.send(data.toString()));
            
    })
    console.log('client connection')
})