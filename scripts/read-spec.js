import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

// Read the spec file and split it into lines of 200 chars
try {
  const specPath = join(process.cwd(), 'spec.txt');
  const content = readFileSync(specPath, 'utf8');
  
  // Split on common section markers
  const sections = content.split(/(?=\d+\.\s|#{1,3}\s|Section |Page |Dashboard |ESPACE)/);
  
  sections.forEach((section, i) => {
    console.log(`\n--- SECTION ${i} ---`);
    console.log(section.substring(0, 500));
  });
} catch (e) {
  console.log("Error:", e.message);
  console.log("CWD:", process.cwd());
  
  // Try alternate paths
  const { readdirSync } = await import('fs');
  try {
    console.log("Home dir:", readdirSync('/home/user'));
  } catch(e2) {
    console.log("Can't read home:", e2.message);
  }
}
