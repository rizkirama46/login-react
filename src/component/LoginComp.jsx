import React, { Fragment, useContext, useState } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, Alert, CardImg } from 'reactstrap';
import { AuthContext } from '../App';
import axios from 'axios'

const qs = require('querystring')
const api = 'http://localhost:3001'

function LoginComp(props) {

  const {dispatch} = useContext(AuthContext)

  const initialState = {
    email: "",
    password: "",
    isSubmitting: false,
    errorMsg: null
  }

  const [data, setData] = useState(initialState)

  const handleInputChange = event => {
    setData({
      ...data,
      [event.target.name] : event.target.value
    })
  }

  const handleFormSubmit = event => {
    event.preventDefault()
    setData({
      ...data,
      isSubmitting: true,
      errorMsg: null
    })

    const reqBody = {
      email: data.email,
      password: data.password
    }

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }

    axios.post(api + '/auth/api/v1/login', qs.stringify(reqBody), config)
      .then(res => {
        if(res.data.success === true) {
          dispatch({
            type: "LOGIN",
            payload: res.data
          })
        } else {
          setData({
            ...data,
            isSubmitting: false,
            errorMsg: res.data.Message
          })
        }

        throw res
      })
  }

  return (
    <div>
      <Fragment>
        <Container>
          <br />
          <Row>
            <Col>
              <CardImg width="100%" src="https://placeimg.com/640/300/people" />
            </Col> 
            <Col>
              <h1>Login Form</h1>
              <hr />
              <Form onSubmit={handleFormSubmit}>
                <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input type="email" name="email" id="exampleEmail" value={data.email} onChange={handleInputChange} placeholder="with a placeholder" />
                </FormGroup>
                <FormGroup>
                  <Label for="examplePassword">Password</Label>
                  <Input type="password" name="password" id="examplePassword" value={data.password} onChange={handleInputChange} placeholder="password placeholder" />
                </FormGroup>

                {data.errorMsg && (<Alert color="danger">{data.errorMsg}</Alert>)}

                <Button disabled={data.isSubmitting}>
                  {data.isSubmitting ? "...loading" : "Login"}
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </Fragment>
    </div>
  );
}

export default LoginComp;