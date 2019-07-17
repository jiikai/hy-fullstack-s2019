import React from 'react';
import {connect} from 'react-redux';
import {changeFilter} from '../reducers/filterReducer';

const Filter = ({changeFilter}) => (
  <div style={{marginBottom: 10}}>
    filter <input onChange={event =>
      changeFilter(event.target.value)} />
  </div>
);

const mapStateToProps = (state) => ({
  filter: state.filter
});

export default connect(mapStateToProps, {changeFilter})(Filter);