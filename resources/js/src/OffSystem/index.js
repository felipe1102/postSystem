import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'react-bootstrap';

const OffSystem = () => {
    const Login = React.lazy(() => import('./Login/index'));
    const RegisterUser = React.lazy(() => import('./RegisterUser/index'));

    return (
        <Container fluid>
            <Switch>
                <Route path={'/login'} render={() => <Login/>} />
                <Route path={'/user'} render={() => <RegisterUser/>} />
                <Redirect to={'/login'} from={'/'} render={() => <RegisterUser />}/>
            </Switch>
        </Container>
    );
}

export default OffSystem;
