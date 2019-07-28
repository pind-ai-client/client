import {mock} from '../src/api/pindai'
import axios from 'axios'

const baseUrl = 'http://localhost:3000'

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

export function login (user) {
    return (dispatch, state) => {
        console.log('masuk action')
        dispatch(loading())
        axios.post(baseUrl+'/users/login', {
            userName: user.userName,
            email: user.email,
            UserId: user.UserId
        })
        .then(({ data }) => {
            console.log(data)
            dispatch(successLogin(data))
        })
        .catch(err => {
            dispatch(errorHitApi(err))
        })
    }
}

export function fetchSetSoals () {
    return (dispatch, state) => {
        dispatch(loading())
        axios.get(baseUrl+'/setSoal')
        .then(({ data }) => {
            dispatch(successFetchSoals(data))
        })
        .catch(err => {
            dispatch(errorHitApi(err))
        })
    }
}

export function fetchSetSoal (id) {
    return (dispatch, state) => {
        dispatch(loading())
        axios.get(baseUrl+'/setSoal/'+id)
        .then(({ data }) => {
            dispatch(successFetchSoal(data))
        })
        .catch(err => {
            dispatch(errorHitApi(err))
        })
    }
}

export function createSetSoal (option){
    return (dispatch, state) => {
        dispatch(loading())
        axios.post(baseUrl+'/setSoal', {
            UserId: option.UserId,
            title: option.title,
            folderName: option.folderName,
            answerKey: option.answerKey,
            answers: option.answers
        })
        .then(({ data }) => {
            console.log('success creating SetSoal', data)
            dispatch(doneLoading())
        })
        .catch(err => {
            dispatch(errorHitApi(err))
        })
    }
}

export function editSetSoal (id, option) {
    return (dispatch, state) => {
        dispatch(loading())
        axios.put(baseUrl+'/setSoal/'+id, option)
        .then(({ data }) => {
            console.log('success edit setsoal', data)
            dispatch(doneLoading())
        })
        .catch(err => {
            dispatch(errorHitApi(err))
        })
    }
}

export function editSetSoalKey (id, option) {
    return (dispatch, state) => {
        dispatch(loading())
        axios.put(baseUrl+'/setSoal/'+id+'keyUpdate', option)
        .then(({ data }) => {
            console.log('success edit setsoal key', data)
            dispatch(doneLoading())
        })
        .catch(err => {
            dispatch(errorHitApi(err))
        })
    }
}

export function deleteSetSoal (id) {
    return (dispatch, state) => {
        dispatch(loading())
        axios.delete(baseUrl+'/setSoal/'+id)
        .then(({ data }) => {
            console.log('success delete setSoal', data)
            dispatch(doneLoading())
        })
        .catch(err => {
            dispatch(errorHitApi(err))
        })

    }
}

export function fetchAnswers () {
    return (dispatch, state) => {
        dispatch(loading())
        axios.get(baseUrl+'/answers')
        .then(({ data }) => {
            dispatch(successFetchAnswers(data))
        })
        .catch(err => {
            dispatch(errorHitApi(err))
        })
    }
}

export function fetchAnswer (id) {
    return (dispatch, state) => {
        dispatch(loading())
        axios.get(baseUrl+'/answers/'+id)
        .then(({ data }) => {
            dispatch(successFetchAnswer(data))
        })
        .catch(err => {
            dispatch(errorHitApi(err))
        })
    }
}

export function createAnswer (formData) {
    return (dispatch, state) => {
        dispatch(loading())
        axios.post(baseUrl+'/answers', formData)
        .then(({ data }) => {
            console.log('success create answer', data)
            dispatch(doneLoading())
        })
        .catch(err => {
            dispatch(errorHitApi(err))
        })
    }
}

export function updateAnswer (id, option) {
    return (dispatch, state) => {
        dispatch(loading())
        axios.put(baseUrl+'/answers/'+id, option)
        .then(({ data }) => {
            console.log('success edit answer', data)
            dispatch(doneLoading())
        })
        .catch(err => {
            dispatch(errorHitApi(err))
        })
    }
}

export function deleteAnswer (id) {
    return (dispatch, state) => {
        dispatch(loading())
        axios.delete(baseUrl+'/answers/'+id)
        .then(({ data }) => {
            console.log('success delete answer', data)
        })
        .catch(err => {
            dispatch(errorHitApi(err))
        })
    }
}

export function loading () {
    return {
        type: "LOADING_HIT_API"
    }
}

export function doneLoading () {
    return {
        type: "LOADING_DONE"
    }
}

export function errorHitApi (error) {
    return {
        type: "ERROR_HIT_API",
        error
    }
}

export function successLogin (data) {
    return {
        type: "SUCCESS_LOGIN",
        data
    }
}

export function successFetchSoals(data) {
    return {
        type: "SUCCESS_FETCH_SOALS",
        data
    }
}

export function successFetchSoal(data) {
    return {
        type: "SUCCESS_FETCH_SOAL",
        data
    }
}

export function successFetchAnswers(data) {
    return {
        type: "SUCCESS_FETCH_ANSWERS",
        data
    }
}

export function successFetchAnswer(data) {
    return {
        type: "SUCCESS_FETCH_ANSWER",
        data
    }
}