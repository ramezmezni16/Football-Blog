import {useContext, useState} from "react";
import {Navigate} from "react-router-dom";
import {UserContext} from "../UserContext";

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const {setUserInfo} = useContext(UserContext);

  function login(ev) {
    ev.preventDefault();

    axios.post('http://localhost:4000/api/login', { username, password }, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    })
    .then(response => {
      if (response.status === 200) {
        setUserInfo(response.data);
        setRedirect(true);
      } else {
        throw new Error('Login failed');
      }
    })
    .catch(error => {
      console.error('Error during login:', error);
      setError('Wrong credentials');
    });
  };

  if (redirect) {
    return <Navigate to='/' />;
  }

  return (
    <form className="login" onSubmit={login}>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={ev => setUsername(ev.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={ev => setPassword(ev.target.value)}
      />
      <button>Login</button>
    </form>
  );
}
