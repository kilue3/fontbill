import React from 'react';

import Shedit from "./m_sch_sub-show_props"

const editShscholar = (props) => {

    return (
        <>

            <Shedit id={props.match.params.id} />

        </>
    )
}

export default editShscholar;
