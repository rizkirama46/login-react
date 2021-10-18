import React, { Fragment, useContext } from 'react';
import { Jumbotron, Button } from 'reactstrap';
import { AuthContext } from '../App';

function HomeComp(props) {
  const {state, dispatch} = useContext(AuthContext)

  return (
    <div>
      <Fragment>
        <Jumbotron>
          <h1 className="display-3">Hello, {state.user}!</h1>
          <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
          <hr className="my-2" />
          <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
          <p className="lead">
            <Button color="primary">Learn More</Button>
          </p>
        </Jumbotron>
      </Fragment>
    </div>
  );
}

export default HomeComp;