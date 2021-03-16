import classes from './AddBtn.module.css';
import {connect} from 'react-redux';
import {showTickets} from "../../store/actions/tickets";

const AddBtn = props => {
    return (
        <button
            className={classes.AddBtn}
            onClick={props.showMoreTickets}
        >
            Показать еще 5 билетов!
        </button>
    )
};

function mapDispatchToProps(dispatch) {
    return {
        showMoreTickets: () => dispatch(showTickets(5))
    }
}

export default connect(null, mapDispatchToProps)(AddBtn);