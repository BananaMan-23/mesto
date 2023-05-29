export default class UserInfo {
    constructor(configSelector) {
        this._profileName = document.querySelector(configSelector.inputNameSelector)
        this._profileJob = document.querySelector(configSelector.inputJobSelector)
        this._profileAvatar = document.querySelector(configSelector.avatarSelector)
    }
    getUserInfo() {
        this._user = {
            inputName: this._profileName.textContent,
            inputJob: this._profileJob.textContent 
        }
        return this._user

    }
    setUserInfo({name, info, avatar}) {
        this._profileAvatar.src = avatar
        this._profileName.textContent = name;
        this._profileJob.textContent = info;
    }
}
