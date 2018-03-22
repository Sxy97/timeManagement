var db = require("../util/db");
var writeJson = require("../util/writeJson")
var Md5 = require("../util/Md5");
var sd = require('silly-datetime');
exports.PeopleRegister = async function (req, res) {
    try {
        const query = req.body
        const phone = query.phone || ''
        const name = query.name || ''
        let onepassword = query.onepassword || ''
        let twopassword = query.twopassword || ''
        if (!phone || !onepassword || !twopassword || !name) {
            throw ("参数错误")
        } else {
            if (onepassword != twopassword) {
                throw ("两次密码输入不一样")
            } else {
                let regex = new RegExp(/^[1][0-9]{10}$/)
                if (!regex.test(phone)) {
                    throw ("手机号格式错误")
                } else {
                    await db.query('insert into people (phone,name,password,registrationtime) values (?,?,?,?)', [phone, name, Md5.md5Password(onepassword), new Date()])
                    writeJson(res, 0, '注册成功待审核')
                }
            }
        }
    } catch (err) {
        console.log(err)
        writeJson(res, 1, err)
    }
}
exports.PeopleCheck = async function (req, res) {
    try {
        const query = req.body
        const pid = query.pid || '' //人员id
        const state = query.state || '' //状态 1为通过，2为拒绝
        console.log(query)
        if (!pid || !["1", "2"].includes(state)) {
            throw ("参数错误")
        } else {
            await db.query('update people set state=? where id=?', [state, pid])
            writeJson(res, 0, '状态修改成功')
        }
    } catch (err) {
        console.log(err)
        writeJson(res, 1, err)
    }
}

exports.PeopleLogin = async function (req, res) {
    try {
        const query = req.body
        const phoneNumber = query.phoneNumber || ''
        const password = query.password || ''
        if (!phoneNumber || !password) {
            throw ("参数错误")
        } else {
            let regex = new RegExp(/^[1][0-9]{10}$/)
            if (!regex.test(phoneNumber)) {
                throw ("手机号格式错误")
            } else {
                const data = await db.query('select *  from people where phone=? and password=?', [phoneNumber, Md5.md5Password(password)])
                if (data.length > 0) {
                    if (data[0].state == 0) {
                        throw ("用户还没有被审核")
                    } else if (data[0].state == 2) {
                        throw ("管理员拒绝了你的审核")
                    } else if (data[0].state == 1) {
                        const token = Md5.md5Password(data[0].phone + new Date().getTime())
                        await db.query('update people set token=? where phone=?', [token, data[0].phone])
                        data[0].token = token
                        delete data[0].password
                        writeJson(res, 0, data[0])
                    } else {
                        throw ("账号状态异常")
                    }
                } else {
                    throw ("用户名或密码错误")
                }
            }
        }
    } catch (err) {
        console.log(err)
        writeJson(res, 1, err)
    }
}

exports.PeopleOutLogin = async function (req, res) {
    try {
        await db.query("update people set token=? where phone=?", ["", req.query.phone])
        writeJson(res, 0, '退出成功')
    } catch (err) {
        console.log(err)
        writeJson(res, 1, err)
    }
}

exports.addProjectContent = async function (req, res) {
    try {
        const query = req.body
        const content = query.content || ''
        const proid = query.proid || ''
        if (!content || !proid) {
            throw("参数错误")
        } else {
            //判断是否有权限
            const num = await db.query('select count(1) as num from peo_pro where proid=? and peoid=?', [proid, req.peoid])
            if (num[0].num <= 0) {
                throw('没有权限')
            } else {
                const date = new Date()
                const data = await db.query('insert into jobcontent (proid,content,addtime,peoid) values (?,?,?,?)', [proid, content, date, req.peoid])
                writeJson(res, 0, "提交成功")
            }

        }
    } catch (err) {
        console.log(err)
        writeJson(res, 1, err)
    }
}

exports.backPeopleOutLogin = async function (req, res) {
    req.session.destroy(function (err) {
        if (err) {
            console.log(err)
            writeJson(res, 1, err)
        } else {
            writeJson(res, 0, "退出成功")
        }
    })
}

exports.PeopleAllocation = async function (req, res) {
    try {
        // const query = {
        //     peoid: 6,
        //     comid: 6,
        //     pros: [[1,6],[2,6],[3,6]]
        // }
        const query = req.body
        const peoid = query.peoid || '' //人员id
        const comid = query.comid || ''//公司id
        const pros = (query.pros == undefined) ? [] : JSON.parse(query.pros) || [] //项目组 [[proid,cid]]
        // const pros = query.pros
        if (!peoid || !comid) {
            throw("参数错误")
        } else {
            if (pros.length > 0) {
                //分配公司和项目
                for (let i = 0; i < pros.length; i++) {
                    pros[i].push(peoid)
                }
                await db.query('insert into peo_pro (proid,comid,peoid) values ?', [pros])
                writeJson(res, 0, '分配成功')
            } else {
                //只分配公司
                await db.query('insert into peo_pro (peoid,comid) values (?,?)', [peoid, comid])
                writeJson(res, 0, '分配成功')
            }
        }
    } catch (err) {
        console.log(err)
        writeJson(res, 1, err)
    }
}

