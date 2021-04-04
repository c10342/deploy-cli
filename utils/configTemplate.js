// const path = require("path");

module.exports = {
    // 默认，压缩目录
    //   distPath: path.join(__dirname, "./dist"),
    // 默认，本地临时存放目录
    //   tempPath:'temp', 
    //   默认，压缩后的文件名
    //   zipName: "dist.zip", 
    // 必填，远端目录
    deployDir: "/project/test/",
    // 默认，是否开启远端备份
    //   openBackUp:true, 
    // 默认，发布目录
    //   releaseDir: 'web', 
    ssh: {
        host: "",
        username: "",
        password: "",
        port: 22,
    },
    // 打包命令,不填写就跳过打包，直接部署
      buildScript:'npm run build',
    // 打包前
    // onBuildBefore(){},
    // 打包后
    // onBuildAfter(){},
    // 压缩前
    // onCompressBefore(){},
    // 压缩后
    // onCompressAfter(){},
    // 连接服务器前
    // onConnentBefore(){},
    // 连接服务器后
    // onConnentAfter(ssh){},
    // 上传压缩文件前
    // onUploadBefore(ssh){},
    // 上传压缩文件后
    // onUploadAfter(ssh){},
    // 服务器解压压缩文件前
    // onUnzipBefore(ssh){},
    // 服务器解压压缩文件后
    // onUnzipAfter(ssh){},
    // 重命名文件夹前
    // onRenameBefore(ssh){},
    // 重命名文件后
    // onRenameAfter(ssh){},
    // 删除服务器上的压缩文件前
    // onDeleteBefore(ssh){},
    // 删除服务器上的压缩文件后
    // onDeleteAfter(ssh){},
    // 备份服务器上的文件前
    // onBackupBefore(ssh){},
    // 备份服务器上的文件后
    // onBackupAfter(ssh){},
    // 部署发生错误
    // onError(error){},
    // 部署开始
    // onStart(){},
    // 部署结束
    // onEnd(){}
};
