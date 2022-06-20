import React, {useState, useRef, useEffect} from 'react';
//import {googleLogin} from "../actions/authActions";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

import {useDispatch} from "react-redux";
import { setCredentials } from '../features/auth/authSlice';
import {useLoginMutation} from '../features/auth/authApiSlice';


const LoginScreen = () =>{
    const userRef = useRef();
    const errRef = useRef();
    const [username, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate();
    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();


    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() =>  {
        setErrMsg('');
    }, [username, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const userData = await login({username, password}).unwrap();
            console.log(userData);
            dispatch(setCredentials({ ...userData, username }));
            setUser('');
            setPassword('');
            navigate('/app/home')
        }catch(err){
            if(!err.response){
                setErrMsg("No server Response");
            }
            else if (err.response?.status === 400){
                setErrMsg("Missing Username or Password");
            }
            else if (err.response?.status === 401){
                setErrMsg("Unauthorized");
            }
            else {
                setErrMsg("Login Failed");
            }
            errRef.current.focus();
        }
    }

    const handleUserInput = (e) => setUser(e.target.value);

    const handlePwdInput = (e) => setPassword(e.target.value);

    return (
        <>
        {
        isLoading ? (<h1>Loading...</h1>)
        :
        (
        <section className="container">
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username address</Form.Label>
                     <Form.Control type="text" placeholder="Enter username" 
                    ref={userRef} value={username} onChange={handleUserInput}
                    autoComplete="off" required/>
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" 
                    onChange={handlePwdInput} value={password} required/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </section>
        )}
        </>
        )
    
    }

export default LoginScreen;