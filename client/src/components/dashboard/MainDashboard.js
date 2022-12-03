import React from "react";
import { useState } from "react";
import HeaderAfterLogin from "./HeaderAfterLogin";
import styled from "styled-components";
import Chart from "react-apexcharts";
import { useStore } from "../../App.js";

const MainDashboard = (props) => {

    const user = useStore(state => state.user)
    if (!user) {
        window.location.href = "/login"
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


export default MainDashboard;