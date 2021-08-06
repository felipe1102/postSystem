import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../Store/Actions";
import styles from './Login.module.css';
import Input from "../../Components/Input";
import Message from "../../Components/Message";
//import Button from "../../Components/Button";
import Spinner from "../../Components/Spinner/Spinner";
import {Button} from 'react-bootstrap';
const Login = props =>{

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handlerSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        props.onAuth(user, password);
        setLoading(false);
    }

    const setPasswordChange = e => {
        setPassword(e.target.value);
    }

    const setUserChange = e => {
        setUser(e.target.value);
    }

    return(
        <div className={styles.Login}>
            <form onSubmit={handlerSubmit}>
                <Input
                    placeholder={'Email'}
                    label={'Email'}
                    required
                    onChange={setUserChange}
                    value={user}
                    type={'text'}
                />
                <Input
                    placeholder={'Senha'}
                    label={'Senha'}
                    required
                    type={'password'}
                    value={password}
                    onChange={setPasswordChange}
                />
                {props.error ? <Message type={'error'}>{props.error}</Message> : null}
                <Button size="lg">Entrar {loading ? <Spinner size={'small'} /> : null}</Button>

                <Button className={"mt-2"} variant="secondary" href="/user">Cadastrar usuario</Button>
            </form>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    }
};
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (user, password) => dispatch(actions.auth(user, password))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
