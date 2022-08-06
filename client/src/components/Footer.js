import React from "react";
import { useState } from "react";
import styled from "styled-components";

const Footer = () => {
    return (
        <FooterBottom>
            <Legal>
                <p>&copy; 2022 JS-IT Consulting. All rights reserved </p>
            </Legal>
        </FooterBottom>
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