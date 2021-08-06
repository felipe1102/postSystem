import React, {Suspense} from "react";
import {Switch, Route, Redirect} from 'react-router-dom';
import NavBar from "../Components/NavBar/NavBar";
import {Container} from "react-bootstrap";
import Spinner from "../Components/Spinner/Spinner";
import Styled from "./System.module.css"


export default props =>{
    const PostList = React.lazy(()=>import("./PostList"))
    const PostForm= React.lazy(()=>import("./PostForm"))
    return(
        <div>

            <NavBar/>
            <Container className={Styled.SystemContainer}>
                <Suspense fallback={<Spinner/>}>
                    <Switch>
                        <Route path={'/post/new'} render={() => <PostForm/>}/>
                        <Route path={'/post/:id'} render={() => <PostForm/>}/>
                        <Route path={'/post'} render={() => <PostList/>}/>

                        <Redirect to={'/post'} from={'/'} render={() => <PostList />}/>
                    </Switch>
                </Suspense>
            </Container>

        </div>
    )
}
