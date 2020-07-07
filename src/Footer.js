import React from 'react';
import Container from './Container';
import { //Button, 
         Avatar } from 'antd';
import './Footer.css';

const Footer = (props) => (
    <div className='footer'>
        <Container>
            {props.numberOfSimpsons !== undefined ?
                <Avatar 
                    style={{backgroundColor: '#f56a00', marginRight: '5px'}}
                    size='large'>{props.numberOfSimpsons}</Avatar> : null
            }
            <button onClick={() => props.handleAddSimpsonClickEvent()} type='primary'>Add new simpson character +</button>
        </Container>
    </div>
);

export default Footer;