import React, { useEffect, useState, useContext } from "react";
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const formSchema = Yup.object().shape({
  correo: Yup.string()
    .required("Campo requerido"),  
  pass: Yup.string()
  .required("Campo requerido"),
});

const URL = 'https://localhost:44349/';

function Login() {
  const [usuario, setUsuario] = useState({legajo:'',correo:'', rol:'', pass: ''});
  const [initialValues, setInitialValues] = useState({correo: '', pass: ''});

  const navigate = useNavigate();


  useEffect(() => {    
    localStorage.clear();
  }, []);
  
  const Ingresar = (values) => {
    const usuarioAux = {
      correo: values.correo,
      clave: values.pass,
  };
  
  const options = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(usuarioAux),
  };

  console.log("Ingresar");
  fetch(URL + 'api/Usuarios/Login', options)
      .then((res) => res.ok ? res.json() : Promise.reject(res))
      .then((data) => {
          console.log(data);
          localStorage.setItem("usuario",  JSON.stringify(data));
      })
      .catch((err) => {
          console.error(err);
      })
      .finally(() => {
        navigate("/");
      });
    // let usuarioAux = usuarios.find(element => element.nombreUsuario === values.nombreUsuario && element.pass === values.pass );
    // if(usuarioAux!= undefined){
    //   localStorage.setItem("usuario",  JSON.stringify(usuarioAux));
    //   navigate("/");
    // }
    // else{
    //   navigate("/");
    // }
  };

  return (
        <Row className="justify-content-center">
          <Col lg="8">
            <Card style={{padding:10, color: "black"}} >
              <Formik
                initialValues={initialValues}
                validationSchema={formSchema} 
                onSubmit={Ingresar}>
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <>
                   <Row>
                    <Col xs lg="12">
                      <img  style={{height:"75px"}} alt="Logo PPSII Académico"/>
                    </Col>                             
                  </Row>
                  <Row >
                    <Col xs lg="12">
                      <Form.Group controlId="correo">
                        <Form.Label style={{ ...{color: "black"}}}>Usuario: </Form.Label>
                        <Form.Control
                          type="text"
                          name="correo"
                          autoComplete='off'
                          onChange={handleChange}
                          value={values.correo}
                          />
                      </Form.Group>
                      <ErrorMessage
                            name='correo'
                            component='div'
                            className='field-error text-danger'
                          /> 
                    </Col>                             
                  </Row>
                  <Row >
                    <Col xs lg="12">
                      <Form.Group controlId="pass">
                        <Form.Label style={{ ...{color: "black"}}}>Contraseña: </Form.Label>
                        <Form.Control
                          type="password"
                          name="pass"
                          autoComplete='off'
                          onChange={handleChange}
                          value={values.pass}
                          />
                      </Form.Group>
                      <ErrorMessage
                            name='pass'
                            component='div'
                            className='field-error text-danger'
                          /> 
                    </Col>                             
                  </Row>

                  <Row className="justify-content-center">
                    <Col xs lg="5">
                      <Button
                        variant="primary"
                        onClick={handleSubmit}
                        style={{width: "100%", background: "#FFFFFF", borderColor: "#009AAE", color: "#009AAE"}}
                      >
                        Ingresar hola
                      </Button>
                    </Col>          
                  </Row>  
                  <Row className="justify-content-center" >
                    <p>Si olvidaste tu usuario o contraseña comunicate con el área de admisitración.</p>
                  </Row>      
                  </>
                )}
              </Formik>
            </Card>            
          </Col>
        </Row>
  );
}

export default Login;