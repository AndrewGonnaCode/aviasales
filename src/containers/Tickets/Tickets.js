import React, {Component} from 'react';
import {connect} from 'react-redux';
import classes from './Tickets.module.css';
import Tabs from "../Tabs/Tabs";
import {changeSeacrhId, subscribe} from "../../store/actions/tickets";
import Ticket from '../../components/Ticket/Ticket';

function checkTicket(filters, ticket) {
    let value = false;
    filters.forEach(filter => {
        if (filter.checked) {
            value = value || filter.handler(ticket);
        }
    });
    return value;
}

class Tickets extends Component {
    
    renderTickets = () => {
        const tickets = this.getTickets(5);
        return tickets.map((ticket, id) => <Ticket key={id} ticket={ticket}/>);
    };

    getTickets = (value) => {
        const tickets = this.props.tickets;
        const tabs = this.props.tabs;
        const filters = this.props.filters;


        let validTickets = [];
        let index = 0;

        while(validTickets.length !== value) {
            if (checkTicket(filters, tickets[index])) {
                validTickets.push(tickets[index]);
            }
            index++;
        }

        const sort = tabs.find(tab => tab.checked).sort;
        return sort(validTickets);
    };

    componentDidMount() {
        this.props.changeSeacrhId();
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.searchId !== this.props.searchId) {
            this.props.subscribe(this.props.searchId);
        }
    }

    render() {
        console.log('render', this.props.tickets);
        return (
            <div className={classes.Tickets}>
                    <Tabs />

                    <div className={classes.Container}>
                        {
                            this.props.loading ?
                                <p>Загрузка...</p>
                                :
                                this.renderTickets()
                        }
                    </div>
            </div>
            )

    }
}

function mapStateToProps(state) {
    return {
        tickets: state.tickets.tickets,
        searchId: state.tickets.searchId,
        loading: state.tickets.loading,
        tabs: state.tickets.tabs,
        filters: state.tickets.filters

    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeSeacrhId: () => dispatch(changeSeacrhId()),
        subscribe: (searchId) => dispatch(subscribe(searchId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tickets);