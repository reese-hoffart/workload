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

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedDate: this.timestampToDate(Date()),
      events: []
    }
    fetch("http://127.0.0.1:5000/events")
      .then(res => res.json())
      .then(
        (result) => {
          var eventRes = []
          result.forEach(e => {
            console.log(e.name)
              eventRes.push({title:e.name, date:e.date})
          });
          this.setState({
            events: eventRes
          })
        },
        (error) => {
          console.log(error)
        }
      )
  }

  render() {
    return (
      <Container>
        <Header title="Home" />
        <br />
        <Row>
          <Col>
            <Row>
              <div>
                <Form action='/event' style={{ float: 'left' }}>
                  <Button variant="primary" type="submit">Add Event</Button>
                </Form>
                <Form action='/density' style={{ float: 'left', marginLeft: '10px' }}>
                  <Button variant="primary" type="submit">Check Availablility</Button>
                </Form>
              </div>
            </Row>
            <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" events={this.state.events}/>
            <br />
            <h3 style={{ textAlign: 'center' }}>{this.state.selectedDate}</h3>
          </Col>
        </Row>
      </Container>
    )
  }

  timestampToDate(timestamp) {
    return timestamp.split(' ').slice(0, 4).join().replaceAll(',', ' ')
  }
}

export default Home