import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const Footer = () => {
    return (
        <div className='footer'>
            <Container>

                <Row>
                    <Col>
                        <Row className='text-center fs-4'>
                            <span>
                                Contacto
                            </span>
                        </Row>
                        <Row className='gap-2'>
                            <Row>
                                <span className='text-start'>
                                    <b> Dirección: </b>Av. Mitre 750 - 2do piso. Avellaneda
                                </span>
                            </Row>
                            <Row>
                                <span className='text-start'>
                                    <b>Mail:</b> tecnicaturas@fra.utn.edu.ar
                                </span>
                            </Row>
                            <Row>
                                <span className='text-start'>
                                    <b>Teléfonos:</b> 4222-6465 | 4201-4133 int. 116
                                </span>
                            </Row>
                        </Row>
                    </Col>
                    <Col>
                        <Row className='text-center fs-4'>
                            <span>
                                Redes Sociales
                            </span>
                        </Row>
                        <Row>
                            <Col>
                                <a href='https://www.sistemas-utnfra.com.ar/img/social/facebook-128.png' target='_blank'>
                                    <img className='imgg' src='https://www.sistemas-utnfra.com.ar/img/social/facebook-128.png'></img>
                                </a>
                            </Col>
                            <Col>
                                <a href='https://www.sistemas-utnfra.com.ar/img/social/instagram-128.png' target='_blank'>
                                    <img className='imgg' src='https://www.sistemas-utnfra.com.ar/img/social/instagram-128.png'></img>
                                </a>
                            </Col>
                            <Col>
                                <a href='https://www.sistemas-utnfra.com.ar/img/social/twitter-128.png' target='_blank'>
                                    <img className='imgg' src='https://www.sistemas-utnfra.com.ar/img/social/twitter-128.png'></img>
                                </a>
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        <Row className='text-center fs-4'>
                            <span>
                                Ubicacion
                            </span>
                        </Row>
                        <Row>
                            <Col>
                                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13126.795007077702!2d-58.3647051!3d-34.6623101!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a3334e1e773297%3A0x38b223e10c24ff93!2sUniversidad%20Tecnol%C3%B3gica%20Nacional%3A%20Facultad%20Regional%20Avellaneda!5e0!3m2!1ses-419!2sar!4v1702346877156!5m2!1ses-419!2sar" width="300" height="200" style={{ border: 0, padding: 10 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                            </Col>
                        </Row>

                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Footer;