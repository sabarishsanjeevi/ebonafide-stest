import {Button, Card, Form, Input, message, Modal, Select, Space, Table} from "antd";
import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import config from '../../config.json';
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";


export default function Users() {

    const [modaldata, setmodaldata] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [data, setData] = useState([]);
    const [form] = Form.useForm();

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters, confirm) => {
        clearFilters();
        setSearchText('');
        confirm();
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div
                style={{
                    padding: 8,
                }}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters, confirm)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#69FFA0FF',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    useEffect(() => {
        document.title = "All Users & User Edit - eBonafide Application"
        axios.post(`${config.serverURL}/users`, {}).then(res => {
            
            setData(res.data);
        })
    }, [])

    const showModal = (record) => {
        setmodaldata(record);
        form.setFieldsValue({
            boarding: record.boarding,
            quota: record.quota,
            aadhar_no: record.aadhar_no,
            graduate: record.graduate
        });
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const columns = [
        {
            title: 'Register No',
            dataIndex: 'regno',
            key: 'regno',
            ...getColumnSearchProps('regno'),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (_, {name, initial}) => (
                <>
                    {name + " " + initial}
                </>
            ),
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Aadhar No',
            dataIndex: 'aadhar_no',
            key: 'aadhar_no',
            ...getColumnSearchProps('aadhar_no'),
        },
        {
            title: 'Date Of Birth',
            key: 'dob',
            dataIndex: 'dob',
        },
        {
            title: 'Gender',
            key: 'gender',
            dataIndex: 'gender',
        },
        {
            title: 'Year',
            key: 'year',
            dataIndex: 'year',
        },
        {
            title: 'Department',
            key: 'program',
            dataIndex: 'program',
        },
        {
            title: 'Boarding',
            key: 'boarding',
            dataIndex: 'boarding',
        },
        {
            title: 'Quota',
            key: 'quota',
            dataIndex: 'quota',
        },
        {
            title: 'Graduate Type',
            key: 'graduate',
            dataIndex: 'graduate',
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
        axios.post(`${config.serverURL}/users/update`, {
            "aadhar_no": modaldata.aadhar_no,
            "boarding": e.boarding,
            "graduate": e.graduate,
            "quota": e.quota
        }).then(val => {
            setData(val.data);
            message.success("User details updated successfully!!")
            setIsModalVisible(false);
        })
    }

    return (
        <>
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
                        <h3 style={{textAlign: "left", marginLeft: 8}}>Name
                            : {modaldata.name + " " + modaldata.initial}</h3>
                        <h3 style={{textAlign: "left", marginLeft: 8}}>Regno : {modaldata.regno}</h3>
                        <h3 style={{textAlign: "left", marginLeft: 8}}>Aadhar No : {modaldata.aadhar_no}</h3>
                        <br/>
                        <Form
                            name="Update Form"
                            labelCol={{span: 0}}
                            wrapperCol={{span: 24}}
                            form={form}
                            onFinish={onFinish}>
                            <Form.Item name={"aadhar_no"} hidden={true}/>
                            <Form.Item name={"boarding"} label={"Boarding"} required={true}>
                                <Select disabled={false} defaultValue={modaldata.boarding}>
                                    <Select.Option value={modaldata.boarding} disabled={true} selected={true}>Please
                                        Choose Boarding Type</Select.Option>
                                    <Select.Option value={"DAY SCHOLAR"} selected={true}>Day Scholar</Select.Option>
                                    <Select.Option value={"HOSTELLER"}>Hostel</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item name={"quota"} label={"Quota"} required={true}>
                                <Select disabled={false} defaultValue={modaldata.quota}>
                                    <Select.Option value={"GOVERNMENT QUOTA"}>GOVERNMENT QUOTA</Select.Option>
                                    <Select.Option value={"MANAGEMENT QUOTA"}>MANAGEMENT QUOTA</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item name={"graduate"} label={"Graduate Type"} required={true}>
                                <Select disabled={false} defaultValue={modaldata.graduate}>
                                    <Select.Option value={"FIRST GRADUATE"}>FIRST GRADUATE</Select.Option>
                                    <Select.Option value={"NOT A FIRST GRADUATE"}>NOT A FIRST GRADUATE</Select.Option>
                                </Select>
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