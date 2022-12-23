import React from "react";
import { useState } from "react";
import HeaderAfterLogin from "./HeaderAfterLogin";
import styled from "styled-components";
import Chart from "react-apexcharts";
import { useStore } from "../../App";

const MainDashboard = () => {

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
            <div className="container text-center">
                <div className="row">
                    <div className="col-md-4">
                        <div className="uk-card uk-card-default uk-card-body uk-margin">
                            <h3 className="uk-card-title">477,680</h3>
                            <p>Payments received</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="uk-card uk-card-default uk-card-body uk-margin">
                            <h3 className="uk-card-title">12,000</h3>
                            <p>Outstanding payments</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="uk-card uk-card-default uk-card-body uk-margin">
                            <h3 className="uk-card-title">489,680</h3>
                            <p>Total Amount</p>
                        </div>
                    </div>
                </div>
                <div className="row">
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