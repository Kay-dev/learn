const WebSocket = require("ws");

// 服务端使用3000端口
const wss = new WebSocket.Server({ port: 3000 });

// 如果有WebSocket请求接入，wss对象可以响应connection事件来处理这个WebSocket
wss.on("connection", function (ws) {
    console.log("[SERVER] connection()");
    ws.on("message", function (message) {
        console.log(`[SERVER] received:${message}`);
        // 收到消息后返回给客户端一个消息'ECHO:xxx'
        setTimeout(() => {
            ws.send(`ECHO:${message}`, (err) => {
                if (err) {
                    console.log(`[SERVER] error:${err}`);
                }
            });
        }, 1000);
    });
});

let count = 0;
// 客户端
let ws = new WebSocket("ws://localhost:3000/any/path");
ws.on("open", function () {
    console.log(`[CLIENT] open()`);
    ws.send("hello ");
});
ws.on("message", function (message) {
    console.log(`[CLIENT] Received:${message}`);
    count++;
    if (count > 3) {
        ws.send("Goodbye");
        ws.close();
    } else {
        setTimeout(() => {
            ws.send(`Hello,I'm No.${count}!`);
        }, 1000);
    }
});
