import React, { useState, useEffect } from 'react';
import '../../styles/Listado.css';
import { Row, Col, Carousel, Button, Card, Container } from 'react-bootstrap';
import campus from '../../assets/images/campus.png';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Spinner from '../../components/Spinner';

const URL = process.env.REACT_APP_BACKEND_CONNECTION;

const NovedadesListado = () => {
    const navigate = useNavigate();
    const [novedades, setNovedades] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [usuario, setUsuario] = useState({});

    useEffect(() => {

        if (localStorage.getItem("usuario"))
            setUsuario(JSON.parse(localStorage.getItem("usuario")));

        if (!novedades.length) {
            console.log("fetch");
            setCargando(true);
            fetch(URL + 'api/Publico/Novedades')
                .then((res) => res.ok ? res.json() : Promise.reject(res))
                .then((data) => {
                    console.log(data);
                    data.forEach((novedad) => {
                        setNovedades((novedadesGuardados) => {
                            return [
                                ...novedadesGuardados,
                                {
                                    idNovedad: novedad.id,
                                    titulo: novedad.titulo,
                                    copete: novedad.copete,
                                    carrucel: (novedad.snMostrar == 1) ? true : false,
                                    imagen: novedad.imagen
                                }
                            ];
                        });
                    });
                })
                .catch((err) => {
                    console.error(err);
                })
                .finally(() => {
                    setCargando(false);
                });
        }
    }, []);

    return (
        <Container className='mb-3'>
            {cargando ?
                (<Spinner />)
                :
                <div>
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

                    <Row className='p-2' >
                        <Col xs lg="8">
                            <h3 className='text-primary text-start'>Listado de novedades</h3>
                        </Col>
                        {(usuario && usuario.legajo !== '' && usuario.tipoUsuario === 3) &&
                            <Col xs lg="4">
                                <Button
                                    onClick={() => { navigate('/novedades-alta') }} >
                                    Nueva novedad
                                </Button>
                            </Col>
                        }
                    </Row>

                    <Row >
                        <Carousel>
                            {novedades.map((novedad) => {
                                return (novedad.carrucel === true) ?
                                    <Carousel.Item key={novedad.idNovedad} style={{ cursor: "pointer" }} onClick={() => { navigate('/novedades-detalle/' + novedad.idNovedad) }}   >
                                        <img src={"data:image/jpeg;base64," + novedad.imagen} style={{ height: '40vh', opacity: 0.3, width: "100%" }} alt={novedad.titulo}></img>
                                        <Carousel.Caption >
                                            <h4 style={{ color: "black" }}>{novedad.titulo}</h4>
                                            <p style={{ color: "rgba(26, 41, 26)" }}> {novedad.copete}</p>
                                        </Carousel.Caption>
                                    </Carousel.Item> : null;
                            })
                            }
                        </Carousel>
                    </Row>
                    <Row >
                        {novedades.map((novedad) => {
                            return <Col className='p-2' xs='12' sm='6' key={novedad.idNovedad}>
                                <Card className='h-100' >
                                    <Card.Title style={{ marginTop: 10 }}>
                                        {novedad.titulo}
                                    </Card.Title>
                                    <Card.Body>
                                        <img className='w-100' src={"data:image/jpeg;base64," + novedad.imagen} style={{ opacity: 0.3 }} alt={novedad.titulo}></img>
                                        <p>{novedad.copete}</p>
                                    </Card.Body>
                                    <Card.Footer >
                                        <Button
                                            className='w-75'
                                            onClick={() => { navigate('/novedades-detalle/' + novedad.idNovedad) }} >
                                            Leer novedad
                                        </Button>
                                    </Card.Footer>
                                </Card>
                            </Col>;
                        })
                        }
                    </Row>
                </div >
            }
        </Container>
    );
}

export default NovedadesListado;