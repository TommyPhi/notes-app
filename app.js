//Declare a variable that stores Node.js module or any module that is being used in the app to be able to run it.
//If module is a core module from Node, must match name.
// const fs = require('fs')

// fs.writeFileSync('notes.txt', 'My name is Tommy Phi.')

// fs.appendFileSync('notes.txt', ' I am 19 years old.');
const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')

//Customize Yargs versions
yargs.version("1.1.0")

//create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

//create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
})

//create list command
yargs.command({
    command: 'list',
    describe: 'List all notes',
    handler() {
        notes.listNotes();
    }
})

//create list command
yargs.command({
    command: 'read',
    describe: 'Read note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.read(argv.title);
    }
})

//add, remove, read, list notes

yargs.parse()

// console.log(yargs.argv)