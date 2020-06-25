import PageTitle from "../../components/PageTitle";
import {Grid} from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import Widget from "../../components/Widget";
import Table from "../dashboard/components/Table/Table";
import mock from "../dashboard/mock";
import React from "react";

export default function Tables() {
    return (
        <>
            <PageTitle title="Compras" />
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    Datos
                </Grid>
                <Grid item xs={12}>
                    Más datos
                </Grid>
            </Grid>
        </>
    );
}
