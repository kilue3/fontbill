import React from 'react'
import Spinner from "../FullPageLoader/ne.gif"

export const FullPaageLoader = () => {
    const mystyle = {
        position: "fixed",
        width: "100%",
        height: "100%",
        top: "0",
        left: "0",
        background: "#f8f8f8ad",
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
            <img src='https://f.ptcdn.info/413/072/000/qnqdfy7rjt1RwwWVr2OQ-o.gif' className="fp-loader" style={loader} alt="loading" />
        </div>
    )
}

export default FullPaageLoader;