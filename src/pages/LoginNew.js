import {
    Avatar,
    Button,
    Card,
    Carousel,
    Checkbox,
    Col,
    Form,
    Image,
    Input,
    Layout,
    message,
    Modal,
    Row,
    Typography
} from "antd";
import {ArrowRightOutlined, LockOutlined, MailOutlined, UserOutlined} from "@ant-design/icons";
import {Content} from "antd/lib/layout/layout";
import CollegeLogo from './logo.a4b50d03.png';
import Image1 from './story-tel.c65ad01c.svg';
import Finger from './finger.svg';
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import config from '../config.json';

const {Text, Title} = Typography;
const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#0070CB',
};


export default function LoginNew() {
    let navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    useEffect(()=>{
        document.title = "Login - eBonafide Application"
    })

    const onFinish = (values) => {
        axios.post(`${config.serverURL}/login`, {
            "username": values.username,
            "password": values.password
        }).then(res => {
            if (res.data.status === 0) {
                message.error(res.data.message);
            } else {
                message.success(res.data.message);
                window.localStorage.setItem("data", JSON.stringify(res.data.data));
                window.localStorage.setItem("details", JSON.stringify(res.data.details));
                if (res.data.data["role"] === 0) {
                    navigate('/dash');
                } else {
                    if(res.data.data["role"] === 1){
                        navigate('/Admin/dash');
                    }else{
                        if(res.data.data["role"] === 2) {
                            navigate('/Developer/dash');
                        }else{
                            if(res.data.data["role"] === 3) {
                                navigate('/Hod/dash');
                            }
                        }
                    }
                }
            }
        });
    };

    const onFinishFailed = (errorInfo) => {
        
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <Layout>
            <Layout className="site-layout mainpage">

                <div>
                        <span style={{marginLeft: 80}}><img src={CollegeLogo} style={{height: 50, width:100}}/> </span>
                        <span>{"MKCE"} </span>
                </div>

                <Content
                    className="site-layout-background"
                    style={{
                        margin: '-20px 24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    <Card className="topimage" bordered={false} style={{width: "100%"}}>
                        <Row justify="center" align="middle" gutter={[16, 16]}
                             style={{marginTop: "2%", marginBottom: "2%"}}>
                            <Col md={14} lg={14} style={{textAlign: "justify", paddingLeft: "5%"}}>
                                <Title level={4}>
                                    <Avatar size={30} src={Finger}/> {"Bonafide and Fee Structure Request Portal"}
                                </Title>

                                <Title level={1}>
                                    {"eBonafide Portal"}
                                </Title>

                                <Text style={{fontSize: "16px", color: 'black'}}> {"An bonafide portal for students"}</Text>
                                <br/>
                                <br/>
                                <br/>
                                <Button type="primary" icon={<ArrowRightOutlined/>} size="large" onClick={showModal}>Login</Button>
                            </Col>

                            <Col md={10} lg={10} align="middle">
                                <Image
                                    preview={false}
                                    width={"auto"}
                                    src={Image1}
                                />
                            </Col>
                        </Row>
                    </Card>
                </Content>

                <Content
                    className="site-layout-background"
                    style={{
                        margin: '0px 24px 6px',
                        padding: 24,
                    }}
                >
                    <Carousel autoplay={true}>
                        {
                            <>
                                <div key={0}><h3
                                    style={contentStyle}>{"Please collect all your Accepted applications on Office"}</h3>
                                </div>
                            </>
                        }
                    </Carousel>
                </Content>
            </Layout>
            <Modal
                title="LOGIN"
                centered={true}
                width="auto"
                open={open}
                footer={null}
                closable={true}
                onCancel={handleCancel}
            >
                <Card bordered={true} style={{width: "auto", textAlign: "left"}}>
                    <Form
                        name="basic"
                        labelCol={{span: 0}}
                        wrapperCol={{span: 24}}
                        initialValues={{remember: true}}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="on"
                    >
                        <Form.Item
                            name="username"
                            rules={[{required: true, message: 'Please input your username!'}]}
                        >
                            <Input placeholder="Aadhar Number" prefix={<UserOutlined/>}/>
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{required: true, message: 'Please input your password!'}]}
                        >
                            <Input.Password placeholder="Password" prefix={<LockOutlined/>} visibilityToggle={true}/>
                        </Form.Item>

                        <Form.Item name="remember" valuePropName="checked" wrapperCol={{offset: 4, span: 16}}>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item wrapperCol={{offset: 4, span: 16}}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                    <p>Your username is Aadhar Number<span style={{color: "red"}}>*</span></p>
                    <p>Your password is your Register Number <span style={{color: "red"}}>(All Caps)</span></p>
                    <p>If the credentials are wrong please contact Class Advisor</p>
                </Card>
            </Modal>
        </Layout>
    )
}