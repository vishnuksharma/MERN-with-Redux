import React, { Component } from 'react';
import { Container, ListGroup, Button, Table, Pagination, PaginationItem, PaginationLink } from 'reactstrap';

import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class TransactionList extends Component {

  constructor() {
    
    super();

    // create data set of random length
    // this.dataSet = [...Array(Math.ceil(6))].map(
    //   (a, i) => "Record " + (i + 1)
    // );
    this.dataSet = [];
    this.pageSize = 10;
    this.pagesCount = 0;

    this.state = {
      currentPage: 0
    };
    
  }

  handleClick(e, index) {
    
    e.preventDefault();

    this.setState({
      currentPage: index
    });
    
  }

  // -----------------

  static propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  };

  componentDidMount() {
    this.props.getItems();
    

  }

  onDeleteClick = id => {
    this.props.deleteItem(id);
  };

  render() {
    const { currentPage } = this.state;
    this.dataSet = [...this.props.item.items]
    this.pagesCount = Math.ceil(this.dataSet.length / this.pageSize)
    // console.log(this.dataSet)
    // const { items } = this.props.item;
    return (
      <React.Fragment>
        <Container className="mt-3 pl-0 pr-0">
        <ListGroup>
          <Table responsive>
            <thead>
              <tr>
                <th>Transition ID</th>
                <th>User Name</th>
                <th>Payment Mode</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
          {this.dataSet
            .slice(
              currentPage * this.pageSize,
              (currentPage + 1) * this.pageSize
            )
            .map(({ _id, amount, userName, paymentMode }, i) => 
                <tr key={_id} >
                <td scope="row">{_id}</td>
                <td>{userName}</td>
                <td>{paymentMode}</td>
                <td>{amount}</td>
                <td>
                  {this.props.isAuthenticated ? (
                    <Button
                      className='remove-btn'
                      color='danger'
                      size='sm'
                      onClick={this.onDeleteClick.bind(this, _id)}
                    >
                      &times;
                    </Button>
                  ) : null}
                </td>
              </tr> 
            )}
          </tbody>
          </Table>
        </ListGroup>
      </Container>
            <div className="pagination-wrapper">
                      
              <Pagination aria-label="Page navigation example">
                
                <PaginationItem disabled={currentPage <= 0}>
                  
                  <PaginationLink
                    onClick={e => this.handleClick(e, currentPage - 1)}
                    previous
                    href="#"
                  />
                  
                </PaginationItem>

                {[...Array(this.pagesCount)].map((page, i) => 
                  <PaginationItem active={i === currentPage} key={i}>
                    <PaginationLink onClick={e => this.handleClick(e, i)} href="#">
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                )}

                <PaginationItem disabled={currentPage >= this.pagesCount - 1}>
                  
                  <PaginationLink
                    onClick={e => this.handleClick(e, currentPage + 1)}
                    next
                    href="#"
                  />
                  
                </PaginationItem>
                
              </Pagination>  
            </div>
       </React.Fragment>
      
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { getItems, deleteItem }
)(TransactionList);
