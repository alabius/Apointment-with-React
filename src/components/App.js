import React, { Component }from 'react';
import '../css/App.css';

import AddApointment from './AddAppointment';
import ListApointment from './ListAppointment.js';
import SearchApointment from './SearchAppointment';

import {without} from 'lodash';

class App extends Component{

  constructor(){
    super();
    this.state = {
      myAppointments: [],
      formDisplay: false,
      lastIndex: 0
    }
    this.deleteAppointment= this.deleteAppointment.bind(this);
    this.toggleForm= this.toggleForm.bind(this);
    this.AddApointment= this.AddApointment.bind(this);
  }

  deleteAppointment(apt){
    let tempApts = this.state.myAppointments;
    tempApts = without(tempApts, apt);

    this.setState({
      myAppointments: tempApts
    });
  }
  AddApointment(apt) {
    let tempApts = this.state.myAppointments;
    apt.aptid = this.state.lastIndex;
    tempApts.unshift(apt);
    this.setState({
      myAppointments: tempApts,
      lastIndex: this.state.lastIndex +1
    })
  }
  toggleForm(){
    this.setState({
      formDisplay: !this.state.formDisplay
    });
  }

  componentDidMount(){
    fetch('./data.json')
    .then(response => response.json())
    .then(result =>{
      const apts = result.map(item => {
        item.aptid = this.state.lastIndex;
        this.setState({ lastIndex: this.state.lastIndex + 1 })
        return item;
        
      })
      this.setState({
        myAppointments: apts
      });
    });
  }

  render(){
    return(
      <main className="page bg-white" id="petratings">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">
                <AddApointment 
                  formDisplay={this.state.formDisplay}
                  toggleForm={this.toggleForm}
                  AddApointment = {this.AddApointment}
                />
                <SearchApointment />
                <ListApointment appointments ={this.state.myAppointments}
                  deleteAppointment={this.deleteAppointment} />
              </div>
            </div>
          </div>
        </div>
      </main>

    );
    }
}

export default App;