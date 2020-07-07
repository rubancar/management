import React, { useState } from "react";
import PageTitle from "../../components/PageTitle";
import {
    Button,
    Grid,
    InputAdornment,
    IconButton,
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow, TableCell, TableBody,
} from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import SearchIcon from "@material-ui/icons/Search";
import TabsPanel from "../../components/Tabs"
import Modal from "../../components/Modal"
import Input from "../../components/Inputs/Input";
import DatePicker from "../../components/Inputs/DatePicker";
import { Add as AddIcon, Delete as DeleteIcon } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";


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
            <PageTitle title="Compras" button="Registrar ingreso" handleButtonClick={handlOpenModal} />
            <Grid container>
                <Grid item xs={12}>
                    <TabsPanel id="compras" tabs={Tabs()}/>
                </Grid>
            </Grid>
            <Modal
                isOpen={showModal}
                title="Nuevo Producto"
                handleOnClose={handleCloseModal}
                handleOkButton={()=>{console.log("ok button")}}
                okButton="Guardar"
                content={<ModalIngresoManual/>}
                maxWidth="lg"
            />
        </>
    );
}


function Tabs() {
    return [
        {
            label: "Nuevos ingresos",
            content: <ComprasPorIngresar/>
        },
        {
            label: "Últimas compras",
            content: <UltimasCompras/>
        }
    ]
}

function ComprasPorIngresar({}) {

    return (
        <MUIDataTable
            title="Facturas recibidas"
            data={[]}
            columns={["Proveedor", "# Factura", "Fecha", "Total ($)"]}
            options={{
                filterType: "checkbox",
                elevation: 0
            }}
        />
    )
}

function UltimasCompras({}) {

    return (

        <MUIDataTable
            title="Facturas procesadas"
            data={[]}
            columns={["Proveedor", "# Factura", "Fecha", "Estado", "Total ($)"]}
            options={{
                filterType: "checkbox",
                elevation: 0
            }}
        />

    )
}

function ModalIngresoManual({}) {

    const handleClickSearchBill = () => {
        console.log("search bill")
    }

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Input
                        label="Clave acceso"
                        id="compra-clave-acceso"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment>
                                    <IconButton onClick={handleClickSearchBill}>
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Input label="Proveedor" id="compra-proveedor"/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Input label="Identificador de documento" id="compra-id-doc"/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <DatePicker label="Fecha de emisión" id="compra-fecha"/>
                </Grid>
                <Grid item xs={12}>
                    <DetallesCompra/>
                </Grid>
            </Grid>
        </>
    )
}
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
    },
    divider: {
        margin: theme.spacing(1)
    },
    tableCellDet: {
        padding: 0
    },
    startIcon: {
        margin: 0
    },
    rootButtonDet: {
        'min-width': "20px",
        'padding-right': "5px",
        'padding-left': "5px"
    },
    paddingCell: {
        padding: '4px 12px 4px 4px',
    },
    rowTable: {
        height: 0
    }
}));

function DetallesCompra({}) {
    const classes = useStyles();
    const [detAdicionales, setDetAdicionales] = useState([{}])

    const handleActionDetalle = (index) => {
        if(index === 0) { // if index is 0 execute add action
            let _detalles = detAdicionales.concat([{}])
            setDetAdicionales(_detalles)
        } else { // otherwise perform remove action
            let _detalles = JSON.parse(JSON.stringify(detAdicionales))
            _detalles.splice(index, 1)
            setDetAdicionales(_detalles)
        }
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table" style={{ width: "auto", tableLayout: "auto" }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Descripción</TableCell>
                            <TableCell>Cantidad</TableCell>
                            <TableCell>P.U.</TableCell>
                            <TableCell>IVA</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {detAdicionales.map((row, i) => (
                            <TableRow key={i}>
                                <TableCell component="th" scope="row" className={classes.tableCellDet} style={{width:"40%"}}>
                                    <Input id={`det-${i}`} variant="outlined" margin="none"/>
                                </TableCell>
                                <TableCell className={classes.tableCellDet}>
                                    <Input id={`cant-${i}`} variant="outlined" />
                                </TableCell>
                                <TableCell align="right" className={classes.tableCellDet}>
                                    <Input id={`pu-${i}`} variant="outlined"/>
                                </TableCell>
                                <TableCell align="right" className={classes.tableCellDet}>
                                    <Input id={`iva-${i}`} variant="outlined"/>
                                </TableCell>
                                <TableCell align="right" className={classes.tableCellDet}>
                                    <Input id={`total-${i}`} disabled variant="outlined"/>
                                </TableCell>
                                <TableCell align="right" className={classes.tableCellDet}>
                                    <Button
                                        variant="contained"
                                        color={ i === 0 ? 'primary' : 'secondary'}
                                        classes={{
                                            root: classes.rootButtonDet,
                                            startIcon: classes.startIcon
                                        }}
                                        startIcon={ i === 0 ? <AddIcon/> : <DeleteIcon />}
                                        onClick={() => handleActionDetalle(i)}
                                        style={{}}
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
