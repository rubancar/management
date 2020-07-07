import React from "react";
import PropTypes from "prop-types";
import {Box} from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


export default function TabsPanel({tabs, id}) {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Paper>
                <Tabs
                    value={value}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleChange}
                    aria-label="disabled tabs example"
                >
                    {
                        tabs.map((tab, i) => <Tab label={tab.label} key={i}/>)
                    }
                </Tabs>
                {
                    tabs.map((tab, i) =>
                        <TabPanel value={value} index={i} id={id} key={i}>
                            {tab.content}
                        </TabPanel>)
                }
            </Paper>
        </>
    );
}


function TabPanel(props) {
    const { children, value, index, id, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${id}-${index}`}
            aria-labelledby={`simple-tab-${id}-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={2}>
                    {children}
                </Box>
            )}
        </div>
    );
}


TabsPanel.propTypes = {
    id: PropTypes.string.isRequired,
    tabs: PropTypes.array.isRequired
};
