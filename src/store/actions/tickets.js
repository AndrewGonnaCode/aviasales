import {
    CHANGE_FIlTER,
    CHANGE_TABS,
    CHANGE_SEARCHID,
    CHANGE_TICKETS, CHANGE_ACTIVE_TICKETS
} from "./actionTypes";
import axios from "axios";

export function changeSeacrhId() {
    return async dispatch => {
        let axiosData = await axios.get('https://front-test.beta.aviasales.ru/search');
        let {searchId} = axiosData.data;
        dispatch({type: CHANGE_SEARCHID, payload: searchId});
    }
}

export function subscribe(searchId) {
    const s = async dispatch => {
        try {
            let response = await axios.get(`https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`);
            const data = response.data;

            if (data.stop) {
                dispatch({type: CHANGE_TICKETS, payload: data.tickets});
                return;
            }
            s(dispatch);
        } catch (e) {
            const newSearchId = await axios.get(`https://front-test.beta.aviasales.ru/search`);
            dispatch({type: CHANGE_SEARCHID, payload: newSearchId.data.searchId});
        }
    };
    return s;
}

export function changeFilterHandler(event, id) {
    return async (dispatch, getState) => {
        let filters = getState().tickets.filters;
        filters.forEach(filter => filter.id === id ? filter.checked = event.target.checked : null);
        if (!filters.find(filter => filter.checked)) {
            filters[0].checked = true;
        }
        console.log('filter');
        dispatch({type:CHANGE_FIlTER, payload: filters});
    }
}

export function tabsChange(id) {
    return (dispatch, getState) => {
        const tabs = [...getState().tickets.tabs];
        tabs.forEach(tab => tab.checked = false);
        tabs.forEach(tab => tab.id === id ? tab.checked = true : null);
        dispatch({
            type: CHANGE_TABS,
            tabs
        })
    }
}
