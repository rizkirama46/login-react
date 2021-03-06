import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Jumbotron, Button } from 'reactstrap';
import { AuthContext } from '../../App';

function RoleAdmin(props) {

  const { state } = useContext(AuthContext)

  if(!state.isAuthenticated) {
    return <Redirect to='/login' />
  }
  return (
    <div>
      <Jumbotron>
        <h1 className="display-3">Halaman Role {state.role} yaitu {state.user}</h1>
        <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
        <hr className="my-2" />
        <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
        <p className="lead">
          <Button color="primary">Learn More</Button>
        </p>
      </Jumbotron>
    </div>
  );
}

export default RoleAdmin;