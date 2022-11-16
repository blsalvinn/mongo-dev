import React, { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Link, useNavigate } from 'react-router-dom'
const Login = () => {
    const { loginUser } = useContext(AuthContext)

    // 
    const history = useNavigate()

    // Local state
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    })

    const { username, password } = loginForm

    const onChangeLoginForm = event =>
        setLoginForm({ ...loginForm, [event.target.name]: event.target.value })

    const login = async event => {
        event.preventDefault()

        try {
            const loginData = await loginUser(loginForm)
            console.log(loginData);
            if (loginData.success) {
                console.log('ok');
                history('/dashboard')
                // setAlert({ type: 'danger', message: loginData.message })
                // setTimeout(() => setAlert(null), 5000)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Form className='my-4' onSubmit={login}>
            <Form.Group>
                <Form.Control type="text" placeholder="Enter email" name='username' required
                    value={username}
                    onChange={onChangeLoginForm}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="password" placeholder="Password" name='password' required
                    value={password}
                    onChange={onChangeLoginForm}
                />
            </Form.Group>
            <Button variant="success" type="submit">
                Login
            </Button>
            <p> Don't have an account
                <Link to='/register'>
                    <Button variant='info' size='sm' className='ml-2'>Register</Button>
                </Link>
            </p>
        </Form>
    )
}

export default Login
