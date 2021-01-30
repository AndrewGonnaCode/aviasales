import React, {Component} from 'react';
import classes from './Filters.module.css';
import {connect} from "react-redux";
import Filter from "../../components/Filter/Filter";
import {changeFilterHandler} from '../../store/actions/tickets';

class Filters extends Component {

    renderFilters = (filters) => {
        return filters.map(filter =>
            <Filter
                key={filter.id}
                text={filter.text}
                change={event => this.props.changeHandler(event, filter.id)}
                checked={filter.checked}
            />)
    };

    render() {
        return (
            <div className={classes.Filters}>
                <div className={classes.Title}>
                    Количество пересадок
                </div>
                <div className={classes.Column}>
                    {
                        this.renderFilters(this.props.filters.filters)
                    }
                </div>
            </div>
            )
    }
}

function mapStateToProps(state) {
    return {
        filters: state.tickets
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeHandler: (event, id) => dispatch(changeFilterHandler(event, id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters);