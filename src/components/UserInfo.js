export default class UserInfo {
    constructor({ userName, userJob, userAvatar }) {
        this._userName = userName;
        this._userJob = userJob;
        this._avatar = userAvatar;
    }

    getUserInfo() {
        this.userInfo = {};
        this.userInfo.name = this._userName.textContent;
        this.userInfo.job = this._userJob.textContent;

        return this.userInfo;
    }

    setUserInfo(name, job, avatar) {
        if(name) {
            this._userName.textContent = name;
        } else {
            console.log('Что-то пошло не так');
        };
        if(job) {
            this._userJob.textContent = job;
        } else {
            console.log('Что-то пошло не так');
        };
        if(avatar) {
            this._avatar.src = avatar;
        } else {
            console.log('Что-то пошло не так');
        };
    }

    setUserAvatar(avatar) {
        if(avatar) {
            this._avatar.src = avatar;
        } else {
            console.log('Что-то пошло не так');
        }
    }
}