const initialState = [


];

const activitiesReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case "ADD_ACTIVITY":
            //...state ใช้
            const newState = [...state, {
                id: payload.id,
                fname: payload.fname,
                lname: payload.lname,
                status: payload.status,

            },

            ];
            return newState;

        // case "Delect":
        //     const copyState = [...state];
        //     const index = copyState.findIndex((x) => x.id === payload.id);
        //     //splice delect fuction
        //     copyState.splice(index, 1);
        //     return copyState;
        default:
            return state;
    }

};

export default activitiesReducer;