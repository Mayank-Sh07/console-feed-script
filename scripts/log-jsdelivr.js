const fs = require('fs');

fs.readdirSync('dist/').forEach((file) => {
  const CDN_URL = `https://cdn.jsdelivr.net/gh/Mayank-Sh07/console-feed-script/dist/${file}`;
  console.log('Hosted on: ', CDN_URL);
});
