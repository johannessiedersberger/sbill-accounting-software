import React from "react";
import styled from 'styled-components';

const Footer = () => {
    return (
        <div className="container">
            <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                <p className="col-md-4 mb-0 text-muted">© 2022 JS IT-Consulting</p>

                <a href="/" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">

                </a>

                <ul className="nav col-md-4 justify-content-end">
                    <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Imprint</a></li>
                    <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Privacy Policy</a></li>
                </ul>
            </footer>
        </div >
    )
}

const FooterBottom = styled.footer`
    height: 20px;
    display: flex;
    flex:  1 100%;
    flex-flow: row wrap;
    padding: 15px 15px 15px 15px;
    color: #2f2f2f;
    background-color: #fff;
    border-top: 1px solid #e5e5e5;
    margin-top: 9%;
`;

const Legal = styled.div`
    display: flex;
    flex-wrap: wrap;
    color: #999;
`;


export default Footer;