import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { checkDataForm } from '../utils/checkData';
import ErrorTextForm from '../pages/ErrorTextForm'
import { useState } from 'react';
import useFetchWithLoading from '../utils/fetchRequest';
import { validator } from '../utils/validatorSchema';


function Register() {
    const navigate = useNavigate()
    const [response, setResponese] = useState({
        type: null,
        res: ''
    })
    const [error, setError] = useState({})
    const fetchData = useFetchWithLoading()
    function validateForm(event){
        event.preventDefault()
        setError({})
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries())
        const error = validator.validate(data)
        if(error){
            setError(error)
            return
        }
        register(data)
    }

    async function register(dataObj){
        try{

            const response = await fetchData('http://localhost:3000/register',{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataObj)
            })
            
            console.log('dentro try: ', response)
            if (response.error) {
                throw new Error(response.error);
            }
            setResponese(prevRes => {
                return prevRes = {
                    type: true,
                    res: response.message
                }
            })
            const timer = setTimeout(() => {
                navigate('/login')
            }, 3000);
        }catch(e){
            setResponese(prevRes => {
                return prevRes = {
                    type: false,
                    res: e.message
                }
            })
            console.log('dentro catch register: ', e.message)
        }
        
    }

    function clearErro(){
        setResponese(prevRes => {
                return prevRes = {
                    type: false,
                    res: ''
                }
            })
    }

  return (
    <Container className='p-5'>
            <Row className='justify-content-center'>
                <Col xs={12} lg={6}>
                    <Form onSubmit={validateForm}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control onChange={clearErro} type="email" placeholder="Enter email" name='email' required/>
                        </Form.Group>
                        {error.email && <span className='errorText'>{error.email}</span>}
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name='password' required/>
                        </Form.Group>
                        {error.password && <span className='errorText'>{error.password}</span>}
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Conferma Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name='confirm_password' />
                        </Form.Group>
                        {error.confirm_password && <span className='errorText'>{error.confirm_password}</span>}
                        <ErrorTextForm typeText={response.type}>{response.res}</ErrorTextForm>
                        <Button variant="primary" type='submit'>
                            Submit
                        </Button>
                    </Form>
                    
                    <div className="mt-3">
                        <Link to="/login">Sei già registrato? Fai login</Link>
                    </div>
                </Col>
            </Row>
        </Container>
  );
}

export default Register;