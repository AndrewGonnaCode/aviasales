import {CHANGE_FIlTER, CHANGE_TABS, RENDER_TICKETS, GET_SEARCH_ID} from "../actions/actionTypes";

const initalState = {
    filters: [
        {
            id: 1,
            text: 'Все',
            selected: false,
            checked: true,
            handler: () => true,
        },
        {
            id: 2,
            text: 'Без пересадок',
            selected: false,
            checked: false,
            handler: (ticket) => {
                return ticket.segments[0].stops.length === 0;
            },
        },
        {
            id: 3,
            text: '1 пересадка',
            selected: false,
            checked: false,
            handler: (ticket) => {
                return ticket.segments[0].stops.length === 1;
            },
        },
        {
            id: 4,
            text: '2 пересадки',
            selected: false,
            checked: false,
            handler: (ticket) => {
                return ticket.segments[0].stops.length === 2;
            },
        },
        {
            id: 5,
            text: '3 пересадки',
            selected: false,
            checked: false,
            handler: (ticket) => {
                return ticket.segments[0].stops.length === 3;
            },
        },
    ],
    tabs: [
        {
            id: 1,
            text: 'Самый дешевый',
            checked: true,
            sort: (tickets) => {
                return tickets.sort((a, b) => a.price - b.price);
            }
        },
        {
            id: 2,
            text: 'Самый быстрый',
            checked: false,
            sort: (tickets) => {
                return tickets.sort((a, b) => a.segments[0].duration - b.segments[0].duration);
            }
        }
    ],
    tickets: [],
    searchId: 0
};

export default function tickets(state = initalState, action) {
    switch(action.type) {
        case CHANGE_TABS:
            return {
                ...state, tabs: action.tabs
            };
        case RENDER_TICKETS:
            return {
                ...state, tickets: action.tickets, searchId: action.searchId
            };
        case CHANGE_FIlTER:
            return {
                ...state, filters: action.filters, tickets: action.tickets
            };
        case GET_SEARCH_ID:
            return {
              ...state, searchId: action.searchId
            };
        default:
            return state;
    }
}