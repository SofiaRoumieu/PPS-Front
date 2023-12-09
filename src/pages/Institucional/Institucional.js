import React, { useState, useEffect } from 'react';
import '../../styles/Listado.css';
import { Row, Col, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';


const Institucional = () => {

    useEffect(() => {
        console.log("esta en use effect de institucional");
    }, []);

    return (
        <div >
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
                <h1 className='titulos'>Sobre nosotros</h1>
            </Row>
            <Row style={{ paddingTop: 10, paddingLeft: 20, paddingRight: 20 }}>
                <Card style={{ margin: 10, width: "100%" }}>
                    <Row>Nuestra misión</Row>
                    <Row>misiones...</Row>
                </Card>
                <Card style={{ margin: 10, width: "100%" }}>
                    <Row>Nuestra misión</Row>
                    <Row>misiones...</Row>
                </Card>
                <Card style={{ margin: 10, width: "100%" }}>
                    <Row>Nuestra misión</Row>
                    <Row>misiones...</Row>
                </Card>
            </Row>
        </div>
    );
}

export default Institucional;