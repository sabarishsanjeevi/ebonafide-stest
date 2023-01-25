import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import axios from "axios";
import {Card, message} from "antd";
import config from '../config.json';

function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function Fetch () {
    let query = useQuery();
    const [data, setData] = useState({
        application_type: "b/f",
        name: 'hh',
        father_name: "",
        type: "b/f",
    });
    let reference = query.get("reference");
    useEffect(()=>{
        
        axios.post(`${config.serverURL}/fetch`, {reference: reference}).then(res=>
            {
                if(res.data === null){
                    message.error("No results found");
                    setData(res.data);
                }else{
                    message.success("Data fetched successfully!!")
                    setData(res.data);
                }
            }
        )
    }, []);
    return(
        <div>
            {data === null ? (<h1>There is no data found for the above reference ! please check with another reference!! </h1>):(
        <Card bordered={true} style={{width:'80%', marginLeft: '10%'}}>
            <h1 style={{textAlign: 'center'}}>Welcome to Bonafide Portal</h1>
            <h2>Application details for the {data.application_type} application for the purpose of {data.type}</h2>
            <br/>
            <br/>
            <br/>
            <h3>Register Number : {data.regno}</h3>
            <h3>Name : {data.name}</h3>
            <h3>Date Of Birth: {data.dob}</h3>
            <h3>Father name: {data.father_name}</h3>
            <br/>
            <br/>
            Has approved for the bonafide for the purpose of {data.type} and he/she can use it for the purpose that is been mentioned only.
            <br/>
            <br/>
            Thank You
            <br/>
            For further details please contact us on <a href={"mailto:ebonafide@mkce.ac.in"}>ebonafide@mkce.ac.in</a>
            <br/>
            <br/>
            <br />
            <h3 style={{textAlign: 'center'}}>Made with ❤ By TLC@MKCE</h3>
        </Card>)}
        </div>
    )
}