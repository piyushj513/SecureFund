import React from 'react';
import { Grid, Header, Form, Button, Message, Icon } from 'semantic-ui-react';
import Footer from '@/components/Footer';
import Navbar2 from '@/components/Navbar2';
import Link from 'next/link';
export default function register() {
  return (
    <>
      <Navbar2 />
      <div className="create-container">
        <div className="form-container auth">
          <Grid
            textAlign="center"
            style={{ height: '100vh' }}
            verticalAlign="middle"
          >
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as="h2" color="blue" textAlign="center">
                <Icon name="plus circle" /> Register your account
              </Header>
              <Form action="/api/register" method="post">
                <Form.Input
                  name="email"
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail address"
                  type="email"
                  required
                />
                <Form.Input
                  fluid
                  name="password"
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  required
                />
                <Button color="blue" fluid size="large">
                  Register
                </Button>
                <Message>
                  Have an account? <Link href="/projects/login">Log in</Link>
                </Message>
              </Form>
            </Grid.Column>
          </Grid>
        </div>
      </div>
      <Footer />
    </>
  );
}
/*
<Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
    <Header as='h2' color='teal' textAlign='center'>
        <Image src='/logo.png' /> Log-in to your account
      </Header>
    <Form action="/api/login" method="post">
    <Form.Input name="email" fluid icon='user' iconPosition='left' placeholder='E-mail address' />
    <Form.Input
            fluid
            name="password"
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
          />
      <Button color='teal' fluid size='large'>Login</Button>
      <Message>
        New to us? <a href='#'>Sign Up</a>
      </Message>
    </Form>
    </Grid.Column>
    </Grid>
*/
