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

class Day extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h4 style={{ float: 'right' }}>{this.props.day}</h4>
          </Col>
          <Col>
            <h4 style={{ float: 'left', color:'gray'}}>{this.props.students} Students are busy.</h4>
          </Col>
        </Row>
      </Container>
    )
  }
}

class Density extends React.Component {
  constructor(props) {
    super(props)
    this.days = []
    for (let index = 0; index < 2; index++) {
      this.days.push({ day: "oct 5", students: "4" })
    }
  }

  render() {
    const days = this.days.map((val) => {
      return (
        <Day day={val.day} students={val.students} />
      )
    });
    return (
      <Container>
        <Header title="Density" />
        <br />
        <Row>
          <Col>
            <Form action='/'>
              <Button variant="primary" type="submit">Back</Button>
            </Form>
          </Col>
        </Row>
        <br/><br/>
        <Row>
          <Col />
          <Col xs={8}>
            {days}
          </Col>
          <Col />
        </Row>
      </Container>
    )
  }
}

export default Density