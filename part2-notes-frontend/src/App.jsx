import { useState, useEffect } from 'react'
import Note from './components/Note'
import axios from 'axios';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewnote] = useState('A new note ...');
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    console.log('useEffect');
    axios.get('http://localhost:3001/notes')
         .then(response => {
           console.log("promised fullfiled");
           setNotes(response.data);
         });    
  }, []);
  console.log('render', notes.length, 'notes');

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      id: String(notes.length + 1),
      content: newNote,
      important: Math.random() < 0.5,
    };
   // console.log(noteObject);
    
    setNotes(notes.concat(noteObject));
    setNewnote('');
  }
  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewnote(event.target.value);
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
          <Note key={note.id} note={note} />
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