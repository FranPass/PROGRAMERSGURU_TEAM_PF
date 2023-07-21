import React from 'react';
import s from './Footer.module.css';

//_________________________module_________________________
function Footer () {
    return (
        <div className={s.component}>
            <p>Politica de la Web</p>
            <p>Sobre nosotros</p>
            <p>Contacto</p>
            <p>Donación</p>
        </div>
    )
}

export default Footer;