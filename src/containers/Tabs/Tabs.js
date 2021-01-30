import React, {Component} from 'react';
import {connect} from 'react-redux';
import classes from './Tabs.module.css';
import {tabsChange} from "../../store/actions/tickets";

class Tabs extends Component {

    renderTabs = (tabs) => {
        return tabs.map(tab => (
            <div
                key={tab.id}
                className={`${classes.Element} ${tab.checked ? classes.Checked : ''}`}
                onClick={() => this.props.tabsChange(tab.id)}
            >
                <p>{tab.text}</p>
            </div>
        ))
    };

    render() {
        return (
            <div className={classes.Tabs}>
                {
                    this.renderTabs(this.props.tabs)
                }
            </div>
            )
    }
}

function mapStateToProps(state) {
    return {
        tabs: state.tickets.tabs
    }
}

function mapDispatchToProps(dispatch) {
    return {
        tabsChange: id => dispatch(tabsChange(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);