import React, { useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { Link, Navigate, useNavigate } from "react-router-dom";
import Divider from '../../components/Divider';
import { RegisterUser } from '../../apicalls/users';

const rules = [
    {
        required: true,
        message: 'Required'
    }
]
function Register() {
    const navigate = useNavigate();
    const onFinish = async (values) => {
        try {
            const response = await RegisterUser(values);
            if (response.success) {
                message.success(response.message);
            } else {
                message.error(response.message);
            }
        } catch (error) {
            message.error(error.message)
        }
    }
    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/');
        }
    }, []);
    return (
        <div className='h-screen bg-primary flex justify-center items-center'>
            <div className='bg-white p-5 rounded w-[450px]'>
                <h1 className='text-primary text-center text-3xl mb-3 mt-2'>VIT Marketplace</h1>
                <Divider />
                <h2 className='text-gray-500 my-2'>Create Account</h2>
                <Form layout='vertical' onFinish={onFinish}>
                    <Form.Item label='Name' name='name' rules={rules}>
                        <Input placeholder='Name' />
                    </Form.Item>
                    <Form.Item label='Email' name='email' rules={rules}>
                        <Input placeholder='Email' />
                    </Form.Item>
                    <Form.Item label='Password' name='password' rules={rules}>
                        <Input type='password' placeholder='Password' />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Register
                    </Button>
                    <div className='mt-5 text-center'>
                        <span className='text-gray-500'>
                            Already have an account? <Link to="/login" className='text-primary'>Login</Link>
                        </span>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Register