import React from 'react'
import Nav from '../Navigation/Nav'
import './Home.css'
import Sidebar from '../Sidebar/Sidebar'
import Content from '../Content/Content'

function Home() {
    return (
        <div className='home'>
            <Nav />
            <div className='homecontent'>
                <Sidebar/>
                <Content/>
            </div>
        </div>
    )
}

export default Home