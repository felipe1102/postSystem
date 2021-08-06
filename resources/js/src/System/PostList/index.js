import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import {useHistory, withRouter} from "react-router-dom";
import {Card, Button, Row, Form} from "react-bootstrap";
import Spinner from "../../Components/Spinner/Spinner";

const PostList = props =>{
    const history = useHistory();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect( () => {
        axios.get(`/api/v1/post`, {
            headers: {
                Authorization: `Bearer ${props.token}`
            }
        }).then(response => {
            setPosts(response.data.data);
            setLoading(false);
        }).catch(err => {
            setLoading(false);
            console.log(err);
        })
    }, []);

    const viewPost = (e, id) =>{
        e.preventDefault();
        history.push(`/post/${id}`)
    }

    if (loading) return (<Spinner/>);

    let cardPost = null;

    if (posts.length){
        cardPost = posts.map((post) =>
            <>
                <Card key={post.id}>
                    <Card.Header>{post.title}</Card.Header>
                    <Card.Body>
                        <Card.Title>{post.title}</Card.Title>
                        <Card.Text>
                            {post.description}
                        </Card.Text>
                        <Button variant="primary" onClick={e => viewPost(e, post.id)}>Ver post</Button>
                    </Card.Body>
                </Card>
                <hr className={"mt-3 mb-3"}/>
            </>
        );
    }

    return(
        <Row >
            {cardPost}
        </Row>
    )
};


const mapStateToProps = state => {
    return {
        token: state.auth.token
    }
};

export default withRouter(connect(mapStateToProps)(PostList));
