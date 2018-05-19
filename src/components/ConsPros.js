import React from 'react';
import { Container, Row  } from 'reactstrap';
import ConsProsColContainer from '../containers/ConsProsColContainer';

const ConsPros = ({ consPros }) => (
  <Container className="mt-5 cons-pros-container">
    <Row>
      <h2 className="w-100 text-center m-0 p-2 bg-dark text-light">Question Here...</h2>
    </Row>
    <Row className="cons-pros-wrapper">
      {consPros.map((item, key) => (
        <ConsProsColContainer key={key} item={item}/>
      ))}
    </Row>
  </Container>
);

export default ConsPros;
