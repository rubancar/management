import React from "react";

var FormStateContext = React.createContext();
var FormDispatchContext = React.createContext();

function formReducer(state, action) {
    // get form to be updated
    const form_name = action.form
    let form_state = state[form_name] || {}
    let field_state = null
    switch (action.type) {
        case "SET_VALUE":
            field_state = form_state[action.field] || {}
            field_state = { ...field_state, value:action.value, error:null }
            form_state = { ...form_state, [action.field]: field_state }
            break
        case "CLEAR_VALUE":
            field_state = form_state[action.field] || {}
            field_state = { ...field_state, value:null, error:null }
            form_state = { ...form_state, [action.field]: field_state }
            break
        case "CLEAR_FORM":
            form_state = {}
            break
        case "SET_ERROR":
            Object.entries(action.value).map(([field, error]) => {
                let field_state_ = form_state[field] || {}
                field_state_ = { ...field_state_, value:null, error:error }
                form_state = { ...form_state, [field]: field_state_ }
            })
            break
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
    //form_state = { ...form_state, [action.field]: field_state };
    return { ...state, [form_name]:form_state };
}

function FormProvider({ children }) {

    var [state, dispatch] = React.useReducer(formReducer, {});

    return (
        <FormStateContext.Provider value={state}>
            <FormDispatchContext.Provider value={dispatch}>
                {children}
            </FormDispatchContext.Provider>
        </FormStateContext.Provider>
    );
}

function useFormState() {
    var context = React.useContext(FormStateContext);
    if (context === undefined) {
        throw new Error("useFormState must be used within a FormProvider");
    }
    return context;
}

function useFormDispatch() {
    var context = React.useContext(FormDispatchContext);
    if (context === undefined) {
        throw new Error("useFormDispatch must be used within a FormProvider");
    }
    return context;
}

export { FormProvider, useFormState, useFormDispatch };
