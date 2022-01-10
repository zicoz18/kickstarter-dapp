import React from 'react';
import { Container } from 'semantic-ui-react';
import Header from './Header';

 const Layout = (props) => {
    return (
        /* Container allow us to have spacing at left and right */
        <Container>
            <Header/>
            {props.children}
        </Container>
    );
 };

 export default Layout;