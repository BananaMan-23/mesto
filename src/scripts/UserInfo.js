export default class UserInfo {
    constructor({inputNameSelector, inputJobSelector}) {
        this._profileName = document.querySelector(inputNameSelector)
        this._profileJob = document.querySelector(inputJobSelector)
    }
    getUserInfo() {
        this._user = {
            inputName: this._profileName.textContent,
            inputJob: this._profileJob.textContent 
        }
        return this._user

    }
    setUserInfo(name, job) {
        this._profileName.textContent = name.value
        this._profileJob.textContent = job.value
    }
}
