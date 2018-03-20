var db = require("../util/db");
var writeJson = require("../util/writeJson")

exports.addCompany = async function (req, res) {
    try {
        const query = req.body
        const name = query.name || ''
        if (!name) {
            throw("参数错误")
        } else {
            await db.query("insert into company (name) values (?)", [name])
            writeJson(res, 0, "添加成功")
        }
    } catch (err) {
        console.log(err)
        writeJson(res, 1, err)
    }
}

exports.delCompany = async function (req, res) {
    try {
        const query = req.body
        const cids = query.cids || []
        if (cids.length <= 0) {
            throw("不能为空")
        } else {
            await db.query("delete from company where id in (?)", [cids])
            writeJson(res, 0, "删除成功")
        }
    } catch (err) {
        console.log(err)
        writeJson(res, 1, err)
    }
}

exports.updateCompany = async function (req, res) {
    try {
        const query = req.body
        const id = query.id || ''
        const name = query.name || ''
        if (!id || !name) {
            throw ("参数错误")
        } else {
            db.query("update company set name =? where id=?", [name, id])
            writeJson(res, 0, "更新成功")
        }
    } catch (err) {
        console.log(err)
        writeJson(res, 1, err)
    }
}

exports.CompanyList = async function (req, res) {
    try {
        const data = await db.query('select * from company')
        writeJson(res, 0, data)
    } catch (err) {
        console.log(err)
        writeJson(res, 1, err)
    }
}

exports.Company_projectList = async function (req, res) {
    try {

    } catch (err) {
        console.log(err)
        writeJson(res, 1, err)
    }
}