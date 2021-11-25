import React from 'react';

import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import Lottie from 'react-lottie';

import {
    Container,
    Form,
    Input,
    Button,
    Image,
    Animation,
    Signup,
    Span,
    ForgotPassword
} from './styles';
import api from '../../services/api';
import SigninValidation from '../../ultils/validation/SigninValidation';
import Message from '../../components/Message';

import * as animationData from '../../Assets/animation/305-loader-4.json';
import Logo from '../../Assets/images/logo-overstack-novo.png';

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    async function HandleSubmit() {
        setLoading(true);
        const  data = { email, password };
        console.log(data)

        let validation = await SigninValidation(data);

        if (validation) {
            await api.post('/signin', data)
                .then(response => {
                    localStorage.setItem("over_token", response.data.token.name);
                    localStorage.setItem("over_token", response.data.token);
                    Message(response);
                    setTimeout(() => {
                        setLoading(false);
                    }, 2000);
                })
                .catch(error => {
                    Message(error.response.data.Message)
                    setTimeout(() => {
                        setLoading(false);
                    }, 3000);
                })
        } else {
            Message("preencha um email valido e uma senha de no mímimo 6 carateres")
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
    }

    async function handleAuthenticated() {
        let token = await localStorage.getItem("over_token");
        if (token) {
            window.location = "/"
        }
    }

    useEffect(() => {
        handleAuthenticated();
    }, [])


    return (
        <Container>
            <Form>
                <ToastContainer />
                <Image 
                src={Logo} 
                alt="Logo Overstavk" />
                <Input 
                type="email" 
                placeholder="E-mail" 
                onChange={(e) => setEmail(e.target.value)}
                required />
                <Input 
                type="password" 
                placeholder="Senha" 
                onChange={(e) => setPassword(e.target.value)} 
                required />

                <ForgotPassword href="/forgot-password">
                    Esqueceu sua senha?
                </ForgotPassword>
                <Button
                    onClick={HandleSubmit}
                >
                    {loading ?
                        <Animation>
                            <Lottie options={defaultOptions} />
                        </Animation>

                        :

                        "Entrar"
                    }
                </Button>
                <Signup href="/signup">Ainda não tem um cadastro? <br></br><Span>Cadastre-se!</Span></Signup>
            </Form>
        </Container>
    )

}
export default SignIn;