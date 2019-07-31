import {mock} from '../src/api/pindai'
import axios from 'axios'

const baseUrl = 'http://localhost:3000'

export function sendPicture(index) {
    // console.log("masuk");
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

export function login (user, navigate) {
    return (dispatch, state) => {
        // console.log('masuk action')
        dispatch(loading())
        // console.log(user, 'from action');
        axios.post(baseUrl+'/users/login', {
            userName: user.userName,
            email: user.email,
            UserId: user.UserId,
            photoUrl: user.photoUrl
        })
        .then(({ data }) => {
            // console.log(data)
            dispatch(successLogin(data))
            navigate('dashboard')
        })
        .catch(err => {
            console.log(err)
            dispatch(errorHitApi(err))
        })
    }
}

export function fetchSetSoals (userId) {
    
    return (dispatch, state) => {
        dispatch(loading())
        axios.get(baseUrl+'/setSoal/'+userId+'/users')
        .then(({ data }) => {
            // console.log('data actioooon soallls', data);
            dispatch(successFetchSoals(data))
        })
        .catch(err => {
            dispatch(errorHitApi(err))
        })
    }
}

export function fetchSetSoal (id) {
    // console.log('fetch soal dijalankan',id);

    return (dispatch, state) => {
        dispatch(loading())
        axios.get(baseUrl+'/setSoal/'+id)
        .then(({ data }) => {
            // console.log('data actioooon', data);
            dispatch(successFetchSoal(data))
        })
        .catch(err => {
            dispatch(errorHitApi(err))
        })
    }
}

export function createSetSoal (option){
    console.log(option, 'in action');
    return (dispatch, state) => {
        dispatch(loading())
        axios.post(baseUrl+'/setSoal', {
            UserId: option.UserId,
            title: option.title,
            folderName: option.folderName,
            answerKey: option.answerKey,
            answers: option.answers,
            passingGrade : option.passingGrade
        })
        .then(({ data }) => {
            // console.warn('success create setSoal', data)
            dispatch(fetchSetSoals(option.UserId))
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

export function deleteSetSoal (id, userId) {
    return (dispatch, state) => {
        dispatch(loading())
        axios.delete(baseUrl+'/setSoal/'+id)
        .then(({ data }) => {
            console.log('success delete setSoal', data)
            dispatch(doneLoading())
            console.log(state)
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
        console.log('fetch answer nih bos',id)
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

export function createAnswer (uri, setSoalId) {
    return (dispatch, state) => {
        console.log('masuk create answer client')
        dispatch(loading())
        let formData = new FormData()
        formData.append('image', {
            uri,
            name: 'image.jpg',
            type: 'image/jpg'
        })
        formData.append('setSoalId', setSoalId)
        let options = {
            method: 'POST',
            body: formData,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            }
        }

        fetch(baseUrl+'/answers', options)
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data.status === 'success') {
                dispatch(doneLoading())
                console.log(data.data)
                dispatch(answerCreated(data.data))
            } else {
                console.log(data.data)
                dispatch(errorHitApi(data))
            }
        })
        .catch(err => {
            dispatch(doneLoading())
            console.log(err)
        })
        // axios.post(baseUrl+'/answers', formData, {
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        // })
        // .then(({ data }) => {
        //     if (data.status === 'success') {
        //         console.log('success creating answer', data.data)
        //     } else {
        //         console.log('error creating answer', data.data)
        //     }
        //     dispatch(doneLoading())
        // })
        // .catch(err => {
        //     dispatch(errorHitApi(err))
        // })
    }
}

export function updateAnswer (id, option) {
    console.log('masuk update, ini idnya:', id)
    console.log('masuk update, ini optionnya:', option)
    console.log(baseUrl+'/answers/'+id)
    return (dispatch, state) => {
        console.log('masuk return update')
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
    // console.log('masuk action success', data)
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

export function answerCreated(data) {
    console.log('dari action =====', data.answers['1'])
    return {
        type: "SUCCESS_CREATE_ANSWER",
        data
    }
}