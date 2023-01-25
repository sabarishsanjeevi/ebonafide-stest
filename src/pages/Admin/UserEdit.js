import {
    Button,
    Card,
    Form,
    Input,
    message,
    Modal
} from "antd";
import React, {useState} from "react";
import axios from "axios";
import config from '../../config.json';

export default function UserEdit(){
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [data, setData] = useState([]);
    const [form] = Form.useForm();

    async function searchFinish(e) {
        
        await axios.post(`${config.serverURL}/users/search`, {aadhar_no: e.aadhar_no}).then(res => {
           if(res.data === null){
               message.error("No user found with the Aadhar Number", 2);
               message.info("Please enter the valid Aadhar Number to Edit User", 2)
           }else {
               message.success("User's data fetched successfully!!");
               
               form.setFieldsValue({
                   name: res.data.name,
                   dob: res.data.dob,
                   initial: res.data.initial,
                   gender: res.data.gender,
                   aadhar_no: res.data.aadhar_no,
                   father_name: res.data.father_name,
                   branch: res.data.branch,
                   year: res.data.year,
                   program: res.data.program,
               });
               setIsAddModalVisible(true);
           }
        });
    }

    async function onAddFinish(e) {
        
        await axios.post(`${config.serverURL}/student/search/update`, {
            aadhar_no: e.aadhar_no,
            initial: e.initial,
            name: e.name,
            dob: e.dob,
            gender: e.gender,
            father_name: e.father_name,
            branch: e.branch,
            year: e.year,
            program: e.program,
        }).then(res => {
           if(res.data.status === 0){
               message.error("User not updated else No update required");
           }else{
               message.success("User updated successfully!!");
               setIsAddModalVisible(false);
           }
        });
    }

    const showaddModal = () => {
        setIsAddModalVisible(true);
    };

    function handleAddOk() {
        setIsAddModalVisible(false);
    }

    function handleAddCancel() {
        setIsAddModalVisible(false);
    }

    return(
        <div>
            <Form onFinish={searchFinish} name="update_form">
                <Form.Item required={true} label={"AAdhar Number"} name={"aadhar_no"} >
                    <Input placeholder ="Aadhar No"></Input>
                </Form.Item>
                <Form.Item wrapperCol={{offset: 4, span: 16}}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
            <Modal
                title={data.name}
                visible={isAddModalVisible}
                onOk={handleAddOk}
                onCancel={handleAddCancel}
                footer={[
                    <Button key="Cancel" onClick={handleAddCancel}>
                        Cancel
                    </Button>,
                ]}
                width={"80%"}
            >

                <html style={{textAlign: "center"}}>
                <Card>
                    <>
                        <Form
                            name="Update Form"
                            labelCol={{span: 0}}
                            wrapperCol={{span: 24}}
                            form = {form}
                            onFinish={onAddFinish}>
                            <Form.Item name={"aadhar_no"} hidden={true} ></Form.Item>
                            <Form.Item name={"name"} label={"Name"} required={true}>
                                <Input></Input>
                            </Form.Item>
                            <Form.Item name={"initial"} label={"Initial"} required={true}>
                                <Input></Input>
                            </Form.Item>
                            <Form.Item name={"dob"} label={"Date of Birth"} required={true}>
                                <Input></Input>
                            </Form.Item>
                            <Form.Item name={"father_name"} label={"Father Name"} required={true}>
                                <Input></Input>
                            </Form.Item>
                            <Form.Item name={"branch"} label={"Branch"} required={true}>
                                <Input></Input>
                            </Form.Item>
                            <Form.Item name={"program"} label={"Program"} required={true}>
                                <Input></Input>
                            </Form.Item>
                            <Form.Item name={"year"} label={"Year"} required={true}>
                                <Input></Input>
                            </Form.Item>
                            <Form.Item wrapperCol={{offset: 4, span: 16}}>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </>
                </Card>
                </html>
            </Modal>
        </div>
    )
}