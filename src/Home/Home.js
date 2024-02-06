// Home.js
import React, { useEffect ,useContext } from 'react';
import Nav from '../Navigation/Nav';
import './Home.css';
import Sidebar from '../Sidebar/Sidebar';
import Content from '../Content/Content';
import axios from 'axios';
import { AppContext } from '../App';

function Home() {
    const { setData } = useContext(AppContext);  // usecontext
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
    return (
        <div className='home'>
            <Nav/>
            <div className='homecontent'>
                <Sidebar/>
                <Content/>
            </div>
        </div>
    );
}

export default Home;
