import * as React from 'react';

import './Glass.css';

export const Glass = (props: { fillPercent: number, fillColor: string }) => {

    const transformY = 59-(243*Math.min(props.fillPercent, 107)/100);

    const renderedFillColor = props.fillColor.trim() === 'rgba(0,0,0,1)' ? 'rgba(0,0,0,0)' : props.fillColor;

    return <div className="Glass">
        <svg className="Glass__Back" width="218px" height="319px" viewBox="0 0 218 319" version="1.1">
            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="gopher_game_glas">
                    <g id="glas_inhalt">
                        <path d="M13,302 C-9,280 4.1,16.6 4.1,16.6 C4.1,7.7 50.4,0.5 107.5,0.5 C164.6,0.5 210.9,7.7 210.9,16.6 C210.9,16.6 226.1,277 203.1,301 L204.1,298.8 C204.1,308.8 161.8,317 109.7,317 C57.6,317 12.1,309.1 12.1,299.1" id="Path" fill="#D3E3EF"/>
                    </g>
                </g>
            </g>
        </svg>
        <svg className="Glass__Filling" width="218px" height="319px" viewBox="0 0 218 319" version="1.1" data-fillpercent={props.fillPercent}>
            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="gopher_game_glas" style={{
                    transform: `translate3d(0, ${transformY}px, 0)`
                }}>
                    <g id="glas_inhalt">
                        <rect id="CocktailGlassColor" fill={renderedFillColor} x="10" y="218" width="197" height="280"/>
                        <ellipse id="Oval" stroke="#000000" strokeWidth="2" fill={renderedFillColor} cx="108" cy="218" rx="93" ry="14"/>
                    </g>
                </g>
            </g>
        </svg>
        <svg className="Glass__Front" width="218px" height="319px" viewBox="0 0 218 319" version="1.1">
            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="gopher_game_glas">
                    <g id="glas_hintergrund">
                        <rect id="Rectangle" fill="#dad2a0" x="7" y="290" width="203" height="30"/>
                        <path d="M13,23 C13,23 8,245 15,277 C15,284.7 56.6,291 108,291 C159.4,291 201,284.7 201,277 C213,240 202,24 202,24 L210.8,16.6 C210.8,16.6 226,277 203,301 L204,298.8 C204,308.8 161.7,317 109.6,317 C57.5,317 12,309.1 12,299.1 L13,302 C-9,280 4.1,16.6 4.1,16.6" id="Path" fill="#D3E3EF"/>
                        <path d="M4.1,16.6 C4.1,7.7 50.4,0.5 107.5,0.5 C164.6,0.5 210.9,7.7 210.9,16.6 C210.9,25.5 164.6,32.7 107.5,32.7 C50.4,32.7 4.1,25.5 4.1,16.6 Z" id="Path" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M181,286 C195,289.2 204,294.3 204,298.8 C204,308.8 161.7,317 109.6,317 C57.5,317 12,309.1 12,299.1 C12,294.9 22.9,289.2 36,286" id="Path" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M4.1,16.6 C4.1,16.6 -9,280 13,302" id="Path" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M210.7,16.6 C210.7,16.6 226.1,277 203.1,301" id="Path" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M13,33.5 C13,33.5 8,245 15,277" id="Path" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M202.9,36.1 C202.9,36.1 213,240 201,277" id="Path" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <ellipse id="Oval" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" cx="108" cy="277" rx="93" ry="14"/>
                    </g>
                </g>
            </g>
        </svg>
    </div>;
}

export default Glass;
