import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';


const initialForm = {
    nombreFacultad: '',
    nombre: '',
    materias: []
}
const URL = process.env.REACT_APP_BACKEND_CONNECTION + 'api/';

const AltaCarrera = () => {

    const [form, setForm] = useState(initialForm)
    const [todasMaterias, setTodasMaterias] = useState([]);
    const [materiasCarrera, setmateriasCarrera] = useState([]);
    const { nombre, nombreFacultad, materias } = form;

    const handleChange = (e) => {
        setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
        console.log(form);
    };
    const handleChangeMateria = (e) => {
        let index = materiasCarrera.findIndex(x => x.id == e.target.id);

        if (index == -1) {
            materiasCarrera.push(todasMaterias.find(x => x.id == e.target.id))
            console.log(e.target.id);
            document.getElementsByName(e.target.id)[0].disabled = false;
        } else {
            materiasCarrera.splice(index, 1);
            document.getElementsByName(e.target.id)[0].disabled = true;

        }
        console.log(materiasCarrera)
    }
    const handleChangeCuatrimestre = (e) => {
        let index = materiasCarrera.findIndex(x => x.id == e.target.name);
        console.log("index", index)
        if (index == -1) {
            materiasCarrera[index].cuatrimestre = e.target.value;
            //            materiasCarrera.push(todasMaterias.find(x => x.id == e.target.id))
        } else {
            materiasCarrera[index].cuatrimestre = e.target.value;
        }
        console.log(materiasCarrera)
    }

    const handleReset = () => {
        setForm(initialForm);
    };
    const handleSubmit = () => {

        form.materias = materiasCarrera
        form.materias.forEach(element => {
            element.idMateria = element.id
        });

        console.log(materiasCarrera)
        console.log(form)
        postCarrera();

    };

    useEffect(() => {
        getMaterias();
    }, []);

    const getMaterias = () => {
        fetch(URL + 'Materias', {
            method: "GET",
            headers: {
                "Content-Type": "Application/json",
            }
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setTodasMaterias(data);
            })
            .catch(ex => console.log(ex))
    }

    const postCarrera = () => {
        let data = {
            facultad: nombreFacultad,
            nombre: form.nombre,
            materias: form.materias
        }
        console.log(data)
        fetch(URL + 'Carreras', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((res) => res.ok ? res.json() : Promise.reject(res))
            .then((data) => {
                console.log('ssss', data);
                // handleReset();
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
            });

    }




    return (
        <Form>
            <Row>
                <Col xs='12' sm='6' lg='4' >
                    <label htmlFor='nombre' className='label'> Nombre </label>
                    <input
                        id='nombre'
                        type="text"
                        name="nombre"
                        placeholder="Contador Publico"
                        className='form-control '
                        value={nombre}
                        onChange={handleChange}
                    />
                </Col>
                <Col xs='12' sm='6' lg='4' >
                    <label htmlFor='nombreFacultad' className='label'> Facultad </label>
                    <input
                        id='nombreFacultad'
                        type="text"
                        name="nombreFacultad"
                        placeholder="Economia"
                        className='form-control '
                        value={nombreFacultad}
                        onChange={handleChange}
                    />
                </Col>
            </Row>
            <Row>
                <Col>

                    {todasMaterias.map(mat => {
                        return (
                            <Row key={mat.id}>
                                <Col>{mat.id}</Col>
                                <Col>{mat.nombre}</Col>
                                <Col>
                                    <input type='checkbox'
                                        id={mat.id}
                                        onChange={handleChangeMateria}
                                    />
                                </Col>
                                <Col>
                                    <select disabled='true' name={mat.id} className='form-control-sm' onChange={handleChangeCuatrimestre} >
                                        <option value={-1}> Seleccione </option>
                                        <option value={1}> 1  </option>
                                        <option value={2}> 2 </option>
                                        <option value={3}> 3 </option>
                                        <option value={4}> 4 </option>
                                        <option value={5}> 5 </option>
                                        <option value={6}> 6 </option>
                                        <option value={7}> 7 </option>
                                        <option value={8}> 8 </option>
                                        <option value={9}> 9 </option>
                                        <option value={10}> 10 </option>
                                    </select>
                                </Col>
                            </Row>
                        )
                    })
                    }


                </Col>
            </Row>

            <Row className='justify-content-center m-2'>
                <Col sm='6'>
                    <Button className='w-100' onClick={handleSubmit} >Enviar</Button>
                </Col>
            </Row>
        </Form>
    );
}

export default AltaCarrera;