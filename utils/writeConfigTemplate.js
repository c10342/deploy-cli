// 调用  deploy --init 的时候会在进程所在目录生成一个deploy.config.js的配置文件
const fs = require('fs')

const path = require('path')

function writeConfigTemplate(){
    const configTemplateSrc = path.join(__dirname,'./configTemplate.js')
    const configTemplateStr = fs.readFileSync(configTemplateSrc,'utf-8')
    const output = path.resolve(process.cwd(),'deploy.config.js')
    fs.writeFileSync(output,configTemplateStr)
}

module.exports = writeConfigTemplate