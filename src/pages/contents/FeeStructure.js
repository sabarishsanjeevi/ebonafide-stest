import React, {useEffect, useState} from "react";
import {Button, Card, Checkbox, Col, message, Row, Select, Table, Input} from "antd";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import config from '../../config.json';
const {TextArea} = Input;

const {Option} = Select;

export default function FeeStructure() {

    const [type, setType] = useState("choose_type");
    const [reference, setReference] = useState(0);
    const [refId, setRefId] = useState(0);
    const [adress, setAdress] = useState("");
    const [details, setDetails] = useState([]);
    useEffect(() => {
        axios.post(`${config.serverURL}/categories/feestructure`, {}).then(res => {
            setDetails(res.data);
            
        });
        document.title = "Apply Fee Structure - eBonafide portal"
    }, [])

    const handleChange = async (value) => {
        
        setType(value);
        let k = value.split("$$");
        let g = await axios.post(`${config.serverURL}/reference`, {"aadhar_no": user["aadhar_no"], "type": k[0]});
        setReference(g.data.count);
        setRefId(k[1]);
        setType(k[0]);
        setAdress(k[2]);
    };

    const navigator = useNavigate();

    let user = JSON.parse(window.localStorage.getItem("data"));


    const approve = (e) => {
        if (e.target.checked === true) {
            setDis(false);
        } else {
            setDis(true);
        }
    };

    const submit = async (e) => {
        setDis(true);
        const res = await axios.get('https://geolocation-db.com/json/');

        await axios.post(`${config.serverURL}/apply`, {
            "name": user["name"],
            "initial": user["initial"],
            "regno": user["regno"],
            "aadhar_no": user["aadhar_no"],
            "type": type,
            "time": new Date(Date.now()),
            "ip": res.data.IPv4,
            "application_type": "feestructure",
            "fees": obj,
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
            "address": adress,
            "approved_by": "UnKnown",
            "reference": `2023/MKCE/06/${user["regno"]}/${user["year"]}/f/${refId}/${reference + 1}`,
        }).then((e) => {
            message.success("Applied Successfully !");
            message.info("Redirecting to Applications");
            navigator("/applications");
        })
    }

    const columns = [
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
    ];

    const [dis, setDis] = useState(true);

    const [_1c, _1sc] = useState(false);
    const [_2c, _2sc] = useState(false);
    const [_3c, _3sc] = useState(false);
    const [_4c, _4sc] = useState(false);
    const [_1h, _1sh] = useState(false);
    const [_2h, _2sh] = useState(false);
    const [_3h, _3sh] = useState(false);
    const [_4h, _4sh] = useState(false);
    const [_1b, _1sb] = useState(false);
    const [_2b, _2sb] = useState(false);
    const [_3b, _3sb] = useState(false);
    const [_4b, _4sb] = useState(false);
    const [_1bf, _1sbf] = useState(false);
    const [_2bf, _2sbf] = useState(false);
    const [_3bf, _3sbf] = useState(false);
    const [_4bf, _4sbf] = useState(false);

    let data = [];
    if (user['boarding'] === "HOSTELLER") {
        data = [
            {
                key: 1,
                details: "College Fees",
                1: <Checkbox onChange={() => {
                    _1c === false ? _1sc(true) : _1sc(false)
                }}></Checkbox>,
                2: <Checkbox onChange={() => {
                    _2c === false ? _2sc(true) : _2sc(false)
                }}></Checkbox>,
                3: <Checkbox onChange={() => {
                    _3c === false ? _3sc(true) : _3sc(false)
                }}></Checkbox>,
                4: <Checkbox onChange={() => {
                    _4c === false ? _4sc(true) : _4sc(false)
                }}></Checkbox>,
            },
            {
                key: 2,
                details: "Hostel & Mess Fees",
                1: <Checkbox onChange={() => {
                    _1h === false ? _1sh(true) : _1sh(false)
                }}></Checkbox>,
                2: <Checkbox onChange={() => {
                    _2h === false ? _2sh(true) : _2sh(false)
                }}></Checkbox>,
                3: <Checkbox onChange={() => {
                    _3h === false ? _3sh(true) : _3sh(false)
                }}></Checkbox>,
                4: <Checkbox onChange={() => {
                    _4h === false ? _4sh(true) : _4sh(false)
                }}></Checkbox>,
            },
            {
                key: 3,
                details: "Book Fees",
                1: <Checkbox onChange={() => {
                    _1b === false ? _1sb(true) : _1sb(false)
                }}></Checkbox>,
                2: <Checkbox onChange={() => {
                    _2b === false ? _2sb(true) : _2sb(false)
                }}></Checkbox>,
                3: <Checkbox onChange={() => {
                    _3b === false ? _3sb(true) : _3sb(false)
                }}></Checkbox>,
                4: <Checkbox onChange={() => {
                    _4b === false ? _4sb(true) : _4sb(false)
                }}></Checkbox>,
            },
        ];
    } else {
        data = [
            {
                key: 1,
                details: "College Fees",
                1: <Checkbox onChange={() => {
                    _1c === false ? _1sc(true) : _1sc(false)
                }}></Checkbox>,
                2: <Checkbox onChange={() => {
                    _2c === false ? _2sc(true) : _2sc(false)
                }}></Checkbox>,
                3: <Checkbox onChange={() => {
                    _3c === false ? _3sc(true) : _3sc(false)
                }}></Checkbox>,
                4: <Checkbox onChange={() => {
                    _4c === false ? _4sc(true) : _4sc(false)
                }}></Checkbox>,
            },
            {
                key: 2,
                details: "Book Fees",
                1: <Checkbox onChange={() => {
                    _1b === false ? _1sb(true) : _1sb(false)
                }}></Checkbox>,
                2: <Checkbox onChange={() => {
                    _2b === false ? _2sb(true) : _2sb(false)
                }}></Checkbox>,
                3: <Checkbox onChange={() => {
                    _3b === false ? _3sb(true) : _3sb(false)
                }}></Checkbox>,
                4: <Checkbox onChange={() => {
                    _4b === false ? _4sb(true) : _4sb(false)
                }}></Checkbox>,
            },
            {
                key: 3,
                details: "Bus Fees",
                1: <Checkbox onChange={() => {
                    _1bf === false ? _1sbf(true) : _1sbf(false)
                }}></Checkbox>,
                2: <Checkbox onChange={() => {
                    _2bf === false ? _2sbf(true) : _2sbf(false)
                }}></Checkbox>,
                3: <Checkbox onChange={() => {
                    _3bf === false ? _3sbf(true) : _3sbf(false)
                }}></Checkbox>,
                4: <Checkbox onChange={() => {
                    _4bf === false ? _4sbf(true) : _4sbf(false)
                }}></Checkbox>,
            }
        ];
    }


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

    return (
        <html style={{textAlign: "center"}}>
        <Card>
            <Row justify="space-between">
                <Col><h3 style={{textAlign: "left", marginBottom: 40}}>Ref No:
                    2022/MKCE/06/{user["regno"]}/{user["year"]}/f/{refId}/{reference + 1}</h3></Col>
                <Col><h3 style={{textAlign: "left", marginBottom: 40}}>Date : {new Date().toLocaleDateString()
                }</h3></Col>
            </Row>
            <header>
                <h1 style={{textAlign: "center", marginBottom: 50}}>BONAFIDE & FEE STRUCTURE CERTIFICATE</h1>
            </header>
            <body>
            <Row justify="space-between">
                <Col flex={20}>
                    <h2 style={{textAlign: "justify"}}>
                        This is to certify
                        that {String(user["name"]).toUpperCase()} {String(user["initial"]).toUpperCase()}(Reg No
                        : {String(user["regno"]).toUpperCase()},
                        Aadhar No : {String(user["aadhar_no"]).toUpperCase()}) {user["gender"] === "MALE" ? "S" : "D"}/O
                        Mr. {user["father_name"]} is a
                        bonafide student of our College, Studying
                        in {user["year"]} Year {user["branch"]} {user["program"]} during academic
                        year {new Date().getMonth() >= 4 ? new Date().getFullYear() + " - " + parseInt(new Date().getFullYear() + 1) : parseInt(new Date().getFullYear() + 1) + " - " + new Date().getFullYear()}.
                    </h2>
                </Col>
                <Col flex={4}><img
                    src={config.imageBase+"/"+String(user["regno"]).toLocaleUpperCase()+".jpg"}
                    style={{height: 180, width: 160}}/></Col>
            </Row>
            <br/>
            <h2 style={{textAlign: "left"}}>
                Date of Birth : {user["dob"]}<br/>
                Boarding : {user["boarding"]}<br/>
                Graduate : {user["graduate"]}<br/>
                Admission Type : {user["quota"]}<br/>
            </h2>
            <br/>
            <div>
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                />
            </div>
            <br/>
            <h2 style={{textAlign: "left"}}>
                This Certificate Applying for the Purpose of <Select style={{width: "60%"}}
                                                                     defaultValue={"choose_type"}
                                                                     onChange={handleChange}>
                <Option value={"choose_type"} disabled={true} selected={true}>Select The Type</Option>
                {details.map((d, idx) => (
                    <Option value={d["name"] + "$$" + d["id"] + "$$" + d["address"]}>{d["label"]}</Option>
                ))}
            </Select>
            </h2>
            <br/>
            <TextArea
                placeholder = "Address of the bank manager, Eg: The Bank Manager Karur, Tamil Nadu"
                onChange={e => setAdress(e.target.value)}
            />
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