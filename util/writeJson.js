//返回json信息
function writeJson(res, code, data) {
    if (code == 0) {
        res.json({code: code, data: data})
    } else {
        res.json({code: code, msg: data})
    }
}
module.exports = writeJson