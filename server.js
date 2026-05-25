const http = require('http');

const server = http.createServer((req, res) => {
  const waitSec = 720; // ← 12分
  console.log(`受信 - ${waitSec}秒待機開始`);

  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Transfer-Encoding': 'chunked',
    'X-Accel-Buffering': 'no'
  });

  const keepAlive = setInterval(() => {
    try {
      res.write(' ');
      console.log('keepalive送信');
    } catch (e) {
      clearInterval(keepAlive);
    }
  }, 20 * 1000);

  setTimeout(() => {
    clearInterval(keepAlive);
    res.end(JSON.stringify({ status: 'ok', waited: waitSec }));
    console.log('完了！');
  }, waitSec * 1000);
});

server.timeout = 1500 * 1000;
server.listen(process.env.PORT || 3000, () => console.log('Server running'));
