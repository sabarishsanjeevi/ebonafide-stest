import {Button, Card, Col, Layout, Modal, Row, Table, Tag} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import {Content, Footer} from "antd/lib/layout/layout";
import config from '../../config.json';
import ReactToPrint from "react-to-print";
import {PrinterFilled} from "@ant-design/icons";
import QRCode from "react-qr-code";
import mkceLogo from '../logo.png';
import krLogo from '../kr_logo.png';
import {Image} from "antd/es";


function Application() {

    const [modaldata, setmodaldata] = useState([]);
    let componentRef = useRef();

    const columns = [
        {
            title: 'Reference No',
            dataIndex: 'reference',
            key: 'reference',
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
            title: 'Type',
            dataIndex: 'application_type',
            key: 'application_type',
            render: (_, {application_type}) => {
                if (application_type == "bonafide") {
                    return (<>
                        <Tag color={"blue"} key={application_type}>
                            {application_type.toUpperCase()}
                        </Tag>
                    </>);
                } else {
                    return (<>
                        <Tag color={"green"} key={application_type}>
                            {application_type.toUpperCase()}
                        </Tag>
                    </>)
                }
            },
            sorter: (a, b) => a.application_type - b.application_type,
        },
        {
            title: 'Applied For',
            key: 'type',
            dataIndex: 'type',
            render: (_, {type}) => {
                return (
                    <>
                        {String(type).split("_").map((d, i) => (
                            <>{String(d).toUpperCase()} </>
                        ))}
                    </>
                );
            }
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
                        if (approved === 3) {
                            return (
                                <Tag color={"green"} key={"printed"}>
                                    {"Accepted & Printed".toUpperCase()}
                                </Tag>
                            );
                        } else {
                            return (
                                <Tag color={"geekblue"} key={"pending"}>
                                    {"Pending".toUpperCase()}
                                </Tag>
                            );
                        }
                    }
                }
            },
        },
        {
            title: 'Applied On',
            key: 'time',
            dataIndex: 'time',
            render: (_, {time}) => {
                return (<>
                    {new Date(time).getDate() + "/" + parseInt(new Date(time).getMonth() + 1) + "/" + new Date(time).getFullYear()}
                </>)
            },
        },
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'id',
            render: (index, record, application_type, approved) => {
                return (<Button type="primary" onClick={() => showModal(record)}>
                    View
                </Button>)
            },
        },
    ];

    const [datas, setDatas] = useState([]);

    let user = JSON.parse(window.localStorage.getItem("data"));

    useEffect((e) => {
        document.title = "All Applications - eBonafide portal"
        axios.post(`${config.serverURL}/applications`, {"aadhar_no": user["aadhar_no"]}).then((res) => {
            setDatas(res.data);
        });
    }, []);

    const data = datas;

    class ComponentToPrintBonafide extends React.Component {

        render() {
            const pageStyle = "@page {size: A4 portrait;  margin: 0mm; }";
            return (
                <Layout>
                    <html style={{textAlign: "center", height: "auto", fontFamily: "Garamond", marginLeft: 30}}>
                    <style>{pageStyle}</style>
                    <div>
                        <Row justify={"space-between"}>
                            <Col span={2}>
                                <Image src={mkceLogo} height={80} width={280}
                                       style={{textAlign: "left", marginTop: 40, marginRight: 220, marginLeft: 0}}/>
                            </Col>
                            <Col span={12}>
                                <Image src={krLogo} height={40} width={100}
                                       style={{textAlign: "left", marginTop: 60, marginLeft: 110, }}/>
                            </Col>
                        </Row>
                        <h3 style={{fontFamily: "Garamond", fontWeight: "bold", fontStyle: "italic",textAlign: "left", marginTop: 50}}>Dr. B.S.Murgan, M.Tech, Ph.D</h3>
                        <h3 style={{fontFamily: "Garamond", fontWeight: "bold", fontStyle: "italic",textAlign: "left", marginTop: 0}}>Principal</h3>
                        <Row justify="space-between">
                            <Col span={12}><h3 style={{textAlign: "left", marginBottom: 40, marginTop: 20, fontFamily: "Garamond",}}>Ref
                                No: {modaldata.reference}</h3></Col>
                            <Col span={12}><h3
                                style={{textAlign: "left", marginBottom: 40, marginTop: 20, marginLeft: 220, fontFamily: "Garamond",}}>Date
                                : {new Date().getDate()} / {new Date().getMonth() + 1}/ {new Date().getFullYear()}</h3>
                            </Col>
                        </Row>
                        <h2 style={{textAlign: "center", marginBottom: 50}}>BONAFIDE CERTIFICATE</h2>
                        <h2 style={{textAlign: "justify", marginRight: 90}}>
                            <br/>
                            This is to certify
                            that <strong>{String(modaldata.name).toUpperCase()} {String(modaldata.initial).toUpperCase()}(Reg
                            No : {String(modaldata.regno).toUpperCase()},
                            Aadhar No
                            : {String(modaldata.aadhar_no).toUpperCase()})</strong> {modaldata.gender === "MALE" ? "S" : "D"}/O
                            Mr. {modaldata.father_name} is a
                            bonafide student of our College, Studying
                            in <strong>{modaldata.year} Year {modaldata.branch} {modaldata.program}</strong> during
                            academic
                            year {new Date().getMonth()+1 <= 5 ? parseInt(new Date().getFullYear() - 1) + " - " + parseInt(new Date().getFullYear()) : parseInt(new Date().getFullYear()) + " - " + parseInt(new Date().getFullYear()+1)}.
                        </h2>
                        <Row justify="space-between">
                            <Col span={18}>
                                <h2 style={{textAlign: "left", marginTop: 28, fontFamily: "Garamond",}}>
                                    Date of Birth : {modaldata.dob}<br/>
                                    Boarding : {modaldata.boarding}<br/>
                                    Graduate : {modaldata.graduate}<br/>
                                    Admission Type : {modaldata.quota}<br/>
                                </h2>
                            </Col>
                            <Col span={6}><img
                                src={config.imageBase + "/" + String(modaldata.regno).toUpperCase() + ".jpg"}
                                style={{height: 150, width: 120, marginRight: 90}}/></Col>
                        </Row>
                        <br/>
                        <br/>
                        <h2 style={{textAlign: "left", fontFamily: "Garamond",}}>This certificate is issue for the purpose
                            of {String(modaldata.type).split("_").map((d, i) => (
                                <>{String(d).toUpperCase()} </>
                            ))}
                        </h2>
                        <br/>
                        <br/><br/><br/><br/>
                        <h3 style={{textAlign: 'right', marginTop: 60, marginRight: 90,fontFamily: "Garamond",}}>PRINCIPAL</h3>
                        <br/><br/><br/><br/>
                        <br/>
                        <Footer>
                            <Row justify={"space-between"}>
                                <Col span={8}>
                                    <div style={{textAlign: "left", marginLeft: 0}}>
                                        <h3 style={{textAlign: "left", fontFamily: "Garamond",}}>To:<br/>
                                            {String(modaldata.address).split("\n").map((d, i) => (
                                                <>{String(d).toUpperCase()}</>
                                            ))}
                                        </h3>
                                        <br/>
                                    </div>
                                </Col>
                                <Col span={4}>
                                    <Row>
                                        <Col style={{textAlign: "right"}}>
                                            <QRCode
                                                size={180}
                                                style={{
                                                    height: "auto",
                                                    maxWidth: "100%",
                                                    width: "100%",
                                                    textAlign: 'right'
                                                }}
                                                value={"https://tlc.mkce.ac.in/ebonafide/fetch/?reference=" + modaldata.reference}
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
    }

    class ComponentToPrintBonafideIntern extends React.Component {

        render() {
            const pageStyle = "@page {size: A4 portrait;  margin: 0mm; }";
            return (
                <Layout>
                    <html style={{textAlign: "center", height: "auto", fontFamily: "Garamond", marginLeft: 30}}>
                    <style>{pageStyle}</style>
                    <div>
                        <Row justify={"space-between"}>
                            <Col span={2}>
                                <Image src={mkceLogo} height={80} width={280}
                                       style={{textAlign: "left", marginTop: 40, marginRight: 220, marginLeft: 0}}/>
                            </Col>
                            <Col span={12}>
                                <Image src={krLogo} height={40} width={100}
                                       style={{textAlign: "left", marginTop: 60, marginLeft: 110}}/>
                            </Col>
                        </Row>
                        <h3 style={{fontFamily: "Garamond", fontWeight: "bold", fontStyle: "italic",textAlign: "left", marginTop: 50}}>Dr. B.S.Murgan, M.Tech, Ph.D</h3>
                        <h3 style={{fontFamily: "Garamond", fontWeight: "bold", fontStyle: "italic",textAlign: "left", marginTop: 0}}>Principal</h3>
                        <Row justify="space-between">
                            <Col span={12}><h3 style={{textAlign: "left", marginBottom: 40, marginTop: 20, fontFamily: "Garamond",}}>Ref
                                No: {modaldata.reference}</h3></Col>
                            <Col span={12}><h3
                                style={{textAlign: "left", marginBottom: 40, marginTop: 20, marginLeft: 220, fontFamily: "Garamond",}}>Date
                                : {new Date().getDate()} / {new Date().getMonth() + 1}/ {new Date().getFullYear()}</h3>
                            </Col>
                        </Row>
                        <h3 style={{textAlign: "left"}}>To</h3>
                        <h3 style={{paddingLeft: 20, width: 170, textAlign: "left"}}>{modaldata.company}</h3>
                        <br />
                        <br />
                        <h3 style={{textAlign: "left"}}>Dear Sir/Madam,</h3>
                        <h3 style={{textAlign: "justify", marginRight: 90}}><span style={{paddingLeft: 20}}></span>The following student{modaldata.type === "intern_grp"?"s":null} of our
                            college is
                            studying in <strong>{user["year"]} Year</strong> of <strong>{user["branch"]} {user["program"]}</strong> branch may kindly
                            be
                            permitted to undergo Internship Training in your organization. This purely for
                            educational
                            purposes and it is a part of the curriculum.</h3>
                        <br/>
                        <br/>
                        <h4 style={{textAlign: "left", paddingLeft: 20 }}>
                            {modaldata.students.map(names)}
                        </h4>
                        <br/>
                        <br/><br/><br/><h3 style={{textAlign: "center"}}>Thanking you</h3><br/>
                        <h3 style={{textAlign:"right", marginRight: 90}}>Yours faithfully,</h3>
                        <h3 style={{textAlign: 'right', marginTop: 60, marginRight: 90}}>PRINCIPAL</h3>
                        <br/><br/><br/><br/>
                        <br/>
                        <Footer>
                            <Row justify={"space-between"}>
                                <Col span={8}>
                                    <div style={{textAlign: "left", marginLeft: 0}}>
                                        {/*<h3 style={{textAlign: "left", fontFamily: "Garamond",}}>To:<br/>
                                            {String(modaldata.address).split("\n").map((d, i) => (
                                                <>{String(d).toUpperCase()}</>
                                            ))}
                                        </h3>
                                        <br/>*/}
                                    </div>
                                </Col>
                                <Col span={4}>
                                    <Row>
                                        <Col style={{textAlign: "right"}}>
                                            <QRCode
                                                size={180}
                                                style={{
                                                    height: "auto",
                                                    maxWidth: "100%",
                                                    width: "100%",
                                                    textAlign: 'right'
                                                }}
                                                value={"https://tlc.mkce.ac.in/ebonafide/fetch/?reference=" + modaldata.reference}
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

            function names(d, i) {
                if (d !== "") {
                    return <h3>{i + 1}.{String(d).toUpperCase()}</h3>;
                }
            }
        }
    }

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = (record) => {
        setmodaldata(record);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Content style={{padding: 50}}>
                <Table dataSource={data} columns={columns} scroll={{x: 1300}}/>
            </Content>
            {/*<Modal
                title={String(modaldata.type).split("_").map((d, i) => (
                    <>{String(d).toUpperCase()} </>
                ))}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="Done" onClick={handleCancel}>
                        Done
                    </Button>,
                ]}
                width={"80%"}
            >

                <html style={{textAlign: "center"}}>
                <Card>
                    <Row justify="space-between">
                        <Col><h3 style={{textAlign: "left", marginBottom: 40}}>Ref No: {modaldata.reference}</h3></Col>
                        <Col><h3 style={{textAlign: "left", marginBottom: 40}}>Date
                            : {new Date(modaldata.time).getDate() + "/" + parseInt(new Date(modaldata.time).getMonth() + 1) + "/" + new Date(modaldata.time).getFullYear()}</h3>
                        </Col>
                    </Row>
                    <header>
                        <h1 style={{textAlign: "center"}}>{modaldata.application_type === "bonafide" ? "BONAFIDE CERTIFICATE" : "FEE STRUCTURE"}</h1>
                    </header>
                    <body>
                            <h2 style={{textAlign: "justify"}}>

                            </h2>
                    <br/>
                    <h2 style={{textAlign: "left"}}>
                        Date of Birth : {modaldata.dob}<br/>
                        Boarding : {modaldata.boarding}<br/>
                        Graduate : {modaldata.graduate}<br/>
                        Admission Type : {modaldata.quota}<br/>
                    </h2>
                    <br/>
                    <br/>
                    <h3>FOR : {String(modaldata.type).split("_").map((d, i) => (
                        <>{String(d).toUpperCase()} </>
                    ))}</h3>
                    <br/>
                            {modaldata.type === "intern_ind" || modaldata.type === "intern_grp"? <p>Intern</p>: <p>None</p>}
                    {modaldata.type === "intern_ind" || modaldata.type === "intern_grp"?
                        <>{(modaldata.approved === 1 || modaldata.approved === 3) && modaldata.application_type === "bonafide" ? (
                            <ReactToPrint
                                trigger={() => <Button style={{backgroundColor: "blueviolet"}} type="primary"
                                                       icon={<PrinterFilled/>}>Print</Button>}
                                content={() => componentRef}
                                pageStyle="{ size: 2.5in 5in }"
                                documentTitle={"Bonafide Application for " + modaldata.name}
                                onAfterPrint={async () => {
                                    // message.success("Application Printed successfully", 5);
                                    setIsModalVisible(false);

                                }}
                            />
                        ) : ""}
                            <div style={{display: "none"}}>
                                <ComponentToPrintBonafideIntern ref={(el) => (componentRef = el)}/>
                            </div>
                        </>
                        :
                        (
                            <>{(modaldata.approved === 1 || modaldata.approved === 3) && modaldata.application_type === "bonafide" ? (
                            <ReactToPrint
                                trigger={() => <Button style={{backgroundColor: "blueviolet"}} type="primary"
                                                       icon={<PrinterFilled/>}>Print</Button>}
                                content={() => componentRef}
                                pageStyle="{ size: 2.5in 5in }"
                                documentTitle={"Bonafide Application for " + modaldata.name}
                                onAfterPrint={async () => {
                                    // message.success("Application Printed successfully", 5);
                                    setIsModalVisible(false);

                                }}
                            />
                        ) : ""}
                        <div style={{display: "none"}}>
                        <ComponentToPrintBonafide ref={(el) => (componentRef = el)}/>
                        </div>
                                </>)
                    }
                    </body>
                </Card>
                </html>
            </Modal>*/}
            <Modal
                title={String(modaldata.type).split("_").map((d, i) => (
                    <>{String(d).toUpperCase()} </>
                ))}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="Done" onClick={handleCancel}>
                        Done
                    </Button>,
                ]}
                width={"80%"}
            >

                <html style={{textAlign: "center"}}>
                <Card>
                    <Row justify="space-between">
                        <Col><h3 style={{textAlign: "left", marginBottom: 40}}>Ref No: {modaldata.reference}</h3></Col>
                        <Col><h3 style={{textAlign: "left", marginBottom: 40}}>Date
                            : {new Date(modaldata.time).getDate() + "/" + parseInt(new Date(modaldata.time).getMonth() + 1) + "/" + new Date(modaldata.time).getFullYear()}</h3>
                        </Col>
                    </Row>
                    {modaldata.type === "intern_ind" ?
                        (<>
                            <h2 style={{textAlign: "justify", marginBottom: 50}}>The following student of our college is
                                studying in {user["year"]} Year {user["branch"]} {user["program"]} branch may kindly be
                                permitted to undergo Internship Training in your organization. This purely for
                                educational
                                purposes and it is a part of the curriculum.</h2>
                            <h3>Student : {modaldata.name+" "+modaldata.initial+"("+modaldata.regno+")"}</h3>
                            <h4>Company : <Card>{modaldata.company}</Card></h4>
                        </>)
                        : modaldata.type === "intern_grp" ?
                            (<>
                                <h2 style={{textAlign: "justify", marginBottom: 50}}>The following student of our
                                    college is
                                    studying in {user["year"]} Year {user["branch"]} {user["program"]} branch may kindly
                                    be
                                    permitted to undergo Internship Training in your organization. This purely for
                                    educational
                                    purposes and it is a part of the curriculum.</h2>
                                <h3>Students : </h3>
                                <Card>
                                    {modaldata.students.map((us, idx)=>(
                                        <h4>{us}</h4>
                                    ))}
                                </Card>
                                <br/>
                                <h4>Company : <Card>{modaldata.company}</Card></h4>
                            </>)
                            :
                            (<>
                                    <header>
                                        <h1 style={{textAlign: "center"}}>{modaldata.application_type === "bonafide" ? "BONAFIDE CERTIFICATE" : "FEE STRUCTURE"}</h1>
                                    </header>
                                    <Row justify="space-between">
                                        <Col flex={20}>
                                            <h2 style={{textAlign: "justify"}}>
                                                This is to certify
                                                that {String(modaldata.name).toUpperCase()} {String(modaldata.initial).toUpperCase()}(Reg
                                                No : {String(modaldata.regno).toUpperCase()},
                                                Aadhar No
                                                : {String(modaldata.aadhar_no).toUpperCase()}) {modaldata.gender === "Male" ? "S" : "D"}/O
                                                Mr. {modaldata.father_name} is a
                                                bonafide student of our College, Studying
                                                in {modaldata.year} Year {modaldata.branch} {modaldata.program} during
                                                academic
                                                year {modaldata.year}.
                                            </h2>
                                        </Col>
                                        <Col flex={4}><img
                                            src={config.imageBase + "/" + String(modaldata.regno).toUpperCase() + ".jpg"}
                                            style={{height: 180, width: 160}}/></Col>
                                    </Row>
                                    <br/>
                                    <h2 style={{textAlign: "left"}}>
                                        Date of Birth : {modaldata.dob}<br/>
                                        Boarding : {modaldata.boarding}<br/>
                                        Graduate : {modaldata.graduate}<br/>
                                        Admission Type : {modaldata.quota}<br/>
                                    </h2>
                                    <br/>
                                    <br/>
                                    <h3>FOR : {String(modaldata.type).split("_").map((d, i) => (
                                        <>{String(d).toUpperCase()} </>
                                    ))}</h3>
                                </>
                            )}
                    <br/>
                    {modaldata.type === "intern_ind" || modaldata.type === "intern_grp"?
                        <>{(modaldata.approved === 1 || modaldata.approved === 3) && modaldata.application_type === "bonafide" ? (
                            <ReactToPrint
                                trigger={() => <Button style={{backgroundColor: "blueviolet"}} type="primary"
                                                       icon={<PrinterFilled/>}>Print</Button>}
                                content={() => componentRef}
                                pageStyle="{ size: 2.5in 5in }"
                                documentTitle={"Bonafide Application for " + modaldata.name}
                                onAfterPrint={async () => {
                                    // message.success("Application Printed successfully", 5);
                                    setIsModalVisible(false);

                                }}
                            />
                        ) : ""}
                            <div style={{display: "none"}}>
                                <ComponentToPrintBonafideIntern ref={(el) => (componentRef = el)}/>
                            </div>
                        </>
                        :
                        (
                            <>{(modaldata.approved === 1 || modaldata.approved === 3) && modaldata.application_type === "bonafide" ? (
                                <ReactToPrint
                                    trigger={() => <Button style={{backgroundColor: "blueviolet"}} type="primary"
                                                           icon={<PrinterFilled/>}>Print</Button>}
                                    content={() => componentRef}
                                    pageStyle="{ size: 2.5in 5in }"
                                    documentTitle={"Bonafide Application for " + modaldata.name}
                                    onAfterPrint={async () => {
                                        // message.success("Application Printed successfully", 5);
                                        setIsModalVisible(false);

                                    }}
                                />
                            ) : ""}
                                <div style={{display: "none"}}>
                                    <ComponentToPrintBonafide ref={(el) => (componentRef = el)}/>
                                </div>
                            </>)
                    }
                </Card>
                </html>
            </Modal>
            <Footer></Footer>
        </>
    );

}

export default Application;