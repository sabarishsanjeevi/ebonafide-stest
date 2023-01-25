import {Button, Card, Form, Input, Layout, message} from "antd";
import {LockOutlined} from "@ant-design/icons";
import React, {useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import config from '../config.json';


export default function PasswordChange() {
    let data = JSON.parse(window.localStorage.getItem("data"));
    let navigate = useNavigate();

    useEffect(()=>{
        document.title = "Change Password - eBonafide portal"
    });

    const onFinish = (values) => {
        if (values.password === values.confirm_password) {
            axios.post(`${config.serverURL}/change`, {
                "aadhar_no": data["aadhar_no"],
                "password": values.password
            }).then(res => {
                
                message.success("Password changed successfully!!");
                if (data["role"] === 0) {
                    navigate('/dash');
                } else {
                    navigate('/Admin/dash');
                }
            });
        } else {
            message.error("Password Mis-matched");
        }
    };

    return (
        <Layout style={{textAlign: "center"}}>
            <Card bordered={true} style={{marginTop: 60, flex: true}}>
                <Form
                    name="basic"
                    labelCol={{span: 0}}
                    wrapperCol={{span: 24}}
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        name="password"
                        rules={[{required: true, message: 'Please input your password!'}]}
                    >
                        <Input.Password placeholder="Password" prefix={<LockOutlined/>} visibilityToggle={false}/>
                    </Form.Item>

                    <Form.Item
                        name="confirm_password"
                        rules={[{required: true, message: 'Please confirm your password!'}]}
                    >
                        <Input.Password placeholder="Confirm Password" prefix={<LockOutlined/>}
                                        visibilityToggle={false}/>
                    </Form.Item>

                    <Form.Item wrapperCol={{offset: 4, span: 16}}>
                        <Button type="primary" htmlType="submit">
                            Change
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </Layout>
    )
}