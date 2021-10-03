import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import logo from '../workload.png'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Header from './Header'
import { Redirect } from 'react-router-dom'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import FloatingLabel from 'react-bootstrap/FormLabel'

class CreateEvent extends React.Component {
  render() {
    return (
      <Container>
        <Header title="Create" />
        <br />
        <Row>
          <Col>
            <Form action='/'>
              <Button variant="primary" type="submit">Back</Button>
            </Form>
          </Col>
        </Row>
        <Row style={{paddingTop:'100px'}}>
          <Col />
          <Col xs={6}>
            <Form>
              <Form.Group className="mb-3" name="name" controlId="formBasicName">
                <Form.Control type="" name="name" placeholder="Event Name " />
              </Form.Group>
              <FloatingLabel controlId="floatingTextarea2" label="Description" style={{ width: '100%' }}>
                <Form.Control as="textarea" name="description" placeholder="Description" style={{ height: '100px' }} />
              </FloatingLabel>
              {/* begin Date */}
              <Row>
                <Col>
                  <Form.Group className="mb-3" name="name" controlId="formBasicName">
                    <Form.Control type="" name="month" placeholder="Month " />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" name="name" controlId="formBasicName">
                    <Form.Control type="" name="day" placeholder="Day " />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" name="name" controlId="formBasicName">
                    <Form.Control type="" name="year" placeholder="Year " />
                  </Form.Group>
                </Col>
              </Row>
              {/* end Date */}
              {/* start Class */}
              <Row>
                <Col>
                  <Form.Group className="mb-3" name="name" controlId="formBasicName">
                    <Form.Control type="" name="class" placeholder="Class" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" name="name" controlId="formBasicName">
                    <Form.Control type="" name="period" placeholder="Period" />
                  </Form.Group>
                </Col>
              </Row>
              {/* end Class */}
              <Button variant="primary" type="submit">Submit</Button>
            </Form>
          </Col>
          <Col />
        </Row>
      </Container>
    )
  }
}

export default CreateEvent