const chalk = require("chalk");
const pick = require("lodash.pick");
const ssh2 = require("ssh2");
const SftpClient = require("ssh2-sftp-client");

const upload = async (localFilePath, remoteFilePath, sshConfig) => {
  console.log(
    chalk.gray(
      `[upload] \n  localFilePath: ${localFilePath} \n  remoteFilePath: ${remoteFilePath}`
    )
  );

  const sftp = new SftpClient();

  try {
    await sftp.connect(
      pick(sshConfig, ["host", "port", "username", "password"])
    );

    console.log(chalk.gray(`[upload] start upload file`));
    const start = Date.now();
    await sftp.put(localFilePath, remoteFilePath);
    console.log(
      chalk.gray(`[upload] upload succeed, take ${Date.now() - start}ms`)
    );

    return sftp.end();
  } catch (err) {
    console.log(chalk.red(`[upload] upload failed ${err.message}`));
    throw err;
  }
};

const execCommand = (command, conn) => {
  return new Promise((resolve, reject) => {
    conn.exec(command, (err, stream) => {
      if (err) {
        reject(err);
        return;
      }
      let stderr = "";
      let stdout = "";
      stream
        .on("close", (code) => {
          if (code === 0) {
            resolve(stdout);
          } else {
            reject(stderr || `[deploy] Command failed with code ${code}`);
          }
        })
        .on("data", (data) => {
          stdout += data;
        })
        .stderr.on("data", (data) => {
          stderr += data;
        });
    });
  });
};

const deploy = (projectName, sshConfig) => {
  console.log(chalk.gray(`[deploy] projectName: ${projectName}`));

  return new Promise((resolve, reject) => {
    const conn = new ssh2.Client();

    conn.on("ready", async () => {
      try {
        console.log(chalk.gray(`[deploy] start deploy`));
        const start = Date.now();
        await execCommand(
          `
          cd ${sshConfig.projectDir} &&
          rm -rf ${projectName} &&
          unzip -o ${projectName}.zip -d ${projectName} &&
          rm -rf ${projectName}.zip
        `,
          conn
        );
        console.log(
          chalk.gray(`[deploy] deploy succeed; take ${Date.now() - start}ms`)
        );
        resolve();
      } catch (err) {
        console.log(chalk.red(`[deploy] ${err}`));
        reject(err);
      } finally {
        // 确保连接被关闭
        conn.end();
      }
    });

    conn.on("error", (err) => {
      console.log(chalk.red(`[deploy] \n  ${err.message}`));
      reject(err);
    });

    conn.connect(pick(sshConfig, ["host", "port", "username", "password"]));
  });
};

module.exports = {
  upload,
  deploy,
};
