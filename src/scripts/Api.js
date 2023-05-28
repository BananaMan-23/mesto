export default class Api {
    constructor(options) {
      this._url = options.url
      this._headers = options.headers
      this._authorization = options.headers.authorization
    }
  
    getUserInfo() {
      return fetch(this._url + '/users/me', {
        method: 'GET',
        headers: {
          authorization: this._authorization
        }
      })
      .then(res => {
        if(res.ok){
          res.json()
        } else {
          return Promise.reject((`Ошибка: ${res.status}`))
        }
      })
    }
    getInitialCards() {
      return fetch(this._url + '/cards', {
        method: 'GET',
        headers: {
          authorization: this._authorization
        }
      })
        .then(res => {
          if (res.ok) {
            return res.json()
          }
          return Promise.reject((`Ошибка: ${res.status}`))
        })
    }
  
    setUserInfo(userData) {
      return fetch(this._url + '/users/me', {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: userData.name,
          about: userData.info
        })
      })
        .then(res => {
          if (res.ok) {
            console.log(res)
            return res.json()
          }
          return Promise.reject(`Ошибка: ${res.status}`)
        })
    }
  
    addUserCard(data) {
      return fetch(this._url + '/cards', {
        method: 'POST',
        headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
        .then(res => {
          if (res.ok) {
            return res.json()
          }
          return Promise.reject((`Ошибка: ${res.status}`))
        })
    }
    like(id) {
      return fetch(this._url + `/cards/likes/${id}`, {
        method: 'PUT',
        headers: this._headers
      })
        .then(res => {
          if (res.ok) {
            return res.json()
          }
          return Promise.reject(`Ошибка: ${res.status}`)
        })
    }
  
    dislike(id) {
      return fetch(this._url + `/cards/likes/${id}`, {
        method: 'DELETE',
        headers: this._headers
      })
        .then(res => {
          if (res.ok) {
            return res.json()
          }
          return Promise.reject(`Ошибка: ${res.status}`)
        })
    }
    deleteCard(id) {
      return fetch(this._url + `/cards/${id}`, {
        method: 'DELETE',
        headers: this._headers
      })
        .then(res => {
          if (res.ok) {
            return res.json()
          }
          return Promise.reject(`Ошибка: ${res.status}`)
        })
    }
}
