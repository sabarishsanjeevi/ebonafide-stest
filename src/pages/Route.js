import {
    DesktopOutlined, FileAddFilled,
    FileDoneOutlined,
    LockOutlined,
    LogoutOutlined, UploadOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {Layout, Menu, message} from 'antd';
import React from 'react';
import Bonafide from "./contents/Bonafide";
import Applications from "./contents/Applications";
import {Link, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {Dashboard} from "./contents/layout";
import FeeStructure from "./contents/FeeStructure";
import AdminApplications from "./Admin/Applications";
import {AdminDash} from "./Admin/AdminDash";
import PasswordChange from "./PasswordChange";
import LoginNew from "./LoginNew";
import Fetch from "./Fetch";
import Users from "./Admin/Users";
import {DeveloperDash} from "./Developer/DeveloperDash";
import Categories from "./Developer/AddCategory";
import BulkUpload from "./Developer/BulkUpload";
import UserEdit from "./Admin/UserEdit";
import {HodDash} from "./Hod/HodDash";
import HodUsers from "./Hod/Users";
import HodApplications from "./Hod/Applications";

const {Content} = Layout;


export default function RouterApp() {
    // useEffect(() => {
    //     const handleContextmenu = e => {
    //         e.preventDefault()
    //     }
    //     document.addEventListener('contextmenu', handleContextmenu)
    //     return function cleanup() {
    //         document.removeEventListener('contextmenu', handleContextmenu)
    //     }
    // }, [ ]);


    const location = useLocation();
    let user = JSON.parse(window.localStorage.getItem("data"));
    const navigate = useNavigate();
    if (!user) {
        return (
            <>
                {String(location.pathname).substring(0,6) !== '/fetch' ? <LoginNew/> : ''}
                <Routes>
                    <Route path="/fetch" element={<Fetch/>}/>
                    <Route path="/reset" element={<Fetch/>}/>
                </Routes>
            </>
        );
    } else {
        if (user["role"] === 0) {
            return (
                <Layout
                    style={{
                        height: "100%"
                    }}
                >
                        <Menu theme="dark" mode="horizontal" >
                            <Menu.Item key={0} icon={<DesktopOutlined/>}>
                                <Link to={"/dash"}>Dashboard</Link>
                            </Menu.Item>
                            <Menu.Item key={1} icon={<FileDoneOutlined/>}>
                                <Link to={"/applications"}>Applications</Link>
                            </Menu.Item>
                            <Menu.Item key={2} icon={<LockOutlined/>}>
                                <Link to={"/password_change"}>Change_Password</Link>
                            </Menu.Item>
                            <Menu.Item key={3} icon={<LogoutOutlined/>} onClick={() => {
                                window.localStorage.removeItem("data");
                                navigate('/');
                                message.info("Logged out successfully!!")
                            }}>
                                Logout
                            </Menu.Item>
                        </Menu>
                        <Content
                            style={{
                                margin: '0 16px',
                            }}
                        >
                            <div
                                className="site-layout-background"
                            >
                                <Routes>
                                    <Route path="/fetch" element={<Fetch/>} />
                                    <Route path="dash" element={<Dashboard/>} />
                                    <Route path="bonafide" element={<Bonafide/>}/>
                                    <Route path="feeStructure" element={<FeeStructure/>}/>
                                    <Route path="applications" element={<Applications/>}/>
                                    <Route path="password_change" element={<PasswordChange/>}/>
                                </Routes>
                            </div>
                        </Content>

                </Layout>
            );
        } else {
            if (user['role'] === 1) {
                return (
                    <Layout
                        style={{
                        height: "100%"
                    }}
                    >
                            <Menu theme="dark" mode="horizontal" style={{ position: 'sticky', zIndex: 1, width: '100%' }}>
                                <Menu.Item key={0} icon={<DesktopOutlined/>}>
                                    <Link to={"/Admin/dash"}>Dashboard</Link>
                                </Menu.Item>
                                <Menu.Item key={2} icon={<FileAddFilled/>}>
                                    <Link to={"/Admin/Applications"}>Applications</Link>
                                </Menu.Item>
                                <Menu.Item key={5} icon={<UserOutlined/>}>
                                    <Link to={"/Admin/Users"}>Users</Link>
                                </Menu.Item>
                                <Menu.Item key={8} icon={<LockOutlined/>}>
                                    <Link to={"/Admin/UserEdit"}>Edit Users</Link>
                                </Menu.Item>
                                <Menu.Item key={7} icon={<LockOutlined/>}>
                                    <Link to={"/password_change"}>Change_Password</Link>
                                </Menu.Item>
                                <Menu.Item key={9} icon={<LogoutOutlined/>} onClick={() => {
                                    window.localStorage.removeItem("data");
                                    navigate('/');
                                    message.info("Logged out successfully!!")
                                }}>
                                    Logout
                                </Menu.Item>
                            </Menu>
                            <Content
                                style={{
                                    margin: '0 5px',
                                }}
                            >
                                <div
                                    className="site-layout-background"
                                    style={{
                                        padding: 24,
                                        minHeight: 360,
                                    }}
                                >
                                    <Routes>
                                        <Route path="/Admin/dash" element={<AdminDash/>}/>
                                        <Route path="/Admin/Applications" element={<AdminApplications/>}/>
                                        <Route path="/Admin/Users" element={<Users/>}/>
                                        <Route path="/Admin/UserEdit" element={<UserEdit />}/>
                                        <Route path="/password_change" element={<PasswordChange />} />
                                        <Route path="/fetch" element={<Fetch/>}/>
                                    </Routes>
                                </div>
                            </Content>

                    </Layout>
                );
            } else {
                if(user['role'] === 2){
                    return (
                        <Layout
                            style={{
                                height: "100%"
                            }}
                        >
                                <Menu theme="dark" mode="horizontal" >
                                    <Menu.Item key={0} icon={<DesktopOutlined/>}>
                                        <Link to={"/Developer/dash"}>Dashboard</Link>
                                    </Menu.Item>
                                    <Menu.Item key={1} icon={<FileAddFilled/>}>
                                        <Link to={"/Categories"}>Categories</Link>
                                    </Menu.Item>
                                    <Menu.Item key={2} icon={<UploadOutlined/>}>
                                        <Link to={"/bulkUpload"}>Bulk Upload</Link>
                                    </Menu.Item>
                                    <Menu.Item key={3} icon={<UserOutlined/>}>
                                        <Link to={"/Developer/Users"}>Users</Link>
                                    </Menu.Item>
                                    <Menu.Item key={4} icon={<LogoutOutlined/>} onClick={() => {
                                        window.localStorage.removeItem("data");
                                        navigate('/');
                                        message.info("Logged out successfully!!")
                                    }}>
                                        Logout
                                    </Menu.Item>
                                </Menu>

                                <Content
                                    style={{
                                        margin: '0 16px',
                                    }}
                                >
                                    <div
                                        className="site-layout-background"
                                        style={{
                                            padding: 24,
                                            minHeight: 360,
                                        }}
                                    >
                                        <Routes>
                                            <Route path="/Developer/dash" element={<DeveloperDash/>}/>
                                            <Route path="/Developer/Users" element={<Users/>}/>
                                            <Route path="/Categories" element={<Categories />} />
                                            <Route path="/bulkUpload" element={<BulkUpload/>} />
                                            <Route path="/fetch" element={<Fetch/>}/>
                                        </Routes>
                                    </div>
                                </Content>

                        </Layout>
                    )
                }else{
                    if (user['role'] === 3) {
                        return (
                            <Layout
                                style={{
                                    height: "100%"
                                }}
                            >
                                <Menu theme="dark" mode="horizontal"
                                      style={{position: 'sticky', zIndex: 1, width: '100%'}}>
                                    <Menu.Item key={0} icon={<DesktopOutlined/>}>
                                        <Link to={"/Hod/dash"}>Dashboard</Link>
                                    </Menu.Item>
                                    <Menu.Item key={2} icon={<FileAddFilled/>}>
                                        <Link to={"/Hod/Applications"}>Applications</Link>
                                    </Menu.Item>
                                    <Menu.Item key={5} icon={<UserOutlined/>}>
                                        <Link to={"/Hod/Users"}>Users</Link>
                                    </Menu.Item>
                                    <Menu.Item key={7} icon={<LockOutlined/>}>
                                        <Link to={"/password_change"}>Change_Password</Link>
                                    </Menu.Item>
                                    <Menu.Item key={9} icon={<LogoutOutlined/>} onClick={() => {
                                        window.localStorage.removeItem("data");
                                        navigate('/');
                                        message.info("Logged out successfully!!")
                                    }}>
                                        Logout
                                    </Menu.Item>
                                </Menu>
                                <Content
                                    style={{
                                        margin: '0 5px',
                                    }}
                                >
                                    <div
                                        className="site-layout-background"
                                        style={{
                                            padding: 24,
                                            minHeight: 360,
                                        }}
                                    >
                                        <Routes>
                                            <Route path="/Hod/dash" element={<HodDash/>}/>
                                            <Route path="/Hod/Applications" element={<HodApplications/>}/>
                                            <Route path="/Hod/Users" element={<HodUsers/>}/>
                                            <Route path="/password_change" element={<PasswordChange/>}/>
                                            <Route path="/fetch" element={<Fetch/>}/>
                                        </Routes>
                                    </div>
                                </Content>

                            </Layout>
                        );
                    }else {
                        return (
                            <Routes>
                                <Route path="logins" element={<LoginNew/>}/>
                                <Route path="fetch" element={<Fetch/>}/>
                            </Routes>
                        );
                    }
                }
            }
        }
    }
};
