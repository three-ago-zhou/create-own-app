/*
 * @Description: create by Zhou wenhui
 * @version: 2.0.0
 * @Company: creams
 * @Author: Zhou wenhui
 * @Date: 2019-08-18 14:16:22
 * @LastEditors: Zhou wenhui
 * @LastEditTime: 2019-08-20 16:02:53
 */
const chalk = require('chalk');
const validateProjectName = require('validate-npm-package-name');
const log = console.log;
const errLog = console.error;

const checkObj = ['dirName', 'createBase', 'typescript'];

class ValidationResults {
    constructor() {
        this.checkCreate.bind(this);
        this.checkAppName.bind(this);
        this.printValidationResults.bind(this);
    }
    checkCreate(args) {
        if (args === undefined) {
            log(
                chalk.green(`Please specify the create type: ${args}`)
            );
            process.exit(1);
            return true;
        }
        for(const item of checkObj) {
            if (args[item] === undefined) {
                log(
                    chalk.green(`Please specify the create type: ${args[item]}`)
                );
                process.exit(1);
                return true;
            }
        }
    };
    checkAppName(appName) {
        const validationResult = validateProjectName(appName);
        if (!validationResult.validForNewPackages) {
            errLog(
                `Could not create a project called ${chalk.red(
                `"${appName}"`
                )} because of npm naming restrictions:`
            );
            this.printValidationResults(validationResult.errors);
            this.printValidationResults(validationResult.warnings);
            process.exit(1);
        }
    };
    printValidationResults(results) {
        if (typeof results !== 'undefined') {
            results.forEach(error => {
                errLog(chalk.red(`  *  ${error}`));
            });
        }
    };
};

const validation = new ValidationResults();

module.exports = validation;
