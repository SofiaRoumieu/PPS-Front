import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';

const URL = process.env.REACT_APP_BACKEND_CONNECTION + 'api/';

const NotasListado = () => {

    const [listaNotas, setListaNotas] = useState([]);
    const usuario = JSON.parse(localStorage.getItem("usuario"));


    useEffect(() => {
        console.log("CURSOS");
        fetch(URL + 'Usuarios/Notas/' + usuario.legajo, {
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
        <Container className='mt-3'>
            <Row>
                <h1>Listado de notas finales</h1>
            </Row>
            {
                listaNotas.length > 0 ?
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th className='fw-bold' >Materia</th>
                                <th className='fw-bold' >Nota</th>
                                <th className='fw-bold'>Fecha</th>
                            </tr>
                        </thead>
                        <tbody>

                            {listaNotas.map((nota) => {
                                return <tr key={nota.nombreMateria}>
                                    <td>{nota.nombreMateria}</td>
                                    <td>{nota.notaNumerica}</td>
                                    <td>{nota.fecha.toString().slice(0, 10)}</td>
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

export default NotasListado;