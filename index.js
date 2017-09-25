const fs = require('fs')
const path = require('path')
const _ = require('highland')
const { last } = require('lodash')
const chalk = require('chalk')

const source = fs.createReadStream(path.join(__dirname, 'files', 'data.csv'))
const dest = fs.createWriteStream(path.join(__dirname, 'files', 'output.txt'))

const start = Date.now()
console.log(chalk.bold.green('Process starting'))
dest.on('close', () => console.log(chalk.bold.green(`Finished processing in ${Date.now() - start}ms`)))

_(source)
  .split()
  .compact()
  .map(line => {
    const splitted = line.split(',')
    const name = splitted[2].split(' ')[0]
    const lastName = splitted[3]
    const company = last(splitted)
    return `${name} ${lastName}\n${company}\n`
  })
  .collect()
  .map(list => list.join('\n'))
  .pipe(dest)
