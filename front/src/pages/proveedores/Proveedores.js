import React, {useState} from "react";
import PageTitle from "../../components/PageTitle";
import {Grid} from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import Modal from "../../components/Modal"
import {Select, Input} from "../../components/Inputs"

export default function Proveedores() {

    const [showModal, setModalState] = useState(false)

    const handlOpenModal = () => {
        setModalState(true)
    }

    const handleCloseModal = () => {
        setModalState(false)
    }

    return (
        <>
            <PageTitle title="Proveedores" button="Nuevo proveedor" handleButtonClick={handlOpenModal} />
            <Grid item xs={12}>
                <MUIDataTable
                    title="Lista de proveedores"
                    data={[]}
                    columns={["Nombre", "RUC", "Contacto", "Estado"]}
                    options={{
                        filterType: "checkbox",
                    }}
                />
            </Grid>
            <Modal
                isOpen={showModal}
                title="Nuevo Proveedor"
                handleOnClose={handleCloseModal}
                handleOkButton={()=>{console.log("ok button")}}
                okButton="Guardar"
                content={<ModalProveedor/>}
            />
        </>
    );
}

function ModalProveedor({}) {

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Select
                        label="Tipo de indentificación"
                        options={[{value:1, label:"Cédula"},{value:2, label:"RUC"}]}
                        onChange={(v) => console.log(v)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Input label="Identificación" id="prov-ident"/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Input label="Razón social" id="prov-razon-social"/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Input label="Correo" id="prov-correo"/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Input label="Dirección" id="prov-direccion"/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Input label="Teléfono" id="prov-telef"/>
                </Grid>
            </Grid>
        </>
    )
}
