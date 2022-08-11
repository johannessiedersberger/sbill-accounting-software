import React from "react";
import { useState } from "react";
import styled from "styled-components";

const Footer = () => {
    return (
        <div class="container">
            <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                <p class="col-md-4 mb-0 text-muted">© 2021 Company, Inc</p>

                <a href="/" class="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">

                </a>

                <ul class="nav col-md-4 justify-content-end">
                    <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Imprint</a></li>
                    <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Privacy Policy</a></li>
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