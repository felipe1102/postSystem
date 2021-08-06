import React from 'react';
import styles from './Message.module.css';

const Message = (props) => {

    return (
        <div className={styles.Message}>
            <div className={props.type ? styles[props.type] : null}>
                {props.children}
            </div>
        </div>
    );
}

export default Message;
