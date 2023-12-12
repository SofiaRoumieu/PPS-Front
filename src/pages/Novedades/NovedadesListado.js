import React, { useState, useEffect } from 'react';
import '../../styles/Listado.css';
import { Row, Col, Carousel, Button, Card } from 'react-bootstrap';
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
                                    carrucel: (novedad.snMostrar == 1) ? true : false
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
        <>
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

                    <Row style={{ paddingTop: 10, paddingLeft: 20, marginBottom: 10 }}>
                        <Col xs lg="10">
                            <h1 className='titulos'>Listado de novedades</h1>
                        </Col>
                        {(usuario && usuario.legajo !== '' && usuario.tipoUsuario === 3) &&
                            <Col xs lg="2">
                                <Button
                                    style={{ width: "100%", background: "#009AAE", borderColor: "#009AAE", color: "#FFFFFF" }}
                                    onClick={() => { navigate('/novedades-alta') }} >
                                    Nueva novedad
                                </Button>
                            </Col>
                        }
                    </Row>

                    <Row style={{ height: 150 }}>
                        <Carousel>
                            {novedades.map((novedad) => {
                                return (novedad.carrucel === true) ?
                                    <Carousel.Item key={novedad.idNovedad} style={{ cursor: "pointer" }} onClick={() => { navigate('/novedades-detalle/' + novedad.idNovedad) }}   >
                                        <img src={campus} style={{ height: 150, opacity: 0.3, width: "100%" }} alt={novedad.titulo}></img>
                                        <Carousel.Caption >
                                            <h4 style={{ color: "black" }}>{novedad.titulo}</h4>
                                            <p style={{ color: "rgba(26, 41, 26)" }}> {novedad.copete}</p>
                                        </Carousel.Caption>
                                    </Carousel.Item> : null;
                            })
                            }
                        </Carousel>
                    </Row>
                    <Row style={{ paddingTop: 10 }}>
                        {novedades.map((novedad) => {
                            return <Col key={novedad.idNovedad}>
                                <Card style={{ height: "325px" }}>
                                    <Card.Title style={{ marginTop: 10 }}>
                                        {novedad.titulo}
                                    </Card.Title>
                                    <Card.Body>
                                        <img src={campus} style={{ height: 150, opacity: 0.3, width: "100%" }} alt={novedad.titulo}></img>
                                        <p>{novedad.copete}</p>
                                    </Card.Body>
                                    <Card.Footer style={{ height: 55 }}>
                                        <Button
                                            style={{ width: "50%", background: "#009AAE", borderColor: "#009AAE", color: "#FFFFFF" }}
                                            onClick={() => { navigate('/novedades-detalle/' + novedad.idNovedad) }} >
                                            Leer novedad
                                        </Button>
                                    </Card.Footer>
                                </Card>
                            </Col>;
                        })
                        }
                    </Row>
                </div>
            }
        </>
    );
}

export default NovedadesListado;