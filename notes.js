const fs = require('fs')
const chalk = require('chalk')
//Creating Add note function, takes 2 arguments (title and body)
const addNote = (title, body) => {
    // Calls loadNotes function which returns JSON data as objects
    const notes = loadNotes();
    // Variable that checks if note title already exists within notes.
    const duplicateNote = notes.find((note) => note.title === title)
    // If statement that checks if duplicate note exists, adds if does not exist already.
    
    // First way of debugging
    // console.log(duplicateNote)
    // Second way of debugging
    // debugger
    
    if(!duplicateNote) {
        // Pushes new note into note array, setting title and body.
        notes.push({
            title: title,
            body: body
        })
        
        // Writes to JSON file notes array.
        saveNotes(notes)
        console.log(chalk.bgGreen("New note added!"));
    } else {
        console.log(chalk.bgRed("Note title taken!"))
    }
}

// Creating Remove note function, takes 1 argument (title)
const removeNote = title => {
    //Declare notes variable, storing notes JSON array.
    const notes = loadNotes();
    // Declare new array of objects, checks each object in array and returns new array without object that matches title
    const keptNotes = notes.filter(note => note.title !== title)
    if(notes.length === keptNotes.length) {
        console.log(chalk.bgRed('No note found!'))
    } else {
        console.log(chalk.bgGreen('Note removed!'))
        // Writes to JSON file 
        saveNotes(keptNotes);
    }
}

const listNotes = () => {
    const notes = loadNotes();
    notes.forEach((note) => {
        console.log(chalk.blue.bold(note.title))
    })
}

const read = title => {
    const notes = loadNotes();
    const findNote = notes.find((note) => note.title === title);
    if(findNote) {
        console.log(chalk.bold.italic(findNote.title))
        console.log(findNote.body)
    } else {
        console.log(chalk.bgRed("No note found!"))
    }
}

// Function that will write into JSON file, essentially saving it.
const saveNotes = notes => {
    // Turns notes array into string
    const dataJSON = JSON.stringify(notes)
    // Writes to notes json file the stringified data.
    fs.writeFileSync('notes.json', dataJSON)
}

// Function that loads notes json file and return its objects
const loadNotes = () => {
    try {
        // Reads what is inside notes.json and returns bytes.
        const dataBuffer = fs.readFileSync('notes.json')
        // Turns those bytes into string.
        const dataJSON = dataBuffer.toString();
        // Returns that string as objects.
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    read: read
}