import { copyFile, readdir } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// Correctly set __dirname in an ES Module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Define source and destination directories
const sourceDir = path.join(__dirname, "./dist/assets/");
const destinationDir = path.join(__dirname, "../albis-leasing/assets/");

// console.log("__dirname", __dirname);
// console.log("sourceDir", sourceDir);
// console.log("destinationDir", destinationDir);

async function copyFilesWithCustomNames(source, destination) {
  try {
    // Read the source directory
    const files = await readdir(source);
    // Filter out files that end with '.js' or '.css'
    const targetFiles = files.filter(
      (file) => file.endsWith(".js") || file.endsWith(".css"),
    );

    // Copy each file to the destination directory with a custom name
    for (const file of targetFiles) {
      const sourcePath = path.join(source, file);
      let newName;

      // Determine the new name based on the file type
      if (file.endsWith(".js")) {
        newName = "albis-leasing-script.js";
      } else if (file.endsWith(".css")) {
        newName = "albis-leasing-style.css";
      }

      const destinationPath = path.join(destination, newName);

      await copyFile(sourcePath, destinationPath);
      console.log(
        `${file} was copied and renamed to ${newName} in ${destination}`,
      );
    }
  } catch (error) {
    console.error("Error processing files:", error);
  }
}

copyFilesWithCustomNames(sourceDir, destinationDir);
