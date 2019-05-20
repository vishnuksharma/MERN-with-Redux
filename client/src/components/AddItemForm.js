import React, { Component } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

const initState = {
  userName: 'USER-A',
  paymentMode: '',
  amount: 0,
  errorPaymentMode: '',
  errorAmount: ''
}
class AddItemForm extends Component {
  state = initState;

  static propTypes = {
    isAuthenticated: PropTypes.bool
  };

  handleChange = e => {
    this.setState( {[e.target.name]: e.target.value} );
    console.log(this.state)
  };

  validate = () => {
    let errorPaymentMode = '';
    let errorAmount = ''; 
    if (this.state.paymentMode === ''){
      errorPaymentMode = 'Select payment Mode';
    }
    if (this.state.amount == '' || parseInt(this.state.amount) == 0 || parseInt(this.state.amount) > 5000 ){
      errorAmount = 'Amount not valid';
    }
    console.log(this.state.paymentMode, this.state.amount)
    if (errorPaymentMode || errorAmount){
      this.setState({errorPaymentMode, errorAmount});

      return false;
    }
    return true;
  }
  onSubmit = e => {
    e.preventDefault();
    const isValid = this.validate()
    if (isValid) {
      const newItem = {
        userName: this.state.userName,
        paymentMode: this.state.paymentMode,
        amount: this.state.amount
      };
      // Add item via addItem action
      this.props.addItem(newItem);
      e.target.reset();
      this.setState(initState)
    }
    
  };

  render() {
    return (
      <div className="addItem-wrapper bg-color">
        {this.props.isAuthenticated ? (
          <Form ref="addItemForm" onSubmit={this.onSubmit}>
            <FormGroup className="floatLeft width20Per ml">
              <Label for='userSelect'>Select User</Label>
              <Input type="select" name="userName" id="userSelect" onChange={this.handleChange}>
                <option>USER-A</option>
                <option>USER-B</option>
                <option>USER-C</option>
                <option>USER-D</option>
                <option>USER-E</option>
              </Input>
            </FormGroup>

            
            <FormGroup className="floatLeft width20Per ml">
              <Label className={(this.state.errorPaymentMode ? 'errormsg' : '')} for='paymentMode'>Payment Mode</Label>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="paymentMode" value="American Express" onClick={this.handleChange} />{' '}
                  American Express
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="paymentMode" value="VISA" onClick={this.handleChange} />{' '}
                  VISA
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="paymentMode" value="DBS PayLa" onClick={this.handleChange} />{' '}
                  DBS PayLa
                </Label>
              </FormGroup>
              {/* <div className="text-danger errormsg">{this.state.errorPaymentMode}</div> */}
          </FormGroup>
          
          <FormGroup className="floatLeft width20Per ml">
              <Label className={(this.state.errorAmount ? 'errormsg' : '')} for='item'>Amount</Label>
              <Input
                type='number'
                name='amount'
                id='amount'
                placeholder='Add amount'
                onChange={this.handleChange}
              />
              <Label className="fontSize">*** Maximum allowed amount is 5000 INR</Label>
            </FormGroup>

            <FormGroup className="floatLeft width20Per ml">
              <Button color='primary' style={{ marginTop: '2rem' }} block>
                Transfer
              </Button>
            </FormGroup>
          </Form>
        
        ) : (
          <h4 className='mb-3 ml-4'>Please log in to manage transaction</h4>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { addItem }
)(AddItemForm);
