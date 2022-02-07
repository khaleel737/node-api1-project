const server = require('./api/server');

const port = 9000;

// START YOUR SERVER HERE

console.log('hello world!!!!!');

server.listen(port, () => {
    console.log('server started');
});
