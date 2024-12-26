const { execSync } = require("child_process");

let _hasYarn = null;

exports.servers = [
  {
    name: "dev",
    host: "100.70.3.118",
    username: "root",
    password: "yzlcpc!Cqkldev2024",
    port: 22022,
    projectDir: "/data/web",
    staticProjectDir: "/data/web/resources",
  },
  {
    name: "test",
    host: "100.70.3.92",
    username: "root",
    password: "yzlcpc!Cqkltest2024",
    port: 22022,
    projectDir: "/data/web",
    staticProjectDir: "/data/web/resources",
  },
  {
    name: "uat",
    host: "100.70.1.81",
    username: "root",
    password: "yzlcpc!Cqklpre2024",
    port: 22022,
    projectDir: "/data/web",
    staticProjectDir: "/data/web/resources",
  },
];

exports.hasYarn = () => {
  if (_hasYarn != null) {
    return _hasYarn;
  }

  try {
    execSync("yarn --version", { stdio: "ignore" });
    return (_hasYarn = true);
  } catch (e) {
    return (_hasYarn = false);
  }
};
