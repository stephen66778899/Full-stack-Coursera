import React, { Component } from 'react';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';
import {Switch, Route, Redirect} from 'react-router-dom';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import About from './AboutComponent';


class Main extends Component {
  constructor(props){
    super(props);

    // DISHES here is lfted into the App.js, now menu can have access to it too
    this.state = { 
        dishes: DISHES,
        comments: COMMENTS,
        promotions: PROMOTIONS,
        leaders: LEADERS
    };
  }

  render(){
    // the dish, promotion and leader props get the dish with dish, promotion and leader that has the featured value to be true
    const HomePage = () => {
        return(
            <Home dish={this.state.dishes.filter((dish) => dish.featured)[0]}
                promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
                leader={this.state.leaders.filter((leader) => leader.featured)[0]}
                />
        );
    }

    // Route passes 3 props to the component: match, location, history. We are using the match prop here
    // inside the match object contains a params object which contains key/value pairs that are parsed from
    // the URL corresponding to the dynamic segments of the path. Notice we defined path as path="/menu/:dishId"
    // therefore it is match.params.dishId
    const DishWithId = ({match}) => {
        return(
            <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}/>
        );
    }

    /*                                      Router Overview
    React Router is used here to navigate between different pages, redirect here means if URL doesn't match any Route path, 
    the page goes back to Home
    Route can be viewed as match up a certain path with a certain component (view), the Switch iterates all the child Routes
    and  find the first one that matches the path. Exact path is used in menu because dish detail's URL also contains /menu,
    if we don't use exact path the Switch will always match with /menu instead of /menu/:dishId, which causes bugs
    To navigate using React Router, we use <Link to="/home">Home</Link>
    */

    return (
      <div>
        <Header />
        <Switch>
            <Route path="/home" component={HomePage} />
            <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} />} />
            <Route path="/menu/:dishId" component={DishWithId} />
            <Route exact path="/contactus" component={Contact} />
            <Route path="/aboutus" component={() => <About leaders={this.state.leaders} />}/>
            <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}
export default Main;