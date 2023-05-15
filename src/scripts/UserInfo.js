export default class UserInfo {
    constructor({name, job}) {
        this._profileName = document.querySelector(name)
        this._profileJob = document.querySelector(job)
        this._profileNameInput = document.querySelector('#name-input')
        this._profileInfoInput = document.querySelector('#info-input')
    }
    getUserInfo() {
        this._user = {
            name: this._profileName.textContent,
            job: this._profileJob.textContent 
        }
        return this._user
    }
    setUserInfo() {
        this._profileName.textContent = this._profileNameInput.value
        this._profileJob.textContent = this._profileInfoInput.value
    }
}