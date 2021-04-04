#!/usr/bin/env node

const packageJson = require('./package.json')
const { program } = require('commander');
const writeConfigTemplate = require('./utils/writeConfigTemplate')
const getConfig = require('./utils/getConfig')
const deploy = require('./core/deploy')

// 获取版本号
program.version(packageJson.version);

program
    .option('--init', '生成配置文件')
    .option('--config <configSrc>', '配置文件路径')

program.parse(process.argv);

const options = program.opts();

if (options.init) {
    writeConfigTemplate()
} else if (options.config) {
    getConfig(options.config)
    deploy()
} else {
    deploy()
}
