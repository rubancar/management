import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import {
    Delete as DeleteIcon,
    Edit as EditIcon
} from "@material-ui/icons";

import { withStyles } from "@material-ui/core/styles";

const defaultToolbarSelectStyles = {
    iconButton: {
        marginRight: "24px",
        top: "50%",
        display: "inline-block",
        position: "relative",
    }
};

class CustomToolbarSelect extends React.Component {

    handleClickDelete = () => {
        const { selectedRows, displayData, deleteAction } = this.props
        console.log(selectedRows)
        const selected = selectedRows.data.map(e => e.index)
        const rows = selected.map(index => displayData[index].data[0])
        deleteAction(rows)
    }

    handleClickEdit = () => {
        const { selectedRows, displayData, editAction } = this.props
        const rowData = displayData[selectedRows.data[0].index]
        if (editAction) editAction(rowData)
    }


    render() {
        const { classes, selectedRows: { data: dataSelected } } = this.props;

        return (
            <div className={"custom-toolbar-select"}>
                {
                    dataSelected.length === 1 && <Tooltip title={"Editar columnas"}>
                        <IconButton className={classes.iconButton} onClick={this.handleClickEdit}>
                            <EditIcon className={classes.deleteIcon} />
                        </IconButton>
                    </Tooltip>
                }
                <Tooltip title={"Eliminar columnas"}>
                    <IconButton className={classes.iconButton} onClick={this.handleClickDelete}>
                        <DeleteIcon className={classes.deleteIcon} />
                    </IconButton>
                </Tooltip>
            </div>
        );
    }
}

export default withStyles(defaultToolbarSelectStyles, {
    name: "CustomToolbarSelect"
})(CustomToolbarSelect);