exports.PeopleList = async function (req, res) {
    try {
        let people = await db.query("select id,name from people where state=1", [])
        for (let i = 0; i < people.length; i++) {
            let result = await db.query('select c.id,c.name from company as c,(select comid from peo_pro where peoid=? group by comid) as a where a.comid =c.id', [people[i].id])
            if (result.length > 0) {
                for (let j = 0; j < result.length; j++) {
                    const data = await db.query('select p.id,p.name from project as p,(select proid from peo_pro where comid=? and peoid=?) as a where a.proid=p.id ', [result[j].id, [people[i].id]])
                    result[j].pros = data
                }
                people[i].coms = result
            } else {
                people[i].coms = []
            }
        }
        writeJson(res, 0, people)
    } catch (err) {
        console.log(err)
        writeJson(res, 1, err)
    }
}

exports.PeopleprojectDetails = async function (req, res) {
    try {
        const peoid = req.query.peoid
        if (!peoid) {
            throw("参数错误")
        } else {
            const result = await db.query('select comid from peo_pro where peoid=?', [peoid])
            if (result.length > 0) {
                //已分配公司,默认显示第一
                const coms = await db.query('select id,name from company', [])
                //将已选公司放到首位
                let c = coms[0]
                for (let i = 0; i < coms.length; i++) {
                    if (coms[i].id == result[0].comid) {
                        coms[0] = coms[i]
                        coms[i] = c
                    }
                }
                const pros = await db.query('select p.*,a.proid as state from project as p left join (select proid from peo_pro where comid=? and peoid=?) as a on a.proid=p.id where p.cid=?', [result[0].comid, peoid, result[0].comid])
                //如果state为null 或没传 state 就是没选
                writeJson(res, 0, {coms: coms, pros: pros})
            } else {
                //未分配公司，默认显示第一个公司和公司下的全部项目列表
                const coms = await db.query('select id,name from company')
                const pros = await db.query('select * from project where cid=?', [coms[0].id])
                writeJson(res, 0, {coms: coms, pros: pros})
            }
        }
    }
    catch (err) {
        console.log(err)
        writeJson(res, 1, err)
    }
}

exports.PeopleprojectDetailsBycid = async function (req, res) {
    try {
        const peoid = req.query.peoid || ''
        const cid = req.query.cid || ''
        if(!peoid || !cid){
            throw("参数错误")
        }else{
            const pros = await db.query('select p.*,a.proid as state from project as p left join (select proid from peo_pro where comid=? and peoid=?) as a on a.proid=p.id where p.cid=?', [cid, peoid, cid])
            writeJson(res, 0, pros)
        }
    } catch (err) {
        console.log(err)
        writeJson(res, 1, err)
    }
}

exports.updatePeopleAllocation = async function (req, res) {
    try {
        const query = req.body
        const peoid = query.peoid || '' //人员id
        const comid = query.comid || ''//公司id
        const pros = (query.pros == undefined) ? [] : JSON.parse(query.pros) || [] //项目组 [[proid,cid]]
        if (!peoid || !comid) {
            throw("参数错误")
        } else {
            const num = await db.query('select count(1) as num from peo_pro where comid=? and peoid=?', [comid, peoid])
            if (num[0].num > 0) {
                //更新
                await db.query('delete from peo_pro where comid=? and peoid=?', [comid, peoid])
                if (pros.length > 0) {
                    //插公司和项目
                    for (let i = 0; i < pros.length; i++) {
                        pros[i].push(peoid)
                    }
                    await db.query('insert into peo_pro (proid,comid,peoid) values ?', [pros])
                    writeJson(res, 0, '分配成功')
                } else {
                    //只插公司
                    await db.query('insert into peo_pro (peoid,comid) values (?,?)', [peoid, comid])
                    writeJson(res, 0, '分配成功')
                }
            } else {
                //新增
                if (pros.length > 0) {
                    //插公司和项目
                    for (let i = 0; i < pros.length; i++) {
                        pros[i].push(peoid)
                    }
                    await db.query('insert into peo_pro (proid,comid,peoid) values ?', [pros])
                    writeJson(res, 0, '分配成功')
                } else {
                    //只插公司
                    await db.query('insert into peo_pro (peoid,comid) values (?,?)', [peoid, comid])
                    writeJson(res, 0, '分配成功')
                }
            }
        }
    } catch (err) {
        console.log(err)
        writeJson(res, 1, err)
    }
}

exports.PeopleStateList = async function (req, res) {
    try {
        let data = await db.query('select id,name,phone,state,registrationtime from people Order By registrationtime desc', [])
        for (let i = 0; i < data.length; i++) {
            data[i].registrationtime = sd.format(new Date(data[i].registrationtime), 'YYYY-MM-DD HH:mm:ss')
        }
        writeJson(res, 0, data)
    } catch (err) {
        console.log(err)
        writeJson(res, 1, err)
    }
}

exports.backPeopleLogin = async function (req, res) {
    try {
        const query = req.body
        const loginnumber = query.loginnumber || ''
        const password = query.password || ''
        if (!loginnumber || !password) {
            throw("参数错误")
        } else {
            const result = await db.query('select id,name,number from admin where number =? and password =?', [loginnumber, Md5.md5Password(password)])
            if (result.length > 0) {
                req.session.user = result[0];
                writeJson(res, 0, "登录成功")
            } else {
                throw ('账号或密码不正确')
            }
        }
    } catch (err) {
        console.log(err)
        writeJson(res, 1, err)
    }
}