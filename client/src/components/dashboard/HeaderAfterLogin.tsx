import React, { useState } from "react";
import { useStore } from "../../App";



const HeaderFrontPage = () => {

    const deleteUser = useStore(state => state.removeUser);
    const logout = () => {
        window.location.href = "/login";
        deleteUser();
    }

    return (
        <nav className="uk-navbar-container uk-margin" uk-navbar="mode: hover">
            <div className="uk-navbar-left">
                <ul className="uk-navbar-nav">
                    <li>
                        <a className="uk-navbar-item uk-logo uk-margin-left">SBill</a>
                        <div className="uk-navbar-dropdown">
                            <ul className="uk-nav uk-navbar-dropdown-nav">
                                <li><a href="/dashboard">Dashboard</a></li>
                                <li><a href="/invoices">Rechnungen</a></li>
                                <li><a href="/clients">Kunden</a></li>
                                <li><a href="/receipts">Belege</a></li>
                                <li><a href="/settings">Einstellungen</a></li>
                            </ul>
                        </div>
                    </li>
                </ul>

                <ul className="uk-navbar-nav uk-position-right uk-margin-right">
                    <li><a onClick={logout}>Logout</a></li>
                </ul>

            </div>
        </nav>
    );
}

export default HeaderFrontPage;