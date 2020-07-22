import React, { useState, useEffect } from "react";
import PageTitle from "../../components/PageTitle";
import { Grid } from "@material-ui/core";
import MUIDataTable, {debounceSearchRender} from "mui-datatables";
import Modal from "../../components/Modal"
import { Select, Input } from "../../components/Inputs"
import { list } from "../../actions/Proveedores"

const general_limit = 20

export default function Proveedores() {

    const [showModal, setModalState] = useState(false)
    const [dataList, setDataList] = useState({
        data: [],
        page: 0,
        total: 0,
        limit: general_limit,
        sort: "",
        filter: ""
    })
    const [loading, setLoading] = useState(false)

    const handlOpenModal = () => {
        setModalState(true)
    }

    const handleCloseModal = () => {
        setModalState(false)
    }

    const handleTableChange = (action, tableState) => {
        console.log('action', action)
        console.log('table state', tableState)

        switch (action) {
            case 'changePage':
                setDataList({...dataList, page:tableState.page})
                break;
            case 'sort':
                // this.sort(tableState.page, tableState.sortOrder);
                break;
            case 'search':
                setDataList({...dataList, filter:tableState.searchText})
                break;
            default:
                console.log('action not handled.');
        }
    }

    
    useEffect(() => {
        // data to start fetching in the backend
        console.log('using effect..... waoooo')
        setLoading(true)
        const { filter, page, sort, limit } = dataList
        const data = { page:page+1, limit, sort, filter }
        list(data)
            .then(res => {
                setDataList({
                    data: res.data,
                    page: res.page - 1,
                    total: res.total,
                    limit: general_limit,
                    sort: dataList.sort,
                    filter: dataList.filter
                })
            })
    },
    // trigger the effect only if one of these values change
    [dataList.filter, dataList.page, dataList.sort]);

    return (
        <>
            <PageTitle title="Proveedores" button="Nuevo proveedor" handleButtonClick={handlOpenModal} />
            <Grid item xs={12}>
                <MUIDataTable
                    title="Lista de proveedores"
                    data={dataList.data}
                    columns={[
                        { name: "name", label: "Nombre" },
                        { name: "ident", label: "RUC" },
                        { name: "phone", label: "Contacto" },
                        { name: "estado", label: "Estado" }
                    ]}
                    options={{
                        filterType: "checkbox",
                        serverSide: true,
                        onTableChange: handleTableChange,
                        rowsPerPage: general_limit,
                        count: dataList.total,
                        rowsPerPageOptions: [],
                        customSearchRender: debounceSearchRender(400),
                    }}
                />
            </Grid>
            <Modal
                isOpen={showModal}
                title="Nuevo Proveedor"
                handleOnClose={handleCloseModal}
                handleOkButton={() => { console.log("ok button") }}
                okButton="Guardar"
                content={<ModalProveedor />}
            />
        </>
    );
}

function ModalProveedor({ }) {

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Select
                        label="Tipo de indentificación"
                        options={[{ value: 1, label: "Cédula" }, { value: 2, label: "RUC" }]}
                        onChange={(v) => console.log(v)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Input label="Identificación" id="prov-ident" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Input label="Razón social" id="prov-razon-social" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Input label="Correo" id="prov-correo" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Input label="Dirección" id="prov-direccion" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Input label="Teléfono" id="prov-telef" />
                </Grid>
            </Grid>
        </>
    )
}
