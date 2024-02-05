import React, { useState, useContext, useEffect } from 'react'
import './login.css';
import axios from 'axios';
import { AppContext } from '../App';
import { Button, Form, Input, InputNumber } from 'antd';
import { Await, useNavigate } from 'react-router-dom';

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 34,
        },
    },
};

function LoginPage() {

    const { username, setUsername, password, setPassword, setData ,setEmail,setNo ,email,no} = useContext(AppContext);
    const [ user, setUser ] = useState("");
    const [ pass, setPass ] = useState("");

    const Navigate = useNavigate(); // use navigate

    useEffect(() => {
        Get();
    }, []);

    const Get = () => {
        axios.get("http://localhost:3000/data").then((res) => {
            setData(res.data);
        });
    };


    const Add = () => {
        axios.post("http://localhost:3000/data", { username: user, password: pass ,email:email,number:no }).then(() => {
            Get();
        });
    };

    const onFinish = async () => {
        try {
            let res = await axios.get("http://localhost:3000/data");
            setData(res.data);
            
            let findData = res.data.find((values) => values.username === username && values.password === password);
    
            if (findData) {
                Navigate("/Home",{state:{email,no}});
            } else {
                console.log("error", username, password, user, pass);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    

    const signupfn = (values) => {
        setSign(!sign)
        Add()
        console.log(user, pass)
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const [ sign, setSign ] = useState(false); // signup condition

    return (
        <div className='container'>

            {sign === true ? (
                <h1>Register</h1>
            ) : (
                <h1>User login</h1>
            )
            }

            {/* ------------------------------------sign up------------------------------------ */}
            {
                sign === true ? (
                    <Form
                        {...formItemLayout}
                        style={{
                            maxWidth: 600,
                        }}
                        onFinish={signupfn}
                        onFinishFailed={onFinishFailed}
                        autoComplete="on"
                        className='signupform'
                    >
                        {/* ------------------------------------Name------------------------------------ */}
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Enter name',
                                },
                            ]}
                        >
                            <Input placeholder='Enter username' onChange={(e) => { setUser(e.target.value) }} />
                        </Form.Item>
                        {/* ------------------------------------Mail----------------------------------- */}
                        <Form.Item
                            name="Email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Enter Mail',
                                },
                            ]}
                        >
                            <Input placeholder='Enter email' onChange={(e)=>{setEmail(e.target.value)}}/>
                        </Form.Item>
                        {/* ------------------------------------create password------------------------------------ */}
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Enter password',
                                },
                            ]}
                        >
                            <Input placeholder='create password' />
                        </Form.Item>
                        {/* ------------------------------------confirm password------------------------------------ */}
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Reenter password',
                                },
                            ]}
                        >
                            <Input placeholder='confirm password' onChange={(e) => { setPass(e.target.value) }} />
                        </Form.Item>
                        {/* ------------------------------------Number------------------------------------ */}
                        <Form.Item
                            name="number"
                            rules={[
                                {
                                    required: true,
                                    message: 'Enter phone number',
                                },
                            ]}
                        >
                            <InputNumber
                                style={{
                                    width: '100%',
                                }}
                                placeholder='Enter phonenumber'
                                onChange={(e)=>{setNo(e)}}
                            />
                        </Form.Item>
                        {/* ------------------------------------Submit------------------------------------ */}
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                ) : (
                    <div className='formcont'>
                        {/* ------------------------------------form------------------------------------ */}
                        <Form
                            className='form'
                            name="form"
                            wrapperCol={{
                                span: 16,
                            }}
                            style={{
                                maxWidth: 600,
                            }}
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            {/* ------------------------------------username------------------------------------ */}
                            <Form.Item
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: false
                                    },
                                ]}
                            >
                                <Input placeholder="username" variant="filled" onChange={(e) => { setUsername(e.target.value) }} className='input' />
                            </Form.Item>

                            {/* ------------------------------------password------------------------------------ */}
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: false
                                    },
                                ]}
                            >
                                <Input.Password placeholder="password" variant="filled" onChange={(e) => { setPassword(e.target.value) }} className='input' />
                            </Form.Item>
                            {/* ------------------------------------buttons------------------------------------ */}
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    login
                                </Button>
                                <Button type="default" className='signupbtn' onClick={() => { setSign(!sign) }}>
                                    signup
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                )
            }
        </div>
    )
}

export default LoginPage;

