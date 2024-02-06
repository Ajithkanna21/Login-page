import React, { useContext, useState, useEffect } from 'react';
import './Content.css';
import { AppContext } from '../App';
import { PlusCircleTwoTone, CheckOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Input, List, message} from 'antd';
import axios from 'axios';

function Content() {
    const { username, password, fetchData, data } = useContext(AppContext); //useContext
    const bla = data.find(v => v.username === username && v.password === password); // Logined user data
    const [ inputValue, setInputValue ] = useState('');
    const [ list, setList ] = useState([]);
    const [ cl, setCl ] = useState([]);
    const [ h, setH ] = useState([]);
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}|${currentDate.getMonth() + 1}|${currentDate.getFullYear()}`;  //current date
    const previousDate = `${currentDate.getDate() - 1}|${currentDate.getMonth() + 1}|${currentDate.getFullYear()}`;  //previous date

    useEffect(() => {
        // Fetch the complete data associated with the user upon login
        axios.get(`http://localhost:3000/data/${bla.id}`)
            .then(response => {
                const { complete } = response.data; // Assuming the complete data is stored in 'complete' property
                const d = complete.map(i => i)
                const c = d.filter(i => i.date === formattedDate)
                setCl(c || []); // Update the completed list state with the fetched data
                const { todo } = response.data; // Assuming the complete data is stored in 'complete' property
                setList(todo || []); // Update the todo list state with the fetched data
                const f = d.filter(i => i.date === previousDate)
                setH(f || []); // Update the todo list state with the fetched data
            })
            .catch(error => {
                console.error('Error fetching complete data:', error);
            });
    }, [ bla.id ]); // Fetch data whenever bla.id changes (i.e., when the user logs in)
    // --------------------------------------------Add box-------------------------------------------
    const handleAddClick = () => {
        const newTodo = {
            id: list.length > 0 ? list[ list.length - 1 ].id + 1 : 1,
            todo: inputValue,
            date: formattedDate
        };
        axios.put(`http://localhost:3000/data/${bla.id}`, { ...bla, todo: [ ...list, newTodo ] }).then(() => fetchData());
        setList([ ...list, newTodo ]);
        setInputValue('');
        message.success('successfully added');
    };
    // --------------------------------------------Check btn-------------------------------------------
    const checkBtn = (index) => {
        const selectedTodo = list[ index ];
        axios.put(`http://localhost:3000/data/${bla.id}`, {
            ...bla,
            todo: list.filter((_, i) => i !== index),
            complete: [ ...cl, selectedTodo ]
        }).then(() => fetchData());
        setCl([ ...cl, selectedTodo ]);
        setList(prevList => prevList.filter((_, i) => i !== index));
    }

    return (
        <div className='boxcont'>
            <div className="addbtn">
                <Popconfirm
                    placement="topLeft"
                    title={<Input placeholder="Enter something" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />}
                    description=''
                    okText='yes'
                    cancelText="no"
                    onConfirm={handleAddClick}
                >
                    <Button type="primary" className='btn' shape="" icon={<PlusCircleTwoTone />} size="large">Add</Button>
                </Popconfirm>
            </div>
            <div className='content'>
                <div className='d'>
                    <h3>History</h3>
                    <List
                        size="small"
                        dataSource={h}
                        renderItem={(item, i) => (
                            <List.Item key={i} className='Il'>
                                <div className='list'>
                                    <span className='Hd'>{item.todo}</span>
                                    <span className='Hd'>{item.date}</span>
                                </div>
                            </List.Item>
                        )}
                    />
                </div>
                <div className='d'>
                    <h3>Todo</h3>
                    <List
                        size="small"
                        dataSource={list}
                        renderItem={(item, i) => (
                            <List.Item key={i}>
                                <div className='list'>
                                    <span>{item.todo}</span>
                                    <span className='date'>{item.date}</span>
                                    <Button size='small' onClick={() => checkBtn(i)} icon={<CheckOutlined />}></Button>
                                </div>
                            </List.Item>
                        )}
                    />
                </div>
                <div className='d'>
                    <h3>Complete</h3>
                    <List
                        className='c'
                        size="small"
                        dataSource={cl}
                        renderItem={(item, i) => (
                            <List.Item key={i} >
                                <div className='list'>
                                    <span>{item.todo}</span>
                                    <span>{item.date}</span>
                                </div>
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        </div>
    );
}

export default Content;
