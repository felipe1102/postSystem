import React, {Suspense, useEffect} from "react";
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { authCheckState } from "./Store/Actions";
import Spinner from "./Components/Spinner/Spinner";

//const Login = React.lazy(()=>import("./OffSystem/Login"));
const System = React.lazy(()=>import("./System"));
const OffSystem = React.lazy(()=>import("./OffSystem"));

import 'bootstrap/dist/css/bootstrap.min.css'

const App = props =>{

    const { onTryAutoSignup } = props;
    let route = null;

    useEffect(() => {
        onTryAutoSignup();
    }, [onTryAutoSignup]);
    if(props.isAuthenticated){
        route = <System {...props}/>
    } else {
        route = <OffSystem/>;
    }

    return (
        <Suspense fallback={<Spinner/>}>
            <Switch>
                <Route  path='/' render={() => route}/>
            </Switch>
        </Suspense>
    );
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userType: state.auth.userType,
        isAuthenticated: state.auth.token !== null
    }
};
const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(authCheckState())
    }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
