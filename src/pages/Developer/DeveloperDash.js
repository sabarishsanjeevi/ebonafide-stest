import React, {useEffect, useRef, useState} from "react";
import {Button, Card, Col, Layout, Row} from "antd";
import {useNavigate} from "react-router-dom";
import {Divider} from "antd/es";
import axios from "axios";
import config from '../../config.json';


export const DeveloperDash = () => {
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
        document.title = "Developer Dashboard - eBonafide Portal"
        axios.post(`${config.serverURL}/developer/dash`, {}).then(res => {
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
                                    <h3>DOB</h3>
                                    <h3>AADHAR NO</h3>
                                </Col>
                                <Divider type={"vertical"}/>
                                <Col flex={6}>
                                    <h3>{data["name"].toUpperCase()}</h3>
                                    <h3>{data["dob"].toUpperCase()}</h3>
                                    <h3>{data["aadhar_no"]}</h3>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
                {/*Cards*/}
                <Divider/>
                <div className="site-card-wrapper">
                    <Row>
                        <Col flex={12} style={{textAlign: "center"}}>
                            <Card title="View Categories" bordered={false}>
                                <Button type={"primary"} style={{background: "blueviolet"}} onClick={() => {
                                    navigate('/Categories')
                                }}>View</Button>
                            </Card>
                        </Col>
                        <Col flex={12} style={{textAlign: "center"}}>
                            <Card title="View Users" bordered={false}>
                                <Button type={"primary"} style={{background: "blueviolet"}} onClick={() => {
                                    navigate('/Developer/Users')
                                }}>View</Button>
                            </Card>
                        </Col>
                    </Row>
                </div>
                <Divider />
                <div className="site-card-wrapper">
                    <Row gutter={16}>
                        <Col span={12} style={{textAlign: "center"}}>
                            <Card title="Bonafide Categories" bordered={false}>
                                <h1 type={"primary"} style={{color: "blueviolet", fontSize: 50}} onClick={() => {
                                    navigate('/Categories')
                                }}>{dash.bonafideCategories}</h1>
                            </Card>
                        </Col>
                        <Col span={12} style={{textAlign: "center"}}>
                            <Card title="Fee Structures Categories" bordered={false}>
                                <h1 type={"primary"} style={{color: "blueviolet", fontSize: 50}} onClick={() => {
                                    navigate('/Categories')
                                }}>{dash.feestructureCategories}</h1>
                            </Card>
                        </Col>
                    </Row>
                </div>
                <Divider/>
            </Layout>
        </>
    );
}