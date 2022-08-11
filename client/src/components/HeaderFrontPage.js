import React, { useState } from "react";


const HeaderFrontPage = () => {
    return (
        <nav class="uk-navbar-container uk-margin" uk-navbar="mode: click">
            <div class="uk-navbar-left ">
                <a class="uk-navbar-item uk-logo uk-margin-left" href="/">SBill</a>

                <ul class="uk-navbar-nav">
                    <li><a href="#">Funktionen</a></li>
                    <li><a href="#">Preise</a></li>
                    <li><a href="/dashboard">Dashboard</a></li>
                </ul>
                <ul class="uk-navbar-nav uk-position-right uk-margin-right">
                    <li><a href="/login">Login</a></li>
                    <li><a href="/signup">Account Erstellen</a></li>
                </ul>

            </div>
        </nav>
    );
}

export default HeaderFrontPage;