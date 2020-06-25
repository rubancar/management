import React, {useState} from 'react';
import PageTitle from "../../components/PageTitle";
import { Grid, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Button} from "@material-ui/core";
import {Delete as DeleteIcon, Add as AddIcon} from '@material-ui/icons';
import MUIDataTable from "mui-datatables";
import { makeStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Modal from "../../components/Modal";
import {Select, Input} from "../../components/Inputs";

export default function Tables() {

    const [showModal, setModalState] = useState(false)

    const handlOpenModal = () => {
        setModalState(true)
    }

    const handleCloseModal = () => {
        setModalState(false)
    }

    return (
        <>
            <PageTitle title="Historico de productos" button="Registrar producto" handleButtonClick={handlOpenModal} />
            <Grid item xs={12}>
                <MuiThemeProvider theme={myTheme}>
                    <MUIDataTable
                        title="Productos"
                        data={[]}
                        columns={["Código", "Descripción", "Precio Compra actual ($)", "Precio venta actual ($)"]}
                        options={{
                            filterType: "checkbox",
                        }}
                    />
                </MuiThemeProvider>
            </Grid>
            <Modal
                isOpen={showModal}
                title="Nuevo Producto"
                handleOnClose={handleCloseModal}
                handleOkButton={()=>{console.log("ok button")}}
                okButton="Guardar"
                content={<ModalProducto/>}
            />
        </>
    );
}

const myTheme = createMuiTheme({
    overrides: {
        MUIDataTable: {
            responsiveScroll: {
                maxHeight: "580px"
                // overflowY: 'scroll',
            }
        },
        MUIDataTableHeadCell: {
            root: {
                '&:nth-child(2)': {
                    minWidth: 200
                }
            }
        }
    }
});


function ModalProducto({}) {
    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <Input label="Descripción" id="product-description"/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Input label="Código" id="product-cod"/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Input label="Precio Unitario ($)" id="product-price"/>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TiposImpuestos/>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Input label="Información adicional" id="product-info"/>
                </Grid>
            </Grid>
        </>
    )
}

const useStyles = makeStyles({
    /*label: {
        textTransform: 'capitalize',
    },*/
    startIcon: {
        margin: 0
    }
});

function TiposImpuestos({}) {
    const classes = useStyles();
    const [impuestos, setImpuestos] = useState([{}])

    const handleActionImpuesto = (index) => {
        if(index === 0) { // if index is 0 execute add action
            let _impuestos = impuestos.concat([{}])
            setImpuestos(_impuestos)
        } else { // otherwise perform remove action
            let _impuestos = JSON.parse(JSON.stringify(impuestos))
            _impuestos.splice(index, 1)
            setImpuestos(_impuestos)
        }
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Tipo de Impuesto</TableCell>
                            <TableCell align="right">Tarifa</TableCell>
                            <TableCell align="right"/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {impuestos.map((row, i) => (
                            <TableRow key={i}>
                                <TableCell component="th" scope="row">
                                    <Select
                                        label="Tipo de indentificación"
                                        options={[{value:1, label:"IVA 12%"},{value:2, label:"IVA 0%"}]}
                                        onChange={(v) => console.log(v)}
                                        removeMargin
                                    />
                                </TableCell>
                                <TableCell align="right">Porcentaje</TableCell>
                                <TableCell align="right">
                                    <Button
                                        variant="contained"
                                        color={ i === 0 ? 'primary' : 'secondary'}
                                        classes={{
                                            startIcon: classes.startIcon
                                        }}
                                        startIcon={ i === 0 ? <AddIcon/> : <DeleteIcon />}
                                        onClick={() => handleActionImpuesto(i)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
