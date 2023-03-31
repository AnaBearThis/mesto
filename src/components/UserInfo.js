export default class UserInfo {
    constructor({ userName, userJob, userAvatar, handleAvClick }) {
        this._userName = userName;
        this._userJob = userJob;
        this._avatar = userAvatar;
        this._handleAvClick = handleAvClick;
    }

    getUserInfo() {
        this.userInfo = {};
        this.userInfo.name = this._userName.textContent;
        this.userInfo.job = this._userJob.textContent;

        return this.userInfo;
    }

    setUserInfo(name, job, avatar) {
        this._userName.textContent = name;
        this._userJob.textContent = job;
        this._avatar.src = avatar;
    }

    setUserAvatar(avatar) {
        this._avatar.src = avatar;
    }

    setEventListeners() {
        this._avatar.addEventListener('click', this._handleAvClick)
    }
}