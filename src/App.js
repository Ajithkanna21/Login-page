// App.js
import './App.css';
import { createContext, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home/Home';
import LoginPage from './Login/loginpage';
import axios from 'axios';
import Content from './Content/Content';
import Nav from './Navigation/Nav';

export const AppContext = createContext(null);

function App() {
  const [data, setData] = useState([]);  // all user datas
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [no, setNo] = useState('');
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/data");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const addUser = () => {
    axios.post("http://localhost:3000/data", { username, password, email, number: no })  // login user
      .then(() => fetchData())
      .catch(error => console.error("Error adding user:", error));
  };

  return (
    <AppContext.Provider value={{ username, setUsername, password, setPassword, email, setEmail, no, setNo, addUser, fetchData, setData, data }}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Content" element={<Content />} />
            <Route path="/Content" element={<Nav />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AppContext.Provider>
  );
}

export default App;
