import React, { useState, useEffect } from 'react';
import '../../styles/Listado.css';
import { Row, Col, Card, Container } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';


const Institucional = () => {

    useEffect(() => {
        console.log("esta en use effect de institucional");
    }, []);

    return (
        <Container >
            <ToastContainer
                position="top-center"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Row className='p-2'>
                <Col>
                    <h3 className='text-primary text-start'> Sobre Nosotros </h3>
                </Col>
            </Row>
            <Row className=''>
                <Card className='mt-3' >
                    <Card.Title className='text-start'>Mision</Card.Title>
                    <Card.Body className='text-start'>
                        La Facultad tiene como misión formar graduados en las distintas areas a través del fortalecimiento de las capacidades de los alumnos, de la enseñanza, de la formación continua de los docentes, la investigación y las actividades de extensión en un ámbito de reflexión permanente de la realidad propiciando el desarrollo de valores con el fin de construir una sociedad mejor.
                    </Card.Body>
                </Card>
                <Card className='mt-3'>
                    <Card.Title className='text-start'>Vision</Card.Title>
                    <Card.Body className='text-start'>
                        Liderar con excelencia educativa el ámbito académico de las Ciencias, comprometidos con la promoción y práctica de los valores en un diálogo con la sociedad
                    </Card.Body>
                </Card>
                <Card className='mt-3'>
                    <Card.Title className='text-start'>Objetivos</Card.Title>
                    <Card.Body className='text-start'>
                        <ul>
                            <li>
                                Formar seres humanos íntegros en el pensar y en el hacer, brindando conocimientos y valores que propicien los cambios que nuestra sociedad globalizada demanda
                            </li>
                            <li>
                                Formar profesionales con un gran nivel académico, comprometidos con la formación continua y con características de líderes emprendedores y solidarios
                            </li>
                        </ul>
                    </Card.Body>
                </Card>
            </Row>
        </Container>
    );
}

export default Institucional;