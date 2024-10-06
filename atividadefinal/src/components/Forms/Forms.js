import { useState } from "react";
import Button from "./Button/Button";
import Input from "./Input/Input";
import './Forms.css';
import axios from 'axios';

const Forms = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [emailError, setEmailError] = useState('');  
    const [messageError, setMessageError] = useState('');  

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('Email:', email);
        console.log('Message:', message);

        let hasError = false;

        setEmailError('');
        setMessageError('');

        if (!email) {
            setEmailError('O campo de e-mail não pode estar vazio.');
            hasError = true;
        } else if (!validateEmail(email)) {
            setEmailError('Por favor, insira um e-mail válido.');
            hasError = true;
        }

        if (!message) {
            setMessageError('O campo de mensagem não pode estar vazio.');
            hasError = true;
        }

        if (hasError) return;

        const feedback = { email, message };

        setIsSubmitting(true); 

        try {
            await axios.post('http://localhost:3001/feedbacks', feedback);
            alert('Feedback enviado com sucesso!');
            setEmail('');  
            setMessage('');  
        } catch (error) {
            console.error('Erro ao enviar o feedback:', error);
            alert('Erro ao enviar o feedback.');
        } finally {
            setIsSubmitting(false);  
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Envie seu Feedback</h1>
            <label>
                E-mail:
                <Input 
                    type="text" 
                    placeholder="E-mail" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {emailError && <p className="error">{emailError}</p>}
            </label>
            <label>
                Mensagem:
                <Input 
                    type="text" 
                    placeholder="Mensagem..." 
                    value={message}           
                    onChange={(e) => setMessage(e.target.value)} 
                />
                {messageError && <p className="error">{messageError}</p>}
            </label>
            <Button 
                type="submit" 
                text={isSubmitting ? 'Enviando...' : 'Enviar'} 
                disabled={isSubmitting}
            />
        </form>
    );
};

export default Forms;
