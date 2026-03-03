import { readFileSync } from 'fs';

import { execSync } from 'child_process';
// Find the file
const find = execSync('find / -name "pasted-text-EC9DZ*" 2>/dev/null || echo "not found"').toString();
console.log("Find result:", find);
// Also try listing the project dir
const ls = execSync('ls -la /vercel/share/v0-project/ 2>/dev/null || echo "dir not found"').toString();
console.log("Project dir:", ls);
