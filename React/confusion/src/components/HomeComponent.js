import React from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle, CardSubtitle } from 'reactstrap';
import {Loading} from './LoadingComponent';
import "../cardTitle.css";

function RenderCard({item, isLoading, errMess}){
    if (isLoading) {
        return(
            <Loading />
        )
    }
    else if(errMess) {
        return(
            <h4>{errMess}</h4>
        );
    }
    // only leader props has designation, therefore check if it is null, then render it
    // This is legal because JSX allows us to write JavaScript code within HTML
    else{
        return(
            <Card>
                <CardImg src={item.image} alt={item.name} />
                <CardBody>
                    <CardTitle className="card-title">{item.name}</CardTitle>
                    {item.designation ? <CardSubtitle className="card-subtitle">{item.designation}</CardSubtitle> : null}
                    <CardText>{item.description}</CardText>
                </CardBody>
            </Card>
        );
    }
}

function Home(props){
    return(
        <div className="container">
            <div className="row align-items-start">
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.dish} 
                    isLoading={props.dishesLoading} 
                    errMess = {props.dishesErrMess}/>
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.promotion} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.leader} />
                </div>
            </div>
        </div>
    );
}

export default Home;