import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'react-bootstrap';

const OffSystem = () => {
    const Login = React.lazy(() => import('./Login/index'));
    const RegisterUser = React.lazy(() => import('./RegisterUser/index'));
    return (
        <Container fluid>
            <Switch>
                <Route key={'/login'} path={'/login'} render={() => <Login/>} />
                <Route path={'/user'} render={() => <RegisterUser/>} />
                <Redirect key={'/login'} to={'/login'} render={() => <Login />}/>
            </Switch>
        </Container>
    );
}

export default OffSystem;
