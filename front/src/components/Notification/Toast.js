import React from 'react';
import { Close as CloseIcon } from '@material-ui/icons';

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import useStyles from './styles'

export default function DefaultToast({}) {

    const classes = useStyles()

    return (
        <ToastContainer
            className={classes.toastsContainer}
            closeButton={
                <CloseButton className={classes.notificationCloseButton} />
            }
            closeOnClick={false}
            progressClassName={classes.progress}
        />
    )
}

// #############################################################
function CloseButton({ closeToast, className }) {
    return <CloseIcon className={className} onClick={closeToast} />;
}
