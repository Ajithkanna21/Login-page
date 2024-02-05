import React, { useContext, useState } from 'react';
import './Content.css';
// import {AppContext} from '../App';
import { PlusCircleTwoTone, CheckOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Input, List, } from 'antd';

function Content() {

    const [ inputValue, setInputValue ] = useState('');
    const [ list, setList ] = useState([]);
    const [ cl, setCl ] = useState([]);
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}|${currentDate.getMonth() + 1}|${currentDate.getFullYear()}`;

    const handleAddClick = () => {
        const newTodo = {
            todo: inputValue,
            date: formattedDate
        };
        setList([ ...list, newTodo ]);
        setInputValue('');
    };

    const checkBtn = (index) => {
        const select = list[ index ];
        setCl([ ...cl, select ])
        setList(prevList => prevList.filter((_, i) => i !== index));
    }
    // const { Add } = useContext(AppContext);

    return (
        <div className='boxcont'>
            {/* ------------------------------------ Add button ------------------------------------ */}
            <div className="addbtn">
                <Popconfirm
                    placement="topLeft"
                    title={<Input placeholder="Enter something" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />}
                    description=''
                    okText='ok'
                    cancelText="cancel"
                    onConfirm={handleAddClick}
                >
                    <Button type="primary" className='btn' shape="" icon={<PlusCircleTwoTone />} size="large">Add</Button>
                </Popconfirm>
            </div>

            {/* ------------------------------------ Containers ------------------------------------ */}
            <div className='content'>
                <div className='d'>
                    <h3>History</h3>
                </div>
                <div className='d'>
                    <h3>Todo</h3>
                    <List
                        size="small"
                        // bordered
                        dataSource={list}
                        renderItem={(item, i) => (
                            <List.Item>
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
                        size="small"
                        dataSource={cl}
                        renderItem={(item, i) => (
                            <List.Item>
                                <div className='list c' key={i}>
                                    <span>{item.todo}</span>
                                    <span className=''>{item.date}</span>
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
