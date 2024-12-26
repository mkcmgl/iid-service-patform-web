const fs = require("fs");
const archiver = require("archiver");
const chalk = require("chalk");

module.exports = function (folderPath, outputPath, format = "zip") {
  console.log(
    chalk.gray(
      `[archiver] \n  folderPath: ${folderPath} \n  outputPath: ${outputPath} \n  format: ${format}`
    )
  );
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(outputPath);
    const archive = archiver(format, {
      zlib: { level: 9 },
    });

    archive.on("warning", function (err) {
      if (err.code === "ENOENT") {
        console.log(chalk.yellow(err.message));
      } else {
        console.log(chalk.red(err.message));
        reject(err);
      }
    });

    archive.on("error", function (err) {
      console.log(chalk.red(err.message));
      reject(err);
    });

    archive.pipe(output);

    archive.directory(folderPath, false);

    archive.finalize();

    archive.on("close", () => {
      console.log(
        chalk.gray(`[archiver] Total size: ${archive.pointer()} bytes`)
      );
      console.log(
        chalk.gray("[archiver] archiver has been finalized and closed.")
      );
    });

    output.on("close", function () {
      console.log(
        chalk.gray(`[archiver] ${outputPath} has been written successfully.`)
      );
      resolve();
    });

    output.on("end", function () {
      output.close();
    });
  });
};
