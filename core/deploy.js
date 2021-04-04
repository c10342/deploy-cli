

// Node实现前端自动化部署

// 流程：打包构建(build)->本地压缩文件(compress)->连接服务器(connent)->上传服务器(upload)->删除/备份服务器上的同命文件(backup)->服务器解压上传的压缩文件(unzip)->修改解压后的文件名为发布目录(rename)->删除上传到服务器上面的压缩文件(delete)

// 每一个流程都提供了相对性的钩子函数，onxxxBefore,onxxxAfter,onError,onStart,onEnd

const path = require("path");
const shell = require("shelljs");
const compressFile = require("./compressFile");
const connentToServer = require("./ssh");
const uploadFile = require("./uploadFile");
const runCommand = require("./handleCommand");
const hookfn = require("../utils/callbackHook");
const tools = require('../utils/tools')
const getConfig = require("../utils/getConfig");
// 配置信息
let config = null;
// 执行部署流程的购置函数
let callbackHook = null;
// 服务器连接对象
let ssh = null;

// 主程序(可单独执行)
async function main() {
  callbackHook("onCompressBefore");
  // 拼接出要存储压缩文件的路径
  const zipSrc = path.resolve(process.cwd(), config.tempPath, config.zipName);
  // 压缩文件
  await compressFile(zipSrc, config.distPath);
  callbackHook("onCompressAfter");

  callbackHook("onConnentBefore");
  // 连接服务器
  ssh = await connentToServer(config.ssh);
  callbackHook("onConnentAfter", ssh);

  callbackHook("onUploadBefore", ssh);
  // 上传压缩文件到服务器
  await uploadFile(ssh, config);
  callbackHook("onUploadAfter", ssh);

  callbackHook("onUnzipBefore", ssh);
  // 解压压缩文件
  await runCommand(ssh, "unzip " + config.zipName, config.deployDir);
  callbackHook("onUnzipAfter", ssh);

  callbackHook("onRenameBefore", ssh);
  await runCommand(ssh, "mv dist " + config.releaseDir, config.deployDir); // 修改文件名称
  callbackHook("onRenameAfter", ssh);

  callbackHook("onDeleteBefore", ssh);
  // 删除上传的的压缩文件
  await runCommand(ssh, "rm -f " + config.zipName, config.deployDir);
  callbackHook("onDeleteAfter", ssh);
}

// 执行部署流程
async function runTask() {
  try {
    config = getConfig();
    callbackHook = hookfn(config);

    callbackHook("onStart");
    if (config.buildScript) {
      tools.logVerbose('开始打包');
      callbackHook("onBuildBefore");
      const result = shell.exec(config.buildScript);
      if (result.code !== 0) {
        throw new Error("打包失败");
      }
      callbackHook("onBuildAfter");
      tools.logSuccess("打包成功");
    }
    await main();
  } catch (error) {
    callbackHook("onError", error);
    tools.logError("部署过程出现错误！", error);
  } finally {
    if (ssh) {
      ssh.dispose();
    }
    callbackHook("onEnd");
    process.exit();
  }
}

module.exports = runTask
