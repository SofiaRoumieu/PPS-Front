import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import Pagination from 'react-bootstrap/Pagination';
import { useNavigate } from 'react-router-dom';

const URL = process.env.REACT_APP_BACKEND_CONNECTION;

const UsuariosListado = () => {
    const navigate = useNavigate();
    const [usuarios, setUsuarios] = useState([]);
    let active = 1;
    let items = [];
    // for (let number = 1; number <= usuarios.length; number++) {
    //     items.push(
    //         <Pagination.Item key={number} active={number === active}>
    //             {number}
    //         </Pagination.Item>,
    //     );
    // }


    const mapDate = (datt) => {
        console.log("ASD")
        let retorno = '';
        let date = new Date(datt);
        retorno += `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
        return retorno;
    }

    useEffect(() => {

        fetch(URL + 'api/Usuarios',)
            .then((res) => res.ok ? res.json() : Promise.reject(res))
            .then((data) => {
                console.log(data);
                setUsuarios(data);
            })
            .catch((err) => {
                console.error('errror', err);
            })
            .finally(() => {
            });

    }, []);


    return (
        <Container>
            <Row className='d-flex justify-content-between align-items-center mt-2'>
                <Row>
                    <Col>
                        <h3 className='text-primary'>Listado de usuarios</h3>
                    </Col>
                </Row>
                <Row>
                    <Col >
                        <Button variant='secondary' className='px-4'>Filtrar</Button>
                    </Col>
                    <Col>
                        <Button variant='success' onClick={() => navigate('/usuarios-alta')} >Nuevo usuario</Button>
                    </Col>
                </Row>
            </Row>
            <Table striped bordered hover className='mt-5'>
                <thead>
                    <tr>
                        <th>Legajo</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Dni</th>
                        <th>Fecha ingreso</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map(usuario => {
                        return (
                            <tr key={usuario.legajo}>
                                <td>{usuario.legajo}</td>
                                <td>{usuario.nombre}</td>
                                <td>{usuario.apellido}</td>
                                <td>{usuario.dni}</td>
                                <td>{mapDate(usuario.fechaRegistro)}</td>
                                <td>{usuario.estado == 1 ? 'Activo' : 'Inactivo'}</td>
                                <td >Acciones</td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </Table>
        </Container>

    );
}

export default UsuariosListado;