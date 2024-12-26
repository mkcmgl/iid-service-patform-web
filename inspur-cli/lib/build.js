#!/usr/bin/env node
const inquirer = require("inquirer").default;
const path = require("path");
const chalk = require("chalk");
const shelljs = require("shelljs");
const archiver = require("./archiver");
const { hasYarn, servers } = require("./env");
const { upload, deploy } = require("./ssh");

class BuildProject {
  projectPath = path.resolve("./");

  static = false;

  constructor(options) {
    this.projectPath = options.projectPath;
    this.static = options.static;
  }

  async resolvePrompts() {
    const packageJson = require(path.resolve(this.projectPath, "package.json"));
    const scriptSuffix = hasYarn() ? "yarn" : "npm run";
    const scripts = Object.keys(packageJson.scripts).map((item) => {
      return {
        name: `${scriptSuffix} ${item}`,
        value: `${scriptSuffix} ${item}`,
      };
    });

    const prompts = [
      {
        name: "projectName",
        type: "input",
        message: "input nginx public path",
        default: packageJson.name,
      },
      {
        name: "choosedScripts",
        type: "list",
        message: "select build script",
        when: () => scripts.length > 0,
        choices: [
          ...scripts,
          {
            name: "custom",
            value: "custom",
          },
        ],
      },
      {
        name: "buildScripts",
        type: "input",
        message: "input build script",
        when: (answers) =>
          scripts.length === 0 || answers.choosedScripts === "custom",
      },
      {
        name: "servers",
        type: "checkbox",
        message: "select deploy servers",
        choices: servers.map((item) => ({
          name: item.name,
          value: item.name,
          checked: true,
        })),
      },
    ];

    const answers = await inquirer.prompt(prompts);

    return {
      ...answers,
      buildScripts: answers.buildScripts || answers.choosedScripts,
    };
  }

  async build() {
    const answers = await this.resolvePrompts();

    // 执行构建命令
    console.log(chalk.green("start build"));
    shelljs.cd(this.projectPath);
    shelljs.exec(answers.buildScripts);
    console.log(chalk.green("build succeed"));

    // 生成压缩包
    console.log(chalk.green("start compress"));
    const zipFilePath = path.resolve(
      this.projectPath,
      `./${answers.projectName}.zip`
    );
    shelljs.rm(zipFilePath);
    await archiver(path.resolve(this.projectPath, "./dist"), zipFilePath);
    console.log(chalk.green("compress succeed"));

    // 服务器部署
    for (const name of answers.servers) {
      const sshConfig = servers.find((item) => item.name === name);
      if (!sshConfig) {
        console.log(chalk.red(`unknown server: ${name}`));
        continue;
      }

      console.log(chalk.green(`start delpoy, server: ${name}`));
      const remoteFilePath = `${this.static ? sshConfig.staticProjectDir : sshConfig.projectDir}/${answers.projectName}.zip`;
      await upload(zipFilePath, remoteFilePath, sshConfig);
      if (!this.static) {
        await deploy(answers.projectName, sshConfig);
      }
      console.log(chalk.green(`deploy succeed, server: ${name}`));
    }

    console.log(chalk.green("finish"));
  }
}

const build = async (options) => {
  const buildProject = new BuildProject(options);
  await buildProject.build();
};

module.exports = build;
