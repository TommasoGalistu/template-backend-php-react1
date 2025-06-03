import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import ErrorTextForm from '../pages/ErrorTextForm'
import { useState } from 'react';
import { checkDataForm } from '../utils/checkData';
import useFetchWithLoading from '../utils/fetchRequest';
import { validatorLogin } from '../utils/validatorSchema';

function Login(){
    const navigate = useNavigate()
    const [response, setResponese] = useState({
            type: null,
            res: ''
        })
    const fetchData = useFetchWithLoading();
    const [error, setError] = useState({})

    function validateForm(event){
        event.preventDefault()
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries())
        const error = validatorLogin.login(data)
         if(error){
            setError(error)
            return
        }

        login(data)
    }

    async function login(dataObj){
        try{
            
            const response = await fetchData('http://localhost:3000/login',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataObj)
            })
            if (response.error) {
                throw new Error(response.error);
            }
                setResponese(prevRes => {
                return prevRes = {
                    type: true,
                    res: response.message
                }
                })

                setTimeout(() =>{
                    navigate('/privato')
                },4000)
                
            
                
        }catch(e){
            setResponese(prevRes => {
                return prevRes = {
                    type: false,
                    res: e.message
                }
            })

        }
    
       
        
    }

    
    return (
        <Container className='p-5 '>
            <Row className='justify-content-center'>
                <Col xs={12} lg={6}>
                    <Form onSubmit={validateForm}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name='email'/>
                            
                        </Form.Group>
                        {error.email && <span className='errorText'>{error.email}</span>}
                    
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name='password'/>
                        </Form.Group>
                        {error.password && <span className='errorText'>{error.password}</span>}
                        <ErrorTextForm typeText={response.type}>{response.res}</ErrorTextForm>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                    <div className="mt-3">
                        <Link to="/register">Clicca per Registrarti</Link>
                    </div>
                </Col>
            </Row>
        </Container>
      );
}

export default Login;