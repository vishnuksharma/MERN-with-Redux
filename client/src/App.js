import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import TransactionList from './components/TransactionList';
import AddItemForm from './components/AddItemForm';
// import TransactionGraph from './components/TransactionGraph';
import { Container } from 'reactstrap';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <div className='App'>
          <AppNavbar />
          <Container>
            <AddItemForm />
            <TransactionList />
//             <TransactionGraph />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
