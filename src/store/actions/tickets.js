import {CHANGE_FIlTER, CHANGE_TABS, RENDER_TICKETS, GET_SEARCH_ID} from "./actionTypes";
import axios from "axios";


/*export function getSearchId() {
    return async dispatch => {
        try {
            let axiosData = await axios.get('https://front-test.beta.aviasales.ru/search');
            let searchId = axiosData.data.searchId;
            dispatch({
                type: GET_SEARCH_ID,
                searchId
            })
        } catch (e) {
            console.log('error getSearchId',e);
            getSearchId();
        }
    }
}*/

export function changeFilterHandler(event, id) {
    return async (dispatch, getState) => {
        let filters = getState().tickets.filters;
        let searchId = getState().tickets.searchId;
        filters.forEach(filter => filter.id === id ? filter.checked = event.target.checked : null);
        if (!filters.find(filter => filter.checked)) {
            filters[0].checked = true;
        }
        try {
            let response = await axios({
                method: 'get',
                url: `https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`
            });
            response = response.data;
            let resolveTickets = ticketsFinder(response.tickets, filters, 5);
            dispatch({
                type: CHANGE_FIlTER,
                tickets: resolveTickets,
                filters,
            })
        } catch (e) {
            console.log(e);
        }
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

export function getTickets() {
    return async (dispatch, getState) => {
        let axiosData = await axios.get('https://front-test.beta.aviasales.ru/search');
        let {searchId} = axiosData.data;
        const state = getState();
        await subscribe(searchId, dispatch, state);
    }
}

async function subscribe(searchId, dispatch, state) {
    try {
        let response = await axios({
            method: 'get',
            url: `https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`
        });

        response = response.data;
        /*console.log(response);*/

        if (response.stop) {
            // Статус 502 - это таймаут соединения;
            // возможен, когда соединение ожидало слишком долго
            // и сервер (или промежуточный прокси) закрыл его
            // давайте восстановим связь
            console.log('stop');
            return;
            /*await subscribe();*/
        } else {
            let filters = state.tickets.filters;

            // здесь будет dispatch()
            dispatch(ticketHandler(searchId, response.tickets, filters, 5));
            await new Promise(resolve => setTimeout(resolve, 30000));
            await subscribe(searchId, dispatch, state);
        }
    } catch (e) {
        console.log(e);
        await subscribe(searchId, dispatch, state);
    }
}

function checkTicket(filters, ticket) {
    let value = false;
    filters.forEach(filter => {
        if (filter.checked) {
            value = value || filter.handler(ticket);
        }
    });
    return value;
}

function ticketsFinder(tickets, filters, num) {
    let check = 0;
    let index = 0;
    let resolveTickets = [];
    while(check !== num && index < tickets.length - 1) {
        let ticket = tickets[index];
        if (checkTicket(filters, ticket)) {
            resolveTickets.push(ticket);
            check = check + 1;
        }
        index = index + 1;
    }
    return resolveTickets;
}

export function ticketHandler(searchId, tickets, filters, num) {
    const resolveTickets = ticketsFinder(tickets, filters, num);
    return {
        type: RENDER_TICKETS,
        tickets: resolveTickets,
        searchId
    }
}