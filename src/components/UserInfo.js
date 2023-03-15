export default class UserInfo {
    constructor({ userName, userJob }) {
        this._userName = userName;
        this._userJob = userJob;
    }

    getUserInfo() {
        this.userInfo = {};
        this.userInfo.name = this._userName.textContent;
        this.userInfo.job = this._userJob.textContent;

        return this.userInfo;
    }

    setUserInfo(name, job) {
        this._userName.textContent = name;
        this._userJob.textContent = job;
    }
}