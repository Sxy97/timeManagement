var db = require("../util/db");
var writeJson = require("../util/writeJson")
var sd = require('silly-datetime');
var dat = require("date-and-time")

exports.addProject = async function (req, res) {
    try {
        const query = req.body
        const cid = query.cid || '' //公司id
        const name = query.name || ''//项目名称
        if (!cid || !name) {
            throw("参数错误")
        } else {
            await db.query('insert into project (name,cid) values(?,?)', [name, cid])
            writeJson(res, 0, "添加成功")
        }
    } catch (err) {
        console.log(err)
        writeJson(res, 1, err)
    }
}

exports.delProject = async function (req, res) {
    try {
        const query = req.body
        const pids = query.pids || []
        if (pids.length <= 0) {
            throw("不能为空")
        } else {
            await db.query("delete from project where id in (?)", [pids])
            writeJson(res, 0, "删除成功")
        }
    } catch (err) {
        console.log(err)
        writeJson(res, 1, err)
    }
}

exports.updateProject = async function (req, res) {
    try {
        const query = req.body
        const id = query.id || '' //项目id
        const cid=query.cid || '' //公司id
        const name = query.name || ''//项目名称
        if (!id || !name) {
            throw ("参数错误")
        } else {
            db.query("update project set name =?,cid=? where id=?", [name,cid,id])
            writeJson(res, 0, "更新成功")
        }
    } catch (err) {
        console.log(err)
        writeJson(res, 1, err)
    }
}

exports.ProjectList = async function (req, res) {
    try {
        const data = await db.query('select p.*,c.name as cname from project as p,company as c where c.id=p.cid', [])
        writeJson(res, 0, data)
    } catch (err) {
        console.log(err)
        writeJson(res, 1, err)
    }
}

exports.ProjectListByCid = async function (req, res) {
    try {
        const cid = req.query.cid || '' //公司id
        if (!cid) {
            throw ("参数错误")
        } else {
            const data = await db.query('select * from project where cid = ?', [cid])
            writeJson(res, 0, data)
        }
    } catch (err) {
        console.log(err)
        writeJson(res, 1, err)
    }
}
exports.projectContentByDay = async function (req, res) {
    try {
        const query = req.query
        const day = query.day || '' //时间
        const proid = query.proid || '' //项目id
        if (!day || !proid) {
            throw("参数错误")
        } else {
            //判断是否有权限
            const num = await db.query('select count(1) as num from peo_pro where proid=? and peoid=?', [proid, req.peoid])
            if (num[0].num <= 0) {
                throw('没有权限')
            } else {
                const data = await db.query('select j.id,j.content,j.addtime,p.name from jobcontent as j,(select * from people) as p where p.id=j.peoid and proid=? and to_days(addtime) = to_days(?) Order By addtime desc', [proid, new Date(day)])
                for (let i = 0; i < data.length; i++) {
                    data[i].addtime = sd.format(new Date(data[i].addtime), 'YYYY-MM-DD HH:mm:ss')
                }
                writeJson(res, 0, data)
            }
        }
    } catch (err) {
        console.log(err)
        writeJson(res, 1, err)
    }
}
exports.ProjectHome = async function (req, res) {
    try {
        const phone = req.query.phone
        const pids = await db.query('select id from people where phone =?', [phone])
        const result = await db.query('select c.id,c.name from company as c,(select comid from peo_pro where peoid=? group by comid) as a where a.comid =c.id', [pids[0].id])
        if (result.length > 0) {
            const data = await db.query('select p.id,p.name from project as p,(select proid from peo_pro where comid=? and peoid=?) as a where a.proid=p.id ', [result[0].id, [pids[0].id]])
            writeJson(res, 0, {cname: result[0].name, projects: data})
        } else {
            writeJson(res, 0, {cname: "", projects: []})
        }
    } catch (err) {
        console.log(err)
        writeJson(res, 1, err)
    }
}

exports.privateProjectList = async function (req, res) {
    try {
        const phone = req.query.phone
        const pids = await db.query('select id from people where phone =?', [phone])
        const result = await db.query('select c.id,c.name from company as c,(select comid from peo_pro where peoid=? group by comid) as a where a.comid =c.id', [pids[0].id])
        writeJson(res, 0, result)
    } catch (err) {
        console.log(err)
        writeJson(res, 1, err)
    }
}
exports.privateProjectListByCid = async function (req, res) {
    try {
        const phone = req.query.phone
        const cid = req.query.cid || ''
        if (!cid) {
            throw ("参数错误")
        } else {
            const pids = await db.query('select id from people where phone =?', [phone])
            const num = await db.query('select count(1) as num from peo_pro where peoid=? and comid=?', [pids[0].id, cid])
            if (num[0].num > 0) {
                const data = await db.query('select p.id,p.name from project as p,(select proid from peo_pro where comid=? and peoid=?) as a where a.proid=p.id ', [cid, [pids[0].id]])
                const cname = await db.query('select name from company where id= ?', [cid])
                writeJson(res, 0, {cname: cname[0].name, projects: data})
            } else {
                throw('没有权限')
            }
        }
    } catch (err) {
        console.log(err)
        writeJson(res, 1, err)
    }
}

exports.projectContentDayList = async function (req, res) {
    try {
        const proid = req.query.proid || ''
        const datetime = req.query.day || ''
        if (!proid) {
            throw("参数错误")
        } else {
            //判断是否有权限
            const num = await db.query('select count(1) as num from peo_pro where proid=? and peoid=?', [proid, req.peoid])
            if (num[0].num <= 0) {
                throw('没有权限')
            } else {
                if (!datetime) {
                    var endtime = new Date()
                    var starttime = dat.addDays(endtime, -7)
                } else {
                    var endtime = new Date(datetime)
                    var starttime = dat.addDays(endtime, -7)
                }
                const data = await db.query('select addtime from jobcontent where proid=? and to_days(addtime) between to_days(?) and to_days(?) group by to_days(addtime)', [proid, starttime, endtime])
                if (data.length > 0) {
                    for (let i = 0; i < data.length; i++) {
                        const result = await db.query('select a.name from people as a,(select peoid,addtime from jobcontent where proid=? and to_days(addtime)=to_days(?) group by peoid) as b where a.id=b.peoid', [proid, data[i].addtime])
                        data[i].names=[]
                        for (let j = 0; j < result.length; j++) {
                            data[i].names.push(result[j].name)
                        }
                        data[i].addtime =sd.format(new Date(data[i].addtime), 'YYYY-MM-DD')
                    }
                    writeJson(res, 0, data)
                } else {
                    writeJson(res, 0, data)
                }
            }
        }
    } catch (err) {
        console.log(err)
        writeJson(res, 1, err)
    }
}