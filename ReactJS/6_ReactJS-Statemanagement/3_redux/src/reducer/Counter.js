export function counterReducer(state = 0, action) {
    switch (action.type) {
        case 'counter/increment':
            return state + 1
        case 'counter/decrement':
            return state - 1
        case 'counter/reset':
            return 0;
        default:
            return state
    }
}
// initial state is 0
// yhe reducer function takes the current state and an action as arguments
// based on the action type, it returns a new state
// if the action type is not recognized, it returns the current state unchanged
// yha upar dekho toh u will see ki action object k type k basis pe mapped function hai yha usko call kra diya to update state