import React, { Fragment, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { Grid } from "@material-ui/core";
import { useFormDispatch, useFormState } from "../../context/FormContext";
import { Select, Input } from "../../components/Inputs"
import { isIdentificacionValida, isEmpty, isEmail } from "../../utils/helpers"
import { tipoIdentificacionValue, tiposIdentificacion } from "../../utils/options"
import errors from "../../utils/errors"
import { create } from "../../actions/Proveedores"


const form_name = "new_provider"

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export default function ModalProveedor({ isOpen, title, handleOnClose, maxWidth = "md" }) {

    const dispatch = useFormDispatch()
    const state = useFormState()

    const updateValue = (value, field_name) => {
        dispatch({
            type: 'SET_VALUE',
            form: form_name,
            field: field_name,
            value
        })
    }

    // we must validate all fields on every blur event because in case the one fields depends on another
    const validateForm = (value, field_name, validate_all=false) => {
        let error = {}
        let result = null
        let value_ = null

        if(validate_all || field_name == 'ident') {
            const type_ident = state[form_name].type_ident.value.value
            console.log('state[form_name]', state[form_name])
            value_ = state[form_name].ident ? state[form_name].ident.value : ''
            result = isEmpty(value_)
            if(result) error.ident = errors.required
            else {
                result = isIdentificacionValida(type_ident, value_)
                if(result.error) error.ident = result.mensaje
            }            
        }
        if(validate_all || field_name == 'razon_social') {
            value_ = state[form_name].razon_social ? state[form_name].razon_social.value : null
            result = isEmpty(value_)
            if(result) error.razon_social = errors.required
        }
        if(validate_all || field_name == 'email') {
            value_ = state[form_name].email ? state[form_name].email.value : null
            result = isEmail(value_)
            console.log('email validation', result)
            if(!result) error.email = errors.email
        }
        if(validate_all || field_name == 'address') {
            value_ = state[form_name].address ? state[form_name].address.value : null
            result = isEmpty(value_)
            if(result) error.address = errors.required
        }
        if(validate_all || field_name == 'phone') {
            value_ = state[form_name].phone ? state[form_name].phone.value : null
            result = isEmpty(value_)
            if(result) error.phone = errors.required
        }

        if(!!error) {
            dispatch({
                type: 'SET_ERROR',
                form: form_name,
                value: error
            })
        }
        return !!error
    }

    const { [form_name]: form_data = {} } = state

    const handleSaveButton = () => {

        const data = Object.entries(form_data).reduce((obj, [key, value]) => {
            obj[key] = value.value
            return obj
        }, {})

        const result = validateForm(null, null, true)
        if(!result) return

        data.type_ident = data.type_ident.value
        data.name = data.razon_social
        create(data)
        .then(res => {
            if(res.data) {
                console.log('respuesta', res.data)
                console.log('provider correctly saved')
            }
        })
        .catch(err => {
            console.log('err', err)
        })
    }

    useEffect(() => {
       
        // returned function will be called on component unmount 
        return () => {
            console.log('limpiando form')
            dispatch({
                type: 'CLEAR_FORM',
                form: form_name
            })
        }
      }, [])

    // Get errors
    const {
        ident: { error: error_ident = null } = {},
        razon_social: { error: error_razon_social = null } = {},
        email: { error: error_email = null } = {},
        address: { error: error_address = null } = {},
        phone: { error: error_phone = null } = {},
    } = form_data

    return (
            <Dialog keepMounted={false} onClose={handleOnClose} aria-labelledby="customized-dialog-title" open={isOpen} maxWidth={maxWidth} fullWidth={true}>
                <DialogTitle id="customized-dialog-title" onClose={handleOnClose}>
                    {title}
                </DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <Select
                                label="Tipo de indentificación"
                                options={tiposIdentificacion}
                                onChange={(v) => updateValue(tipoIdentificacionValue(v), 'type_ident')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Input
                                label="Identificación"
                                id="ident"
                                onChange={(v) => updateValue(v, 'ident')}
                                validate={(v) => validateForm(v, 'ident')}
                                error={error_ident}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Input
                                label="Razón social"
                                id="razon_social"
                                onChange={(v) => updateValue(v, 'razon_social')}
                                validate={(v) => validateForm(v, 'razon_social')}
                                error={error_razon_social}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Input
                                label="Correo"
                                id="email"
                                onChange={(v) => updateValue(v, 'email')}
                                validate={(v) => validateForm(v, 'email')}
                                error={error_email}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Input
                                label="Dirección"
                                id="address"
                                onChange={(v) => updateValue(v, 'address')}
                                validate={(v) => validateForm(v, 'address')}
                                error={error_address}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Input
                                label="Teléfono"
                                id="phone"
                                onChange={(v) => updateValue(v, 'phone')}
                                validate={(v) => validateForm(v, 'phone')}
                                error={error_phone}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleOnClose} color="primary">
                        Cancelar
                    </Button>
                    <Button autoFocus onClick={handleSaveButton} color="primary">
                        Guardar
                    </Button>
                </DialogActions>
            </Dialog>
    );
}
