import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import logo from '../workload.png'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import App from './App'
import { Redirect } from 'react-router-dom'

class Login extends React.Component {
  handleSubmit = (event) => {
    const data = new FormData(event.target)
    var input
    data.forEach((d) => {input = d})
    if (input === '') return ''
    document.cookie = "workloadid=" + input
  }

  render() {
    return (
      <Container>
        <Row>
          <Col/>
          <Col>
            <Container style={{marginTop: '20vh'}}>
              <Image src={logo} alt="logo"/>
              <Form action='/' onSubmit={this.handleSubmit}>
                <Form.Group className="mb-3" name="name" controlId="formBasicEmail">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="" name="name" placeholder="John Doe" />
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
              </Form>
            </Container>
          </Col>
          <Col />
        </Row>
      </Container>
    )
  }
}

export default Login
