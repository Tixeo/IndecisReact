const { createServer } = require('http');
const next = require('next');

const dev = 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const PORT = 3000;

app.prepare().then(() => {
  createServer((req, res) => {
    handle(req, res);
  }).listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
