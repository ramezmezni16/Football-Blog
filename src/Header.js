import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "./UserContext";
import axios from 'axios';


export default function Header() {
  const {setUserInfo,userInfo} = useContext(UserContext);
  useEffect(() => {
    axios.get('http://localhost:4000/profile', {
      withCredentials: true
    })
    .then(response => {
      setUserInfo(response.data);
    })
    .catch(error => {
      console.error('Error fetching profile:', error);
    });
  }, []);

  const logout = () => {
    axios.post('http://localhost:4000/logout', {}, {
      withCredentials: true
    })
    .then(() => {
      setUserInfo(null);
    })
    .catch(error => {
      console.error('Error during logout:', error);
    });
  };

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">MyBlog</Link>
      <nav>
        {username && (
          <>
            <Link to="/create">Create new post</Link>
            <a onClick={logout}>Logout ({username})</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}