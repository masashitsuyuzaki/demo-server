const http = require('http');
const server = http.createServer((req, res) => {
  console.log(`[${new Date().toISOString()}] 受信 - 1200秒待機開始`);
  setTimeout(() => {
    console.log(`[${new Date().toISOString()}] レスポンス送信`);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok' }));
  }, 1200 * 1000);
});
server.timeout = 1500 * 1000;
server.listen(process.env.PORT || 3000, () => {
  console.log('✅ Server running');
});
