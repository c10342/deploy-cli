// handleCommand.js
// run linux shell(ssh对象、shell指令、执行路径)
const tools = require('../utils/tools')
function runCommand(ssh, command, path) {
  return new Promise((resolve, reject) => {
    ssh
      .execCommand(command, {
        cwd: path,
      })
      .then((res) => {
        if (res.stderr) {
          tools.logError(`命令执行发生错误:${res.stderr}` );
          reject(res.stderr);
        } else {
          tools.logSuccess(`${command} 执行完成！`);
          resolve();
        }
      });
  });
}

module.exports = runCommand;
