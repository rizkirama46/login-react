import React, { Fragment, useState } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, Alert, CardImg } from 'reactstrap';
import axios from 'axios'

const qs = require('querystring')
const api = 'http://localhost:3001'

var Recaptcha = require('react-recaptcha');

function RegisterComp(props) {

  const initialState = {
    isSubmitting: false,
    errorMsg: null,
    isVerified: false
  }

  const stateForm = {
    username: "",
    email: "",
    password: ""
  }

  const [data, setData] = useState(initialState)
  const [dataForm, setDataForm] = useState(stateForm)

  // specifying your onload callback function
  var callback = function () {
    console.log('Done!!!!');
  };
  
  // specifying verify callback function
  var verifyCallback = function (response) {
    console.log(response);
    if(response) {
      setData({
        isVerified: true
      })
    }
  };

  const handleInputChange = event => {
    setDataForm({
      ...dataForm,
      [event.target.name] : event.target.value
    })
  }

  const handleFormSubmit = event => {
    event.preventDefault()

    if(data.isVerified) {
      setData({
        ...data,
        isSubmitting: true,
        errorMsg: null
      })
  
      const reqBody = {
        username: dataForm.username,
        email: dataForm.email,
        password: dataForm.password
      }
  
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
  
      axios.post(api + '/auth/api/v1/register', qs.stringify(reqBody), config)
        .then(res => {
          if(res.data.success === true && res.data.isRegistered === false) {
            setData({
              ...data,
              isSubmitting: false,
              errorMsg: "Silahkan cek email untuk melakukan verifikasi!"
            })

            setDataForm({
              ...dataForm,
              username: "",
              email: "",
              password: ""
            })

          } else if(res.data.success === false && res.data.isRegistered === true){
            setData({
              ...data,
              isSubmitting: false,
              errorMsg: "Email anda telah terdaftar"
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
        .catch( e => {
          console.log(e);
        })
    } else {
      alert('Anda diduga robot')
    }

    
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
              <h1>Registrasi Form</h1>
              <hr />
              {data.errorMsg && (<Alert color="success">{data.errorMsg}</Alert>)}
              <Form onSubmit={handleFormSubmit}>
                <FormGroup>
                  <Label for="exampleUsername">Username</Label>
                  <Input type="text" name="username" id="exampleUsername" value={dataForm.username} onChange={handleInputChange} placeholder="with a placeholder" />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input type="email" name="email" id="exampleEmail" value={dataForm.email} onChange={handleInputChange} placeholder="with a placeholder" />
                </FormGroup>
                <FormGroup>
                  <Label for="examplePassword">Password</Label>
                  <Input type="password" name="password" id="examplePassword" value={dataForm.password} onChange={handleInputChange} placeholder="password placeholder" />
                </FormGroup>
                  <Recaptcha
                    sitekey="6LeNyeocAAAAAMbJ4kJG8HSdHLa4EHZOLoETccQM"
                    render="explicit"
                    verifyCallback={verifyCallback}
                    onloadCallback={callback}
                  />
                <FormGroup>
                  <Button disabled={data.isSubmitting}>
                    {data.isSubmitting ? ("...loading") : ("Register")}
                  </Button>
                </FormGroup>
              </Form>
            </Col>
          </Row>
        </Container>
      </Fragment>
    </div>
  );
}

export default RegisterComp;