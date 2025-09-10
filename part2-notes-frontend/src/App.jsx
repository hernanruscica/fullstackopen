import { useState, useEffect } from 'react'
import Note from './components/Note'
import ServiceNotes from './services/ServiceNotes';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewnote] = useState('A new note ...');
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    ServiceNotes.GetAll().then((allNotes) => {
      setNotes(allNotes);
    })
   }, []);  

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      id: String(notes.length + 1),
      content: newNote,
      important: Math.random() < 0.5,
    };
   // console.log(noteObject);
    ServiceNotes.Create(noteObject).then((newNote) => {
      setNotes(notes.concat(newNote));
      setNewnote('');      
    })
  }
  const handleNoteChange = (event) => {
    //console.log(event.target.value);
    setNewnote(event.target.value);
  }

  const handleChangeImportant = (noteId) => {    
    const currentNote = notes.find(note => note.id === noteId) || null;    
    const updatedNote = {...currentNote, important: !currentNote?.important}
    //console.log('currentNote', currentNote);
    //console.log('updatedNote', updatedNote);

    ServiceNotes.Update(updatedNote, noteId).then(updatedNote => {
      //maps the notes array, if note.id is noteId, inserts response.data, if isnt left the same note item
      const updatedNotes = notes.map(note => note.id === noteId ? updatedNote : note)      
      setNotes(updatedNotes);
    }).catch(error => {
      alert(`Error updating note con id: ${noteId}. \nERROR: ${error.response.data}`);
      setNotes(notes.filter(note => note.id !== noteId));
      console.log('error', error);
    })
  }

  const notesToShow = showAll 
    ? notes
    : notes.filter(n => n.important === true);

    //console.log(showAll, notesToShow);
    

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => {setShowAll(!showAll)}}>
          show { showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} toggleImportant={() => handleChangeImportant(note.id)}/>
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input type="text"
               value={newNote} 
               onChange={handleNoteChange}/>
        <button type="submit">
          save
        </button>
      </form>
    </div>
  )
}

export default App