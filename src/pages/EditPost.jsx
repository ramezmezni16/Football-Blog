import {useEffect, useState} from "react";
import {Navigate, useParams} from "react-router-dom";
import Editor from "../Editor";
import axios from 'axios';

export default function EditPost() {
  const {id} = useParams();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch('http://localhost:4000/post/' + id)
      .then(response => {
        return response.json();
      })
      .then(postInfo => {
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
      })
      .catch(error => {
        console.error('Error fetching post data:', error);
      });
  }, [id]);

  function updatePost(ev) {
    ev.preventDefault();
    
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('id', id);

    if (files?.[0]) {
      data.set('file', files?.[0]);
    }

    axios.put(`http://localhost:4000/api/post/${id}`, data, {
      withCredentials: true,
    })
    .then(response => {
      if (response.status === 200) {
        setRedirect(true);
      }
    })
    .catch(error => {
      console.error('Error updating post:', error);
      const errorResponse = error.response?.data?.errors || {};
      const errorArr = Object.values(errorResponse).map(err => err.message);
      setError(errorArr);
    });
  };

  if (redirect) {
    return <Navigate to={`/post/${id}`} />;
  }

  return (
    <form onSubmit={updatePost}>
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
      <Editor onChange={setContent} value={content} />
      <button style={{marginTop:'5px'}}>Update post</button>
    </form>
  );
}