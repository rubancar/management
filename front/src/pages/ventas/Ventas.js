import React, { useState } from "react";
import PageTitle from "../../components/PageTitle";
import {
    Grid,
    Paper,
    Divider,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody, Button,
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { Select, DatePicker, Input } from '../../components/Inputs'
import { Typography } from "../../components/Wrappers";
import { tiposIdentificacionSRI } from "../../config/options";
import { Add as AddIcon, Delete as DeleteIcon } from "@material-ui/icons";


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


export default function Ventas() {
    const classes = useStyles();

    return (
        <>
            <PageTitle title="Ventas" subtitle="Papelería Carvajal" />
            <Grid container >
                <Grid item xs={12}>
                    <Paper elevation={2} className={classes.paper}>
                        {/*Datos de Documento*/}
                        <Typography variant="h5" size="sm">
                            Datos de Factura
                        </Typography>
                        <Grid container>
                            <Grid item xs={12} sm={3}>
                                <Select
                                    label="Ambiente"
                                    options={[{value:1, label:"Producción"},{value:2, label:"Pruebas"}]}
                                    onChange={(v) => console.log(v)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <DatePicker label="Fecha de emisión"/>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <Select
                                    label="Sucursal"
                                    options={[{value:1, label:"Matriz"},{value:2, label:"Alborada"}]}
                                    onChange={(v) => console.log(v)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <Select
                                    label="Punto de venta"
                                    options={[{value:1, label:"PV 1"},{value:2, label:"PV 2"}]}
                                    onChange={(v) => console.log(v)}
                                />
                            </Grid>

                        </Grid>
                        <Divider className={classes.divider} light/>

                        {/*Datos de Comprador*/}
                        <Typography variant="h5" size="sm">
                            Datos del Comprador
                        </Typography>
                        <Grid container>
                            <Grid item xs={12} sm={3}>
                                <Select
                                    label="Tipo de indentificación"
                                    options={tiposIdentificacionSRI}
                                    onChange={(v) => console.log(v)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <Input label="Identificación" id="ident-comprador"/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Input label="Razón Social" id="razon-social-comprador"/>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <Input label="Correo" id="correo-comprador"/>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <Input label="Teléfono" id="telef-comprador"/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Input label="Dirección" id="direccion-comprador"/>
                            </Grid>
                        </Grid>
                        <Divider className={classes.divider} light/>

                        {/*Detalles*/}
                        <Typography variant="h5" size="sm">
                            Detalles
                        </Typography>
                        <Grid container>
                            <Grid item xs={12}>
                                <DetallesVenta/>
                            </Grid>
                        </Grid>
                        <Divider className={classes.divider} light/>

                        {/*Formas de pago*/}
                        <Typography variant="h5" size="sm">
                            Información adicional
                        </Typography>
                        <Grid container>
                            <Grid item xs={6}>
                                <InformacionAdicional/>
                            </Grid>

                            {/*Totales*/}
                            <Grid item xs={6}>
                                <TotalVenta/>
                            </Grid>
                        </Grid>


                    </Paper>
                </Grid>
            </Grid>

        </>
    );
}

function DetallesVenta({}) {
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
                            <TableCell>Dcto.</TableCell>
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
                                    <Input id={`dcto-${i}`} variant="outlined"/>
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

function TotalVenta({}) {
    const classes = useStyles();

    return (
        <>
            <TableContainer component={Paper} >
                <Table size="small" aria-label="a dense table">
                    <TableBody>
                        <TableRow className={classes.rowTable}>
                            <TableCell>Subtotal</TableCell>
                            <TableCell align="right">$ 0.00</TableCell>
                        </TableRow>
                        <TableRow className={classes.rowTable}>
                            <TableCell>IVA (12%)</TableCell>
                            <TableCell align="right">$ 0.00</TableCell>
                        </TableRow>
                        <TableRow className={classes.rowTable}>
                            <TableCell>Descuento</TableCell>
                            <TableCell align="right">$ 0.00</TableCell>
                        </TableRow>
                        <TableRow className={classes.rowTable}>
                            <TableCell>Total</TableCell>
                            <TableCell align="right">$ 0.00</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

function InformacionAdicional({}) {
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
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Información</TableCell>
                            <TableCell/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {detAdicionales.map((row, i) => (
                            <TableRow key={i}>
                                <TableCell component="th" scope="row" className={classes.tableCellDet}>
                                    <Input id={`det-${i}`} variant="outlined" margin="none"/>
                                </TableCell>
                                <TableCell className={classes.tableCellDet}>
                                    <Input id={`cant-${i}`} variant="outlined" />
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
