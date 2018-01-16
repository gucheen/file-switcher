#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var program = require("commander");
var hjson = require("hjson");
var chalk_1 = require("chalk");
var fs = require('fs');
var path = require('path');
program
    .version('0.1.0')
    .parse(process.argv);
var projectRoot = process.env.PWD;
var config = hjson.parse(fs.readFileSync(path.resolve(projectRoot, 'config.hjson')).toString());
var tasks = config.tasks;
if (tasks) {
    tasks.forEach(function (_a) {
        var source = _a.source, target = _a.target;
        var sourcePath = path.resolve(projectRoot, source);
        var targetPath = path.resolve(projectRoot, target);
        fs.copyFile(sourcePath, targetPath, function (err) {
            if (err) {
                console.log(chalk_1.default.red('FAILED'), "source: " + source + ", target: " + target + ", error: " + err);
                return;
            }
            ;
            console.log(chalk_1.default.green('SUCCESS'), chalk_1.default.bgBlue('source') + ": " + source + ", " + chalk_1.default.bgBlue('target') + ": " + target);
        });
    });
}
