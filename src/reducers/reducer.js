import ActionTypes from '../constant/constant';

const INITIAL_STATE = {
    userName: '',
    currentUser: '',
    currentUserUid: '',
    todo: '',
}


export default (state = INITIAL_STATE, action) => {
    // console.log(state)
    switch (action.type) {

        case ActionTypes.USERNAME:
            // console.log(state)
            return ({
                ...state,
                userName: action.payload
            })

        case ActionTypes.CURRENTUSER:
            // console.log(state)
            return ({
                ...state,
                currentUser: action.payload
            })
        case ActionTypes.TODO:
            // console.log(state)
            return ({
                ...state,
                todo: action.payload
            })
        case ActionTypes.CURRENTUSER_UID:
            // console.log(state)
            return ({
                ...state,
                currentUserUid: action.payload
            })
        // case ActionTypes.ALLUSERS:
        //     console.log(state)
        //     return ({
        //         ...state,
        //         allUsers: action.payload
        //     })
        default:
            return state;
    }

}