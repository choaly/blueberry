export default class NotesView {
    constructor(root, options = {}) { // root is an HTML element, options is an object. The = {} sets a default empty object for the second parameter if none is provided.
        this.root = root;
        this.onNoteSelect = options.onNoteSelect;
        this.onNoteCreate = options.onNoteCreate;
        this.onNoteEdit = options.onNoteEdit;
        this.onNoteDelete = options.onNoteDelete;

        //backticks give multi-line strings & the ability to string template aka pass through variables
        //CSS class naming conventions (BEM): https://www.freecodecamp.org/news/css-naming-conventions-that-will-save-you-hours-of-debugging-35cea737d849/
        this.root.innerHTML = `
            <div class="notes__sidebar">
                <h3>Alyssa</h3>
                <!-- <div>Search</div> -->
                <button class="notes__create">Create Note</button>
                <div class="notes__list">
                </div>
            </div>
            <div class="notes__preview">
                <input class="notes__title" placeholder="New Note...">

                <button class="notes__generate-quiz" contenteditable="false">Generate quiz</button>

                <textarea class="notes__body">Take note...</textarea>
                <!-- <img src="images/delete.png" /> -->
            </div>
        `;

        
        //const btnCreateNote = document.querySelector(".create-note");
        //the querySelector() method can be called on any Element object in the DOM.
        const btnCreateNote = this.root.querySelector(".notes__create");
        const inpTitle = this.root.querySelector(".notes__title");
        //const btnGenerateQuiz = document.querySelector(".notes__generate-quiz");
        const inpBody = this.root.querySelector(".notes__body");

        //event listeners
        //create note
        btnCreateNote.addEventListener("click", ()=> {
            this.onNoteCreate();
        });

        //edit (update) note
        [inpTitle, inpBody].forEach(inputField => {
            // Even though the loop refers to each variable as inputField, the inner function does not lose access to the original inpTitle and inpBody variables because these variables are declared in the outer scope.
            inputField.addEventListener("blur", () => {
                const updatedTitle = inpTitle.value.trim();
                const updatedBody = inpBody.value.trim();

                this.onNoteEdit(updatedTitle, updatedBody);
            });
        });

        //Hide the note preview by default
        this.updateNotePreviewVisibility(false);


        //TODO: add more event listener delete note
    }

    //underscore indicates that method should be used as a private method
    //creates the html string for one of our sidebar items
    _createListItemHTML(id, title, body, updated) {
        const MAX_BODY_LENGTH = 30;
        // data-note-id is a custom HTML attribute used to store information directly in the DOM element. It is part of the HTML5 data- attribute* specification. You can define any data-* attribute to hold custom data for your elements. u can access it later like
            // const noteListItem1 = this.root.querySelector(".notes__list-item");
            // noteListItem1.dataset.noteId

        //QUESTION: what if substring length is less than MAX_BODY_LENGTH? would substring() still work
        //RESEARCH toLocaleStirng
        return `
            <div class="notes__list-item" data-note-id="${id}">
                <div class="notes__small-title">${title}</div>
                <div class="notes__small-body">
                    ${body.substring(0, MAX_BODY_LENGTH)}
                    ${body.length > MAX_BODY_LENGTH ? "..." : ""}
                </div>
                <div class="notes__small-updated">
                    ${updated.toLocaleString(undefined, { dateStyle: "full", timeStyle: "short"})}
                </div>
            </div>
        `;
    }

    updateNoteList(notes) {
        const notesListContainer = this.root.querySelector(".notes__list");

        //Empty list
        notesListContainer.innerHTML = '';

        for (const note of notes) {
            const html = this._createListItemHTML(note.id, note.title, note.body, new Date(note.updated)); //research new Date() param

            notesListContainer.insertAdjacentHTML("beforeend", html); //research this line
        }

        // Add select/delete events for each list item
        notesListContainer.querySelectorAll(".notes__list-item").forEach(noteListItem => {
            noteListItem.addEventListener("click", () => {
                this.onNoteSelect(noteListItem.dataset.noteId);
            });

            noteListItem.addEventListener("dblclick", () => {
                const doDelete = confirm("Are you sure you want to delete this note?");
                if (doDelete) {
                    this.onNoteDelete(noteListItem.dataset.noteId);
                }
            });

        });
    }

    updateActiveNote(note) {
        this.root.querySelector(".notes__title").value = note.title;
        this.root.querySelector(".notes__body").value = note.body;

        this.root.querySelectorAll(".notes__list-item").forEach(noteListItem => {
            noteListItem.classList.remove("notes__list-item-selected");
        });
        //The square brackets [] in CSS selectors are used to create attribute selectors.
        //Template literals
        const selectedNote = this.root.querySelector(`.notes__list-item[data-note-id="${note.id}"]`);
        // console.log("in updateActiveNote(): note id is " + note.id);

        selectedNote.classList.add("notes__list-item-selected");
    }

    updateNotePreviewVisibility(visible) {
        this.root.querySelector(".notes__preview").style.visibility = visible ? "visible" : "hidden";
    }
}