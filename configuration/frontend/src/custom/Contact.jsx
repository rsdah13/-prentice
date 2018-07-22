import React from 'react';

import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  CardImg,
} from 'reactstrap';
import coffee from 'assets/img/bg/coffee-contact-email-4831.jpg';

import Page from 'components/Page';

const Contact = () => {
  return (
    <Page title="Contact" breadcrumbs={[{ name: 'Contact', active: true }]}>
     <Row>
     <Col >
          <Card>
            <CardHeader>Contact Details</CardHeader>
            <CardBody>
              <Form>
                <FormGroup row>
                  <Label for="email" sm={2}>
                    Email
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Email"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="name" sm={2}>
                    Name
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="text"
                      placeholder="Contact Name"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="message" sm={2}>
                    Message
                  </Label>
                  <Col sm={10}>
                    <Input 
                    type="textarea" 
                    name="text" 
                    placeholder="Write your message here..."  
                  />
                  </Col>
                </FormGroup>
                
                <FormGroup check row>
                  <Col sm={{ size: 10, offset: 2 }}>
                    <Button>Submit</Button>
                  </Col>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Col>

        <Col>
          <Card>
          <CardImg
              className="card-img-left"
              src={coffee}
            />
          </Card>
        </Col>
      </Row>
    </Page>
  );
};

export default Contact;
