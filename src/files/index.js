import commander from 'commander';

const program = new commander.Command();


program.version('0.0.1')
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .action(() => {
    program.option('-h, --help', 'output usage information')
      .option('-V , --version', 'output the version number');
  })
  .option('-f, --format [type]', 'Output format')
  .parse(process.argv);
