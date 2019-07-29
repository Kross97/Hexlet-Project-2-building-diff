#!/usr/bin/env node
import commander from 'commander';
import genDiff from '..';


const program = commander;

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((filepath1, filepath2) => {
    console.log(genDiff(filepath1, filepath2, program.format));
  })
  .parse(process.argv);
.
