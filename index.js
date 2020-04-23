#!/usr/bin/env node

require('yargs')
    .command('build [prod]', 'build the website', (yargs) => {
        yargs
            .positional('prod', {
                describe: 'production mode',
                default: false
            })
    }, (argv) => {
        console.log(argv.prod)
    })
    .argv