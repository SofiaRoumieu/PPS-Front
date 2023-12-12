import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Container } from 'react-bootstrap';
import Spinner from '../../components/Spinner';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


const URL = process.env.REACT_APP_BACKEND_CONNECTION + 'api/';

const CarrerasListado = () => {
    const navigate = useNavigate();
    const [carreras, setCarreras] = useState([]);

    const [cargando, setCargando] = useState(false);

    useEffect(() => {

        fetch(URL + 'Carreras', {
            method: "GET",
            headers: {
                "Content-Type": "Application/json",
            }
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data[0])
                setCarreras(data);
                //console.log('carreras', carreras);
            })
            .catch(ex => console.log(ex))


        if (!carreras.length) {
            //setCargando(true);
        }
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
                <Col xs lg="8">
                    <h3 className='text-primary text-start'> Oferta academica </h3>
                </Col>
            </Row>
            {
                cargando ?
                    (<Spinner />)
                    :
                    <>
                        {carreras.map((facultad) => {
                            return <Row className='m-1' >
                                <Col >
                                    <Card>
                                        <Row>
                                            <h3 className='text-primary'>{facultad.nombreFacultad}</h3>
                                            <ul>
                                                {facultad.carreras.map((carrera) => {
                                                    return <li >
                                                        <span style={{ cursor: "pointer" }} onClick={() => { localStorage.setItem('carrera', JSON.stringify(carrera)); navigate('/carrera-materias') }}>
                                                            {carrera.nombre}
                                                        </span>
                                                    </li>
                                                }
                                                )}
                                            </ul>
                                        </Row>
                                    </Card>
                                </Col>
                            </Row>
                        })
                        }
                    </>
            }
            <Row className='p-2 mt-4'>
                <Col className=''>
                    <h3 className='text-secondary text-start'> Requisitos para la inscripcion </h3>
                    <ul className='text-start'>
                        <li>Presentar DNI original y fotocopia.</li>
                        <li>Presentar constancia de alumno regular (si todavía estás cursando tus estudios secundarios), certificado de Estudios Secundarios Completos (acompañando el original) o certificado de título en trámite, emitido por el establecimiento del que egresaste o en el cual cursás actualmente</li>
                        <li>Enviar fotografía digital en formato .JPG/.JPEG al mail de contacto.</li>
                    </ul>
                </Col>
            </Row>
        </Container>
    );
}

export default CarrerasListado;