import React, {useEffect, useRef, useState} from "react";
import {Button, Card, Col, Layout, Row} from "antd";
import {useNavigate} from "react-router-dom";
import {Divider} from "antd/es";
import axios from "axios";
import config from './../../config.json';

export const HodDash = () => {
    let data = JSON.parse(window.localStorage.getItem("data"));

    useRef();
    const navigate = useNavigate();

    const [dash, setDash] = useState({
        "applications": 0,
        "accepted": 0,
        "rejected": 0,
        "pending": 0,
    });

    useEffect(() => {
        document.title = "Admin Dashboard - eBonafide portal"
        axios.post(`${config.serverURL}/hod/dash`, {program: data["program"]}).then(res => {
            setDash(res.data);
        });
    }, []);



    return (
        <>
            <Layout className="main-layout">
                <h1 style={{fontSize: 25, textAlign: "center", textDecoration: "gainsboro"}}>eBonafide Application
                    Portal</h1>
                <Divider/>
                <Row>
                    <Col flex={12} style={{textAlign: "center"}}>
                        <img
                            src="https://traditionalyoga.s3.us-west-2.amazonaws.com/wp-content/uploads/2020/08/10035151/pp-size.jpeg"
                            style={{height: 180, width: 160}}/>
                    </Col>
                    <Col flex={12}>
                        <div>
                            <Row>
                                <Col span={6}>
                                    <h3>NAME</h3>
                                    <h3>AADHAR NO</h3>
                                </Col>
                                <Divider type={"vertical"}/>
                                <Col flex={6}>
                                    <h3>{data["name"].toUpperCase()}</h3>
                                    <h3>{data["aadhar_no"]}</h3>
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
                            <Card title="Accepted Bonafides" bordered={false}>
                                <Button type={"primary"} style={{background: "green"}} onClick={() => {
                                    navigate('/Hod/Applications')
                                }}>View</Button>
                            </Card>
                        </Col>
                        <Col span={12} style={{textAlign: "center"}}>
                            <Card title="Rejected Bonafides" bordered={false}>
                                <Button type={"primary"} style={{background: "red"}} onClick={() => {
                                    navigate('/Hod/Applications')
                                }}>View</Button>
                            </Card>
                        </Col>
                    </Row>
                </div>
                <Divider/>
                <div className="site-card-wrapper">
                    <Row gutter={16}>
                        <Col flex={4} style={{textAlign: "center"}}>
                            <Card title="Total Applications" bordered={false}>
                                <h1 type={"primary"} style={{color: "blueviolet", fontSize: 50}} onClick={() => {
                                    navigate('/Hod/Applications')
                                }}>{dash.applications}</h1>
                            </Card>
                        </Col>
                        <Col flex={4} style={{textAlign: "center"}}>
                            <Card title="Pending Applications" bordered={false}>
                                <h1 type={"primary"} style={{color: "cyan", fontSize: 50}} onClick={() => {
                                    navigate('/Hod/Applications')
                                }}>{dash.pending}</h1>
                            </Card>
                        </Col>
                        <Col flex={4} style={{textAlign: "center"}}>
                            <Card title="Accepted Applications" bordered={false}>
                                <h1 type={"primary"} style={{color: "yellow", fontSize: 50}} onClick={() => {
                                    navigate('/Hod/Applications')
                                }}>{dash.accepted}</h1>
                            </Card>
                        </Col>
                        <Col flex={4} style={{textAlign: "center"}}>
                            <Card title="Rejected Applications" bordered={false}>
                                <h1 type={"primary"} style={{color: "red", fontSize: 50}} onClick={() => {
                                    navigate('/Hod/Applications')
                                }}>{dash.rejected}</h1>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Layout>
        </>
    );
}