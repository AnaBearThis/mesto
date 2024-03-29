export default class Api {
    constructor(options) {
        this._url = options.url;
        this._headers = options.headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers
        })
        .then((res) => {
           return this._checkResponse(res)
        });
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers
        })
        .then((res) => {
            return this._checkResponse(res)
        });
    }

    editProfile(me, job) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: `${me}`,
                about: `${job}`
              })
        })
        .then((res) => {
            return this._checkResponse(res)
         });
    }

    createCard(input) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: `${input.name}`,
                link: `${input.link}`
              })
        })
        .then((res) => {
            return this._checkResponse(res)
         });
    }

    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then((res) => {
            return this._checkResponse(res)
         });
    }

    like(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers
        })
        .then((res) => {
            return this._checkResponse(res)
         });
    }

    removeLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then((res) => {
            return this._checkResponse(res)
         });
    }

    changeAvatar(avatar) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: `${avatar.link}`
              })
        })
        .then((res) => {
            return this._checkResponse(res)
         });
    }

}