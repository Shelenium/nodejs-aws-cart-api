import * as path from 'path';
import * as fs from 'fs';

function logFolderStructure(folderPath: string) {
  console.log(`Inspecting folder path: ${folderPath}`);
  fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error('Error reading folder:', err);
    } else {
      files.forEach((file) => {
        const filePath = path.resolve(folderPath, file.name);
        console.log(` - ${file.isDirectory() ? '[DIR]' : '[FILE]'} ${filePath}`);
      });
    }
  });
}

logFolderStructure(__dirname); // Log files in the current directory
