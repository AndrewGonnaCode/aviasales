import {
    CHANGE_FIlTER,
    CHANGE_TABS,
    CHANGE_SEARCHID,
    CHANGE_TICKETS
} from "../actions/actionTypes";

const initalState = {
    filters: [
        {
            id: 1,
            text: 'Все',
            checked: true,
            handler: () => true,
        },
        {
            id: 2,
            text: 'Без пересадок',
            checked: false,
            handler: (ticket) => {
                return ticket.segments[0].stops.length === 0;
            },
        },
        {
            id: 3,
            text: '1 пересадка',
            checked: false,
            handler: (ticket) => {
                return ticket.segments[0].stops.length === 1;
            },
        },
        {
            id: 4,
            text: '2 пересадки',
            checked: false,
            handler: (ticket) => {
                return ticket.segments[0].stops.length === 2;
            },
        },
        {
            id: 5,
            text: '3 пересадки',
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
    searchId: 0,
    activeTickets: [],
    loading: true
};

export default function tickets(state = initalState, action) {
    switch(action.type) {
        case CHANGE_SEARCHID:
            return {
                ...state, searchId: action.payload, loading: true
            };
        case CHANGE_TICKETS:
            return {
              ...state, tickets: action.payload, loading: false
            };
        case CHANGE_TABS:
            return {
                ...state, tabs: action.tabs
            };
        case CHANGE_FIlTER:
            let tickets = [...state.tickets];
            return {
                ...state, filters: action.payload, tickets
            };
        default:
            return state;
    }
}