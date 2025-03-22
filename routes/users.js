// routes/users.js

const fs = require('fs');
const users = [];
const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  // Route "/"
  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html><body>');
    res.write('<form action="/create-user" method="POST">');
    res.write('<input type="text" name="username">');
    res.write('<button type="submit">Send</button>');
    res.write('</form></body></html>');
    return res.end();
  }

  // Route "/users"
  if (url === '/users') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html><body><ul>');

  users.forEach(user => {
    res.write(`<li>${user}</li>`);
  });

  res.write('</ul></body></html>');
    return res.end();
  }

  // Route "/create-user"
  if (url === '/create-user' && method === 'POST') {
    const body = [];
    req.on('data', chunk => {
      body.push(chunk);
    });

    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const username = parsedBody.split('=')[1];
      console.log('Username:', username);
      users.push(username);
    });

    res.statusCode = 302;
    res.setHeader('Location', '/');
    return res.end();
  }
};

module.exports = requestHandler;