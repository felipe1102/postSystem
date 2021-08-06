import React, {useState} from 'react';

import styles from './Input.module.css';
import Message from "../Message";

const Input = (props) => {



    return (
        <div className={styles.Input}>

            <div className={styles.labels}>
                <label htmlFor={props.id}>{props.label} {props.required? '*' : null}</label>
            </div>

            <input
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                type={props.type}
                required={props.required}
                placeholder={props.placeholder}
            />
        </div>
    );
}

export default Input;
