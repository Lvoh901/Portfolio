import React, { forwardRef } from 'react';
import './process.css';

// Using forwardRef to allow the parent to pass a ref to the div
const Process = forwardRef((props, ref) => {
    return (
        <div className="process">
            <div className="process-track" ref={ref}>
                <div className="process-card">
                    <h1>01</h1>
                    <h3>Discovery & Consultation</h3>
                    <p>We kick off with a chat to spark ideas and set big goals. Let’s dream up something great together!</p>
                </div>

                <div className="process-card">
                    <h1>02</h1>
                    <h3>Planning & Strategy</h3>
                    <p>Blueprints ready! We map the journey, pick the best tools, and set our sights on success.</p>
                </div>

                <div className="process-card">
                    <h1>03</h1>
                    <h3>Design & Prototyping</h3>
                    <p>Watch your vision come alive with bold designs and interactive previews you help shape.</p>
                </div>

                <div className="process-card">
                    <h1>04</h1>
                    <h3>Development</h3>
                    <p>I build, code, and create — turning designs into a smooth, powerful digital experience.</p>
                </div>

                <div className="process-card">
                    <h1>05</h1>
                    <h3>Testing & QA</h3>
                    <p>Every detail counts! I squash bugs and fine-tune for quality you can trust.</p>
                </div>

                <div className="process-card">
                    <h1>06</h1>
                    <h3>Launch & Delivery</h3>
                    <p>Go live in style! Your project launches with celebration, support, and all the essentials.</p>
                </div>

                <div className="process-card">
                    <h1>07</h1>
                    <h3>Support & Iteration</h3>
                    <p>The adventure continues! I’m here for updates, upgrades, and your next big idea.</p>
                </div>
            </div>
        </div>
    );
});

export default Process;