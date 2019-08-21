#!/usr/bin/env node

/*
 * @Description: create by Zhou wenhui
 * @version: 2.0.0
 * @Company: creams
 * @Author: Zhou wenhui
 * @Date: 2019-08-18 13:15:27
 * @LastEditors: Zhou wenhui
 * @LastEditTime: 2019-08-21 10:08:35
 */

const commander = require('commander');
const chalk = require('chalk');
const inquirer = require('inquirer');
const packageJson = require('../package.json');
const log = console.log;
const createBaseInstance = require('../lib/utils');

commander
    .version(packageJson.version)
    .command('project')
    .description('添加基础项目架构')
    .action(() => {
        const parameters = [
            {
                type: 'input',
                name: 'dirName',
                message: '生成的文件名称',
                default: 'create-own-app',
                filter(val) {
                    return val.trim();
                },
            },
            {
                type: 'list',
                name: 'createBase',
                message: '选择项目模版',
                default: 'react',
                choices: [
                    {
                        name: 'react',
                        value: 'react',
                    },
                ],
            },
            {
                type: 'confirm',
                name: 'typescript',
                message: '是否需要为项目依赖typescript? 默认为依赖(true)',
                default: true,
            },
        ];
        inquirer.prompt(parameters).then(selected => {
            createBaseInstance.create(selected);
        });
    })
    .on('--help',() => {
        log(
            chalk.cyan('type has: react')
        );
    });

commander
    .version(packageJson.version)
    .command('basePackage')
    .description('添加基础打包架构')
    .action(() => {
        const parameters = [
            {
                type: 'input',
                name: 'dirName',
                message: '生成的文件名称',
                default: 'create-own-app',
                filter(val) {
                    return val.trim();
                },
            },
            {
                type: 'list',
                name: 'createBase',
                message: '选择打包模版',
                default: 'webpackBase',
                choices: [
                    {
                        name: 'webpackBase',
                        value: 'webpackBase',
                    },
                ],
            },
            {
                type: 'confirm',
                name: 'typescript',
                message: '是否需要为项目依赖typescript? 默认为依赖(true)',
                default: true,
            },
        ];
        inquirer.prompt(parameters).then(selected => {
            createBaseInstance.create(selected);
        });
    })
    .on('--help',() => {
        log(
            chalk.cyan('type has: react')
        );
    });

commander.parse(process.argv);

if (process.argv[2] === undefined) {
    log(
        chalk.cyan(`
            请输入创建项目命令: create-own-app project
            or
            请输入创建基础webpack命令: : create-own-app basePackage
        `)
    );
}
