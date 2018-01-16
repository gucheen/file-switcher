#!/usr/bin/env node

import * as program from 'commander';
import * as hjson from 'hjson';
import chalk from 'chalk';
const fs = require('fs');
const path = require('path');

import { Config } from './types/config';

program
  .version('0.1.0')
  .parse(process.argv);

const projectRoot = process.env.PWD;
const config: Config = hjson.parse(fs.readFileSync(path.resolve(projectRoot, 'config.hjson')).toString());
const tasks = config.tasks;
if (tasks) {
  tasks.forEach(({ source, target }) => {
    const sourcePath = path.resolve(projectRoot, source);
    const targetPath = path.resolve(projectRoot, target);
    fs.copyFile(sourcePath, targetPath, err => {
      if (err) {
        console.log(chalk.red('FAILED'), `source: ${source}, target: ${target}, error: ${err}`)
        return;
      };
      console.log(chalk.green('SUCCESS'), `${chalk.bgBlue('source')}: ${source}, ${chalk.bgBlue('target')}: ${target}`)
    });
  })
}
