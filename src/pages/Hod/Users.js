import {Button, Card, Form, Input, message, Modal, Select, Space, Table} from "antd";
import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import config from '../../config.json';
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";


export default function HodUsers() {

    const [data, setData] = useState([]);

    let user = JSON.parse(window.localStorage.getItem("data"));

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
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
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
                        icon={<SearchOutlined/>}
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
        axios.post(`${config.serverURL}/hod/users`, {"program": user["program"]}).then(res => {
            setData(res.data);
        })
    }, [])

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
    ];


    return (
        <>
            <Table columns={columns} dataSource={data} scroll={{x: 1300}}/>
        </>
    )
}