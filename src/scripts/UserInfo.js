export default class UserInfo {
    constructor(infoSelector) {
        this._profileName = document.querySelector(infoSelector.inputNameSelector)
        this._profileJob = document.querySelector(infoSelector.inputJobSelector)
        this._profileAvatar = document.querySelector(infoSelector.avatarSelector)
    }
    getUserInfo() {
        this._user = {
            inputName: this._profileName.textContent,
            inputJob: this._profileJob.textContent 
        }
        return this._user

    }
    setUserInfo({name, job, avatar}) {
        this._profileAvatar.src = avatar
        this._profileName.textContent = name;
        this._profileJob.textContent = job;
    }
}
