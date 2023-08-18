const net = require('net');
const { contextBridge } = require('electron');


function findUnusedPort(startingPort, callback) {
    const server = net.createServer();

    server.listen(startingPort, () => {
        const port = server.address().port;
        server.close(() => {
            callback(null, port);
        });
    });

    server.on('error', () => {
        findUnusedPort(startingPort + 1, callback);
    });
}

function getUnusedPort(callback) {
    const startingPort = 3000; // You can adjust the starting port as needed
    findUnusedPort(startingPort, (err, port) => {
        if (err) {
            callback(err);
            return;
        }
        callback(null, port);
    });
}

getUnusedPort((err, port) => {
    if (err) {
        console.error('Error:', err);
        return;
    }
    console.log('Unused port:', port);

    contextBridge.exposeInMainWorld('myPreloadData', {
        value: `http://localhost:${8081}`
        // value: `http://localhost:${port}`
    });
});












