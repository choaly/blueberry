import App from "./App.js";

// import NotesView from "./NotesView.js";
// import NotesAPI from "./NotesAPI.js";

const root = document.getElementById("app");
const app = new App(root);

//Q: how is the view rendered if const view variable isn't used?
//A: The view is still rendered because the NotesView class directly manipulates the DOM when instantiated. When you instantiate NoteView in main.js, this triggers the constructor in NotesView.js, which changes the HTML content.

// const view = new NotesView(app, {
//     //in js, you can assign functions to object properties. This is the essence of callback functions—-passing behavior to be executed later, and it's what makes JS very powerful.
//     onNoteCreate() {
//         console.log("Note has been created!");
//     },
    
//     onNoteSelect(id) {
//         console.log("Note has been selected:" + id);
//         const notes = NotesAPI.getAllNotes();
//         const myNote = notes.find(note => note.id == id);
//         view.updateActiveNote(myNote);
//     },

//     onNoteEdit(newTitle, newBody) {
//         console.log(newTitle);
//         console.log(newBody);
//     },

//     onNoteDelete(id) {
//         console.log("note deleted: " + id);
//     }

// });

// view.updateNoteList(notes);

// ---------------------------------------

// NotesAPI.saveNote({
//     title: "A second note!",
//     body: "body of second note~"
// });
// const notes = NotesAPI.getAllNotes();

// view.updateActiveNote(notes[0]);