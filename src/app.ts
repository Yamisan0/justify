import http from 'http';
import { parse } from 'url';

const requestListener: http.RequestListener = (req, res) => {
  const { pathname } = parse(req.url || '', true);

  if (pathname === '/api/resource' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'This is a GET request\n response' }));
  } else {
    res.writeHead(404);
    res.end();
  }
};

const server = http.createServer(requestListener);
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
