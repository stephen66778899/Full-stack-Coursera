import React, { Component } from 'react';
import logo from './logo.svg';
import { Navbar, NavbarBrand } from 'reactstrap';
import './App.css';
import Menu from './components/MenuComponent';
import { DISHES } from './shared/dishes';

class App extends Component {
  constructor(props){
    super(props);

    // DISHES here is lfted into the App.js, now menu can have access to it too
    this.state = { dishes: DISHES };
  }

  render(){
    // <Menu> tag refers to our Custom JS component
    // App passes DISHES to Menu as an attribute, Menu may have access to it as a prop
    return (
      <div>
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
          </div>
        </Navbar> 
        <Menu dishes={this.state.dishes}/>
      </div>
    );
  }
}
export default App;
