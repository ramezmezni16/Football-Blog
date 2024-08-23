import {useState} from "react";

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function register(ev) {
    ev.preventDefault();

    axios.post('http://localhost:4000/api/register', { username, password }, {
        headers: { 'Content-Type': 'application/json' }
      })
      .then(response => {
        if (response.status === 200) {
          alert('Registration successful');
        } else {
          throw new Error('Registration failed');
        }
      })
      .catch(error => {
        console.error('Error during registration:', error);
        alert('Registration failed');
        setError('Registration failed');
      });
    };

  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
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
      <button>Register</button>
    </form>
  );
}
