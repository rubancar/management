import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import FormControl from "@material-ui/core/FormControl";
import {makeStyles} from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
        minWidth: 120,
        display: 'flex',
    }
}));

export default function DatePicker({id, label, onChange}) {
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = React.useState(new Date('2020-02-18T21:11:54'));

    const handleDateChange = (date) => {
        setSelectedDate(date);
        onChange && onChange(date);
    };

    return (
        <>
            <FormControl classes={{
                root: classes.root,
            }}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="none"
                        id="date-picker-inline"
                        label={label}
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>
            </FormControl>
        </>
    );
}

DatePicker.propTypes = {
};

DatePicker.defaultProps = {
};
