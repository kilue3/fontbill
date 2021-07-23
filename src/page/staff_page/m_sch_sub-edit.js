import React from 'react';

import Medit from "./m_sch_sub-edit-props"

const editShscholar = (props) => {

    return (
        <>

            <Medit id={props.match.params.id} />

        </>
    )
}

export default editShscholar;
