import React, { Component } from 'react';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { addComment, fetchDishes } from '../redux/ActionCreators';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import { actions } from 'react-redux-form';

// neccessary for redux, state here, is the state from store, which is returned by Reducer in reducer.js
// the returned object will be connected to Main component by the connect function, they will become props in Main
const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  } 
}

//neccessary for new comments to be added to the comment page, which requires redux actions to be dispatched
// must be connected, so that addComment can be used in the main component as a function
const mapDispatchToProps = (dispatch) => ({
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => {dispatch(fetchDishes())},
  // 'feedback' here is the name of the form
  resetFeedbackForm: () => {dispatch(actions.reset('feedback'))}
});

class Main extends Component {
  constructor(props){
    super(props);
  }

  // will be executed just after this component gets mounted to the view, a good time to fetch the data
  componentDidMount() {
    this.props.fetchDishes();
  }

  render(){
    // the dish, promotion and leader props get the dish with dish, promotion and leader that has the featured value to be true
    const HomePage = () => {
      // this.props.dishes contains 3 values (isLoading, errMess, dishes)
        return(
            <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                dishesLoading={this.props.dishes.isLoading}
                dishesErrMess={this.props.dishes.errMess}
                promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
                leader={this.props.leaders.filter((leader) => leader.featured)[0]}
                />
        );
    }

    // Route passes 3 props to the component: match, location, history. We are using the match prop here
    // inside the match object contains a params object which contains key/value pairs that are parsed from
    // the URL corresponding to the dynamic segments of the path. Notice we defined path as path="/menu/:dishId"
    // therefore it is match.params.dishId
    const DishWithId = ({match}) => {
        return(
            <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                isLoading={this.props.dishes.isLoading}
                errMess={this.props.dishes.errMess}
                comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
                addComment={this.props.addComment} />
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
            <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
            <Route path="/menu/:dishId" component={DishWithId} />
            <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm}/>} />
            <Route path="/aboutus" component={() => <About leaders={this.props.leaders} />}/>
            <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

// connect the Main component with the store, withRouter is used because router is used in Main component
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));