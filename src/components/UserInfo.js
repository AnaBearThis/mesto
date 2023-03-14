export default class UserInfo {
    constructor({ userNameSelector, userJobSelector }) {
        this._userName = userNameSelector;
        this._userJob = userJobSelector;
    }

    getUserInfo() {
        this.userInfo = {};
        this.userInfo.name = this._userName.textContent;
        this.userInfo.job = this._userJob.textContent;

        return this._userInfo;
    }

    setUserInfo(name, job) {
        this._userName.textContent = name;
        this._userJob.textContent = job;
    }
}