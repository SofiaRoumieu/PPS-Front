import React, { useEffect, useState, useContext } from "react";
import { Form, Button, Container, Row, Col, Card, ToastContainer, Toast } from 'react-bootstrap';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const formSchema = Yup.object().shape({
  correo: Yup.string()
    .required("Campo requerido"),
  pass: Yup.string()
    .required("Campo requerido"),
});

const URL = process.env.REACT_APP_BACKEND_CONNECTION;

function Login() {
  const [usuario, setUsuario] = useState({ legajo: '', correo: '', rol: '', pass: '' });
  const [initialValues, setInitialValues] = useState({ correo: '', pass: '' });

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
        setUsuario(
          {
            legajo: data.id,
            correo: data.titulo,
            rol: (data.tipoUsuario == 1) ? "Alumno" : (data.tipoUsuario == 2) ? "Profesor" : "Administrativo"
          });

        localStorage.setItem("usuario", JSON.stringify(data));
        if (data.modificoClave == 0) {
          window.location.assign("/cambiar-clave");
        }
        else {
          window.location.assign("/");
        }
      })
      .catch((err) => {
        console.error('errror', err);
        setShowToast(true);
      })
      .finally(() => {
      });
  };

  const [showToast, setShowToast] = useState(false);

  return (
    <Row className="justify-content-center m-2">
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1 }}>
        <Toast bg="danger" onClose={() => setShowToast(false)} show={showToast} autohide delay={3000}>
          <Toast.Header>
            <strong className="me-auto">Error</strong>
          </Toast.Header>
          <Toast.Body>
            Usuario o contrasena incorrectos.
          </Toast.Body>
        </Toast>
      </ToastContainer>

      <Col sm='10' md='8' xl='6'>
        <Card style={{ padding: 30, color: "black" }} >
          <Formik
            initialValues={initialValues}
            validationSchema={formSchema}
            onSubmit={Ingresar}>
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <>
                <Row>
                  <Col>
                    <img src="https://iili.io/HIO1NSI.png" style={{ height: "75px" }} alt="Logo PPSII Académico" />
                  </Col>
                </Row>
                <Row >
                  <Col >
                    <Form.Group controlId="correo">
                      <Form.Label style={{ ...{ color: "black" } }}>E-mail: </Form.Label>
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
                  <Col >
                    <Form.Group controlId="pass">
                      <Form.Label style={{ ...{ color: "black" } }}>Contraseña: </Form.Label>
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
                  <Col className="m-3" >
                    <Button
                      className="w-100"
                      variant="outline-primary"
                      onClick={handleSubmit}
                    >
                      Ingresar
                    </Button>
                  </Col>
                </Row>
                <Row className="justify-content-center" >
                  <p>Si olvidaste tu usuario o contraseña cominucate con el área de admisitración.</p>
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