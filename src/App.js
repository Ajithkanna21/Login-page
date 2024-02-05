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
  const [data, setData] = useState([]);
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);
  const [email,setEmail] = useState([])
  const [no,setNo] = useState([])
  const [editid, seteditid] = useState(null);
  const [editval, seteditval] = useState({});
  const [editname, seteditname] = useState("");
  const [editpass, seteditpass] = useState("");
  
  useEffect(() => {
    Get();
  }, []);

  const Get = () => {
    axios.get("http://localhost:3000/data").then((res) => {
      setData(res.data);
      // console.log(data);
    });
  };

  const Add = () => {
    axios.post("http://localhost:3000/data", { username: username, password: password}).then(() => {
      Get();
      console.log(username);
    });
    // setUsername("");
    // setPassword("");
  };

  const Delete = (id) => {
    axios.delete(`http://localhost:3000/data/${id}`).then(() => { 
      Get();
    });
  };

  const Edit = (id, username, password) => {
    seteditid(id);
    seteditval({ ...editval, username: username, password: password });
    // console.log(editval)
  };

  const Save = (id) => {
    axios.put(`http://localhost:3000/Students/${id}`, { username: editname, password: editpass });
    Get();
    seteditid(null);
  };

  return (
    <AppContext.Provider value={{ username,setUsername,password,setPassword,Add,Get,setData,setEmail,email,setNo,no}}>
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
