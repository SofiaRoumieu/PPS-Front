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

        fetch(URL + 'Publico/Carreras', {
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
            <Row style={{ paddingTop: 10, paddingLeft: 20 }}>
                <h1 className='titulos'>Listado de carreras</h1>
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
                                            <h3>{facultad.nombreFacultad}</h3>
                                            <ul>
                                                {facultad.carreras.map((carrera) => {
                                                    return <li >
                                                        <span style={{ cursor: "pointer" }} onClick={() => { localStorage.setItem('carrera', JSON.stringify(carrera)); navigate('/carrera-detalle') }}>
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
        </Container>
    );
}

export default CarrerasListado;