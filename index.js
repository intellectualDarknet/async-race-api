const jsonServer = require('json-server');
const cors = require('cors')

const server = jsonServer.create();
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();

const PORT = 3000;

const state = { velocity: {}, blocked: {} };

server.use(cors())

server.use(middlewares);

server.patch('/engine', (req, res) => {
  
});

server.use(router);
server.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});