import React, { useState, useEffect } from 'react';
import '../styles/Listado.css';

import {Row, Col, Card } from 'react-bootstrap';
import Spinner from '../components/Spinner';
import Detalle from './Detalle';

const URL = 'https://pokeapi.co/api/v2/pokemon/?limit=20';

const Listado = () => {
    const [pokemones, setPokemones] = useState([]);
    const [cargando, setCargando] = useState(false);

    useEffect(() => {
        console.log("esta en use effect de listado");
        if (!pokemones.length) {
            setCargando(true);
            fetch(URL)
            .then((res) => res.ok ? res.json() : Promise.reject(res))
            .then((data) => {
                console.log(data);
                data.results.forEach((pokemon) => {
                    setPokemones((pokemonesGuardados) => {
                        return [
                            ...pokemonesGuardados, 
                            {
                                id: pokemon.id,
                                nombre: pokemon.name,
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
        <div className='row listado'>
            <h1 style={{color:"white"}}>Listado de Pokebolas, descubrí el pokemón oculto en cada una</h1>
        {
            cargando ?
            (<Spinner/>)
            :
            <>
            <Row>
                { pokemones.map((pokemon) => {
                    
                    return <Col xs="4" lg="4"><Card key={pokemon.id} item={pokemon} /></Col>;
                    })
                }
            </Row>
            </>
        }
        </div>
    );
}

export default Listado;