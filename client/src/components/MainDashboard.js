import React from "react";
import { useState } from "react";
import HeaderAfterLogin from "./HeaderAfterLogin";
import styled from "styled-components";
import Chart from "react-apexcharts";

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
    }

    const closeNav = () => {
        document.getElementById("mySidebar").style.width = "0";
    }

    const options = {
        chart: {
            id: "basic-bar"
        },
        xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
    }

    const series = [
        {
            name: "series-1",
            data: [30, 40, 45, 50, 49, 60, 70, 91]
        }
    ]

    return (
        <div>
            <HeaderAfterLogin />
            <div class="container text-center">
                <div class="row">
                    <div class="col-md-4">
                        <div class="uk-card uk-card-default uk-card-body uk-margin">
                            <h3 class="uk-card-title">477,680</h3>
                            <p>Payments received</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="uk-card uk-card-default uk-card-body uk-margin">
                            <h3 class="uk-card-title">12,000</h3>
                            <p>Outstanding payments</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="uk-card uk-card-default uk-card-body uk-margin">
                            <h3 class="uk-card-title">489,680</h3>
                            <p>Total Amount</p>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <Chart
                        options={options}
                        series={series}
                        type="bar"
                        width="100%"
                        height={350}
                    />
                </div>
            </div>

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
    background-color: #1e87f0;
    color: white;
    padding: 10px 15px;
    margin: 10px;
    border: none;
`;

const Main = styled.div`
   transition: margin-left .5s; /* If you want a transition effect */
`;

export default MainDashboard;