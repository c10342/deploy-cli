const { NodeSSH } = require("node-ssh");

const tools = require('../utils/tools')

const ssh = new NodeSSH();

function connectServe(config) {
  return new Promise((resolve, reject) => {
    ssh
      .connect({
        host: config.host,
        username: config.username,
        password: config.password,
        tryKeyboard: true,
        onKeyboardInteractive(
          name,
          instructions,
          instructionsLang,
          prompts,
          finish
        ) {
          if (
            prompts.length > 0 &&
            prompts[0].prompt.toLowerCase().includes("password")
          ) {
            finish([config.password]);
          }
        },
      })
      .then(() => {
        tools.logSuccess( `3-${config.host} 连接成功`);
        resolve(ssh);
      })
      .catch((err) => {
        tools.logError(`3-${config.host} 连接失败`, err);
        reject();
      });
  });
}

module.exports = connectServe
