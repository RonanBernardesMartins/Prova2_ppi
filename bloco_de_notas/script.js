const LOCAL_STORAGE_KEY = 'jsNotesApp_notes';

const noteContentInput = document.getElementById('note-content');
const noteIdInput = document.getElementById('note-id');
const saveNoteBtn = document.getElementById('save-note-btn');
const newNoteBtn = document.getElementById('new-note-btn');
const deleteNoteBtn = document.getElementById('delete-note-btn');
const notesListDiv = document.getElementById('notes-list');

function getNotes() {
    const notesJson = localStorage.getItem(LOCAL_STORAGE_KEY);
    return notesJson ? JSON.parse(notesJson) : [];
}

function saveNotes(notes) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
}

function clearForm() {
    noteContentInput.value = '';
    noteIdInput.value = '';
    deleteNoteBtn.style.display = 'none'; 
}

function loadNoteForEdit(note) {
    noteContentInput.value = note.content;
    noteIdInput.value = note.id;
    deleteNoteBtn.style.display = 'inline-block'; 
}

function handleNoteClick(noteId) {
    const notes = getNotes();
    const note = notes.find(n => n.id == noteId);

    if (note) {
        loadNoteForEdit(note);
    }
}

function createNoteElement(note) {
    const noteDiv = document.createElement('div');
    noteDiv.classList.add('note-item');
    const preview = note.content.split('\n')[0]; 
    noteDiv.textContent = preview.length > 50 ? preview.substring(0, 50) + '...' : preview;
    noteDiv.dataset.id = note.id;

    noteDiv.addEventListener('click', () => handleNoteClick(note.id));
    
    return noteDiv;
}

function renderNotesList() {
    notesListDiv.innerHTML = '';
    const notes = getNotes();

    if (notes.length === 0) {
        notesListDiv.innerHTML = '<p>Nenhuma nota cadastrada. Use o formulário acima para criar uma nova!</p>';
        return;
    }

    notes.forEach(note => {
        const noteElement = createNoteElement(note);
        notesListDiv.appendChild(noteElement);
    });
}

function saveOrUpdateNote() {
    const content = noteContentInput.value.trim();
    const noteId = noteIdInput.value;

    if (content === '') {
        alert('O conteúdo da nota não pode estar vazio.');
        return;
    }

    let notes = getNotes();

    if (noteId) {
        notes = notes.map(note => {
            if (note.id == noteId) {
                return { id: note.id, content: content };
            }
            return note;
        });
        alert('Nota atualizada com sucesso!');
    } else {
        const newNote = {
            id: Date.now(),
            content: content
        };
        notes.push(newNote);
        alert('Nota salva com sucesso!');
    }

    saveNotes(notes);
    clearForm();
    renderNotesList();
}

function deleteNote() {
    const noteId = noteIdInput.value;

    if (!noteId) {
        alert('Selecione uma nota para excluir.');
        return;
    }

    const isConfirmed = confirm('Tem certeza de que deseja excluir esta nota? Esta ação é irreversível.');

    if (isConfirmed) {
        let notes = getNotes();
        notes = notes.filter(note => note.id != noteId); 

        saveNotes(notes);
        clearForm();
        renderNotesList();
        alert('Nota excluída com sucesso!');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderNotesList(); 

    saveNoteBtn.addEventListener('click', saveOrUpdateNote);
    newNoteBtn.addEventListener('click', clearForm);
    deleteNoteBtn.addEventListener('click', deleteNote);
});