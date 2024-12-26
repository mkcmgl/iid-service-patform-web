#!/usr/bin/env node
const path = require("path");
const { program } = require("commander");
const chalk = require("chalk");
const leven = require("leven").default;

const suggestCommands = (unknownCommand) => {
  const availableCommands = program.commands.map((cmd) => cmd._name);

  let suggestion;

  availableCommands.forEach((cmd) => {
    const isBestMatch =
      leven(cmd, unknownCommand) < leven(suggestion || "", unknownCommand);
    if (leven(cmd, unknownCommand) < 3 && isBestMatch) {
      suggestion = cmd;
    }
  });

  if (suggestion) {
    console.log(`  ` + chalk.red(`Did you mean ${chalk.yellow(suggestion)}?`));
  }
};

program
  .command("build")
  .description("build and deploy")
  .option("--static", "deploy static file", false)
  .option(
    "-p, --projectPath <projectPath>",
    "absuolute project path",
    path.resolve("./")
  )
  .allowUnknownOption()
  .action((options) => {
    require("../lib/build.js")(options);
  });

// program
//   .command("config [value]")
//   .description("inspect and modify the config")
//   .option("-g, --get <path>", "get value from option")
//   .option("-s, --set <path> <value>", "set option value")
//   .option("-d, --delete <path>", "delete option from config")
//   .option("-e, --edit", "open config with default editor")
//   .option("--json", "outputs JSON result only")
//   .action((value, options) => {
//     require("../lib/config")(value, options);
//   });

program.on("command:*", ([cmd]) => {
  program.outputHelp();
  console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`));
  console.log();
  suggestCommands(cmd);
  process.exitCode = 1;
});

program.on("--help", () => {
  console.log();
  console.log(
    `  Run ${chalk.cyan(
      `inspuir <command> --help`
    )} for detailed usage of given command.`
  );
  console.log();
});

program.name("inspur").usage("[command] [options]");

program.parse(process.argv);
