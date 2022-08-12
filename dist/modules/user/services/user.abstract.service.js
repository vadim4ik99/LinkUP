"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAbstract = void 0;
class UserAbstract {
    first_name;
    last_name;
    verify;
    email;
    avatar;
    password;
    constructor(first_name, last_name, verify, email, avatar, password) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.verify = verify;
        this.email = email;
        this.avatar = avatar;
        this.password = password;
    }
}
exports.UserAbstract = UserAbstract;
//# sourceMappingURL=user.abstract.service.js.map