import React from "react";


const HeaderFrontPage = () => {
    return (
        <nav className="uk-navbar-container uk-margin" uk-navbar="mode: click">
            <div className="uk-navbar-left ">
                <a className="uk-navbar-item uk-logo uk-margin-left" href="/">SBill</a>

                <ul className="uk-navbar-nav">
                    <li><a href="/features">Features</a></li>
                    <li><a href="/pricing">Pricing</a></li>
                </ul>
                <ul className="uk-navbar-nav uk-position-right uk-margin-right">
                    <li><a href="/login">Login</a></li>
                    <li><a href="/signup">Sign Up</a></li>
                </ul>

            </div>
        </nav>
    );
}

export default HeaderFrontPage;