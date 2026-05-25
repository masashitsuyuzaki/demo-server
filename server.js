const http = require('http');

const server = http.createServer((req, res) => {
  console.log(`受信 - 1200秒待機開始`);

  // ヘッダーをすぐに送信
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Transfer-Encoding': 'chunked',
    'X-Accel-Buffering': 'no'  // プロキシのバッファリング無効化
  });

  // 30秒ごとに空白を送ってコネクションを維持
  const keepAlive = setInterval(() => {
    try {
      res.write(' ');
      console.log('keepalive送信');
    } catch (e) {
      clearInterval(keepAlive);
    }
  }, 30 * 1000);

  // 1200秒後に本当のレスポンスを返す
  setTimeout(() => {
    clearInterval(keepAlive);
    console.log('レスポンス送信！');
    res.end(JSON.stringify({ status: 'ok' }));
  }, 1200 * 1000);
});

server.timeout = 1500 * 1000;
server.listen(process.env.PORT || 3000, () => {
  console.log('Server running');
});
