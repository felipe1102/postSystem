import React from "react";
import SweetAlert from 'react-bootstrap-sweetalert';


const SweetAlerts = ({show, showCancel, onConfirm, onCancel, type, title, btnConfirmStyle, btnCancelStyle, confirmBtnText, cancelBtnText, text, children, showConfirm}, props)=> {

    return (
        <div>
            <SweetAlert
                closeOnClickOutside= {false}
                type={type}
                showCancel={showCancel}
                showConfirm={showConfirm}
                confirmBtnText={confirmBtnText}
                cancelBtnText = {cancelBtnText}
                confirmBtnBsStyle={btnConfirmStyle}
                cancelBtnBsStyle={btnCancelStyle}
                confirmBtnStyle={{width: '10rem', height:"5rem",fontSize: "2rem", paddingTop: '0.9rem'}}
                onConfirm={onConfirm}
                onCancel={onCancel}
                openAnim={{ name: 'showSweetAlert', duration: 900 }}
                closeAnim={{ name: 'hideSweetAlert', duration: 200 }}
                title={title}
                show={show}
            >
                {children ?? text}

            </SweetAlert>
        </div>
    );
};
export default SweetAlerts;
