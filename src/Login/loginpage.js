import React, { useState, useContext } from 'react';
import './login.css';
import axios from 'axios';
import { AppContext } from '../App';
import { Button, Form, Input, InputNumber } from 'antd';
import { useNavigate } from 'react-router-dom';
// ------------------------------------form layout-----------------------------------
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

function LoginPage() {
  const { fetchData , username, password, setUsername, setPassword, setData, setEmail, setNo, email, no } = useContext(AppContext);  // useContext
  const Navigate = useNavigate(); // use navigate
  const [user, setUser] = useState(""); // signup username
  const [pass, setPass] = useState(""); // signup password
    // --------------------------------------------posting signup data-------------------------------------------
  const Add = () => {
    axios.post("http://localhost:3000/data", { username: user, password: pass, email: email, number: no }).then(() => {
      fetchData();
    });
  };
    // --------------------------------------------Login submit-------------------------------------------
  const onFinish = async (e) => {
    try {
      let res = await axios.get("http://localhost:3000/data");
      setData(res.data);

      let findData = res.data.find((values) => values.username === username && values.password === password);

      if (findData) {
        Navigate("/Home");
      } else {
        console.log("error", username, password, user, pass);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
    // --------------------------------------------signup submit-------------------------------------------
  const signupfn = () => {
    setSign(!sign)
    Add()
  }
    // --------------------------------------------Login failed-------------------------------------------
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const [sign, setSign] = useState(false); // signup condition

  return (
    <div className='container'>
      {sign === true ? (
        <h1>Register</h1>
      ) : (
        <h1>User login</h1>
      )}
      {sign === true ? (
            // --------------------------------------------signup form-------------------------------------------
        <Form
          {...formItemLayout}
          style={{ maxWidth: 600 }}
          onFinish={signupfn}
          onFinishFailed={onFinishFailed}
          autoComplete="on"
          className='signupform'
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Enter name' }]}
          >
            <Input placeholder='Enter username' onChange={(e) => { setUser(e.target.value) }} />
          </Form.Item>
          <Form.Item
            name="Email"
            rules={[{ required: true, message: 'Enter Mail' }]}
          >
            <Input placeholder='Enter email' onChange={(e) => { setEmail(e.target.value) }} />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Enter password' }]}
          >
            <Input placeholder='create password' />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Reenter password' }]}
          >
            <Input placeholder='confirm password' onChange={(e) => { setPass(e.target.value) }} />
          </Form.Item>
          <Form.Item
            name="number"
            rules={[{ required: true, message: 'Enter phone number' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              placeholder='Enter phonenumber'
              onChange={(e) => { setNo(e) }}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      ) : (
            // --------------------------------------------Login form-------------------------------------------
        <div className='formcont'>
          <Form
            className='form'
            name="form"
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: false }]}
            >
              <Input placeholder="username" variant="filled" onChange={(e) => { setUsername(e.target.value) }} className='input' />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: false }]}
            >
              <Input.Password placeholder="password" variant="filled" onChange={(e) => { setPassword(e.target.value) }} className='input' />
            </Form.Item>
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
      )}
    </div>
  );
}

export default LoginPage;
