var db = require("./db");
var writeJson = require("./writeJson")

//登录拦截器
exports.interceptor = async function (req, res, next) {
    const path = req.originalUrl;
    let regex = new RegExp(/^\/back\/.*/)
    if (regex.test(path) || path=='/') {
        //进后台判断session
        if (backAdmin(path)) {
            let login = req.session.user;
            if (!login) {
                writeJson(res, 1, "未登录")
                return
            } else {
                next()
            }
        }else{
            next()
        }
    } else {
        //进前台判断token
        if (frontApp(path)) {
            if (req.method == 'GET') {
                var phone = req.query.phone || ''
                var token = req.query.token || ''
                // console.log(JSON.stringify(req.query))
                if (!phone || !token) {
                    writeJson(res, 1, "手机号或token异常")
                    return
                }
            }
            if (req.method == 'POST') {
                var phone = req.body.phone || ''
                var token = req.body.token || ''
                // console.log(JSON.stringify(req.body))
                if (!phone || !token) {
                    writeJson(res, 1, "手机号或token异常")
                    return
                }
            }
            const num =await db.query('select id,name from people where phone =? and token =?',[phone,token])
            if(num.length>0){
                req.peoid=num[0].id
                req.peopleName=num[0].name
                next()
            }else{
                writeJson(res, 1, "token错误")
                return
            }
        } else {
            next()
        }
    }
}

//拦截后台路由
function backAdmin(path) {
    let noLoginPath = ['/', '/back/PeopleLogin']; //不需要验证的地址
    if (noLoginPath.includes(path) || noLoginPath.includes(path + '/')) {
        return false //不需要
    } else {
        return true //需要
    }
}

//拦截前台路由
function frontApp(path) {
    let noLoginPath = ['/PeopleRegister', '/PeopleLogin']; //不需要验证的地址
    if (noLoginPath.includes(path) || noLoginPath.includes(path + '/')) {
        return false //不需要
    } else {
        return true //需要
    }
}

