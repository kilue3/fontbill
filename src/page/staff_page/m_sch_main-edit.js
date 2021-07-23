
import React from 'react';

import Medit from "./m_sch_main-edit-props"

const editMscholar = (props) => {

    return (
        <>

            <Medit id={props.match.params.id} />

        </>
    )
}

export default editMscholar;
