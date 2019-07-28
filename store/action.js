import {mock} from '../src/api/pindai'

export function sendPicture(index) {
    console.log("masuk");
    return async (dispatch, payload) => {
        dispatch({
            type: "LOADING_HIT_API"
        });
        try {
            let test = await mock()
            dispatch({
                type: "SUCCESS_HIT_API",
                data: test
            });
        } catch (error) {
            dispatch({
                type: "ERROR_HIT_API",
                error
            });
        }
    };
}