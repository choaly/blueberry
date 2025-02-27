export default class NotesAPI {
    /* create, read, update, delete */

    //Read
    //research what static means
    //read - allow user to view a note(s)
    static getAllNotes() {
        const notes = JSON.parse(localStorage.getItem("notesapp-notes") || "[]"); //Since localStorage only stores strings, if you need to retrieve complex data (e.g., objects or arrays), you must parse it back into its original form using JSON.parse().
        //if there are no existing notes in the system, give us an empty array

        //sort notes by timestamp
        notes.sort((a,b) => {
            return new Date(a.updated) > new Date(b.updated) ? -1 : 1; //research syntax
        });

        return notes;
    }

    //Create, Update
    //update - allow user to update/modify an existing note
    //can also add a new note
    static saveNote(noteToSave) { //saveNote?
        //why can't i do just getAllNotes() ?
        const notes = NotesAPI.getAllNotes();
        const existing = notes.find(note => note.id == noteToSave.id); //research syntax
        //compare noteToSave.id against each existing note. if it finds a note with that id, it's going to put it inside the existing object/var.

        //Edit/Update
        if (existing) {
            existing.title = noteToSave.title;
            existing.body = noteToSave.body;
            existing.updated = new Date().toISOString();
        } else { //Insert
            noteToSave.id = Math.floor(Math.random() * 1000000); //research math syntax
            noteToSave.updated = new Date().toISOString(); //research
            notes.push(noteToSave);
        }

        //localStorage.setItem() has two params, the key and the value
        //JSON.stringify() is bc localStorage only stores strings. To retrieve the data, use JSON.parse().
        localStorage.setItem("notesapp-notes", JSON.stringify(notes));
    }

    //Delete - allow user to delete a note(s)
    static deleteNote(id) {
        const notes = NotesAPI.getAllNotes();
        const newNotes = notes.filter(note => note.id != id);

        localStorage.setItem("notesapp-notes", JSON.stringify(newNotes));
    }

    // read - getNoteById()
    // deleteAllNotes()

    static deleteAllNotes() {
        localStorage.clear();
    }

    
}