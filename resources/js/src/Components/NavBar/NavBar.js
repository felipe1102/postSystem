import React from "react";
import {Navbar, Nav, Container } from 'react-bootstrap';
import {NavLink, withRouter} from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from "../../Store/Actions";

const NavBar = props =>{
    const logout = e => {
        e.preventDefault();
        props.logout(props.token);
    };
    return(
        <>
            <Navbar className="justify-content-center" bg="dark" fixed="top" variant="dark" expand="lg">
                <Container>
                <Navbar.Brand href="#home">Post system</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Posts</Nav.Link>
                        <Nav.Link href="/post/new">Novo Post</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link onClick={logout}>Sair</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
};

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        loading: state.auth.loading,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        logout: (token) => dispatch(actions.logout(token))
    }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
