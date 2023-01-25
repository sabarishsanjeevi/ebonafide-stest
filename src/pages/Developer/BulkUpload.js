import {Button, message, Upload} from "antd";
import React from "react";
import Icon from "antd/es/icon";
import axios from "axios";
import config from '../../config.json';

export default function BulkUpload() {

    return(
        <Upload
            accept=".txt, .csv"
            showUploadList={false}
            beforeUpload={file => {
                const reader = new FileReader();
                reader.onload = e => {
                    axios.post(`${config.serverURL}/upload`, {"data": e.target.result}).then(res =>{
                        if(res.data.status === 0){
                            message.success(`${res.data.inserted} Users inserted, ${res.data.deleted} Duplicate files deleted`, 10)
                        }else{
                            message.error("There is an error while inserting user, please refer Database System");
                        }
                    });
                };
                reader.readAsText(file);
            }}
        >
            <Button>
                <Icon type="upload" /> Click to Upload
            </Button>
        </Upload>
    );
}