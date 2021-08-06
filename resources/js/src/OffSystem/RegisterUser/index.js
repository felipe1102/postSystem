import React, {useState} from "react";
import {Button, Row} from 'react-bootstrap';
import {useHistory} from "react-router-dom";
import Input from "../../Components/Input";
import Message from "../../Components/Message";
import Spinner from "../../Components/Spinner/Spinner";

import styles from "./RegisterUser.module.css";
import SweetAlerts from "../../Components/SweetAlert/SweetAlerts";

export default props =>{
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        "name": "",
        "email": "",
        "password": ""
    });

    const [showAlert, setShowAlert] = useState(false);
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
    const [showConfirm, setShowConfirm] = useState(true);
    const [showCancel, setShowCancel] = useState(false);
    const [typeSweetAlert, setTypeSweetAlert] = useState('success');
    const [btnConfirmStyle, setBtnConfirmStyle] = useState('success');
    const [btnCancelStyle, setBtnCancelStyle] = useState('danger');
    const [confirmBtnText, setConfirmBtnText] = useState('Ok');
    const [cancelBtnText, setCancelBtnText] = useState('Cancelar');
    const [sucess, setSucess] = useState(true);

    const onChange=(e)=>{
        setUser({...user, [e.target.name]: e.target.value})
    }

    const onConfirm = e =>{
        setShowAlert(false);
        if (sucess){
            history.push('/')
        }
    }

    const handlerSubmit = async (e) => {
        e.preventDefault();
        axios.post(`/api/v1/user`, user).then(response => {
            setText(response.data.message);
            setTitle("Sucesso");
            setShowAlert(true);
            setSucess(true);
        }).catch(err => {
            let error = err.response.data;
            setSucess(false);
            setTitle(error.error);
            setText(error.message);
            setConfirmBtnText("Ok")
            setTypeSweetAlert('danger')
            setShowAlert(true);
        })
    }

    return(
        <div className={styles.UserRegister}>

            <form onSubmit={handlerSubmit}>
                <h3>Cadastro de usuário</h3>
                <Input
                    placeholder={'Nome'}
                    label={'Nome'}
                    name={'name'}
                    required
                    onChange={e => onChange(e)}
                    value={user.name}
                    type={'text'}
                />

                <Input
                    placeholder={'E-mail'}
                    label={'E-mail'}
                    name={'email'}
                    required
                    onChange={e => onChange(e)}
                    value={user.email}
                    type={'email'}
                />

                <Input
                    placeholder={'Senha'}
                    label={'Senha'}
                    name={'password'}
                    required
                    onChange={e => onChange(e)}
                    value={user.password}
                    type={'password'}
                />
                {props.error ? <Message type={'error'}>{props.error}</Message> : null}
                <Button type={"submit"} size="lg">Cadastrar {loading ? <Spinner size={'small'} /> : null}</Button>
                <Button className={"mt-2"} variant="secondary" href="/login">Voltar</Button>
            </form>
            <SweetAlerts
                onConfirm={onConfirm}
                show={showAlert}
                showConfirm={showConfirm}
                showCancel={showCancel}
                text={text}
                type={typeSweetAlert}
                title={title}
                btnConfirmStyle={btnConfirmStyle}
                btnCancelStyle={btnCancelStyle}
                confirmBtnText={confirmBtnText}
                cancelBtnText={cancelBtnText}
            >
            </SweetAlerts>
        </div>
    )
};
