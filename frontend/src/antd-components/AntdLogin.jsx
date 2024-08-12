import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useSignInMutation } from '../context/api/userApi';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setToken } from '../context/slices/authSlice';

const AntLogin = () => {
    const [signUser, { data, isSuccess, error }] = useSignInMutation()
    const navigate = useNavigate()
    let dispatch = useDispatch()
    console.log(data);
    console.log(data);

    useEffect(() => {
        if (isSuccess) {
            dispatch(setToken(data?.payload))
            navigate('/')
        }
    }, [isSuccess])
    console.log(error);

    const handelSubmit = (values) => {
        signUser(values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className='p-4 pb-3 rounded-lg shadow border bg-gray-800 border-gray-700'>
            <h1 className='text-2xl font-bold leading-tight tracking-tight text-white mb-8'>Sign in to your account</h1>
            <Form
                className='w-[400px]'
                name="basic"
                layout="vertical"
                initialValues={{
                    remember: true,
                }}
                onFinish={handelSubmit}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <label className='text-sm font-medium text-white' htmlFor="username">Username</label>
                <Form.Item
                    className='mb-8 mt-1'
                    name="username"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input className='border flex items-center rounded-lg focus:ring-primary-600 focus:border-primary-600  w-full p-2.5  bg-gray-700  border-gray-600  placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500' placeholder='Enter your username' />
                </Form.Item>
                <label className='text-sm font-medium text-white' htmlFor="password">Password</label>
                <Form.Item
                    name="password"
                    className='mt-1'
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input.Password className='border flex items-center rounded-lg focus:ring-primary-600 focus:border-primary-600  w-full p-2.5  bg-gray-700  border-gray-600  placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500' placeholder='Enter your password' />
                </Form.Item>

                <Form.Item>
                    <Button className='w-full mt-4 py-4' type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
            <p className='text-sm text-center text-gray-600'>Don{"'"}t have an account? <Link to="/register" className='text-blue-600'>Register</Link></p>
        </div>
    )
};
export default AntLogin;