import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class ItemModal extends Component {
  formData = {};
  state = {
    modal: false,
    userName: '',
    paymentMode: '',
    amount: 0
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    // console.log(e.target.name);
    if (e.target.name === 'amount'){
      this.formData.amount =  e.target.value;

    }
    if (e.target.name === 'userName') {
      this.formData.userName =  e.target.value;

    }
    if (e.target.name === 'paymentMode') {
      this.formData.paymentMode =  e.target.value;
    }
    // console.log(this.formData);
    this.setState( this.formData );
  };

  onSubmit = e => {
    e.preventDefault();

    const newItem = {
      userName: this.state.userName,
      paymentMode: this.state.paymentMode,
      amount: this.state.amount
    };
    // Add item via addItem action
    this.props.addItem(newItem);

    // Close modal
    this.toggle();
  };

  render() {
    return (
      <div className="addItem-wrapper bg-color">
        {this.props.isAuthenticated ? (
          // <Button
          //   color='dark'
          //   style={{ marginBottom: '2rem' }}
          //   onClick={this.toggle}
          // >
          //   Transfer
          // </Button>
          <Form onSubmit={this.onSubmit}>
            <FormGroup className="floatLeft width20Per ml">
              <Label for='userSelect'>Select User</Label>
              <Input type="select" name="userName" id="userSelect" onChange={this.onChange}>
                <option>USER-A</option>
                <option>USER-B</option>
                <option>USER-C</option>
                <option>USER-D</option>
                <option>USER-E</option>
              </Input>
            </FormGroup>

            
            <FormGroup className="floatLeft width20Per ml">
              <Label for='paymentMode'>Payment Mode</Label>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="paymentMode" value="American Express" onChange={this.onChange} />{' '}
                  American Express
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="paymentMode" value="VISA" onChange={this.onChange} />{' '}
                  VISA
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="paymentMode" value="DBS PayLa" onChange={this.onChange} />{' '}
                  DBS PayLa
                </Label>
              </FormGroup>
          </FormGroup>
          
          <FormGroup className="floatLeft width20Per ml">
              <Label for='item'>Amount</Label>
              <Input
                type='number'
                name='amount'
                id='amount'
                min="1"
                max="5000"
                placeholder='Add amount'
                onChange={this.onChange}
              />
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
)(ItemModal);
