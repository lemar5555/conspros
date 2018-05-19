import React from 'react';
import { connect } from 'react-redux';
import ConsPros from '../components/ConsPros';
import '../styles/app.css';

const App = props =>  <ConsPros {...props} />;

const mapStateToProps = ({ entries }) => {
  const cons = entries.filter(item => item.type === 'cons');
  const pros = entries.filter(item => item.type === 'pros');

  return {
    consPros: [{
      id: 'cons',
      title: 'Cons',
      list: cons
    }, {
      id: 'pros',
      title: 'Pros',
      list: pros
    }]
  };
};

export default connect(mapStateToProps, {})(App);
