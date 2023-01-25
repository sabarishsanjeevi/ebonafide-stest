import {Button, Card, Col, Input, Layout, message, Modal, Form, Row, Space, Table, Tag} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import {
    DeleteFilled,
    EyeFilled,
    FileDoneOutlined,
    PrinterFilled,
    SearchOutlined
} from "@ant-design/icons";
import {Footer} from "antd/lib/layout/layout";
import QRCode from "react-qr-code";
import ReactToPrint from "react-to-print";
import Highlighter from 'react-highlight-words';
import config from '../../config.json';
const {TextArea} = Input;


function AdminApplications() {
    setInterval(async() => {
        axios.post(`${config.serverURL}/admin/applications`, {}).then((res) => {
            setDataAppFeeStructs(res.data);
        });
    }, 300000);
    let componentRef = useRef();

    // Data Hooks
    const [dataAppFeeStructs, setDataAppFeeStructs] = useState([]);
    const [datasAccepedApp, setDatasAccepedApp] = useState([]);
    const [datasRejectedApplications, setDatasRejectedApplications] = useState([]);
    const [datasPrintedApp, setDatasPrintedApp] = useState([]);

    const [address, setAddress] = useState("");

    // Modal Data Setting Hooks
    const [modaldataAppFeeStruct, setmodaldataAppFeeStruct] = useState({
        "fees": {
            "_1c": '',
            "_2c": '',
            "_3c": '',
            "_4c": '',
            "_1h": '',
            "_2h": '',
            "_3h": '',
            "_4h": '',
            "_1bf": '',
            "_2bf": '',
            "_3bf": '',
            "_4bf": '',
            "_1b": '',
            "_2b": '',
            "_3b": '',
            "_4b": '',
        }
    });
    const [modaldataAccepedApp, setmodaldataAccepedApp] = useState({
        "fees": {
            "_1c": '',
            "_2c": '',
            "_3c": '',
            "_4c": '',
            "_1h": '',
            "_2h": '',
            "_3h": '',
            "_4h": '',
            "_1bf": '',
            "_2bf": '',
            "_3bf": '',
            "_4bf": '',
            "_1b": '',
            "_2b": '',
            "_3b": '',
            "_4b": '',
        }
    });
    const [modaldataprintedApp, setmodaldataprintedApp] = useState({
        "fees": {
            "_1c": '',
            "_2c": '',
            "_3c": '',
            "_4c": '',
            "_1h": '',
            "_2h": '',
            "_3h": '',
            "_4h": '',
            "_1bf": '',
            "_2bf": '',
            "_3bf": '',
            "_4bf": '',
            "_1b": '',
            "_2b": '',
            "_3b": '',
            "_4b": '',
        }
    });

    // Modal visibility set hooks
    const [isModalVisibleAppFeeStruct, setIsModalVisibleAppFeeStruct] = useState(false);
    const [isModalVisibleAccepedApp, setIsModalVisibleAccepedApp] = useState(false);
    const [isModalVisiblePrintedApp, setIsModalVisiblePrintedApp] = useState(false);

    // Feestructure table data set hooks
    const [_1c, _1sc] = useState(0);
    const [_2c, _2sc] = useState(0);
    const [_3c, _3sc] = useState(0);
    const [_4c, _4sc] = useState(0);
    const [_1h, _1sh] = useState(0);
    const [_2h, _2sh] = useState(0);
    const [_3h, _3sh] = useState(0);
    const [_4h, _4sh] = useState(0);
    const [_1b, _1sb] = useState(0);
    const [_2b, _2sb] = useState(0);
    const [_3b, _3sb] = useState(0);
    const [_4b, _4sb] = useState(0);
    const [_1bf, _1sbf] = useState(0);
    const [_2bf, _2sbf] = useState(0);
    const [_3bf, _3sbf] = useState(0);
    const [_4bf, _4sbf] = useState(0);



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



    // Table ColumnsSet
    let obj = {
        "_1c": _1c,
        "_2c": _2c,
        "_3c": _3c,
        "_4c": _4c,
        "_1h": _1h,
        "_2h": _2h,
        "_3h": _3h,
        "_4h": _4h,
        "_1bf": _1bf,
        "_2bf": _2bf,
        "_3bf": _3bf,
        "_4bf": _4bf,
        "_1b": _1b,
        "_2b": _2b,
        "_3b": _3b,
        "_4b": _4b,
    }
    const tableColumnsAppFeeStruct = [
        {
            title: 'Detail',
            dataIndex: 'details',
        },
        {
            title: '1st Year',
            dataIndex: '1',
        },
        {
            title: '2nd Year',
            dataIndex: '2',
        },
        {
            title: '3rd Year',
            dataIndex: '3',
        },
        {
            title: '4th Year',
            dataIndex: '4',
        },
    ]
    const columnsAppFeeStruct = [
        {
            title: 'Register No',
            dataIndex: 'regno',
            key: 'regno',
            render: (_, {regno}) => (
                <>
                    {String(regno).toUpperCase()}
                </>
            ),
            align: "center",
            ...getColumnSearchProps('regno'),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (_, {name, initial}) => (
                <>
                    {String(name).toUpperCase() + " " + String(initial).toUpperCase()}
                </>
            ),
            align: 'center',
        },
        {
            title: 'Type',
            dataIndex: 'application_type',
            key: 'application_type',
            render: (_, {application_type}) => {
                if(application_type === "bonafide"){
                    return (<Tag color={"cyan"} key={application_type}>
                        {String("Bonafide").toUpperCase()}
                    </Tag>)
                }else{
                    return (<Tag color={"purple"} key={application_type}>
                        {String("Feestructure").toUpperCase()}
                    </Tag>)
                }
            },
            align: 'center',
        },
        {
            title: 'Applied For',
            key: 'type',
            dataIndex: 'type',
            render: (_, {type}) => (
                <>
                    {String(type).split("_").map((value, id)=>{
                        return(<>{String(value).toUpperCase()} </>);
                    })}
                </>
            ),
            align: 'center',
            sorter: (a,b)=> a.type.length - b.type.length
        },
        {
            title: 'Status',
            key: 'approved',
            dataIndex: 'approved',
            align: 'center',
            render: (_, {approved}) => {
                if (approved) {
                    return (
                        <Tag color={"green"} key={"approved"}>
                            {"Accepted".toUpperCase()}
                        </Tag>
                    );
                } else {
                    return (
                        <Tag color={"geekblue"} key={"pending"}>
                            {"Pending".toUpperCase()}
                        </Tag>
                    );
                }
            },
        },
        {
            title: 'Applied On',
            key: 'time',
            dataIndex: 'time',
            align: 'center',
            render: (_, {time}) => {
                return (<>
                    {new Date(time).getDate() + "/" + parseInt(new Date(time).getMonth()+1) + "/" + new Date(time).getFullYear()}
                </>)
            },
        },
        {
            title: 'Reference No',
            dataIndex: 'reference',
            key: 'reference',
            align: 'center',
            ...getColumnSearchProps('reference'),
            width: '10%'
        },
        {
            title: "Action",
            key: "action",
            align: 'center',
            render: (_, record) => (
                <Space size="middle">
                    <Button icon={<EyeFilled/>} type={"text"} style={{color: "blueviolet"}}
                            onClick={() => showModalAppFeeStruct(record)}>View</Button>
                </Space>),
            fixed: 'right',
            width: '9%',
        },

    ];
    const columnsAccepedApp = [
        {
            title: 'Register No',
            dataIndex: 'regno',
            key: 'regno',
            align: "center",
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
            align: "center"
        },
        {
            title: 'Department',
            dataIndex: 'department',
            key: 'department',
            render: (_, {program}) => {
                return (<p>{program}</p>)
            },
            align: "center"
        },
        {
            title: 'Type',
            dataIndex: 'application_type',
            key: 'application_type',
            render: (_, {application_type}) => {
                if (application_type == "bonafide") {
                    return (<>
                        <Tag color={"cyan"} key={application_type}>
                            {application_type.toUpperCase()}
                        </Tag>
                    </>);
                } else {
                    return (<>
                        <Tag color={"purple"} key={application_type}>
                            {application_type.toUpperCase()}
                        </Tag>
                    </>)
                }
            },
            sorter: (a, b) => a.application_type.length - b.application_type.length,
            align: "center"
        },
        {
            title: 'Applied For',
            key: 'type',
            dataIndex: 'type',
            sorter: (a, b) => a.type.length - b.type.length,
            align: "center",
            ...getColumnSearchProps('type'),
        },
        {
            title: 'Status',
            key: 'approved',
            dataIndex: 'approved',
            render: (_, {approved}) => {
                if (approved === 1) {
                    return (
                        <Tag color={"yellow"} key={"approved"}>
                            {"Accepted & Not Printed".toUpperCase()}
                        </Tag>
                    );
                } else {
                    if (approved === 2) {
                        return (
                            <Tag color={"red"} key={"rejected"}>
                                {"Rejected".toUpperCase()}
                            </Tag>
                        );
                    } else {
                       if(approved === 3){
                           return (
                               <Tag color={"green"} key={"printed"}>
                                   {"Accepted & Printed".toUpperCase()}
                               </Tag>
                           );
                       }else{
                           return (
                               <Tag color={"geekblue"} key={"pending"}>
                                   {"Pending".toUpperCase()}
                               </Tag>
                           );
                       }
                    }
                }
            },
            align: "center",
            sorter: (a, b) => a.approved - b.approved,
        },
        {
            title: 'Applied On',
            key: 'time',
            dataIndex: 'time',
            render: (_, {time}) => {
                return (<>
                    {new Date(time).getDate() + "/" + parseInt(new Date(time).getMonth()+1) + "/" + new Date(time).getFullYear()}
                </>)
            },
            align: "center",
        },
        {
            title: 'Reference No',
            dataIndex: 'reference',
            key: 'reference',
            render: (text) => <a>{text}</a>,
            align: "center",
            ...getColumnSearchProps('reference'),
        },
        {
            title: "Action",
            key: "action",
            align: 'center',
            render: (_, record) => {
                return (<div>
                    <Button icon={<EyeFilled/>} type={"text"} style={{color: "blueviolet"}}
                            onClick={() => showModalAcceptedApp(record)}>View</Button>
                </div>)
            },
            fixed: "right",
        }
    ];
    const columnsPrintedApp = [
        {
            title: 'Register No',
            dataIndex: 'regno',
            key: 'regno',
            align: "center",
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
            align: "center"
        },
        {
            title: 'Department',
            dataIndex: 'department',
            key: 'department',
            render: (_, {program}) => {
                return (<p>{program}</p>)
            },
            align: "center"
        },
        {
            title: 'Type',
            dataIndex: 'application_type',
            key: 'application_type',
            render: (_, {application_type}) => {
                if (application_type == "bonafide") {
                    return (<>
                        <Tag color={"cyan"} key={application_type}>
                            {application_type.toUpperCase()}
                        </Tag>
                    </>);
                } else {
                    return (<>
                        <Tag color={"purple"} key={application_type}>
                            {application_type.toUpperCase()}
                        </Tag>
                    </>)
                }
            },
            sorter: (a, b) => a.application_type.length - b.application_type.length,
            align: "center"
        },
        {
            title: 'Applied For',
            key: 'type',
            dataIndex: 'type',
            sorter: (a, b) => a.type.length - b.type.length,
            align: "center",
            ...getColumnSearchProps('type'),
        },
        {
            title: 'Status',
            key: 'approved',
            dataIndex: 'approved',
            render: (_, {approved}) => {
                if (approved === 1) {
                    return (
                        <Tag color={"yellow"} key={"approved"}>
                            {"Accepted & Not Printed".toUpperCase()}
                        </Tag>
                    );
                } else {
                    if (approved === 2) {
                        return (
                            <Tag color={"red"} key={"rejected"}>
                                {"Rejected".toUpperCase()}
                            </Tag>
                        );
                    } else {
                        if(approved === 3){
                            return (
                                <Tag color={"green"} key={"printed"}>
                                    {"Accepted & Printed".toUpperCase()}
                                </Tag>
                            );
                        }else{
                            return (
                                <Tag color={"geekblue"} key={"pending"}>
                                    {"Pending".toUpperCase()}
                                </Tag>
                            );
                        }
                    }
                }
            },
            align: "center",
            sorter: (a, b) => a.approved - b.approved,
        },
        {
            title: 'Applied On',
            key: 'time',
            dataIndex: 'time',
            render: (_, {time}) => {
                return (<>
                    {new Date(time).getDate() + "/" + parseInt(new Date(time).getMonth()+1) + "/" + new Date(time).getFullYear()}
                </>)
            },
            align: "center",
        },
        {
            title: 'Reference No',
            dataIndex: 'reference',
            key: 'reference',
            render: (text) => <a>{text}</a>,
            align: "center",
            ...getColumnSearchProps('reference'),
        },
        {
            title: "Action",
            key: "action",
            align: 'center',
            render: (_, record) => {
                return (<div>
                    <Button icon={<EyeFilled/>} type={"text"} style={{color: "blueviolet"}}
                            onClick={() => showModalAPrintedApp(record)}>View</Button>
                </div>)
            },
            fixed: "right",
        }
    ];
    const columnsRejectedApplications = [
        {
            title: 'Register No',
            dataIndex: 'regno',
            key: 'regno',
            align: "center",
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
            align: "center"
        },
        {
            title: 'Department',
            dataIndex: 'department',
            key: 'department',
            render: (_, {program}) => {
                return (<p>{program}</p>)
            },
            align: "center"
        },
        {
            title: 'Type',
            dataIndex: 'application_type',
            key: 'application_type',
            render: (_, {application_type}) => {
                if (application_type == "bonafide") {
                    return (<>
                        <Tag color={"cyan"} key={application_type}>
                            {application_type.toUpperCase()}
                        </Tag>
                    </>);
                } else {
                    return (<>
                        <Tag color={"purple"} key={application_type}>
                            {application_type.toUpperCase()}
                        </Tag>
                    </>)
                }
            },
            sorter: (a, b) => a.application_type.length - b.application_type.length,
            align: "center"
        },
        {
            title: 'Applied For',
            key: 'type',
            dataIndex: 'type',
            sorter: (a, b) => a.type.length - b.type.length,
            align: "center",
            ...getColumnSearchProps('type'),
        },
        {
            title: 'Status',
            key: 'approved',
            dataIndex: 'approved',
            render: (_, {approved}) => {
                if (approved === 1) {
                    return (
                        <Tag color={"yellow"} key={"approved"}>
                            {"Accepted & Not Printed".toUpperCase()}
                        </Tag>
                    );
                } else {
                    if (approved === 2) {
                        return (
                            <Tag color={"red"} key={"rejected"}>
                                {"Rejected".toUpperCase()}
                            </Tag>
                        );
                    } else {
                        if(approved === 3){
                            return (
                                <Tag color={"green"} key={"printed"}>
                                    {"Accepted & Printed".toUpperCase()}
                                </Tag>
                            );
                        }else{
                            return (
                                <Tag color={"geekblue"} key={"pending"}>
                                    {"Pending".toUpperCase()}
                                </Tag>
                            );
                        }
                    }
                }
            },
            align: "center",
            sorter: (a, b) => a.approved - b.approved,
        },
        {
            title: 'Applied On',
            key: 'time',
            dataIndex: 'time',
            render: (_, {time}) => {
                return (<>
                    {new Date(time).getDate() + "/" + parseInt(new Date(time).getMonth()+1) + "/" + new Date(time).getFullYear()}
                </>)
            },
            align: "center",
        },
        {
            title: 'Reference No',
            dataIndex: 'reference',
            key: 'reference',
            render: (text) => <a>{text}</a>,
            align: "center",
            ...getColumnSearchProps('reference'),
        },
    ];



    // Table boarding classification set table datas
    let tableDataAppFeeStruct = []
    if(modaldataAppFeeStruct.application_type === "feestructure"){
        if (modaldataAppFeeStruct.boarding === "HOSTELLER") {
            tableDataAppFeeStruct = [
                {
                    key: 1,
                    details: "College Fees",
                    1: modaldataAppFeeStruct.fees._1c ? <Input onChange={(e) => {
                        _1sc(e.target.value)
                    }}></Input> : '',
                    2: modaldataAppFeeStruct.fees._2c ? <Input onChange={(e) => {
                        _2sc(e.target.value)
                    }}></Input> : '',
                    3: modaldataAppFeeStruct.fees._3c ? <Input onChange={(e) => {
                        _3sc(e.target.value)
                    }}></Input> : '',
                    4: modaldataAppFeeStruct.fees._4c ? <Input onChange={(e) => {
                        _4sc(e.target.value)
                    }}></Input> : '',
                },
                {
                    key: 2,
                    details: "Hostel & Mess Fees",
                    1: modaldataAppFeeStruct.fees._1h ? <Input onChange={(e) => {
                        _1sh(e.target.value)
                    }}></Input> : '',
                    2: modaldataAppFeeStruct.fees._2h ? <Input onChange={(e) => {
                        _2sh(e.target.value)
                    }}></Input> : '',
                    3: modaldataAppFeeStruct.fees._3h ? <Input onChange={(e) => {
                        _3sh(e.target.value)
                    }}></Input> : '',
                    4: modaldataAppFeeStruct.fees._4h ? <Input onChange={(e) => {
                        _4sh(e.target.value)
                    }}></Input> : '',
                },
                {
                    key: 3,
                    details: "Book Fees",
                    1: modaldataAppFeeStruct.fees._1b ? <Input onChange={(e) => {
                        _1sb(e.target.value)
                    }}></Input> : '',
                    2: modaldataAppFeeStruct.fees._2b ? <Input onChange={(e) => {
                        _2sb(e.target.value)
                    }}></Input> : '',
                    3: modaldataAppFeeStruct.fees._3b ? <Input onChange={(e) => {
                        _3sb(e.target.value)
                    }}></Input> : '',
                    4: modaldataAppFeeStruct.fees._4b ? <Input onChange={(e) => {
                        _4sb(e.target.value)
                    }}></Input> : '',
                }
            ];
        } else {
            tableDataAppFeeStruct = [
                {
                    key: 1,
                    details: "College Fees",
                    1: modaldataAppFeeStruct.fees._1c ? <Input onChange={(e) => {
                        _1sc(e.target.value)
                    }}></Input> : '',
                    2: modaldataAppFeeStruct.fees._2c ? <Input onChange={(e) => {
                        _2sc(e.target.value)
                    }}></Input> : '',
                    3: modaldataAppFeeStruct.fees._3c ? <Input onChange={(e) => {
                        _3sc(e.target.value)
                    }}></Input> : '',
                    4: modaldataAppFeeStruct.fees._4c ? <Input onChange={(e) => {
                        _4sc(e.target.value)
                    }}></Input> : '',
                },
                {
                    key: 2,
                    details: "Book Fees",
                    1: modaldataAppFeeStruct.fees._1b ? <Input onChange={(e) => {
                        _1sb(e.target.value)
                    }}></Input> : '',
                    2: modaldataAppFeeStruct.fees._2b ? <Input onChange={(e) => {
                        _2sb(e.target.value)
                    }}></Input> : '',
                    3: modaldataAppFeeStruct.fees._3b ? <Input onChange={(e) => {
                        _3sb(e.target.value)
                    }}></Input> : '',
                    4: modaldataAppFeeStruct.fees._4b ? <Input onChange={(e) => {
                        _4sb(e.target.value)
                    }}></Input> : '',
                },
                {
                    key: 3,
                    details: "Bus Fees",
                    1: modaldataAppFeeStruct.fees._1bf ? <Input onChange={(e) => {
                        _1sbf(e.target.value)
                    }}></Input> : '',
                    2: modaldataAppFeeStruct.fees._2bf ? <Input onChange={(e) => {
                        _2sbf(e.target.value)
                    }}></Input> : '',
                    3: modaldataAppFeeStruct.fees._3bf ? <Input onChange={(e) => {
                        _3sbf(e.target.value)
                    }}></Input> : '',
                    4: modaldataAppFeeStruct.fees._4bf ? <Input onChange={(e) => {
                        _4sbf(e.target.value)
                    }}></Input> : '',
                }
            ];
        }
    }



    // Handling functions
    const showModalAppFeeStruct = (record) => {

        setmodaldataAppFeeStruct(record);
        setIsModalVisibleAppFeeStruct(true);
    };

    const handleOkAppFeeStruct = () => {
        setIsModalVisibleAppFeeStruct(false);
    };

    const handleCancelAppFeeStruct = () => {
        setIsModalVisibleAppFeeStruct(false);
    };

    async function handleApproveAppFeeStruct(record, data) {
        if (isModalVisibleAppFeeStruct) {
            handleCancelAppFeeStruct();
        }
        await axios.post(`${config.serverURL}/update`, {
            "reference": record.reference,"regno": record.regno, "app_type": record.application_type, "type": record.type, "approved": 1,
            "fees": obj, "address": address,
        }).then((e) => {
            if (e.data.status === 1) {
                // setDataAppFeeStructs(data => data.filter(item => item.reference !== record.reference));
                message.success("Accepted", 0.5);
                axios.post(`${config.serverURL}/admin/applications`, {}).then((res) => {
                    setDataAppFeeStructs(res.data);
                });
                axios.post(`${config.serverURL}/admin/applications/accepted`, {}).then((res) => {
                    setDatasAccepedApp(res.data);
                });
                axios.post(`${config.serverURL}/admin/applications/rejected`, {}).then((res) => {
                    setDatasRejectedApplications(res.data);
                });
            } else {
                message.error("Error while accepting!! Please contact IT Admin")
            }
        });
    }

    async function handleRejectAppFeeStruct(record, data) {
        if (isModalVisibleAppFeeStruct) {
            handleCancelAppFeeStruct();
        }
        await axios.post(`${config.serverURL}/update`, {
            "reference": record.reference,"regno": record.regno, "app_type": record.application_type, "type": record.type, "approved": 2,
        }).then((e) => {
            if (e.data.status === 1) {
                // setDataAppFeeStructs(data => data.filter(item => item.reference !== record.reference));
                message.error("Rejected", 0.5);
                axios.post(`${config.serverURL}/admin/applications`, {}).then((res) => {
                    setDataAppFeeStructs(res.data);
                });
                axios.post(`${config.serverURL}/admin/applications/accepted`, {}).then((res) => {
                    setDatasAccepedApp(res.data);
                });
                axios.post(`${config.serverURL}/admin/applications/rejected`, {}).then((res) => {
                    setDatasRejectedApplications(res.data);
                });
            } else {
                message.error("Error while accepting!! Please contact IT Admin")
            }
        });
    }

    const showModalAcceptedApp = (record) => {
        setmodaldataAccepedApp(record);
        setIsModalVisibleAccepedApp(true);
    };

    const handleOkAccepedApp = () => {
        setIsModalVisibleAccepedApp(false);
    };

    const handleCancelAcceptedApp = () => {
        setIsModalVisibleAccepedApp(false);
    };

    const showModalAPrintedApp = (record) => {
        setmodaldataAccepedApp(record);
        setIsModalVisiblePrintedApp(true);
    };

    const handleOkPrintedApp = () => {
        setIsModalVisiblePrintedApp(false);
    };

    const handleCancelAPrintedApp = () => {
        setIsModalVisiblePrintedApp(false);
    };

    // Use effect Hook to set all initial data fetch...!!
    useEffect((e) => {
        document.title = "All Applications - eBonafide portal";
        axios.post(`${config.serverURL}/admin/applications`, {}).then((res) => {
            setDataAppFeeStructs(res.data);
        });
        axios.post(`${config.serverURL}/admin/applications/accepted`, {}).then((res) => {
            setDatasAccepedApp(res.data);
        });
        axios.post(`${config.serverURL}/admin/applications/printed`, {}).then((res) => {
            setDatasPrintedApp(res.data);
        });
        axios.post(`${config.serverURL}/admin/applications/rejected`, {}).then((res) => {
            setDatasRejectedApplications(res.data);
        });
    }, []);

    // Data variable set
    const dataAccepedApp = datasAccepedApp;
    const dataAppFeeStruct = dataAppFeeStructs;
    const dataRejectedApplications = datasRejectedApplications;



    // Class components - Used for printing the form - printing completely depends on this component.
    class ComponentToPrintFeeStructure extends React.Component {

        render() {
            let tableColumnsAccepedApp = [];
            tableColumnsAccepedApp.push({
                title: 'Detail',
                dataIndex: 'details',
            },);
            if (modaldataAccepedApp.fees._1c !== 0 && modaldataAccepedApp.fees._1bf !== 0 && (modaldataAccepedApp.fees._1h !== 0 || modaldataAccepedApp.fees._1b !== 0)) {
                tableColumnsAccepedApp.push({
                    title: '1st Year',
                    dataIndex: '1',
                });
            }
            if (modaldataAccepedApp.fees._2c !== 0 && modaldataAccepedApp.fees._2bf !== 0 && (modaldataAccepedApp.fees._2h !== 0 || modaldataAccepedApp.fees._2b !== 0)) {
                tableColumnsAccepedApp.push({
                    title: '2nd Year',
                    dataIndex: '2',
                });
            }
            if (modaldataAccepedApp.fees._3c !== 0 && modaldataAccepedApp.fees._3bf !== 0 && (modaldataAccepedApp.fees._3h !== 0 || modaldataAccepedApp.fees._3b !== 0)) {
                tableColumnsAccepedApp.push({
                    title: '3rd Year',
                    dataIndex: '3',
                });
            }
            if (modaldataAccepedApp.fees._4c !== 0 && modaldataAccepedApp.fees._4bf !== 0 && (modaldataAccepedApp.fees._4h !== 0 || modaldataAccepedApp.fees._4b !== 0)) {
                tableColumnsAccepedApp.push({
                    title: '4th Year',
                    dataIndex: '4',
                });
            }
            // if(!modaldataAccepedApp.fees._2c && (!modaldataAccepedApp.fees._2h || modaldataAccepedApp.fees._2h === 0) && (!modaldataAccepedApp.fees._2b || modaldataAccepedApp.fees._2b === 0)  && !modaldataAccepedApp.fees._2bf){
            //     tableColumnsAccepedApp.push({
            //         title: '2nd Year',
            //         dataIndex: '2',
            //     });
            // }
            /*tableColumnsAccepedApp = [

                !modaldataAccepedApp.fees._1c && (!modaldataAccepedApp.fees._1h || modaldataAccepedApp.fees._1h === 0) && !modaldataAccepedApp.fees._1b  && !modaldataAccepedApp.fees._1bf ?
                    {
                    title: '1st Year',
                    dataIndex: '1',
                }: null,
                modaldataAccepedApp.fees._2c !== null && modaldataAccepedApp.fees._2h !== null && modaldataAccepedApp.fees._2b !== null && modaldataAccepedApp.fees._2bf !== null?
                {
                    title: '2nd Year',
                    dataIndex: '2',
                }: null,
                {
                    title: '3rd Year',
                    dataIndex: '3',
                },
                {
                    title: '4th Year',
                    dataIndex: '4',
                },
            ]*/

            let tableDataAccepedApp = []
            let fir = 0, sec = 0, thi = 0, fin = 0;
            //total logic
            if(modaldataAccepedApp.fees._1c){fir+=parseInt(modaldataAccepedApp.fees._1c)}
            if(modaldataAccepedApp.fees._1b){fir+=parseInt(modaldataAccepedApp.fees._1b)}
            if(modaldataAccepedApp.fees._1bf){fir+=parseInt(modaldataAccepedApp.fees._1bf)}
            if(modaldataAccepedApp.fees._1h){fir+=parseInt(modaldataAccepedApp.fees._1h)}

            if(modaldataAccepedApp.fees._2c){sec+=parseInt(modaldataAccepedApp.fees._2c)}
            if(modaldataAccepedApp.fees._2b){sec+=parseInt(modaldataAccepedApp.fees._2b)}
            if(modaldataAccepedApp.fees._2bf){sec+=parseInt(modaldataAccepedApp.fees._2bf)}
            if(modaldataAccepedApp.fees._2h){sec+=parseInt(modaldataAccepedApp.fees._2h)}

            if(modaldataAccepedApp.fees._3c){thi+=parseInt(modaldataAccepedApp.fees._3c)}
            if(modaldataAccepedApp.fees._3b){thi+=parseInt(modaldataAccepedApp.fees._3b)}
            if(modaldataAccepedApp.fees._3bf){thi+=parseInt(modaldataAccepedApp.fees._3bf)}
            if(modaldataAccepedApp.fees._3h){thi+=parseInt(modaldataAccepedApp.fees._3h)}

            if(modaldataAccepedApp.fees._4c){fin+=parseInt(modaldataAccepedApp.fees._4c)}
            if(modaldataAccepedApp.fees._4b){fin+=parseInt(modaldataAccepedApp.fees._4b)}
            if(modaldataAccepedApp.fees._4bf){fin+=parseInt(modaldataAccepedApp.fees._4bf)}
            if(modaldataAccepedApp.fees._4h){fin+=parseInt(modaldataAccepedApp.fees._4h)}

            if (modaldataAccepedApp.boarding !== "HOSTELLER") {
                tableDataAccepedApp = [
                    {
                        key: 1,
                        details: "College Fees",
                        1: modaldataAccepedApp.fees._1c ? modaldataAccepedApp.fees._1c : null,
                        2: modaldataAccepedApp.fees._2c ? modaldataAccepedApp.fees._2c : null,
                        3: modaldataAccepedApp.fees._3c ? modaldataAccepedApp.fees._3c : null,
                        4: modaldataAccepedApp.fees._4c ? modaldataAccepedApp.fees._4c : null,
                    },
                    {
                        key: 2,
                        details: "Book Fees",
                        1: modaldataAccepedApp.fees._1b ? modaldataAccepedApp.fees._1b : null,
                        2: modaldataAccepedApp.fees._2b ? modaldataAccepedApp.fees._2b : null,
                        3: modaldataAccepedApp.fees._3b ? modaldataAccepedApp.fees._3b : null,
                        4: modaldataAccepedApp.fees._4b ? modaldataAccepedApp.fees._4b : null,
                    },
                    {
                        key: 3,
                        details: "Bus Fees",
                        1: modaldataAccepedApp.fees._1bf ? modaldataAccepedApp.fees._1bf : null,
                        2: modaldataAccepedApp.fees._2bf ? modaldataAccepedApp.fees._2bf : null,
                        3: modaldataAccepedApp.fees._3bf ? modaldataAccepedApp.fees._3bf : null,
                        4: modaldataAccepedApp.fees._4bf ? modaldataAccepedApp.fees._4bf : null,
                    },
                    {
                        key: 4,
                        details: "Total",
                        1: fir>0? fir: null,
                        2: sec>0? sec: null,
                        3: thi>0? thi: null,
                        4: fin>0? fin: null,
                    }
                ];
            } else {
                tableDataAccepedApp = [
                    {
                        key: 1,
                        details: "College Fees",
                        1: modaldataAccepedApp.fees._1c ? modaldataAccepedApp.fees._1c : null,
                        2: modaldataAccepedApp.fees._2c ? modaldataAccepedApp.fees._2c : null,
                        3: modaldataAccepedApp.fees._3c ? modaldataAccepedApp.fees._3c : null,
                        4: modaldataAccepedApp.fees._4c ? modaldataAccepedApp.fees._4c : null,
                    },
                    {
                        key: 2,
                        details: "Hostel & Mess Fees",
                        1: modaldataAccepedApp.fees._1h ? modaldataAccepedApp.fees._1h : null,
                        2: modaldataAccepedApp.fees._2h ? modaldataAccepedApp.fees._2h : null,
                        3: modaldataAccepedApp.fees._3h ? modaldataAccepedApp.fees._3h : null,
                        4: modaldataAccepedApp.fees._4h ? modaldataAccepedApp.fees._4h : null,
                    },
                    {
                        key: 3,
                        details: "Book Fees",
                        1: modaldataAccepedApp.fees._1b ? modaldataAccepedApp.fees._1b : null,
                        2: modaldataAccepedApp.fees._2b ? modaldataAccepedApp.fees._2b : null,
                        3: modaldataAccepedApp.fees._3b ? modaldataAccepedApp.fees._3b : null,
                        4: modaldataAccepedApp.fees._4b ? modaldataAccepedApp.fees._4b : null,
                    },
                    {
                        key: 4,
                        details: "Total",
                        1: fir>0? fir: null,
                        2: sec>0? sec: null,
                        3: thi>0? thi: null,
                        4: fin>0? fin: null,
                    }
                ];
            }
            const pageStyle = "@page {size: A4 portrait;  margin: 0mm; }";
            return (
                <Layout >
                    <html style={{textAlign: "center", height: "auto", fontFamily: "Garamond", marginLeft: 30}}>
                    <style>{pageStyle}</style>
                    <div>
                        <h3 style={{fontFamily: "Garamond", fontWeight: "bold", fontStyle: "italic",textAlign: "left", marginTop: 180}}>Dr. B.S.Murgan, M.Tech, Ph.D</h3>
                        <h3 style={{fontFamily: "Garamond", fontWeight: "bold", fontStyle: "italic",textAlign: "left", marginTop: 0}}>Principal</h3>
                        <Row justify="space-between">
                            <Col span={12}><h3 style={{textAlign: "left", marginBottom: 20, marginTop: 10, fontFamily: "Garamond"}}>Ref
                                No: {modaldataAccepedApp.reference}</h3></Col>
                            <Col span={12}><h3 style={{textAlign: "left", marginBottom: 20, marginTop: 10, marginLeft:220, fontFamily: "Garamond"}}>Date
                                : {new Date().getDate()} / {new Date().getMonth()+1}/ {new Date().getFullYear()}</h3>
                            </Col>
                        </Row>
                        <h1 style={{textAlign: "center", marginBottom: 20}}>BONAFIDE & FEE STRUCTURE</h1>
                        <h3 style={{textAlign: "justify", marginRight: 90}}>
                            <br/>
                            This is to certify
                            that <strong>{String(modaldataAccepedApp.name).toUpperCase()} {String(modaldataAccepedApp.initial).toUpperCase()}(Reg
                            No : {String(modaldataAccepedApp.regno).toUpperCase()},
                            Aadhar No
                            : {String(modaldataAccepedApp.aadhar_no).toUpperCase()})</strong> {modaldataAccepedApp.gender === "MALE" ? "S" : "D"}/O
                            Mr. {modaldataAccepedApp.father_name} is a
                            bonafide student of our College, Studying
                            in <strong>{modaldataAccepedApp.year} Year {modaldataAccepedApp.branch} {modaldataAccepedApp.program}</strong> during the
                            academic
                            year {new Date().getMonth()+1 <= 5 ? parseInt(new Date().getFullYear() - 1) + " - " + parseInt(new Date().getFullYear()) : parseInt(new Date().getFullYear()) + " - " + parseInt(new Date().getFullYear()+1)}.
                        </h3>
                        <Row justify="space-between">
                            <Col span={18}>
                                <h3 style={{textAlign: "left", marginTop: 28, fontFamily: "Garamond"}}>
                                    Date of Birth : {String(modaldataAccepedApp.dob)}<br/>
                                    Boarding : {modaldataAccepedApp.boarding==="HOSTELLER" ?"HOSTELLER": "DAY SCHOLAR"}<br/>
                                    Graduate : {modaldataAccepedApp.graduate}<br/>
                                    Admission Type : {modaldataAccepedApp.quota}<br/>
                                </h3>
                            </Col>
                            <Col span={6}><img
                                src={config.imageBase+"/"+String(modaldataAccepedApp.regno).toUpperCase()+".jpg"}
                                style={{height: 150, width: 110, marginRight: 60}}/></Col>
                        </Row>
                        <br/>
                        <br/>
                        <h3 style={{textAlign: "left"}}>This certificate is issue for the purpose
                            of {String(modaldataAccepedApp.type).split("_").map((d, i) => (
                                <>{String(d).toUpperCase()} </>
                            ))}
                        </h3>
                        {modaldataAccepedApp.application_type === 'feestructure' ?
                            <Table style={{ width: "90%", fontFamily: "Garamond"}} dataSource={tableDataAccepedApp} columns={tableColumnsAccepedApp}
                                   pagination={false}  /> : (<>
                                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/></>)}
                        <br/>
                        <h3 style={{textAlign: 'right', marginTop: 40, marginRight: 90, fontFamily: "Garamond"}}>PRINCIPAL</h3>
                        <Footer style={{height: 80}}>
                            <Row justify={"space-between"}>
                                <Col span={6}>
                                    <div style={{textAlign: "left",  marginTop: 10}}>
                                        <h3 style={{fontFamily: "Garamond"}}>To:<br/>
                                            {String(modaldataAccepedApp.address).split("\n").map((d, i) => (
                                                <>{String(d).toUpperCase()}</>
                                            ))}
                                        </h3>
                                        <br/>
                                    </div>
                                </Col>
                                <Col span={4}>
                                            <QRCode
                                                size={180}
                                                style={{
                                                    height: "auto",
                                                    maxWidth: "100%",
                                                    width: "100%",
                                                    textAlign: 'right'
                                                }}
                                                value={"https://tlc.mkce.ac.in/ebonafide/fetch/?reference=" + modaldataAccepedApp.reference}
                                                viewBox={`0 0 256 256`}
                                            />
                                </Col>
                            </Row>
                        </Footer>
                    </div>
                    </html>
                </Layout>
            );
        }
    }
    /*class ComponentToPrintBonafide extends React.Component {

        render() {
            const pageStyle = "@page {size: A4 portrait;  margin: 0mm; }";
            return (
                <Layout>
                    <html style={{textAlign: "center", height: "auto", fontFamily: "Garamond", marginLeft: 30}}><style>{pageStyle}</style>
                    <div>
                        <Row justify="space-between" >
                            <Col span={12}><h3 style={{textAlign: "left", marginBottom: 40, marginTop: 180}}>Ref
                                No: {modaldataAccepedApp.reference}</h3></Col>
                            <Col span={12}><h3 style={{textAlign: "left", marginBottom: 40, marginTop: 180, marginLeft:220}}>Date
                                : {new Date().getDate()} / {new Date().getMonth()+1}/ {new Date().getFullYear()}</h3>
                            </Col>
                        </Row>
                        <h1 style={{textAlign: "center", marginBottom: 50}}>BONAFIDE CERTIFICATE</h1>
                        <Row justify="space-between">
                            <Col span={18}>
                                <h2 style={{textAlign: "justify"}}>
                                    <br/>
                                    This is to certify
                                    that <strong>{String(modaldataAccepedApp.name).toUpperCase()} {String(modaldataAccepedApp.initial).toUpperCase()}(Reg
                                    No : {String(modaldataAccepedApp.regno).toUpperCase()},
                                    Aadhar No
                                    : {String(modaldataAccepedApp.aadhar_no).toUpperCase()})</strong> {modaldataAccepedApp.gender === "MALE" ? "S" : "D"}/O
                                    Mr. {modaldataAccepedApp.father_name} is a
                                    bonafide student of our College, Studying
                                    in <strong>{modaldataAccepedApp.year} Year {modaldataAccepedApp.program} {modaldataAccepedApp.department}</strong> during
                                    academic
                                    year {new Date().getMonth()+1 >= 4 ? new Date().getFullYear() + " - " + parseInt(new Date().getFullYear() + 1) : parseInt(new Date().getFullYear() + 1) + " - " + new Date().getFullYear()}.
                                </h2>
                            </Col>
                            <Col span={6}><img
                                src={config.imageBase+"/"+String(modaldataAccepedApp.regno).toUpperCase()+".jpg"}
                                style={{height: 150, width: 120}}/></Col>
                        </Row>
                        <br/>
                        <h2 style={{textAlign: "left"}}>
                            Date of Birth : {modaldataAccepedApp.dob}<br/>
                            Boarding : {modaldataAccepedApp.boarding}<br/>
                            Graduate : {modaldataAccepedApp.graduate}<br/>
                            Admission Type : {modaldataAccepedApp.quota}<br/>
                        </h2>
                        <br/>
                        <h2 style={{textAlign: "left"}}>This certificate is issue for the purpose
                            of {String(modaldataAccepedApp.type).split("_").map((d, i) => (
                                <>{String(d).toUpperCase()} </>
                            ))}
                        </h2>
                        <br/>
                        <br/><br/><br/><br/>
                        <div style={{textAlign: "left", marginLeft: 10}}>
                            <h3>To:<br/>
                                {String(modaldataAccepedApp.address).split("\n").map((d, i) => (
                                    <>{String(d).toUpperCase()}</>
                                ))}
                            </h3>
                            <br/>
                        </div>
                        <br/><br/><br/><br/>
                        <br/>
                        <Footer>
                            <Row>
                                <Col span={8}>
                                    <h3 style={{textAlign: 'left', marginTop: 60}}>PRINCIPAL</h3>
                                </Col>
                                <Col span={16}>
                                    <Row>
                                        <Col style={{marginLeft: 300}}>
                                            <QRCode
                                                size={180}
                                                style={{
                                                    height: "auto",
                                                    maxWidth: "100%",
                                                    width: "100%",
                                                    textAlign: 'right'
                                                }}
                                                value={"https://tlc.mkce.ac.in/ebonafide/fetch/?reference=" + modaldataAccepedApp.reference}
                                                viewBox={`0 0 256 256`}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Footer>
                    </div>
                    </html>
                </Layout>
            );
        }
    }*/


    return (
        <>
            <br/>
            <h2 style={{color: "blueviolet"}}>Pending Applications</h2>
            <div id="pending_applications">
            <Table columns={columnsAppFeeStruct} dataSource={dataAppFeeStruct} scroll={{x: 1300}}/>
            <Modal
                title={String(modaldataAppFeeStruct.type).split("_").map((d, i) => (
                    <>{String(d).toUpperCase()} </>
                ))}
                visible={isModalVisibleAppFeeStruct}
                onOk={handleOkAppFeeStruct}
                onCancel={handleCancelAppFeeStruct}
                footer={[
                    <Button key="Done" onClick={handleCancelAppFeeStruct}>
                        Done
                    </Button>,
                ]}
                width={"80%"}
            >
                <html style={{textAlign: "center"}}>
                <Card>
                    <Row justify="space-between">
                        <Col><h3 style={{textAlign: "left", marginBottom: 40}}>Ref No: {modaldataAppFeeStruct.reference}</h3></Col>
                        <Col><h3 style={{textAlign: "left", marginBottom: 40}}>Date : {new Date(modaldataAppFeeStruct.time).getDate()} / {new Date(modaldataAppFeeStruct.time).getMonth()+1}/ {new Date(modaldataAppFeeStruct.time).getFullYear()}</h3></Col>
                    </Row>
                    <header>
                        <h1 style={{textAlign: "center"}}>{modaldataAppFeeStruct.application_type === "feestructure"? "FEE STRUCTURE" : "BONAFIDE"}</h1>
                    </header>
                    <body>
                    <Row justify="space-between">
                        <Col flex={20}>
                            <h2 style={{textAlign: "justify"}}>
                                This is to certify
                                that {String(modaldataAppFeeStruct.name).toUpperCase()} {String(modaldataAppFeeStruct.initial).toUpperCase()}(Reg
                                No : {String(modaldataAppFeeStruct.regno).toUpperCase()},
                                Aadhar No
                                : {String(modaldataAppFeeStruct.aadhar_no).toUpperCase()}) {modaldataAppFeeStruct.gender === "MALE" ? "S" : "D"}/O
                                Mr. {modaldataAppFeeStruct.father_name} is a
                                bonafide student of our College, Studying
                                in {modaldataAppFeeStruct.year} Year {modaldataAppFeeStruct.branch} {modaldataAppFeeStruct.program} during academic
                                year {new Date().getMonth() >= 4 ? new Date().getFullYear() + " - " + parseInt(new Date().getFullYear() + 1) : parseInt(new Date().getFullYear() + 1) + " - " + new Date().getFullYear()}.
                            </h2>
                        </Col>
                        <Col flex={4}><img
                            src={config.imageBase+"/"+String(modaldataAppFeeStruct.regno).toUpperCase()+".jpg"}
                            style={{height: 180, width: 160}}/></Col>
                    </Row>
                    <br/>
                    <h2 style={{textAlign: "left"}}>
                        Date of Birth : {modaldataAppFeeStruct.dob}<br/>
                        Boarding : {modaldataAppFeeStruct.boarding}<br/>
                        Graduate : {modaldataAppFeeStruct.graduate}<br/>
                        Admission Type : {modaldataAppFeeStruct.quota}<br/>
                    </h2>
                    <br/>
                    <h3>FOR : {String(modaldataAppFeeStruct.type).split("_").map((d, i) => (
                        <>{String(d).toUpperCase()} </>
                    ))}</h3>
                    <br />
                    {modaldataAppFeeStruct.application_type === "feestructure"? (<Table
                        dataSource={tableDataAppFeeStruct}
                        columns={tableColumnsAppFeeStruct}
                        pagination={false}
                    />): ''}
                    <br/>
                    <Form.Item initialValue={"Hello"}>
                        <TextArea
                            placeholder={modaldataAppFeeStruct.address}
                            onChange={e => setAddress(e.target.value)}
                        />
                    </Form.Item>
                    {/*<Form.Item initialValue={"hello"}>*/}
                    {/*    <TextArea defaultValue={modaldataAppFeeStruct.address} onChange={(e)=>{setAddress(e.target.value)}}></TextArea>*/}
                    {/*</Form.Item>*/}
                    <br/>
                    <Button icon={<FileDoneOutlined/>} onClick={() => {
                        handleApproveAppFeeStruct(modaldataAppFeeStruct)
                    }}>Accept</Button>
                    <Button icon={<DeleteFilled/>} danger={true} onClick={() => {
                        handleRejectAppFeeStruct(modaldataAppFeeStruct)
                    }}>Reject</Button>
                    <br/>
                    </body>
                </Card>
                </html>
            </Modal>
            </div>
            <br/>
            <h2 style={{color: "yellowgreen"}}>Accepted Applications</h2>
            <div id="acceptedApplications">
                <Table columns={columnsAccepedApp} dataSource={dataAccepedApp} scroll={{
                    x: 1300
                }}/>
                <Modal
                    title={String(modaldataAccepedApp.type).split("_").map((d, i) => (
                        <>{String(d).toUpperCase()} </>
                    ))}
                    visible={isModalVisibleAccepedApp}
                    onOk={handleOkAccepedApp}
                    onCancel={handleCancelAcceptedApp}
                    footer={[
                        <Button key="Done" onClick={handleCancelAcceptedApp}>
                            Done
                        </Button>,
                    ]}
                    width={"80%"}
                >

                    <html style={{textAlign: "center"}}>
                    <Card>
                        <Row justify="space-between">
                            <Col><h3 style={{textAlign: "left", marginBottom: 40}}>Ref No: {modaldataAccepedApp.reference}</h3></Col>
                            <Col><h3 style={{textAlign: "left", marginBottom: 40}}>Date
                                : {new Date(modaldataAccepedApp.time).getDate()} / {new Date(modaldataAccepedApp.time).getMonth()+1}/ {new Date(modaldataAccepedApp.time).getFullYear()}</h3>
                            </Col>
                        </Row>
                        <header>
                            <h1 style={{textAlign: "center"}}>{modaldataAccepedApp.application_type === "feestructure"? "FEE STRUCTURE" : "BONAFIDE" }</h1>
                        </header>
                        <body>
                        <Row justify="space-between">
                            <Col flex={20}>
                                <h2 style={{textAlign: "justify"}}>
                                    This is to certify
                                    that {String(modaldataAccepedApp.name).toUpperCase()} {String(modaldataAccepedApp.initial).toUpperCase()}(Reg
                                    No : {String(modaldataAccepedApp.regno).toUpperCase()},
                                    Aadhar No
                                    : {String(modaldataAccepedApp.aadhar_no).toUpperCase()}) {modaldataAccepedApp.gender === "MALE" ? "S" : "D"}/O
                                    Mr. {modaldataAccepedApp.father_name} is a
                                    bonafide student of our College, Studying
                                    in {modaldataAccepedApp.year} Year {modaldataAccepedApp.branch} {modaldataAccepedApp.program} during academic
                                    year {new Date().getMonth() >= 4 ? new Date().getFullYear() + " - " + parseInt(new Date().getFullYear() + 1) : parseInt(new Date().getFullYear() + 1) + " - " + new Date().getFullYear()}.
                                </h2>
                            </Col>
                            <Col flex={4}><img
                                src={config.imageBase+"/"+String(modaldataAccepedApp.regno).toUpperCase()+".jpg"}
                                style={{height: 180, width: 160}}/></Col>
                        </Row>
                        <br/>
                        <h2 style={{textAlign: "left"}}>
                            Date of Birth : {modaldataAccepedApp.dob}<br/>
                            Boarding : {modaldataAccepedApp.boarding}<br/>
                            Graduate : {modaldataAccepedApp.graduate}<br/>
                            Admission Type : {modaldataAccepedApp.quota}<br/>
                        </h2>
                        <br/>
                        <br/>
                        <h3>FOR : {String(modaldataAccepedApp.type).split("_").map((d, i) => (
                            <>{String(d).toUpperCase()} </>
                        ))}</h3>
                        <br/>
                        <ReactToPrint
                            trigger={() => <Button style={{backgroundColor: "blueviolet"}} type="primary"
                                                   icon={<PrinterFilled/>}>Print</Button>}
                            content={() => componentRef}
                            pageStyle="{ size: 2.5in 5in }"
                            documentTitle={"Bonafide Application for " + modaldataAccepedApp.name}
                            onAfterPrint={async () => {
                                await axios.post(`${config.serverURL}/update/print`, {reference: modaldataAccepedApp.reference, regno: modaldataAccepedApp.regno, name: modaldataAccepedApp.name, type: modaldataAccepedApp.type, application_type : modaldataAccepedApp.application_type}).then(res => {
                                    axios.post(`${config.serverURL}/admin/applications/accepted`, {}).then((res) => {
                                        setDatasAccepedApp(res.data);
                                    });
                                    axios.post(`${config.serverURL}/admin/applications/printed`, {}).then((res) => {
                                        setDatasPrintedApp(res.data);
                                    });
                                });
                                message.success("Application Printed successfully", 5);
                                setIsModalVisibleAccepedApp(false);
                            }}
                        />
                        <div style={{display: "none"}}>
                                <ComponentToPrintFeeStructure ref={(el) => (componentRef = el)}/>
                        </div>
                        </body>
                    </Card>
                    </html>
                </Modal>
            </div>
            <br/>
            <h2 style={{color: "green"}}>Printed Applications</h2>
            <div id="printedApplications">
                <Table columns={columnsPrintedApp} dataSource={datasPrintedApp} scroll={{
                    x: 1300
                }}/>
                <Modal
                    title={String(modaldataAccepedApp.type).split("_").map((d, i) => (
                        <>{String(d).toUpperCase()} </>
                    ))}
                    visible={isModalVisiblePrintedApp}
                    onOk={handleOkPrintedApp}
                    onCancel={handleCancelAPrintedApp}
                    footer={[
                        <Button key="Done" onClick={handleCancelAPrintedApp}>
                            Done
                        </Button>,
                    ]}
                    width={"80%"}
                >

                    <html style={{textAlign: "center"}}>
                    <Card>
                        <Row justify="space-between">
                            <Col><h3 style={{textAlign: "left", marginBottom: 40}}>Ref No: {modaldataAccepedApp.reference}</h3></Col>
                            <Col><h3 style={{textAlign: "left", marginBottom: 40}}>Date
                                : {new Date(modaldataAccepedApp.time).getDate()} / {new Date(modaldataAccepedApp.time).getMonth()+1} / {new Date(modaldataAccepedApp.time).getFullYear()}</h3>
                            </Col>
                        </Row>
                        <header>
                            <h1 style={{textAlign: "center"}}>{modaldataprintedApp.application_type === "feestructure"? "FEE STRUCTURE" : "BONAFIDE"}</h1>
                        </header>
                        <body>
                        <Row justify="space-between">
                            <Col flex={20}>
                                <h2 style={{textAlign: "justify"}}>
                                    This is to certify
                                    that {String(modaldataAccepedApp.name).toUpperCase()} {String(modaldataAccepedApp.initial).toUpperCase()}(Reg
                                    No : {String(modaldataAccepedApp.regno).toUpperCase()},
                                    Aadhar No
                                    : {String(modaldataAccepedApp.aadhar_no).toUpperCase()}) {modaldataAccepedApp.gender === "MALE" ? "S" : "D"}/O
                                    Mr. {modaldataAccepedApp.father_name} is a
                                    bonafide student of our College, Studying
                                    in {modaldataAccepedApp.year} Year {modaldataAccepedApp.branch} {modaldataAccepedApp.program} during academic
                                    year {new Date().getMonth() >= 4 ? new Date().getFullYear() + " - " + parseInt(new Date().getFullYear() + 1) : parseInt(new Date().getFullYear() + 1) + " - " + new Date().getFullYear()}.
                                </h2>
                            </Col>
                            <Col flex={4}><img
                                src={config.imageBase+"/"+String(modaldataAccepedApp.regno).toUpperCase()+".jpg"}
                                style={{height: 180, width: 160}}/></Col>
                        </Row>
                        <br/>
                        <h2 style={{textAlign: "left"}}>
                            Date of Birth : {modaldataAccepedApp.dob}<br/>
                            Boarding : {modaldataAccepedApp.boarding}<br/>
                            Graduate : {modaldataAccepedApp.graduate}<br/>
                            Admission Type : {modaldataAccepedApp.quota}<br/>
                        </h2>
                        <br/>
                        <br/>
                        <h3>FOR : {String(modaldataAccepedApp.type).split("_").map((d, i) => (
                            <>{String(d).toUpperCase()} </>
                        ))}</h3>
                        <br/>
                        <ReactToPrint
                            trigger={() => <Button style={{backgroundColor: "blueviolet"}} type="primary"
                                                   icon={<PrinterFilled/>}>Print</Button>}
                            content={() => componentRef}
                            pageStyle="{ size: 2.5in 5in }"
                            documentTitle={"Bonafide Application for " + modaldataAccepedApp.name}
                            onAfterPrint={async () => {
                                // message.success("Application Printed successfully", 5);
                                setIsModalVisiblePrintedApp(false);
                                
                            }}
                        />
                        <div style={{display: "none"}}>
                                <ComponentToPrintFeeStructure ref={(el) => (componentRef = el)}/>
                        </div>
                        </body>
                    </Card>
                    </html>
                </Modal>
            </div>
            <br/>
            <h2 style={{color: "red"}}>Rejected Applications</h2>
            <div id="rejectedApplications">
                <Table columns={columnsRejectedApplications} dataSource={dataRejectedApplications} scroll={{x: 1300}}/>
            </div>
            <br/>
        </>
    );

}

export default AdminApplications;