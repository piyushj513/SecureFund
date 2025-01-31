import Footer from '@/components/Footer';
import Navbar2 from '@/components/Navbar2';
import Link from 'next/link';
import { auth, provider } from '../api/config';
import { signInWithPopup } from 'firebase/auth';
import { Button, Grid, Form, Message, Header, Icon } from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();
  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // New state for error message

  const handleClick = () => {
    try {
      signInWithPopup(auth, provider)
        .then((data) => {
          setValue(data.user.email);
          localStorage.setItem('email', data.user.email);
          router.push('/main');
        })
        .catch((error) => {
          setErrorMessage('Error signing in with Google. Please try again.');
        });
    } catch (error) {
      setErrorMessage('An unexpected error occurred. Please try again.');
    }
  };

  useEffect(() => {
    setValue(localStorage.getItem('email'));
  }, []);

  const handleLoginSubmit = async (e) => {
    setErrorMessage('');
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.status === 'Invalid username or password!') {
      setErrorMessage(data.status);
    } else if (data.status === 'success' && data.redirectUrl) {
      // Redirect to the main page if login is successful
      router.push(data.redirectUrl);
    }
  };
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
                <Icon name="plus circle" /> Log-in to your account
              </Header>
              <Form onSubmit={handleLoginSubmit}>
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
                  Login
                </Button>
                <div style={{ marginTop: '10px', display: 'flex' }}>
                  <Button
                    type="button"
                    color="google plus"
                    onClick={handleClick}
                    style={{ flexGrow: 1 }}
                  >
                    <Icon name="google" /> Google
                  </Button>
                  <Message style={{ marginTop: '0px', flexGrow: 1 }}>
                    New to us?&nbsp;
                    <Link href="/projects/register">Sign Up</Link>
                  </Message>
                </div>
              </Form>
              {errorMessage && (
                <div style={{ color: 'red', marginTop: '20px' }}>
                  <strong>{errorMessage}</strong>
                </div>
              )}
            </Grid.Column>
          </Grid>
        </div>
      </div>
      <Footer />
    </>
  );
}
