#!/usr/bin/env node

const { runBuild } = require("./src/build");

require("yargs").command(
    "build [prod]",
    "build the website",
    (yargs) => {
        yargs.positional("prod", {
            describe: "production mode",
            default: false,
        });
    },
    (argv) => {
        runBuild(argv);
    }
).argv;
