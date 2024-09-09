const dayjs = require('dayjs');
function issue(content) {
    this.content = content;
    this.order_date = dayjs().format('YYYY-MM-DD HH:mm:ss');
    this.state = 0;
}
function users(username, password) {
    this.username = username;
    this.password = password;
}
// 默认 code=0
// function result(code = 0, data = {}, msg = '') {
//     this.code = code;
//     this.data = data;
//     this.msg = msg;
// }
module.exports = {
    issue,
    users,
    // result,

}