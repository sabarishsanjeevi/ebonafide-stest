import React, {useEffect, useRef, useState} from "react";
import {Button, Card, Col, Layout, Row} from "antd";
import {useNavigate} from "react-router-dom";
import {Divider} from "antd/es";
import axios from "axios";
import config from '../../config.json';


export const Dashboard = () => {
    let data = JSON.parse(window.localStorage.getItem("data"));
    const [dash, setDash] = useState({
        "applications": 0,
        "accepted": 0,
        "rejected": 0,
        "pending": 0
    });

    useEffect(() => {
        axios.post(`${config.serverURL}/student/dash`, {"aadhar_no": data['aadhar_no']}).then(res => {
            setDash(res.data);
        });
        document.title = "Student Dashboard - eBonafide portal"
    }, []);


    useRef();
    const navigate = useNavigate();


    return (
        <>
            <Layout className="main-layout">
                <h1 style={{fontSize: 25, textAlign: "center", textDecoration: "gainsboro"}}>eBonafide Application
                    Portal</h1>
                <Divider/>
                <Row>
                    <Col flex={12} style={{textAlign: "center"}}>
                        <img
                            src={config.imageBase+"/"+String(data["regno"]).toLocaleUpperCase()+".jpg"}
                            style={{height: 180, width: 160}}/>
                    </Col>
                    <Col flex={12}>
                        <div>
                            <Row>
                                <Col span={6}>
                                    <h3>NAME</h3>
                                    <h3>REGISTER NO</h3>
                                    <h3>AADHAR NO</h3>
                                    <h3>Date Of Birth</h3>
                                    <h3>BOARDING</h3>
                                    <h3>GRADUATE TYPE</h3>
                                </Col>
                                <Divider type={"vertical"}/>
                                <Col flex={6}>
                                    <h3>{data["name"].toUpperCase()} {data["initial"].toUpperCase()}</h3>
                                    <h3>{data["regno"].toUpperCase()}</h3>
                                    <h3>{data["aadhar_no"]}</h3>
                                    <h3>{data["dob"]}</h3>
                                    <h3>{data["boarding"].toUpperCase()}</h3>
                                    <h3>{data["graduate"]}</h3>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
                {/*Cards*/}
                <Divider/>
                <div className="site-card-wrapper">
                    <Row gutter={16}>
                        <Col span={12} style={{textAlign: "center"}}>
                            <Card title="Apply For Bonafide" bordered={false}>
                                <Button type={"primary"} style={{background: "blueviolet"}} onClick={() => {
                                    navigate('/bonafide')
                                }}>Apply</Button>
                            </Card>
                        </Col>
                        <Col span={12} style={{textAlign: "center"}}>
                            <Card title="Apply For Fee Structure" bordered={false}>
                                <Button type={"primary"} style={{background: "yellowgreen"}} onClick={() => {
                                    navigate('/feeStructure')
                                }} >Apply</Button>
                            </Card>
                        </Col>
                    </Row>
                </div>
                <Divider/>
                <div className="site-card-wrapper">
                    <Row gutter={16}>
                        <Col flex={6} style={{textAlign: "center"}}>
                            <Card title="Printed Applications" bordered={false}>
                                <h1 type={"primary"} style={{color: "blueviolet", fontSize: 50}} onClick={() => {
                                    navigate('/applications')
                                }}>{dash.applications-(dash.pending+dash.accepted+dash.rejected)}</h1>
                            </Card>
                        </Col>
                        <Col flex={6} style={{textAlign: "center"}}>
                            <Card title="Pending Applications" bordered={false}>
                                <h1 type={"primary"} style={{color: "blue", fontSize: 50}} onClick={() => {
                                    navigate('/applications')
                                }}>{dash.pending}</h1>
                            </Card>
                        </Col>
                        <Col flex={6} style={{textAlign: "center"}}>
                            <Card title="Accepted Applications" bordered={false}>
                                <h1 type={"primary"} style={{color: "green", fontSize: 50}} onClick={() => {
                                    navigate('/applications')
                                }}>{dash.accepted}</h1>
                            </Card>
                        </Col>
                        <Col flex={6} style={{textAlign: "center"}}>
                            <Card title="Rejected Applications" bordered={false}>
                                <h1 type={"primary"} style={{color: "red", fontSize: 50}} onClick={() => {
                                    navigate('/applications')
                                }}>{dash.rejected}</h1>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Layout>
        </>
    );
}