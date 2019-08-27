import React from 'react';
import Projects from "./Components/Projects";
import Members from './Components/Members';

function App() {
    return (
        <div>
            <header id="header">
                <div className="inner">
                    <a href="/" class="image avatar">
                        <img src="https://cdn.sanity.io/images/uz9llh6i/production/9d53faaada538f16836d6aaa294c0f5c52b6e314-200x200.png" alt="Team LUX" />
                    </a>

                    <p>We improve the experience for our customers and for StarRez.</p>

                    <hr />

                    <Members />
                </div>

                <div id="footer"><a href="mailto:EnhanceTeam@starrez.com">EnhanceTeam@starrez.com</a></div>

            </header>

            <div id="main">
                <section id="two">
                    <Projects />
                </section>
            </div>

            <div id="footer">
            </div>
        </div>
    );
}

export default App;
