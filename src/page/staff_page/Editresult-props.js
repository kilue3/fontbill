
import React from 'react';

import Redit from "./Editresult";

const Editresult = (props) => {

    return (
        <>

            <Redit id={props.match.params.id} />

        </>
    )
}

export default Editresult;