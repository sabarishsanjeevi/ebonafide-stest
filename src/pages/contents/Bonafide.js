import React, {useEffect, useState} from "react";
import {Button, Card, Checkbox, Col, Input, message, Row, Select} from "antd";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import config from '../../config.json';
import {Divider} from "antd/es";

const {TextArea} = Input;

const {Option} = Select;

export default function Bonafide() {

    useEffect(() => {
        getDetails();
        document.title = "Apply Bonafide - eBonafide portal"
    }, []);

    const [type, setType] = useState("choose_type");
    const [reference, setReference] = useState(0);
    const [refId, setRefId] = useState(0);
    const [adress, setAdress] = useState("");
    const [interni, setInterni] = useState(false);
    const [internGrp, setInternGrp] = useState(false);
    const [users, setUsers] = useState([]);
    const [no, setNo] = useState(2);
    const [students, setStudents] = useState([]);
    const [company, setCompany] = useState("");
    const [s1, sS1] = useState("");
    const [s2, sS2] = useState("");
    const [s3, sS3] = useState("");
    const [s4, sS4] = useState("");
    const [s5, sS5] = useState("");

    let user = JSON.parse(window.localStorage.getItem("data"));
    //let details = JSON.parse(window.localStorage.getItem("details"));
    const [detail, setDetail] = useState([]);

    const handleChange = async (value) => {
        setType(value);
        let k = value.split("$$");
        if (k[0] === "intern_ind") {
            setInterni(true);
        } else {
            setInterni(false);
        }
        if (k[0] === "intern_grp") {
            setInternGrp(true);
            axios.post(`${config.serverURL}/hod/users`, {"program": user["program"]}).then((res) => {
                let lst = []
                for (let dataKey in res.data) {
                    lst.push({
                        label: res.data[dataKey]["regno"] + "-" + res.data[dataKey]["name"]+" "+ res.data[dataKey]["initial"],
                        value: res.data[dataKey]["name"]+" "+ res.data[dataKey]["initial"] + "(" + res.data[dataKey]["regno"] + ")",
                        disabled: false
                    });
                }
                setUsers(lst);
                users[users.findIndex(x => x.value === user["name"] + "(" + user["regno"] + ")")].disabled = true;
                setUsers(users);
            });
        } else {
            setInternGrp(false);
        }
        let g = await axios.post(`${config.serverURL}/reference`, {"aadhar_no": user["aadhar_no"], "type": k[0]});
        setReference(g.data.count);
        setRefId(k[1]);
        setType(k[0]);
        setAdress(k[2]);
    };


    const getDetails = async () => {
        await axios.get(`${config.serverURL}/type/bonafide`).then(async value => {
            setDetail(value.data)
        });
    }

    const navigator = useNavigate();

    const approve = (e) => {
        if (e.target.checked === true) {
            setDis(false);
        } else {
            setDis(true);
        }
    };

    const submit = async (e) => {
        setDis(true);
        let st = [];
        st.push(user["name"]+" "+user["initial"]+ "(" + user["regno"] + ")");
        st.push(s2);
        st.push(s3);
        st.push(s4);
        st.push(s5);
        setStudents(st);
        message.loading("Applying for " + type)
        const res = await axios.get('https://geolocation-db.com/json/');
        await axios.post(`${config.serverURL}/apply`, {
            "name": user["name"],
            "initial": user["initial"],
            "regno": user["regno"],
            "aadhar_no": user["aadhar_no"],
            "type": type,
            "time": new Date(Date.now()),
            "ip": res.data.IPv4,
            "application_type": "bonafide",
            "photo": user["photo"],
            "graduate": user["graduate"],
            "gender": user["gender"],
            "quota": user["quota"],
            "father_name": user["father_name"],
            "dob": user["dob"],
            "boarding": user["boarding"],
            "year": user["year"],
            "branch": user["branch"],
            "program": user["program"],
            "approved": 0,
            "approved on": Date,
            "approved_by": "UnKnown",
            "address": adress,
            "company": company,
            "students_cnt": no,
            "students": st,
            "reference": `2023/MKCE/06/${user["regno"]}/${user["year"]}/b/${refId}/${reference + 1}`,
        }).then((e) => {
            navigator("/applications");
            message.success("Applied Successfully !");
        });
    }

    const [dis, setDis] = useState(true);

    return (
        <html style={{textAlign: "center"}}>
        <Card style={{width: "80%", marginLeft: "10%", marginRight: "10%", marginTop: "5%", marginBottom: "5%"}}>
            <Row justify="space-between">
                <Col><h3 style={{textAlign: "left", marginBottom: 40}}>Ref No:
                    2022/MKCE/06/{user["regno"]}/{user["year"]}/b/{refId}/{reference + 1}</h3></Col>
                <Col><h3 style={{textAlign: "left", marginBottom: 40}}>Date : {new Date().toLocaleDateString()
                }</h3>
                </Col>
                <Divider/>
            </Row>
            <header>
                <h1 style={{textAlign: "center", marginBottom: 50}}>BONAFIDE CERTIFICATE</h1>
            </header>
            <body>
            {interni === true ? (
                <div>
                    <h2 style={{textAlign: "justify", marginBottom: 50}}>The following student of our college is
                        studying in {user["year"]} Year {user["branch"]} {user["program"]} branch may kindly be
                        permitted to undergo Internship Training in your organization. This purely for educational
                        purposes and it is a part of the curriculum.</h2>
                </div>
            ) : internGrp === true ? (
                <div>
                    <h2 style={{textAlign: "justify", marginBottom: 50}}>The following students of our college is
                        studying in {user["year"]} Year {user["branch"]} {user["program"]} branch may kindly be
                        permitted to undergo Internship Training in your organization. This purely for educational
                        purposes and it is a part of the curriculum.</h2>
                </div>
            ) : (
                <>
                    <h2 style={{textAlign: "justify"}}>
                        This is to certify
                        that {String(user["name"]).toUpperCase()} {String(user["initial"]).toUpperCase()}(Reg No
                        : {String(user["regno"]).toUpperCase()},
                        Aadhar No
                        : {String(user["aadhar_no"]).toUpperCase()}) {user["gender"] === "MALE" ? "S" : "D"}/O
                        Mr. {user["father_name"]} is a
                        bonafide student of our College, Studying
                        in {user["year"]} Year {user["branch"]} {user["program"]} during academic
                        year {new Date().getMonth() >= 4 ? new Date().getFullYear() + " - " + parseInt(new Date().getFullYear() + 1) : parseInt(new Date().getFullYear() + 1) + " - " + new Date().getFullYear()}.
                    </h2>

                    <br/>
                    <Row justify="space-between">
                        <Col flex={4}>
                            <h2 style={{textAlign: "left"}}>
                                Date of Birth : {user["dob"]}<br/>
                                Boarding : {user["boarding"]}<br/>
                                Graduate : {user["graduate"]}<br/>
                                Admission Type : {user["quota"]}<br/>
                            </h2>
                        </Col>
                        <Col flex={4}><img
                            src={config.imageBase + "/" + String(user["regno"]).toLocaleUpperCase() + ".jpg"}
                            style={{height: 180, width: 160}}/></Col>
                    </Row>
                    <br/>
                    <br/>
                </>
            )
            }
            <h2 style={{textAlign: "left"}}>

                This Certificate Applying for the Purpose of <Select style={{width: "60%"}}
                                                                     defaultValue={"choose_type"}
                                                                     onChange={handleChange}>
                <Option value={"choose_type"} disabled={true} selected={true}>Select The Type</Option>
                {detail.map((d, idx) => (
                    <Option value={d["name"] + "$$" + d["id"] + "$$" + d["address"]}>{d["label"]}</Option>
                ))}
            </Select>
            </h2>
            <br/>
            {interni ? <p>
                <h4 style={{marginLeft: "30%", textAlign: "left"}}>Company Details: <span style={{color: "blue"}}><h5>Company Name, Company Address, Company Contract Details.</h5></span>
                </h4>
                <TextArea style={{marginLeft: "30%", marginRight: "30%", width: "40%"}} allowClear={true}
                          status={"warning"} onChange={(e) => setCompany(e.target.value)}/>
                <br/>
            </p> : null}
            {internGrp ? <div>
                <h4 style={{marginLeft: "30%", textAlign: "left"}}>Company Details: <span style={{color: "blue"}}><h5>Company Name, Company Address, Company Contract Details.</h5></span>
                </h4>
                <TextArea style={{marginLeft: "30%", marginRight: "30%", width: "40%"}} allowClear={true}
                          onChange={e => setCompany(e.target.value)}
                          status={"warning"}/>
                <br/>
                <br/>
                <h3>Choose Number of students : <Select defaultValue={2} onSelect={value => setNo(value)}>
                    <Option value={2}>2</Option>
                    <Option value={3}>3</Option>
                    <Option value={4}>4</Option>
                    <Option value={5}>5</Option>
                </Select></h3>
                <br/>
                <br/>
                <div>
                    <h2>Search For Student and Select them <span><h6 style={{color: "red"}}>You can choose the student one time only, reload if disabled.</h6></span>
                    </h2>
                    <Select
                        style={{marginLeft: "20%", marginRight: "20%", width: "60%"}}
                        showSearch={true}
                        disabled={true}
                        defaultValue={user["name"]+" "+user["initial"] + "(" + user["regno"] + ")"}
                        autoClearSearchValue={true}
                        onSelect={value => {
                            users[users.findIndex(x => x.value === user["name"] + "(" + user["regno"] + ")")].disabled = true;
                            setUsers(users);
                            sS1(user["name"] + "(" + user["regno"] + ")");
                        }}
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toUpperCase())
                        }
                        options={users}
                    />
                    <Select
                        style={{marginLeft: "20%", marginRight: "20%", width: "60%"}}
                        showSearch={true}
                        placeholder={"Choose the student 2,  Search with Register No or Name"}
                        autoClearSearchValue={true}
                        onSelect={value => {
                            users[users.findIndex(x => x.value === value)].disabled = true;
                            setUsers(users);
                            sS2(value);
                        }}
                        filterOption={(input, option) => (option?.label ?? '').includes(input.toUpperCase())}
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={users}
                    />
                    <Select
                        disabled={no > 2 ? false : true}
                        style={{marginLeft: "20%", marginRight: "20%", width: "60%"}}
                        showSearch={true}
                        autoClearSearchValue={true}
                        onSelect={value => {
                            users[users.findIndex(x => x.value === value)].disabled = true;
                            setUsers(users);
                            sS3(value);
                        }}
                        placeholder={"Choose the student 3,  Search with Register No or Name"}
                        filterOption={(input, option) => (option?.label ?? '').includes(input.toUpperCase())}
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={users}
                    />
                    <Select
                        disabled={no > 3 ? false : true}
                        style={{marginLeft: "20%", marginRight: "20%", width: "60%"}}
                        showSearch={true}
                        autoClearSearchValue={true}
                        onSelect={value => {
                            users[users.findIndex(x => x.value === value)].disabled = true;
                            setUsers(users);
                            sS4(value);
                        }}
                        placeholder={"Choose the student 4,  Search with Register No or Name"}
                        filterOption={(input, option) => (option?.label ?? '').includes(input.toUpperCase())}
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={users}
                    />
                    <Select
                        disabled={no > 4 ? false : true}
                        style={{marginLeft: "20%", marginRight: "20%", width: "60%"}}
                        showSearch={true}
                        autoClearSearchValue={true}
                        onSelect={value => {
                            users[users.findIndex(x => x.value === value)].disabled = true;
                            setUsers(users);
                            sS5(value);
                        }}
                        placeholder={"Choose the student 5,  Search with Register No or Name"}
                        filterOption={(input, option) => (option?.label ?? '').includes(input.toUpperCase())}
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={users}
                    />
                </div>
            </div> : null}
            <br/>
            <Checkbox onChange={approve}>I here by declare that all the information above are true and I proceed to
                apply.</Checkbox>
            <br/>
            <br/>
            <Button style={{textAlignLast: "center"}} type="primary" disabled={dis} aria-errormessage="please approve"
                    onClick={submit}>Apply</Button>
            </body>
        </Card>
        </html>
    );
}