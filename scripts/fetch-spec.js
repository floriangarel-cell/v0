const resp = await fetch('https://blobs.vusercontent.net/blob/pasted-text-EC9DZSziPIhtUo6eS6JnYD8EqeEJn8.txt');
const text = await resp.text();
// Print in chunks of 3000 chars
for (let i = 0; i < text.length; i += 3000) {
  console.log(`\n=== CHUNK ${Math.floor(i/3000)} (offset ${i}) ===`);
  console.log(text.substring(i, i + 3000));
}
