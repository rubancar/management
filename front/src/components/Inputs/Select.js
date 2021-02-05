import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
    formControl: props => ({
        minWidth: 120,
        display: 'flex',
        margin: props.removeMargin ? '0' : theme.spacing(1)
    }),
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function SimpleSelect({label, options, helperText, onChange, removeMargin, value}) {
    const classes = useStyles({removeMargin});
    //const [value, setValue] = React.useState('');

    const handleChange = (event) => {
      //  setValue(event.target.value);
        onChange && onChange(event.target.value);
    };

    return (
        <>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-helper-label">{label}</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={value}
                    onChange={handleChange}
                    autoWidth={false}
                    error={!!helperText}
                >
                    <MenuItem value="">
                        <em>Ninguno</em>
                    </MenuItem>
                    {
                        options.map((item, i) => <MenuItem key={i} value={item.value}>{item.label}</MenuItem>)
                    }
                </Select>
                {
                    helperText && <FormHelperText>{helperText}</FormHelperText>
                }
            </FormControl>
        </>
    );
}
