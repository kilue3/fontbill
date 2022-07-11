import React from 'react'
import Spinner from "../FullPageLoader/ne.gif"
import img from "./load2.gif"
export const FullPaageLoader = () => {
    const mystyle = {
        position: "fixed",
        width: "100%",
        height: "100%",
        top: "0",
        left: "0",
        background: "#383a3e",
    }
    const loader = {
        width: "250px",
        top: "30%",
        left: "43%",
        zindex: "1000",
        position: "absolute",

    }
    return (
        <div className="fp-container" style={mystyle}>
            <img src={img} className="fp-loader" style={loader} alt="loading" />
        </div>
    )
}

export default FullPaageLoader;