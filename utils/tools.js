const fs = require("fs");
const path = require('path')
require('./color')


/**
 * 递归创建文件夹
 * @param {*} dir 
 * @returns 
 */
function mkdirsSync(dir) {
  if (isExit(dir)) {
    return true;
  } else {
    if (mkdirsSync(path.dirname(dir))) {
      fs.mkdirSync(dir);
      return true;
    }
  }
}

/**
 * 判断文件或者文件夹是否存在
 * @param {*} dir 
 */
function isExit(dir){
  return fs.existsSync(dir)
}

function logBase(type,...args){
  const logArr = args.map(item=>{
    if(item.toString){
      return item.toString()[type]
    }
    return item
  })
  console.log(...logArr);
}

function logVerbose(...args){
  logBase('verbose',...args)
}
function logError(...args){
  logBase('error',...args)
}
function logWarn(...args){
  logBase('warn',...args)
}
function logSuccess(...args){
  logBase('success',...args)
}

module.exports = {
    mkdirsSync,
    isExit,
    logVerbose,
    logError,
    logWarn,
    logSuccess
}