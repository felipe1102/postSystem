import React from 'react';
import './Spinner.module.css';

const Spinner = ({size}) => (
    <div className={size}>
        <div className={`loader ${size}`}>Loading...</div>
    </div>

);

export default Spinner;
