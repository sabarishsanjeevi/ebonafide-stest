import {Button, Card, Form, Input, message, Modal, Radio, Table, Tag} from "antd";
import React, {useEffect, useState} from "react";
import axios from "axios";
import config from '../../config.json';


export default function Categories() {

    const [modaldata, setmodaldata] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [data, setData] = useState([]);
    const [form] = Form.useForm();

    useEffect(() => {
        document.title = "Add & Edit Category - eBonafide Application"
        axios.post(`${config.serverURL}/dev/categories`, {}).then(res => {
            setData(res.data);
        })
    }, []);

    const showModal = (record) => {
        setmodaldata(record);
        form.setFieldsValue({
            id: record.id,
            name: record.name,
            label: record.label,
            address: record.address,
        });
        setIsModalVisible(true);
    };

    const showaddModal = () => {
        setIsAddModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Label',
            dataIndex: 'label',
            key: 'label',
        },
        {
            title: 'Address',
            key: 'address',
            dataIndex: 'address',
        },
        {
            title: 'Type',
            key: 'type',
            dataIndex: 'type',
            render: (type)=>{
                if(type==="bonafide"){
                return(
                    <Tag color={"yellow"} >
                    BONAFIDE
                </Tag>
                )}else{
                    return(<Tag color={"blue"} >
                        Fee Structure
                    </Tag>)
                }
            }
        },
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'id',
            render: (index, record) => (
                <Button type="primary" onClick={() => showModal(record)}>
                    Edit
                </Button>
            ),
        },
    ];

    const onFinish = (e) => {
        axios.post(`${config.serverURL}/categories/edit`, {
            "id": e.id,
            "name": e.name,
            "label": e.label,
            "address": e.address,
            "type": modaldata.type,
        }).then(val => {
            setData(val.data);
            message.success("User details updated successfully!!")
            setIsModalVisible(false);
        })
    }

    const onAddFinish = (e) =>{
        axios.post(`${config.serverURL}/categories/add`, {
            "name": e.name,
            "label": e.label,
            "address": e.address,
            "type": e.type,
        }).then(val => {
            setData(val.data);
            message.success("Category added successfully!!")
            setIsModalVisible(false);
        })
    }

    function handleAddOk() {
        setIsAddModalVisible(false);
    }

    function handleAddCancel() {
        setIsAddModalVisible(false);
    }

    return (
        <>
            <Button type={"primary"} onClick={()=>{showaddModal()}}>Add Category</Button>
            <Table columns={columns} dataSource={data} scroll={{x: 1300}}/>
            <Modal
                title={modaldata.name}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="Cancel" onClick={handleCancel}>
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
                            onFinish={onFinish}>
                            <Form.Item name={"id"} hidden={true}/>
                            <Form.Item name={"name"} label={"Name"} required={true}>
                                <Input></Input>
                            </Form.Item>
                            <Form.Item name={"label"} label={"Label"} required={true}>
                                <Input></Input>
                            </Form.Item>
                            <Form.Item name={"address"} label={"Address"} required={true}>
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
            <Modal
                title={modaldata.name}
                visible={isAddModalVisible}
                onOk={handleAddOk}
                onCancel={handleAddCancel}
                footer={[
                    <Button key="Cancel" onClick={handleCancel}>
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
                            onFinish={onAddFinish}>
                            <Form.Item name={"id"} hidden={true}/>
                            <Form.Item name={"name"} label={"Name"} required={true}>
                                <Input></Input>
                            </Form.Item>
                            <Form.Item name={"label"} label={"Label"} required={true}>
                                <Input></Input>
                            </Form.Item>
                            <Form.Item name={"address"} label={"Address"} required={true}>
                                <Input></Input>
                            </Form.Item>
                            <Form.Item name={"type"} label={"Type"} required={true}>
                                <Radio.Group>
                                <Radio name={"type"} value={"bonafide"}>Bonafide</Radio>
                                <Radio name={"type"} value={"feestructure"}>Fee Structure</Radio>
                                </Radio.Group>
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
        </>
    )
}