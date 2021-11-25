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
    ForgotPassword,
    Title
} from './styles';
import api from '../../services/api';
import SignUpValidation from '../../ultils/validation/SignUpValidation';
import Message from '../../components/Message';

import * as animationData from '../../Assets/animation/305-loader-4.json';
import Logo from '../../Assets/images/logo-overstack-novo.png';

function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
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
        const data = { name, email, phone, password };


        try {
        await SignUpValidation(data);
          handleRequeste(data)

        } catch (err) {
            setTimeout(() => {
                setLoading(false);
            }, 2000);
            Message(err.erros[0]);
        }

    }

    async function handleRequeste(data) {
        await api.post('/signup', data)
        .then(response => {
            localStorage.setItem("over_token", response.data.token.name);
            localStorage.setItem("over_token", response.data.token);
            Message(response.data.message);
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
            {
                success ?

                    <h1>Deu certo</h1>

                    :

                    <Form>
                        <ToastContainer />
                        <Image
                            src={Logo}
                            alt="Logo Overstavk"
                        />
                        <Title>Cadastre-se</Title>
                        <Input
                            type="text"
                            placeholder="Nome"
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <Input
                            type="email"
                            placeholder="E-mail"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <Input
                            type="number"
                            placeholder="Celular"
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                        <Input
                            type="password"
                            placeholder="Senha"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
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
            }

        </Container>
    )

}
export default SignUp;