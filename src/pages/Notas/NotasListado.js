import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';

const URL = process.env.REACT_APP_BACKEND_CONNECTION + 'api/';

const NotasListado = () => {

    const [listaNotas, setListaNotas] = useState([]);

    useEffect(() => {
        console.log("CURSOS");
        fetch(URL + 'Usuarios/Notas/' + 1, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('ladata', data);
                setListaNotas(data)
            })
            .catch(ex => console.log(ex))


    }, []);
    return (
        <>
            {
                listaNotas.length > 0 ?
                    <>
                        <Row>
                            <Col className='fw-bold' >Materia</Col>
                            <Col className='fw-bold' >Nota</Col>
                            <Col className='fw-bold'>Fecha</Col>
                        </Row>
                        {listaNotas.map((nota) => {
                            return <Row key={nota.idCursada}>
                                <Col>{nota.tipoNota}</Col>
                                <Col>{nota.notaNumerica}</Col>
                                <Col>{nota.fecha.toString().slice(0, 10)}</Col>
                            </Row>
                        })}
                    </>
                    :
                    <>NO HAY NOTAS</>
            }
        </>

    );
}

export default NotasListado;