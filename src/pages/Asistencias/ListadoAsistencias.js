import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';

const URL = process.env.REACT_APP_BACKEND_CONNECTION + 'api/';

const ListadoAsistencias = () => {

    const [listaAsistencias, setListaAsistencias] = useState([]);
    const usuario = JSON.parse(localStorage.getItem("usuario"));


    useEffect(() => {
        console.log("CURSOS");
        fetch(URL + 'Usuarios/Asistencias/' + usuario.legajo, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('ladata', data);
                setListaAsistencias(data)
            })
            .catch(ex => console.log(ex))
    }, []);


    return (
        <Container className='mt-3'>
            <Row className='p-2'>
                <Col xs lg="8">
                    <h2 className='text-primary fw-bolder text-start'> Asistencias del alumno </h2>
                </Col>
            </Row>
            {
                listaAsistencias.length > 0 ?
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th className='fw-bold' >Id Cursada</th>
                                <th className='fw-bold' >Materia</th>
                                <th className='fw-bold'>Fecha</th>
                                <th className='fw-bold'>Asistencia</th>
                            </tr>
                        </thead>
                        <tbody>

                            {listaAsistencias.map((asistencia) => {
                                return <tr key={asistencia.id_asistencia}>
                                    <td>{asistencia.id_cursada}</td>
                                    <td>{asistencia.materia}</td>
                                    <td>{asistencia.fecha.toString().slice(0, 10)}</td>
                                    <td>{asistencia.concurrio ? 'Presente' : 'Ausente'}</td>
                                </tr>
                            })}
                        </tbody>
                    </Table>
                    :
                    <>NO HAY NOTAS</>
            }
        </Container>
    );
}

export default ListadoAsistencias;