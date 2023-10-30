import React, { useState } from 'react';

const initialForm = {
    correo: '',
    clave: ''
};


const Form = () => {

    const [form, setForm] = useState(initialForm);
    const { correo, clave } = form;


    const handleChange = (e) => {
        setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
    };
    const handleReset = () => {
        setForm(initialForm);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Enviando...");
        handleReset();
    }


    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label for="correo"></label>
                <input
                    type="email"
                    className="form-control"
                    name="correo"
                    id="correo"
                    placeholder="Correo electronico"
                    value={correo}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label for="clave"></label>
                <input
                    type="password"
                    className="form-control"
                    name="clave"
                    id="clave"
                    placeholder="Clave"
                    value={clave}
                    onChange={handleChange}
                />
            </div>
            <div>
                <button type="submit" className="btn btn-primary mb-3"> Enviar </button>
                <button type="reset" className="btn btn-secondary mb-3" onClick={handleReset} > Limpiar </button>
            </div>

        </form>
    );
}

export default Form;