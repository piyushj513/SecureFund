import Footer from '@/components/Footer';
import Navbar2 from '@/components/Navbara2';
import Link from 'next/link';
import {auth,provider} from "../api/config";
import {signInWithPopup} from "firebase/auth";
import { Button ,Grid,Form,Message,Header,Icon} from 'semantic-ui-react';
import { useState,useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
    const router = useRouter()
    const [value,setValue] = useState('')
    
    const handleClick =()=>{
        signInWithPopup(auth,provider).then((data)=>{
            setValue(data.user.email)
            localStorage.setItem("email",data.user.email)
            if(value)router.push('../main')
        })
    }
    useEffect(()=>{
        setValue(localStorage.getItem('email'))
    })
    return (
        <>
        <Navbar2/>
        <div className="create-container">
                <div className="form-container auth">
                <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                        <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h2' color='blue' textAlign='center'>
                            <Icon name='plus circle'/> Log-in to your account
                        </Header>
                        <Form action='/api/login' method="post">
                        <Form.Input name="email" fluid icon='user' iconPosition='left' placeholder='E-mail address' />
                        <Form.Input
                                fluid
                                name="password"
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                            />
                        <Button color='blue' fluid size='large'>Login</Button>
                        <Message>
                            New to us? <Link href='/projects/register'>Sign Up</Link>
                        </Message>
                        <Button onClick={handleClick} as='h2' color='blue' textAlign='center'>
                            <Icon name='google'/> Google
                        </Button>
                        </Form>
                        </Grid.Column>
                        </Grid>
                        </div>
                    </div>
                    <Footer/>
                    </>
    )
}
