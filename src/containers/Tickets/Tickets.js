import React, {Component} from 'react';
import {connect} from 'react-redux';
import classes from './Tickets.module.css';
import Tabs from "../Tabs/Tabs";
import {getTickets} from "../../store/actions/tickets";
import Ticket from '../../components/Ticket/Ticket';


class Tickets extends Component {
    
    renderTickets = (tickets) => {
        const sort = this.props.tabs.find(tab => tab.checked).sort;
        tickets = sort(tickets);
        return tickets.map((ticket, id) => <Ticket key={id} ticket={ticket}/>);
    };

    componentDidMount() {
        this.props.getTickets();
    }

    render() {
        return (
            <div className={classes.Tickets}>
                    <Tabs />

                    <div className={classes.Container}>
                        {
                            this.renderTickets(this.props.tickets)
                        }
                    </div>
            </div>
            )

    }
}

function mapStateToProps(state) {
    return {
        tickets: state.tickets.tickets,
        tabs: state.tickets.tabs,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getTickets: () => dispatch(getTickets())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tickets);