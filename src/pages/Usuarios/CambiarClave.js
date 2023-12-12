import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';



const URL = process.env.REACT_APP_BACKEND_CONNECTION + 'api/';

const CambiarClave = () => {
    const [form, setForm] = useState([]);
    const { clave, confirmacion } = form;
    const usuario = JSON.parse(localStorage.getItem("usuario"));


    const handleChange = (e) => {
        setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
        console.log(form);
    };

    const handleAccept = (e) => {
        if (clave.length < 8) {
            console.log('La clave debe tener al menos 8 caracteres');
            return;
        } else if (clave.length > 16) {
            console.log('La clave debe tener como maximo 16 caracteres');
            return;
        }
        // console.log(clave);
        // console.log(confirmacion);
        if (clave == confirmacion) {
            var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,16}$/;
            if (regex.test(clave)) {
                console.log("ENVIAR");
                modificarClave()
            } else {
                console.log("La clave debe tener al menos una letra minuscula, una mayuscula y un numero.")
                return;
            }
            console.log('regex', regex.test(clave));
        } else {
            console.log("Las claves no coinciden");
        }

    };

    const modificarClave = () => {
        usuario.clave = clave;
        console.log(usuario)
        fetch(URL + 'Usuarios/ModificarClave', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('Se cambio la clave');
                window.location.assign("/");
            })
            .catch(ex => console.log(ex))

    }

    return (
        <Container>
            <Form >
                <Row className='justify-content-center' >
                    <Col md='6' >
                        <label htmlFor='clave' className='label'> Nueva Clave </label>
                        <input
                            id='clave'
                            type="password"
                            minLength={8}
                            name="clave"
                            placeholder="Nueva clave"
                            className='form-control '
                            value={clave}
                            onChange={handleChange}
                        />
                    </Col>
                </Row>
                <Row className='justify-content-center'>
                    <Col md='6' >
                        <label htmlFor='confirmacion' className='label'> Confirmar Clave </label>
                        <input
                            id='confirmacion'
                            type="password"
                            minLength={8}
                            name="confirmacion"
                            placeholder="Confirmar clave"
                            className='form-control '
                            value={confirmacion}
                            onChange={handleChange}
                        />
                    </Col>
                </Row>
                <Row className='justify-content-center'>
                    <Col md='6'>
                        <Button className='mt-2 w-100' onClick={handleAccept} > Aceptar </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}

export default CambiarClave;