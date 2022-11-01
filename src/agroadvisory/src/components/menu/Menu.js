import React from 'react';
import './Menu.css';

function Menu() {
    return (
        <header>
            <nav className="navbar navbar-expand-md navbar-light fixed-top bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">NextGen Agroadvisory</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav me-auto mb-2 mb-md-0">
                            <li className="nav-item">
                                <a className="nav-link" href="/fertilizer_advisories">Fertilizer</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/agroclimate">Agroclimate</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/isfm">ISFM</a>
                            </li>
                            <li className="nav-item">
                               <a className="nav-link" href="/irrigation">Irrigation scheduling</a>
                           </li>
                            {/* <li className="nav-item">
                                <a className="nav-link" href="/pest_disease">Pest and disease surveillance</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/csa">CSA</a>
                            </li> 
                            <li className="nav-item">
                                <a className="nav-link" href="/mechanization">Mechanization</a>
                            </li>*/}
                          
                           
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                More tools
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="/csa">CSA</a>
                                    <a className="dropdown-item" href="/pest_disease">Pest and disease surveillance</a>
                                    <a className="dropdown-item"href="/mechanization">Mechanization</a>
                                </div>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/bundled_aas">Bundled AAS</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/report">Report</a>
                            </li>
                             
                        </ul>
                           
                            <span className="navbar-text">
                                <a className="nav-link font-link" href="/about">About</a>
                            </span>

                            
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Menu;