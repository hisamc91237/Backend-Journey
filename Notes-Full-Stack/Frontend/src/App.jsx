import { useState, useEffect, useRef } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);

  const titleRef = useRef();

  function fetchNotes() {
    axios.get("http://localhost:3000/api/notes").then((res) => {
      setNotes(res.data.notes);
    });
  }

  function submitForm(e) {
    e.preventDefault();

    const { title, description } = e.target.elements;

    axios
      .post("http://localhost:3000/api/notes", {
        title: title.value,
        description: description.value,
      })
      .then((res) => {
        console.log(res.data);
        fetchNotes();
      });
  }

  function handleDeleteNote(noteID) {
    console.log(noteID);
    axios.delete("http://localhost:3000/api/notes/" + noteID).then((res) => {
      console.log(res.data);
      fetchNotes();
    });
  }

  function handleNoteUpdate(noteID) {
    axios
      .patch("http://localhost:3000/api/notes/" + noteID, {
        title: titleRef.current.value,
      })
      .then((res) => {
        console.log(res.data);
        fetchNotes();
      });
  }

  function handleEdit(note) {
    titleRef.current.value = note.title;
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <>
      <div className="notes">
        {notes.map((note) => {
          return (
            <div className="note">
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <button
                className="btn-margin"
                onClick={() => {
                  handleNoteUpdate(note._id);
                }}
              >
                Update
              </button>
              <button
                onClick={() => {
                  handleEdit(note);
                }}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  handleDeleteNote(note._id);
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
      <form className="note-form" onSubmit={submitForm}>
        <input
          ref={titleRef}
          name="title"
          type="text"
          placeholder="enter title"
        />
        <input name="description" type="text" placeholder="enter description" />
        <button>Create Note</button>
      </form>
    </>
  );
}

export default App;
