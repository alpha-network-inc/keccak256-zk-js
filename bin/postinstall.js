const fs = require('fs');
const https = require('https');
const path = require('path');

const filePath = path.join(__dirname, '../zk', 'circuit_final.zkey');
const url = 'https://cdn.kekkai.io/file/circuit_final.zkey';

if (!fs.existsSync(filePath)) {
  const file = fs.createWriteStream(filePath);
  let downloadComplete = false;
  let totalBytes = 0;
  let downloadedBytes = 0;

  const request = https.get(url, (response) => {
    totalBytes = parseInt(response.headers['content-length'], 10);

    response.pipe(file);

    response.on('data', (chunk) => {
      downloadedBytes += chunk.length;
      const progress = ((downloadedBytes / totalBytes) * 100).toFixed(2);
      process.stdout.write(
        `@alpha-network/keccak-zk zkey file downloading: ${progress}%\r`
      );
    });

    response.on('end', () => {
      if (!downloadComplete) {
        fs.unlink(filePath);
      }
    });

    file.on('finish', () => {
      downloadComplete = true;
      file.close();
    });
  });

  request.on('error', (err) => {
    fs.unlink(filePath, () =>
      console.error('@alpha-network/keccak-zk zkey file download error:', err.message)
    );
  });

  process.on('SIGINT', () => {
    file.end();
    fs.unlink(filePath);
    process.exit();
  });
}
