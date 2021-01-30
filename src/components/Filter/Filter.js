import classes from './Filter.module.css';
import React from "react";

const Filter = props => {
    return (
        <div className={classes.Filter}>
            <label className={classes.Checkbox}>{props.text}
                <input type="checkbox" onChange={props.change} checked={props.checked} />
                <span className={classes.Checkmark}></span>
            </label>
        </div>
    )
};

export default Filter;