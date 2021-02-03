import React, { useEffect } from 'react';
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
import { Select, Input } from "../../components/Inputs"
import { isIdentificacionValida, isEmpty, isEmail } from "../../utils/helpers"
import { tipoIdentificacionValue, tiposIdentificacion } from "../../utils/options"
import errorMessages from "../../utils/errors"
import { create } from "../../actions/Proveedores"
import Notification from "../../components/Notification";
import { toast } from 'react-toastify';
import { useForm, Controller } from "react-hook-form";

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
    }
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

   const { control, formState: {errors}, handleSubmit, getValues, reset /*trigger,*/  } = useForm()

    const handleSaveButton = (data) => {

        data.type_ident = data.type_ident.value
        create(data)
        .then(res => {
            console.log("respuesta", res)
            if(res.mensaje) {
                toast( // lauch toast
                    <Notification
                        type= "info"
                        message= {`${res.mensaje}`}
                        variant= "contained"
                        color= "primary"
                    />,
                    {
                        type: "info",
                        className: "custom-toast"
                    }
                );
                return handleOnClose() // close modal
            }
        })
        .catch(err => {
            let message = "Error guardando proveedor"
            if(err.response.data && err.response.data.mensaje)
                message = err.response.data.mensaje
            return toast(
                <Notification
                    type= "report"
                    message= {message}
                    variant= "contained"
                    color= "secondary"
                />,
                {
                    type: "error",
                    className: "custom-toast",
                }
            );
        })
    }

    useEffect(() => {
        // clear form from errors and daa when modal is closed
        if(!isOpen) {
            console.log('limpiando form')
        }
        // returned function will be called on component unmount 
        // return () => {  }
      }, [isOpen])

    return (
            <Dialog keepMounted={false} onClose={handleOnClose} aria-labelledby="customized-dialog-title" open={isOpen} maxWidth={maxWidth} fullWidth={true}>
                <DialogTitle id="customized-dialog-title" onClose={handleOnClose}>
                    {title}
                </DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="type_ident"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: errorMessages.required
                                }}
                                render={({ onChange }) => <Select
                                    onChange={(v) => onChange(tipoIdentificacionValue(v))}
                                    label="Tipo de indentificación"
                                    options={tiposIdentificacion}
                                    helperText={errors.type_ident ? errors.type_ident.message: undefined}
                                />}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="ident"
                                control={control}
                                defaultValue=""
                                rules={{ validate: value => {
                                        if(isEmpty(value)) return errorMessages.required
                                        const typeIdent = getValues('type_ident')
                                        if(!typeIdent) return true
                                        const resultValidation = isIdentificacionValida(typeIdent.value, value)
                                        if(resultValidation.error) return resultValidation.mensaje
                                        return true
                                    }}}
                                render={({ onChange }) =>
                                    <Input
                                        label="Identificación"
                                        onChange={onChange}
                                        error={errors.ident ? errors.ident.message : undefined}
                                    />
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="name"
                                control={control}
                                defaultValue=""
                                rules={{ required: errorMessages.required }}
                                render={({ onChange }) =>
                                    <Input
                                        label="Razón social"
                                        onChange={onChange}
                                        error={errors.name ? errors.name.message : undefined}
                                    />
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="email"
                                control={control}
                                defaultValue=""
                                rules={{ validate: value => {
                                        if(isEmpty(value)) return errorMessages.required
                                        else if(!isEmail(value)) return errorMessages.email
                                        return true
                                    }
                                }}
                                render={({ onChange }) =>
                                    <Input
                                        label="Correo"
                                        onChange={onChange}
                                        error={errors.email ? errors.email.message : undefined}
                                    />
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="address"
                                control={control}
                                defaultValue=""
                                rules={{ required: errorMessages.required  }}
                                render={({ onChange }) =>
                                    <Input
                                        label="Dirección"
                                        onChange={onChange}
                                        error={errors.address ? errors.address.message : undefined}
                                    />
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="phone"
                                control={control}
                                defaultValue=""
                                rules={{ required: errorMessages.required  }}
                                render={({ onChange }) =>
                                    <Input
                                        label="Teléfono"
                                        onChange={onChange}
                                        error={errors.phone ? errors.phone.message : undefined}
                                    />
                                }
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleOnClose} color="primary">
                        Cancelar
                    </Button>
                    <Button autoFocus onClick={handleSubmit(handleSaveButton)} color="primary">
                        Guardar
                    </Button>
                </DialogActions>
            </Dialog>
    );
}
