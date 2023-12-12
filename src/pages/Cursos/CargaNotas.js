import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const URL = process.env.REACT_APP_BACKEND_CONNECTION + 'api/';

const CargaNotas = () => {
    const navigate = useNavigate();

    const [alumnos, setAlumnos] = useState([]);
    const [curso, setCurso] = useState(JSON.parse(localStorage.getItem('curso')));

    useEffect(() => {
        console.log(JSON.parse(localStorage.getItem('usuario')))
        console.log(JSON.parse(localStorage.getItem('curso')))


        fetch(URL + 'Cursos/Alumnos/' + curso.id, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.ok ? res.json() : Promise.reject(res))
            .then((data) => {
                console.log('ssss', data);
                setAlumnos(data);
                getNotasAlumnos();
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
            });

    }, []);

    const getNotasAlumnos = () => {
        fetch(URL + 'Cursos/Notas/' + curso.id, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.ok ? res.json() : Promise.reject(res))
            .then((data) => {
                console.log('notass', data);
                data.forEach(element => {
                    console.log(element.legajoAlumno + '-' + element.tipoNota);
                    document.getElementById(element.legajoAlumno + '-' + element.tipoNota).value = element.notaNumerica;
                    document.getElementById(element.legajoAlumno + '-' + element.tipoNota).disabled = true;

                });

            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
            });
    }


    const [form, setForm] = useState([]);
    const handleChange = (e) => {
        setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
        console.log(form);
    };

    const handleAccept = (e) => {
        console.log(form)
        const notas = [];
        for (let j = 0; j < alumnos.length; j++) {
            const alumno = alumnos[j];
            for (let i = 1; i <= 5; i++) {
                const nota = form[alumnos[j].legajo + '-' + i.toString()];

                if (nota != undefined && nota != null) {
                    let userNote = {
                        legajoAlumno: alumno.legajo,
                        idCursada: curso.id,
                        tipoNota: i,
                        notaNumerica: nota
                    }
                    notas.push(userNote)
                    console.log('userNote', userNote);
                }
            }
        }

        if (notas.length > 0) {
            sendNotas(notas);
        }

    }

    const sendNotas = (notas) => {
        console.log(notas);
        fetch(URL + 'Cursos/CargarNotas', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(notas)
        })
            .then((res) => res.ok ? res.json() : Promise.reject(res))
            .then((data) => {
                console.log('ssss', data);
                // setAlumnos(data);
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
            });

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
                        <th>Primer Parcial</th>
                        <th>Segundo Parcial</th>
                        <th>Primer Recuperatorio</th>
                        <th>Segundo Recuperatorio</th>
                        <th>Final</th>
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
                                    <input type='number' className='form-control-sm'
                                        min={1}
                                        max={10}
                                        name={alumno.legajo + '-1'}
                                        id={alumno.legajo + '-1'}
                                        value={alumno.primerParcial}
                                        onChange={handleChange}
                                    />
                                </td>
                                <td>
                                    <input type='number' className='form-control-sm'
                                        min={1}
                                        max={10}
                                        name={alumno.legajo + '-2'}
                                        id={alumno.legajo + '-2'}
                                        value={alumno.segundoParcial}
                                        onChange={handleChange}
                                    />
                                </td>
                                <td>
                                    <input type='number' className='form-control-sm'
                                        min={1}
                                        max={10}
                                        name={alumno.legajo + '-3'}
                                        id={alumno.legajo + '-3'}
                                        value={alumno.primerRecuperatorio}
                                        onChange={handleChange}
                                    />
                                </td>
                                <td>
                                    <input type='number' className='form-control-sm'
                                        min={1}
                                        max={10}
                                        name={alumno.legajo + '-4'}
                                        id={alumno.legajo + '-4'}
                                        value={alumno.segundoRecuperatorio}
                                        onChange={handleChange}
                                    />
                                </td>
                                <td>
                                    <input type='number' className='form-control-sm'
                                        min={1}
                                        max={10}
                                        name={alumno.legajo + '-5'}
                                        id={alumno.legajo + '-5'}
                                        value={alumno.final}
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
                    <Button variant="outline-primary"
                        onClick={() => navigate('/curso-detalle')}
                        type="button"
                        className='mt-2 w-100' >
                        Volver
                    </Button>
                </Col>
                <Col md='6'>
                    <Button className='mt-2 w-100' onClick={handleAccept} >Aceptar cambios</Button>
                </Col>
            </Row>


        </Container>
    );
}

export default CargaNotas;