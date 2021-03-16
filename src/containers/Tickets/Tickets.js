import React, {Component} from 'react';
import {connect} from 'react-redux';
import classes from './Tickets.module.css';
import Tabs from "../Tabs/Tabs";
import {changeSeacrhId, subscribe} from "../../store/actions/tickets";
import Ticket from '../../components/Ticket/Ticket';
import AddBtn from "../../components/AddBtn/AddBtn";
import Loader from "../../components/Loader/Loader";

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

    getTickets = () => {
        const {tickets, tabs, filters, amountTickets} = this.props;

        let validTickets = [];
        let index = 0;

        while(validTickets.length !== amountTickets && index < tickets.length) {
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
        return (
            <div className={classes.Tickets}>
                    <Tabs />

                    <div className={classes.Container}>
                        {
                            this.props.loading ?
                                <Loader />
                                :
                                <>
                                    {this.renderTickets()}
                                    <div className={classes.AddBtn}>
                                        <AddBtn />
                                    </div>
                                </>
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
        filters: state.tickets.filters,
        amountTickets: state.tickets.amountTickets
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeSeacrhId: () => dispatch(changeSeacrhId()),
        subscribe: (searchId) => dispatch(subscribe(searchId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tickets);