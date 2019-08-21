/*
 * @Description: create by Zhou wenhui
 * @version: 0.0.1
 * @Company: none
 * @Author: Zhou wenhui
 * @Date: 2019-08-18 15:39:48
 * @LastEditors: Zhou wenhui
 * @LastEditTime: 2019-08-21 10:10:27
 */
const downLoadGit = require('download-git-repo');
const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const validation = require('../lib/checkArgs');
const errLog = console.error;
const log = console.log;

class GitBase {
    constructor() {
        this.gitDownLoad.bind(this);
    };
    gitDownLoad({ callBack, branchName, appName }) {
        downLoadGit(`three-ago-zhou/create-own-app-repo#feature/${branchName}`, `${appName}/`, (err) => {
            if (!err) {
                callBack({ code: 'SUCCESS' });
            } else {
                callBack(err);
            }
        })
    };
}

class CreateBase extends GitBase{
    constructor() {
        super();
        this.create.bind(this);
    };
    create({
        dirName,
        createBase,
        typescript,
    }) {
        if(validation.checkCreate.call(null, { dirName, createBase, typescript })) return;
        log(
            chalk.cyan(`
                文件名称为: ${dirName}
            `),
            chalk.cyan(`
                项目模版为: ${createBase}
            `)
        );
        const dirAppName = path.resolve(dirName);
        const appName = path.basename(dirAppName);
        if (fs.existsSync(dirAppName)) {
            errLog(
                chalk.red(`文件已经存在: ${dirAppName}`)
            );
            process.exit(1);
            return;
        }
        validation.checkAppName(appName);
        fs.ensureDirSync(dirName);
        switch(createBase) {
            case 'react':
                log(
                    chalk.blue(`
                        Creating a own app in ${chalk.green(dirAppName)}.
                        waiting later...
                    `)
                );
                this.gitDownLoad({ callBack: this.finish, branchName: createBase, appName });
                break;
            case 'webpackBase':
                log(
                    chalk.blue(`
                        Creating a own app in ${chalk.green(dirAppName)}.
                        waiting later...
                    `)
                );
                this.gitDownLoad({ callBack: this.finish, branchName: createBase, appName });
                break;
            default :
                errLog(
                    `don't find ${createBase} of git repo`
                )
                break;
        }
    };
    finish(status) {
        if(status.code === 'SUCCESS') {
            log(
                chalk.magenta(`
                    Created a own app is success.
                `)
            );
        } else {
            errLog(
                chalk.red(`
                    create error...
                `)
            );
        }
    }
};

const createBaseInstance = new CreateBase();

module.exports = createBaseInstance;