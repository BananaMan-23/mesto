export default class UserInfo {
    constructor({inputName, inputJob}) {
        this._profileName = document.querySelector(inputName)
        this._profileJob = document.querySelector(inputJob)
        // this._profileNameInput = document.querySelector('#name-input')
        // this._profileInfoInput = document.querySelector('#info-input')
    }
    getUserInfo() {
        this._user = {
            inputName: this._profileName.textContent,
            inputJob: this._profileJob.textContent 
        }
        return this._user
    }
    setUserInfo(profileNameInput, profileInfoInput) {
        // this._profileNameInput = document.querySelector('#name-input')
        // this._profileInfoInput = document.querySelector('#info-input')
        this._profileName.textContent = profileNameInput.value
        this._profileJob.textContent = profileInfoInput.value
    }
}