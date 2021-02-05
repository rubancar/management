import React from "react";
import { toast } from 'react-toastify';
import Notification from "../components/Notification";

export default function (type, message) {
    let typeNotification = "info"
    let typeToast = "info"
    let color = "primary"
    if(type === "error") {
        typeNotification = "report"
        typeToast = "error"
        color = "secondary"
    } else if(type === "info"){

    }
    toast( // lauch toast
        <Notification
            type={typeNotification}
            message= {message}
            variant= "contained"
            color={color}
        />,
        {
            type:typeToast,
            className: "custom-toast"
        }
    );
}
