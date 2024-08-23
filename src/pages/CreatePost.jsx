import 'react-quill/dist/quill.snow.css';
import {useState} from "react";
import {Navigate} from "react-router-dom";
import Editor from "../Editor";
import axios from 'axios';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);

  function createNewPost(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files[0]);

    axios.post('http://localhost:4000/api/post/', data {
      withCredentials: true,
    })
      .then(response => {
        if (response.ok) {
          setRedirect(true);
        }
      })
      .catch(error => {
        console.error('Error creating post:', error);
        const errorResponse = error.response?.data?.errors || {};
        const errorArr = Object.values(errorResponse).map(err => err.message);
        setError(errorArr);
      });
    };
  
    if (redirect) {
      return <Navigate to='/' />;
    }

  return (
    <form onSubmit={createNewPost}>
      <input type="title"
             placeholder="Title"
             value={title}
             onChange={ev => setTitle(ev.target.value)} />
      <input type="summary"
             placeholder="Summary"
             value={summary}
             onChange={ev => setSummary(ev.target.value)} />
      <input type="file"
             onChange={ev => setFiles(ev.target.files)} />
      <Editor value={content} onChange={setContent} />
      <button style={{marginTop:'5px'}}>Create post</button>
    </form>
  );
}