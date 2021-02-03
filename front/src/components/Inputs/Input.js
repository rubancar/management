import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import FormControl from "@material-ui/core/FormControl";
import {makeStyles} from "@material-ui/core/styles";
import { Button, Grid, InputAdornment, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        display: 'flex',
    }
}));

export default function Input({id, label, onChange, validate, error, defaultValue = "", disabled, variant, margin, InputProps}) {
    const classes = useStyles();
    // const [value, setValue] = React.useState(defaultValue);

    const handleChange = (event) => {
        onChange && onChange(event.target.value);
    };

    return (
        <>
            <FormControl className={classes.formControl}>
                <TextField
                    id={id}
                    //value={value}
                    onChange={handleChange}
                    label={label}
                    fullWidth
                    disabled={disabled}
                    error={!!error}
                    helperText={error}
                    variant={variant}
                    margin={margin}
                    size="small"
                    InputProps={InputProps}
                />
            </FormControl>
    </>
    );
}

/*
Input.propTypes = {
    id: PropTypes.string,
};
*/

Input.defaultProps = {
    disabled: false,
};
