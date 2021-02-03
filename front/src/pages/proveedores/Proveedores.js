import React from "react";
import PageTitle from "../../components/PageTitle";
import { Grid } from "@material-ui/core";
import MUIDataTable, { debounceSearchRender } from "mui-datatables";
import ModalProveedor from "./ModalProveedor";
import { list, deleteProvider } from "../../actions/Proveedores"
import CustomToolbarSelect from "./CustomToolbarSelect"

const general_limit = 20

export default class Proveedores extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            data: [],
            page: 0,
            total: 0,
            limit: general_limit,
            sort: "",
            filter: "",
            loading: false
        }
    }

    componentDidMount() {
        this.reloadTable()
    }

    handlOpenModal = () => {
        this.setState({showModal:true})
    }

    handleCloseModal = () => {
        this.setState({showModal:false})
    }

    onChangePage = (page) => {
        this.setState({page: page}, this.reloadTable)
    }

    onSearchChange = (searchText) => {
        this.setState({filter: searchText}, this.reloadTable)
    }

    deleteProviders = (ids) => {

    }

    reloadTable = () => {
        this.setState({loading: true})
        const { filter, page, sort, limit } = this.state
        const data = { page: page + 1, limit, sort, filter }
        list(data)
            .then(res => {
                this.setState({
                    data: res.data,
                    page: res.page - 1,
                    total: res.total,
                    limit: general_limit,
                    sort: sort,
                    filter: filter,
                    loading: false
                })
            })
    }

    render() {

        const {
            data,
            total,
            showModal
        } = this.state

        return (
            <>
                <PageTitle title="Proveedores" button="Nuevo proveedor" handleButtonClick={this.handlOpenModal} />
                <Grid item xs={12}>
                    <MUIDataTable
                        title="Lista de proveedores"
                        serverSide = {true}
                        data={data}
                        columns={[
                            { name: "name", label: "Nombre" },
                            { name: "ident", label: "RUC" },
                            { name: "phone", label: "Contacto" },
                            { name: "estado", label: "Estado" }
                        ]}
                        options={{
                            filterType: "checkbox",
                            serverSide: true,
                            //onTableChange: this.handleTableChange,
                            onChangePage: this.onChangePage,
                            onSearchChange: this.onSearchChange,
                            rowsPerPage: general_limit,
                            count: total,
                            rowsPerPageOptions: [],
                            customSearchRender: debounceSearchRender(400),
                            customToolbarSelect: selectedRows => (
                                <CustomToolbarSelect selectedRows={selectedRows} />
                            )
                        }}
                    />
                </Grid>
                <ModalProveedor
                    isOpen={showModal}
                    title="Nuevo Proveedor"
                    handleOnClose={this.handleCloseModal}
                />
            </>
        );
    }
}
