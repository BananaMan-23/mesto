export default class Api {
    constructor(data) {
        this._url = data.url;
        this._headers = data.headers;
        this._authorization = data.headers.authorization
    }
    _getResponseData(res) {
        if(res.ok) {
            return res.json()
        } else {
            Promise.reject((`Ошибка: ${res.status}`))
        }
    }
    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: {
                authorization: this._authorization
            }
        })
        .then((res) => this._getResponseData(res))
        // .then((res)=> {
        //     if(res.ok){
        //        return res.json()
        //     } else{
        //         Promise.reject((`Ошибка: ${res.status}`))
        //     }
        // })
    }
    getUserCard() {
        return fetch(`${this._url}/cards`, {
            headers: {
                authorization: this._authorization
            }
        })
        .then((res) => this._getResponseData(res))
        // .then((res)=> {
        //     if(res.ok){
        //        return res.json()
        //     } else{
        //         Promise.reject((`Ошибка: ${res.status}`))
        //     }
        // })
    }
    setUserInfo(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.info
            })
        })
        .then((res) => this._getResponseData(res))
        // .then((res)=> {
        //     if(res.ok){
        //        return res.json()
        //     } else{
        //         Promise.reject((`Ошибка: ${res.status}`))
        //     }
        // })
    }
    setUserAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.link
            })
        })
        .then((res) => this._getResponseData(res))
        // .then((res)=> {
        //     if(res.ok){
        //        return res.json()
        //     } else{
        //         Promise.reject((`Ошибка: ${res.status}`))
        //     }
        // })
    }
    addCard(data) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
        .then((res) => this._getResponseData(res))
        // .then((res)=> {
        //     if(res.ok){
        //        return res.json()
        //     } else{
        //         Promise.reject((`Ошибка: ${res.status}`))
        //     }
        // })
    }
    activeLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: {
                authorization: this._authorization
            }
        })
        .then((res) => this._getResponseData(res))
        // .then((res)=> {
        //     if(res.ok){
        //        return res.json()
        //     } else{
        //         Promise.reject((`Ошибка: ${res.status}`))
        //     }
        // })
    }
    inActiveLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: this._authorization
            }
        })
        .then((res) => this._getResponseData(res))
        // .then((res)=> {
        //     if(res.ok){
        //        return res.json()
        //     } else{
        //         Promise.reject((`Ошибка: ${res.status}`))
        //     }
        // })
    }
    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._authorization
            }
        })
        .then((res) => this._getResponseData(res))
        // .then((res)=> {
        //     if(res.ok){
        //        return res.json()
        //     } else{
        //         Promise.reject((`Ошибка: ${res.status}`))
        //     }
        // })
    }
}