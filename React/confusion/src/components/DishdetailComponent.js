import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, 
    ModalHeader, ModalBody, Row, Col, Label} from 'reactstrap';
import {Control, LocalForm, Errors} from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent'

    function RenderDish({dish}){
        if(dish != null){
            return(
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        }
        else{
            return(
                <div></div>
            )
        }
    }

    // dishId is needed so that we know the comment is added to which dish
    function RenderComments({comments, addComment, dishId}){
        const commentsList = comments.map((comment) => {
            return (
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author}， 
                    {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long', day: '2-digit'}).format(new Date(comment.date))}
                    </p>
                </li>
            );
        });

        return (
            <div>
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {commentsList}
                </ul>
                <CommentForm dishId={dishId} addComment={addComment} />
            </div>
        );
    }

    const maxLength = (len) => (val) => !(val) || (val.length <= len);
    const minLength = (len) => (val) => val && (val.length >= len);

    class CommentForm extends Component{
        constructor(props){
            super(props);
            this.state = {
                isModalOpen: false
            };
            this.handleSubmit = this.handleSubmit.bind(this);
            this.toggleModal = this.toggleModal.bind(this);
        }
    
        toggleModal(){
            this.setState({
                isModalOpen: !this.state.isModalOpen
            });
        }

        handleSubmit(values) {
            console.log("Current State is: " + JSON.stringify(values));
            // here the addComment action is used whenever a new rating is submitted
            this.props.addComment(this.props.dishId, values.rating, values.fullName, values.comment);
        }

        render() {
            return (
                <React.Fragment>
                    <Button outline onClick={this.toggleModal}>
                        <span className="fa fa-pencil fa-lg"></span> Submit Comment
                    </Button>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader isOpen={this.state.isModalOpen} toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody> 
                            <LocalForm onSubmit={(values => this.handleSubmit(values))}>
                                <Row className="form-group">
                                    <Label md={2} htmlFor="rating">Rating</Label>
                                    <Col md={12}>
                                        <Control.select model=".rating" className="form-control" name="rating" id="rating">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label md={4} htmlFor="fullName">Your Name</Label>
                                    <Col md={12}>
                                        <Control.text model=".fullName"
                                            name="fullName" 
                                            id="fullName" 
                                            placeholder="Your Name"
                                            className="form-control"
                                            validators={{
                                                minLength: minLength(2), maxLength: maxLength(15)
                                            }}
                                            />
                                        <Errors className="text-danger"
                                            model=".fullName"
                                            show="touched"
                                            messages={{
                                                minLength: 'Must be greater than 2 characters',
                                                maxLength: 'Must be 15 characters or less'
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label md={2} htmlFor="comment">Comment</Label>
                                    <Col md={12}>
                                        <Control.textarea model=".comment"
                                        name="comment"
                                        id="comment" 
                                        rows="6"
                                        className="form-control"/>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col md={2}>
                                        <Button type="submit" color="primary">Submit</Button>
                                    </Col>
                                </Row>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </React.Fragment>
            );
        }
    }

    const DishDetail = (props) => {
        if(props.isLoading){
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return (
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if(props.dish != null){
            return(
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish={props.dish} />
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <RenderComments comments={props.comments}
                                addComment={props.addComment} dishId={props.dish.id}/>
                        </div>
                    </div>            
                </div>
            );
        }
        else{
            return(
                <div>null</div>
            );
        }
    }

export default DishDetail;