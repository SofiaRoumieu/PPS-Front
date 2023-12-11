import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';

const URL = process.env.REACT_APP_BACKEND_CONNECTION + 'api/';

const CargarAsistencia = () => {

    const [alumnos, setAlumnos] = useState([]);
    const [curso, setCurso] = useState(JSON.parse(localStorage.getItem('curso')));


    useEffect(() => {
        console.log(JSON.parse(localStorage.getItem('usuario')))
        console.log(JSON.parse(localStorage.getItem('curso')))

        console.log(curso.id)
        fetch(URL + 'Cursos/Alumnos/' + curso.id, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.ok ? res.json() : Promise.reject(res))
            .then((data) => {
                console.log('ssss', data);
                data.forEach(element => {
                    element.asistencia = 0;
                });
                setAlumnos(data)
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
            });

    }, []);

    const handleAceptar = () => {
        console.log(alumnos)

        let asistData = []
        alumnos.forEach(al => {
            let data = {
                id_cursada: curso.id,
                legajo_alumno: al.legajo,
                concurrio: al.asistencia
            }
            asistData.push(data);
        });
        sendAsistencias(asistData);


    }
    const sendAsistencias = (asistencias) => {
        fetch(URL + 'Cursos/CargarAsistencias', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(asistencias)
        })
            .then((res) => res.ok ? res.json() : Promise.reject(res))
            .then((data) => {
                console.log('ssss', data);
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
            });

    }
    const handleChange = (e) => {
        let elAlumno = alumnos.find(x => x.legajo == e.target.id);
        elAlumno.asistencia = e.target.checked ? 1 : 0;
        console.log(alumnos)
    }



    return (
        <Container fluid>
            <div className='d-flex justify-content-between align-items-center'>
                <div className='mt-2'>
                    <h4 className='text-primary'>{curso.id} - {curso.materia} - {curso.dia} {curso.turno}</h4>
                </div>
            </div>
            <Table striped bordered hover responsive className='mt-3'>
                <thead>
                    <tr>
                        <th>Legajo</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Dni</th>
                        <th>Asistencia</th>
                    </tr>
                </thead>
                <tbody>

                    {alumnos.map(alumno => {
                        return (
                            <tr key={alumno.legajo}>
                                <td>{alumno.legajo}</td>
                                <td>{alumno.nombre}</td>
                                <td>{alumno.apellido}</td>
                                <td>{alumno.dni}</td>
                                <td>
                                    <input type='checkbox'
                                        id={alumno.legajo}
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </Table>
            <Row>
                <Col md='6'>
                    <Button className='mt-2 w-100' onClick={handleAceptar} >Aceptar cambios</Button>
                </Col>
                <Col md='6'>
                    <Button variant="outline-primary"
                        type="button"
                        className='mt-2 w-100' >
                        Volver
                    </Button>
                </Col>
            </Row>


        </Container>
    );
}

export default CargarAsistencia;