const fs = require("fs");
const archiver = require("archiver");
const path = require('path')
const tools = require('../utils/tools')


/**
 * 压缩文件夹
 * @param {*} zipPath 存储压缩文件的路径
 * @param {*} distPath 需要压缩的文件夹路径
 * @returns 
 */
function compressFile(zipPath, distPath) {
  return new Promise((resolve, reject) => {
    if(!tools.isExit(distPath)){
      // 判断需要压缩的文件夹是否存在
      throw new Error(`${distPath} 目录不存在`)
    }
    // 判断存储压缩文件的路径是否存在，不存在则创建
    tools.mkdirsSync(path.dirname(zipPath));
    
    tools.logVerbose("1-正在压缩文件...");
    let output = fs.createWriteStream(zipPath); // 创建文件写入流
    const archive = archiver("zip", {
      zlib: { level: 9 }, // 设置压缩等级
    });
    output
      .on("close", () => {
        tools.logSuccess(
          `2-压缩完成！共计 ${(archive.pointer() / 1024 / 1024).toFixed(3)}MB`
        );
        resolve();
      })
      .on("error", (err) => {
        tools.logError("压缩失败", err);
        reject();
      });
    archive.pipe(output); // 管道存档数据到文件
    archive.directory(distPath, "dist"); // 存储目标文件并重命名
    archive.finalize(); // 完成文件追加 确保写入流完成
  });
}

module.exports = compressFile;
