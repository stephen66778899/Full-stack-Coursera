import React, { Component } from 'react';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';

class Main extends Component {
  constructor(props){
    super(props);

    // DISHES here is lfted into the App.js, now menu can have access to it too
    this.state = { 
        dishes: DISHES,
        selectedDish: null
    };
  }


  onDishSelect(dishId){
    this.setState({selectedDish: dishId});
  }

  render(){
    // <Menu> tag refers to our Custom JS component
    // App passes DISHES to Menu as an attribute, Menu may have access to it as a prop
    return (
      <div>
        <Header />
        <div className="container">
            <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} />
            <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />
        </div>
        <Footer />
      </div>
    );
  }
}
export default Main;