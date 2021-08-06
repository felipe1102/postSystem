import React, {useState, useEffect} from "react";
import {Form, Row, Col, Button} from "react-bootstrap";
import Style from "./PostForm.module.css"
import SweetAlerts from "../../Components/SweetAlert/SweetAlerts";
import {useHistory, withRouter, useParams} from "react-router-dom";
import {connect} from "react-redux";
import Spinner from "../../Components/Spinner/Spinner";
const PostForm = props =>{
    const history = useHistory();
    const {id} = useParams();
    const [post, setPost] = useState({
        "title": "",
        "description": ""
    });

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

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

    const [loading, setLoading] = useState(true);
    const onChange=(e)=>{
        setPost({...post, [e.target.name]: e.target.value})
    }

    const onSubmit = (e) =>{
        e.preventDefault();
        axios.post(`/api/v1/post`, post, {
            headers: {
                Authorization: `Bearer ${props.token}`
            }
        }).then(response => {
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

    const onConfirm = e =>{
        setShowAlert(false);
        if (sucess){
            history.push('/')
        }
        history.push("/sale/".id)
    }

    useEffect( () => {
        if(id){

            axios.get(`/api/v1/post/${id}`, {
                headers: {
                    Authorization: `Bearer ${props.token}`
                }
            }).then(response => {
                let dataComments = [];

                if (response.data.data.comments.length ){
                    Array.prototype.push.apply(dataComments, response.data.data.comments);

                }
                if (response.data.data.logged_user_comments){
                    Array.prototype.push.apply(dataComments, [response.data.data.logged_user_comments]);
                }

                setComments(dataComments);

                setPost({
                    "title": response.data.data.title,
                    "description": response.data.data.description
                });

                setLoading(false);
            }).catch(err => {
                setLoading(false);
                //history.push("/sale");
                console.log(err);
            })

        }else{
            setLoading(false);
        }
    }, [id]);

    const createNewComment = e =>{
        e.preventDefault();
        axios.post(`/api/v1/comment`, {
                "post_id": id,
                "description": newComment
        }, {
            headers: {
                Authorization: `Bearer ${props.token}`
            }
        }).then(response => {
            setText(response.data.message);
            setTitle("Sucesso");
            setShowAlert(true);
            setSucess(false)
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

    let listComment = null;
    if (comments.length){
        listComment = comments.map((comment) =>
            <Form.Group key={comment.id} className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Control as="textarea" disabled={id?true:false} rows={3} value={comment.description} />
            </Form.Group>
        );
    }

    if (loading) return (<Spinner/>);

    return(
            <Row className="justify-content-md-center">
                <Col xs lg="10">
                    <h3>Post</h3>
                    <Form onSubmit={onSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Titulo</Form.Label>
                            <Form.Control type="text" disabled={id?true:false} placeholder="Titulo" value={post.title} onChange={e => onChange(e)} name={"title"} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control as="textarea" disabled={id?true:false} rows={3} value={post.description} onChange={e => onChange(e)} name={"description"} />
                        </Form.Group>
                        {
                            id ? null : <Button type="submit" className="mb-2">
                                Cadastrar
                            </Button>
                        }
                    </Form>
                </Col>
                {
                    !id ? null :
                        <Col xs lg="10">
                            <h4>Comentarios</h4>
                            <hr />
                            <Form >
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Comentar</Form.Label>
                                    <Form.Control as="textarea" rows={3} value={newComment} onChange={e => setNewComment(e.target.value)} name={"comment"} />
                                </Form.Group>

                                <Button onClick={e => createNewComment(e)} className="mb-2">
                                    Comentar
                                </Button>

                            </Form>
                            {listComment}

                        </Col>
                }

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
                />

            </Row>
    )
}

const mapStateToProps = state => {
    return {
        token: state.auth.token
    }
};

export default withRouter(connect(mapStateToProps)(PostForm));
