import React from "react";
import { useState } from "react";
import HeaderAfterLogin from "./HeaderAfterLogin";
import styled from "styled-components";

const MainDashboard = (props) => {

    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNav = () => {
        if (isNavOpen) {
            closeNav();
        } else {
            openNav();
        }
        setIsNavOpen(!isNavOpen);
    }

    const openNav = () => {
        document.getElementById("mySidebar").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
    }

    const closeNav = () => {
        document.getElementById("mySidebar").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
    }

    return (
        <div>
            <SideBar id="mySidebar">
                <Closebtn onClick={toggleNav}>&times;</Closebtn>
                <a href="#">Dashboard</a>
                <a href="#">Angebote</a>
                <a href="#">Rechnungen</a>
                <a href="#">Kontakte</a>
                <a href="#">Belege</a>
            </SideBar>
            <Main id="main">
                <HeaderAfterLogin />
                <Openbtn onClick={toggleNav}>Open Button</Openbtn>
                <h2>Collapsed Sidebar</h2>
            </Main>


        </div >
    )
}

const SideBar = styled.div`
    height: 100%; /* 100% Full-height */
    width: 0; /* 0 width - change this with JavaScript */
    position: fixed; /* Stay in place */
    z-index: 1; /* Stay on top */
    top: 0;
    left: 0;
    background-color: #1e87f0; /* Black*/
    overflow-x: hidden; /* Disable horizontal scroll */
    padding-top: 60px; /* Place content 60px from the top */
    transition: 0.5s; /* 0.5 second transition effect to slide in the sidebar */

    a {
        padding: 8px 8px 8px 32px;
        text-decoration: none;
        font-size: 25px;
        color: #e2effc;
        display: block;
        transition: 0.3s;

        @media screen and (max-height: 450px) {
            padding-top: 15px;
            a {font-size: 18px;}
        }
     }

     &:hover {
        color: #f1f1f1;
     }
`;

const Closebtn = styled.button`
    position: absolute;
    top: 0;
    right: 25px;
    font-size: 36px;
    margin-left: 50px;
    background-color: #1e87f0;
    border: none;
    cursor: pointer;
    &:hover {
        color: #f1f1f1;
    }
`;



const Openbtn = styled.button`
    font-size: 20px;
    cursor: pointer;
    background-color: #111;
    color: white;
    padding: 10px 15px;
    border: none;
`;

const Main = styled.div`
   transition: margin-left .5s; /* If you want a transition effect */
`;

export default MainDashboard;