import NotesView from "./NotesView.js";
import NotesAPI from "./NotesAPI.js";

export default class App {
    constructor(root) {
        this.notes = [];
        this.activeNote = null;
        this.view = new NotesView(root, this._handlers()); //call the this._handlers() function to return the object in this._handlers()

        //update the list of notes when we first start up the application
        // console.log("in App class");
        this._refreshNotes();
    }

    _refreshNotes() {
        const notes = NotesAPI.getAllNotes();
        
        this._setNotes(notes);

        if (notes.length > 0) { //if we have at least one note saved
            // console.log("refreshNotes");
            this._setActiveNote(notes[0]);
        }
    }

    _setNotes(notes) {
        this.notes = notes;
        this.view.updateNoteList(notes);
        this.view.updateNotePreviewVisibility(notes.length > 0);
    }

    _setActiveNote(note) {
        this.activeNote = note;
        this.view.updateActiveNote(note);
    }

    //a privately used method
    // question - why can't you just make handlers an object instead of a function?
    _handlers() {
        return {
            onNoteCreate: () => {
                // console.log("Note created");
                const newNote = {
                    title: "New Note",
                    body: "Take note..."
                }
                NotesAPI.saveNote(newNote);
                this._refreshNotes();
            },
            onNoteSelect: noteId => {
                // console.log("Note selected: " + noteId);
                const selectedNote = this.notes.find(note => note.id == noteId);
                this._setActiveNote(selectedNote);
            },
            onNoteEdit: (title, body) => {
                // console.log(title, body);
                NotesAPI.saveNote({
                    id: this.activeNote.id,
                    title: title,
                    body: body
                });

                this._refreshNotes();
            },
            onNoteDelete: noteId => {
                // console.log("Note deleted: " + noteId);
                NotesAPI.deleteNote(noteId);
                this._refreshNotes();
            }
        };
    }
}