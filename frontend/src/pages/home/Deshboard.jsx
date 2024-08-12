import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { FaRegUserCircle } from "react-icons/fa";
import { useGetProfileQuery } from '../../context/api/userApi';
import { MdLogout } from "react-icons/md";
import { logout } from '../../context/slices/authSlice';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

const { Header, Content, Sider } = Layout;

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data: profileData, isLoading } = useGetProfileQuery();
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const handleMenuClick = (key) => {
        if (key === '1') {
            navigate('/blogs');
        } else if (key === '2' && profileData?.payload?.role === 'owner') {
            navigate('/create');
        }
    };

    const menuItems = [];
    if (profileData?.payload?.role === 'owner' || profileData?.payload?.role === 'user') {
        menuItems.push({ key: '1', label: 'Blogs' });
    }
    if (profileData?.payload?.role === 'owner') {
        menuItems.push({ key: '2', label: 'Blog Create' });
    }

    return (
        <Layout style={{ position: 'relative' }}>
            <Header className='sticky top-0 left-0 z-[99999999999999] flex items-center justify-between'>
                <div className='flex items-center text-white'>
                    <FaRegUserCircle className="text-3xl" />
                    <span className="ml-2">{profileData?.payload?.username}</span>
                </div>
                <button className="text-white ml-4 font-bold text-2xl" onClick={() => dispatch(logout())}>
                    <MdLogout />
                </button>
            </Header>
            <Layout>
                <Sider
                    className='min-h-[calc(100vh - 40px)] sticky top-0 left-0 z-10'
                    width={200}
                    style={{ background: colorBgContainer }}
                >
                    <Menu
                        mode="inline"
                        className='h-full border-r-none mt-5'
                        onClick={({ key }) => handleMenuClick(key)}
                        items={menuItems}
                    />
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default Dashboard;
