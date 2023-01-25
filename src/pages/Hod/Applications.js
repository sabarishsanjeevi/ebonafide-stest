import {Button, Card, Col, Form, Input, Layout, message, Modal, Row, Space, Table, Tag} from 'antd';
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

function HodApplications() {
    let user = JSON.parse(window.localStorage.getItem("data"));
    setInterval(async() => {
        axios.post(`${config.serverURL}/hod/applications`, {program: user["program"]}).then((res) => {
            setDataAppFeeStructs(res.data);
        });
    }, 300000);
    let componentRef = useRef();

    // Data Hooks
    const [dataAppFeeStructs, setDataAppFeeStructs] = useState([]);
    const [datasAccepedApp, setDatasAccepedApp] = useState([]);
    const [datasRejectedApplications, setDatasRejectedApplications] = useState([]);



    // Modal visibility set hooks
    const [isModalVisibleAppFeeStruct, setIsModalVisibleAppFeeStruct] = useState(false);
    const [isModalVisibleAccepedApp, setIsModalVisibleAccepedApp] = useState(false);



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
                        <Tag color={"green"} key={"approved"}>
                            {"Accepted".toUpperCase()}
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
        }).then((e) => {
            if (e.data.status === 1) {
                // setDataAppFeeStructs(data => data.filter(item => item.reference !== record.reference));
                message.success("Accepted", 0.5);
                axios.post(`${config.serverURL}/hod/applications`, {program: user["program"]}).then((res) => {
                    setDataAppFeeStructs(res.data);
                });
                axios.post(`${config.serverURL}/hod/applications/accepted`, {program: user["program"]}).then((res) => {
                    setDatasAccepedApp(res.data);
                });
                axios.post(`${config.serverURL}/hod/applications/rejected`, {program: user["program"]}).then((res) => {
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
                axios.post(`${config.serverURL}/hod/applications`, {program: user["program"]}).then((res) => {
                    setDataAppFeeStructs(res.data);
                });
                axios.post(`${config.serverURL}/hod/applications/accepted`, {program: user["program"]}).then((res) => {
                    setDatasAccepedApp(res.data);
                });
                axios.post(`${config.serverURL}/hod/applications/rejected`, {program: user["program"]}).then((res) => {
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

    // Use effect Hook to set all initial data fetch...!!
    useEffect((e) => {
        document.title = "All Applications - eBonafide portal";
        axios.post(`${config.serverURL}/hod/applications`, {program: user["program"]}).then((res) => {
            setDataAppFeeStructs(res.data);
        });
        axios.post(`${config.serverURL}/hod/applications/accepted`, {program: user["program"]}).then((res) => {
            setDatasAccepedApp(res.data);
        });
        axios.post(`${config.serverURL}/hod/applications/rejected`, {program: user["program"]}).then((res) => {
            setDatasRejectedApplications(res.data);
        });
    }, []);

    // Data variable set
    const dataAccepedApp = datasAccepedApp;
    const dataAppFeeStruct = dataAppFeeStructs;
    const dataRejectedApplications = datasRejectedApplications;
    const [modaldataAppFeeStruct, setmodaldataAppFeeStruct] = useState({});
    const [modaldataAccepedApp, setmodaldataAccepedApp] = useState({});


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
                    {modaldataAppFeeStruct.type === "intern_ind" ?
                        (<>
                            <h2 style={{textAlign: "justify", marginBottom: 50}}>The following student of our college is
                                studying in {modaldataAppFeeStruct.year} Year {modaldataAppFeeStruct.branch} {modaldataAppFeeStruct.program} branch may kindly be
                                permitted to undergo Internship Training in your organization. This purely for
                                educational
                                purposes and it is a part of the curriculum.</h2>
                            <h3>Student : {modaldataAppFeeStruct.name+" "+modaldataAppFeeStruct.initial+"("+modaldataAppFeeStruct.regno+")"}</h3>
                            <h4>Company : <Card>{modaldataAppFeeStruct.company}</Card></h4>
                        </>)
                        : modaldataAppFeeStruct.type === "intern_grp" ?
                            (<>
                                <h2 style={{textAlign: "justify", marginBottom: 50}}>The following student of our
                                    college is
                                    studying in {modaldataAppFeeStruct.year} Year {modaldataAppFeeStruct.branch} {modaldataAppFeeStruct.program} branch may kindly
                                    be
                                    permitted to undergo Internship Training in your organization. This purely for
                                    educational
                                    purposes and it is a part of the curriculum.</h2>
                                <h3>Students : </h3>
                                <Card>
                                    {modaldataAppFeeStruct.students.map((us, idx)=>(
                                        <h4>{us}</h4>
                                    ))}
                                </Card>
                                <br/>
                                <h4>Company : <Card>{modaldataAppFeeStruct.company}</Card></h4>
                            </>)
                            :
                            (<>
                                    <header>
                                        <h1 style={{textAlign: "center"}}>{modaldataAppFeeStruct.application_type === "bonafide" ? "BONAFIDE CERTIFICATE" : "FEE STRUCTURE"}</h1>
                                    </header>
                                    <Row justify="space-between">
                                        <Col flex={20}>
                                            <h2 style={{textAlign: "justify"}}>
                                                This is to certify
                                                that {String(modaldataAppFeeStruct.name).toUpperCase()} {String(modaldataAppFeeStruct.initial).toUpperCase()}(Reg
                                                No : {String(modaldataAppFeeStruct.regno).toUpperCase()},
                                                Aadhar No
                                                : {String(modaldataAppFeeStruct.aadhar_no).toUpperCase()}) {modaldataAppFeeStruct.gender === "Male" ? "S" : "D"}/O
                                                Mr. {modaldataAppFeeStruct.father_name} is a
                                                bonafide student of our College, Studying
                                                in {modaldataAppFeeStruct.year} Year {modaldataAppFeeStruct.branch} {modaldataAppFeeStruct.program} during
                                                academic
                                                year {modaldataAppFeeStruct.year}.
                                            </h2>
                                        </Col>
                                        <Col flex={4}><img
                                            src={config.imageBase + "/" + String(modaldataAppFeeStruct.regno).toUpperCase() + ".jpg"}
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
                                    <br/>
                                    <h3>FOR : {String(modaldataAppFeeStruct.type).split("_").map((d, i) => (
                                        <>{String(d).toUpperCase()} </>
                                    ))}</h3>
                                </>
                            )}
                    <br/>
                    <h3>FOR : {String(modaldataAppFeeStruct.type).split("_").map((d, i) => (
                        <>{String(d).toUpperCase()} </>
                    ))}</h3>
                    <br/>
                    <Button icon={<FileDoneOutlined/>} onClick={() => {
                        handleApproveAppFeeStruct(modaldataAppFeeStruct)
                    }}>Accept</Button>
                    <Button icon={<DeleteFilled/>} danger={true} onClick={() => {
                        handleRejectAppFeeStruct(modaldataAppFeeStruct)
                    }}>Reject</Button>
                    <br/>
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

export default HodApplications;