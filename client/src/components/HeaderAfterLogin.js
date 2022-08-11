import React, { useState } from "react";


const HeaderFrontPage = (props) => {
    return (
        <nav class="uk-navbar-container uk-margin" uk-navbar="mode: click">
            <div class="uk-navbar-left">
                {/* <a class="uk-navbar-item uk-logo uk-margin-left">SBill</a> */}

                <ul class="uk-navbar-nav">
                    <li>
                        <a class="uk-navbar-item uk-logo uk-margin-left">SBill</a>
                        <div class="uk-navbar-dropdown">
                            <ul class="uk-nav uk-navbar-dropdown-nav">
                                <li><a href="/dashboard">Dashboard</a></li>
                                <li><a href="#">Angebote</a></li>
                                <li><a href="#">Rechnungen</a></li>
                            </ul>
                        </div>
                    </li>
                </ul>

                <ul class="uk-navbar-nav uk-position-right uk-margin-right">
                    <li><a href="/">Logout</a></li>
                </ul>

            </div>
        </nav>
    );
}

export default HeaderFrontPage;