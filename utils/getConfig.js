
const path = require("path");

const tools = require('./tools')

// 默认配置
const defaultConfig = {
  distPath: path.join(__dirname, "./dist"), // 压缩目录
  tempPath: 'temp', // 本地临时存放目录
  zipName: "dist.zip", // 压缩后的文件名
  openBackUp: true, // 是否开启远端备份
  releaseDir: 'web', // 发布目录
  // 打包命令
  // buildScript: 'npm run build',
}

let config = null;

const defaultConfigSrc = './deploy.config.js'

function getConfig(configSrc = defaultConfigSrc) {
  if (config) {
    return config;
  }
  
  const deployConfigSrc = path.resolve(process.cwd(), configSrc);
  

  const deployConfigExit = tools.isExit(deployConfigSrc);
  if (!deployConfigExit) {
    tools.logWarn("找不到配置文件");
    process.exit();
    return;
  }
  config = require(deployConfigSrc);
  config = {
    ...defaultConfig,
    ...config
  }

  return config;
}


module.exports = getConfig
