// uploadFile.js
const path = require("path");
const runCommand = require("./handleCommand");
const getCurrentTime = require("./handleTime");
const hookfn = require('../utils/callbackHook')
const tools = require('../utils/tools')


function putFile(ssh, config) {
  return new Promise((resolve, reject) => {
    // 提取压缩后的文件面，因为前面可能是路径，temp/dist.zip或者dist.zip
    // const filename = path.basename(config.zipPath)
    // 服务端存放静态资源的目录
    let deployDir = config.deployDir;
    // 判断是否/结尾，没有需要补全
    if (!deployDir.endsWith("/")) {
      deployDir += "/";
    }
    // 将本地文件上传到服务器中
    const zipSrc = path.resolve(process.cwd(), config.tempPath, config.zipName);
    ssh.putFile(zipSrc, deployDir + config.zipName).then(
      () => {
        tools.logSuccess("5-文件上传完成");
        resolve();
      },
      (err) => {
        tools.logError("5-上传失败！", err);
        reject(err);
      }
    );
  });
}

// 文件上传(ssh对象、配置信息、本地待上传文件)
async function uploadFile(ssh, config) {
  tools.logSuccess("4-开始文件上传");
  // 处理服务器上的源文件
  await handleSourceFile(ssh, config);
  // 上传文件
  await putFile(ssh, config);
}

// 处理源文件(ssh对象、配置信息)
async function handleSourceFile(ssh, config) {
  if (config.openBackUp) {
    tools.logVerbose("已开启远端备份!");
    const callbackHook = hookfn(config)
    // 备份前钩子函数
    callbackHook('onBackupBefore',ssh)
    await runCommand(
      ssh,
      `
      if [ -d ${config.releaseDir} ];
      then mv ${config.releaseDir} ${config.releaseDir}_${getCurrentTime()}
      fi
      `,
      config.deployDir
    );
    callbackHook('onBackupAfter',ssh)
  } else {
    tools.logWarn("提醒：未开启远端备份!");
    await runCommand(
      ssh,
      `
      if [ -d ${config.releaseDir} ];
      then rm -rf ${config.releaseDir}
      fi
      `,
      config.deployDir
    );
  }
}

module.exports = uploadFile;
