import { readFileSync, writeFileSync } from 'fs';

const content = readFileSync('/vercel/share/v0-project/spec.txt', 'utf8');
// Replace common sentence-ending patterns to split into lines
const lines = content.split(/(?<=\.) (?=[A-ZÀ-ÖØ-Ý«"])/g);
writeFileSync('/vercel/share/v0-project/spec-split.txt', lines.join('\n'));
console.log(`Total characters: ${content.length}`);
console.log(`Total lines after split: ${lines.length}`);
// Print the full content in chunks
const chunkSize = 3000;
for (let i = 0; i < content.length; i += chunkSize) {
  console.log(`\n--- CHUNK ${Math.floor(i/chunkSize)} ---`);
  console.log(content.substring(i, i + chunkSize));
}
