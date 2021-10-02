import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import logo from './workload.png'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

class Login extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Col/>
          <Col>
            <Container style={{marginTop: '30vh'}}>
              <Image src={logo} alt="logo"/>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="" placeholder="John Doe" />
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

ReactDOM.render(<Login />, document.getElementById("root"));