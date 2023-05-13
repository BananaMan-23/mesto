export default class UserInfo {
    constructor(userInfo) {
        this._profileName = document.querySelector(userInfo.name)
        this._profileInfo = document.querySelector(userInfo.info)
        this._profileInfoInput = document.querySelector('#name-input')
        this._profileInfoInput = document.querySelector('#info-input')
    }
    getUserInfo() {
        this._user = {
            name: this._profileName.textContent,
            info: this._profileInfo.textContent 
        }
        return this._user
    }
    setUserInfo() {
        this._profileName.textContent = this._profileNameInput.name
        this._profileInfo.textContent = this._profileInfoInput.info
      }
}