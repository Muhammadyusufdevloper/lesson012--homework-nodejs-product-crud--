import { Button, Form, Input, Radio } from 'antd';
import { Link } from 'react-router-dom';

const AntRegister = () => {
    
    const handelSignUp = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className='bg-[#f0f2f5] p-4 pb-3 rounded'>
            <h1 className='text-xl font-bold mb-4 text-center'>Register</h1>

            <Form
                className='w-[450px]'
                name="basic"
                layout="vertical"
                initialValues={{
                    remember: true,
                }}
                onFinish={handelSignUp}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="First name"
                    name="fname"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your First name!',
                        },
                    ]}
                >
                    <Input placeholder='Enter your First name' />
                </Form.Item>
                <Form.Item
                    label="Last name"
                    name="lname"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Last name!',
                        },
                    ]}
                >
                    <Input placeholder='Enter your Last name' />
                </Form.Item>
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input placeholder='Enter your username' />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password placeholder='Enter your password' />
                </Form.Item>
                <Radio.Group name="radiogroup" defaultValue={1}>
                    <Radio rules={[
                        {
                            required: true,
                            message: 'Please input your gander!',
                        },
                    ]} value={"male"}>Male</Radio>
                    <Radio rules={[
                        {
                            required: true,
                            message: 'Please input your gander!',
                        },
                    ]} value={"female"}>Female</Radio>
                </Radio.Group>

                <Form.Item>
                    <Button className='w-full mt-4' type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>

            </Form>
            <p className='text-sm text-center text-gray-600'>Don{"'"}t have an account? <Link to="/login" className='text-blue-600'>Login</Link></p>
        </div>
    );
}
export default AntRegister;