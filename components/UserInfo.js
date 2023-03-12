class UserInfo {
    constructor({userNameSelector, userJobSelector}) {
        this._userName = document.querySelector(userNameSelector);
        this._userJob = document.querySelector(userJobSelector);
    }

    getUserInfo() {
        this._userInfo = {};
        this._userInfo.name = this._userName.textContent;
        this._userInfo.job = this._userJob.textContent;

        return this._userInfo;
    }

    setUserInfo(name, job) {
        this._userName.textContent = name;
        this._userJob.textContent = job;
    }
}