import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import logo from '../workload.png'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import { Redirect } from 'react-router-dom'
import App from './App'

class Header extends React.Component {
  logOut() {
    document.cookie = 'workloadid=; Max-Age=-99999999;'
    window.location.replace('/login')
  }

  render() {
    return (
      <Container style={{backgroundColor:'gray'}}>
        <Row style={{height:'10vh'}}>
          <Col>
            <Image src={logo} alt="logo" fluid onClick={() => {window.location.replace('/')}}/>
          </Col>
          <Col>
            <h1 style={{display: 'flex',justifyContent: 'center',alignItems: 'center',height: '100%'}}>{this.props.title}</h1>
          </Col>
          <Col xs={8} />
          <Col>
           <Button style={{display: 'flex',justifyContent: 'center',alignItems: 'center', height:'100%'}} variant="secondary" onClick={this.logOut}>Log Out</Button>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Header