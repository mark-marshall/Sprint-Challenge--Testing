const server = require('./server.js');

const port = process.env.PORT || 5500;
server.listen(port, () => console.log(`server on ${port} is up and ready`))