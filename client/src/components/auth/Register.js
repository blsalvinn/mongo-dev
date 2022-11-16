import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

const Register = () => {
    return (
        <Form className='my-4'>
            <Form.Group>
                <Form.Control type="text" placeholder="Enter email" name='username' required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="password" placeholder="Password" name='password' required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="password" placeholder="Confirm Password" name='confirmPassword' required />
            </Form.Group>
            <Button variant="success" type="submit">
                Register
            </Button>
            <p> Already have an account
                <Link to='/login'>
                    <Button variant='info' size='sm' className='ml-2'>Login</Button>
                </Link>
            </p>
        </Form>
    )
}

export default Register
