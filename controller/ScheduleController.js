var db = require("../util/db");
var writeJson = require("../util/writeJson")
var dat = require("date-and-time")
var TIME = require("../util/config");
var sd = require('silly-datetime');
exports.addSchedule = async function (req, res) {
    try {
        const query = req.body
        console.log(query)
        const content = query.content || ''
        const startime = query.startime || ''
        const closetime = query.closetime || ''
        if (!content || !startime || !closetime) {
            throw("参数错误")
        } else {
            const date = new Date()
            if (date.getTime() > new Date(startime).getTime() || new Date(startime).getTime() > new Date(closetime).getTime() || date.getDate() > new Date(startime).getDate()) {
                throw("时间参数错误")
            } else {
                const remindtime = dat.addMinutes(new Date(startime), -TIME.remindtime)
                const repetitiontime = TIME.repetitiontime
                const data = await db.query('insert into schedule (peoid,content,addtime,remindtime,repetitiontime,startime,closetime) values (?,?,?,?,?,?,?)', [req.peoid, content, date, remindtime, repetitiontime, new Date(startime), new Date(closetime)])
                const schid = data.insertId
                const result = await db.query('select forid from relation where whoid=?', [req.peoid])
                if (result.length > 0) {
                    //插入消息表
                    const a = []
                    for (let i = 0; i < result.length; i++) {
                        const b = []
                        b.push(schid)
                        b.push(result[i].forid)
                        b.push(req.peoid)
                        b.push(1)
                        a.push(b)
                    }
                    await db.query('insert into news (schid,forid,whoid,type) values ?', [a])
                    //TODO 推送
                    writeJson(res, 0, '添加成功')
                } else {
                    writeJson(res, 0, '添加成功')
                }

            }
        }
    } catch (err) {
        console.log(err)
        writeJson(res, 1, err)
    }
}

exports.updateSchedule = async function (req, res) {
    try {
        const query = req.body
        const schid = query.schid || ''
        const content = query.content || ''
        const addtime = query.addtime || '' // 添加时间
        const startime = query.startime || ''
        const closetime = query.closetime || ''
        if (!schid || !content || !startime || !closetime || !addtime) {
            throw("参数错误")
        } else {
            if (new Date(addtime).getTime() > new Date(startime).getTime() || new Date(startime).getTime() > new Date(closetime).getTime() || new Date(addtime).getDate() > new Date(startime).getDate()) {
                throw("时间参数错误")
            } else {
                const num = await db.query('select count(1) as num from schedule where id=? and peoid=?', [schid, req.peoid])
                if (num[0].num > 0) {
                    const remindtime = dat.addMinutes(new Date(startime), -TIME.remindtime)
                    const repetitiontime = TIME.repetitiontime
                    await db.query('update schedule set content=?,remindtime=?,repetitiontime=?,startime=?,closetime =? where id= ?', [content, remindtime, repetitiontime, new Date(startime), new Date(closetime), schid])
                    writeJson(res, 0, '修改成功')
                } else {
                    throw('没有权限')
                }
            }
        }
    } catch (err) {
        console.log(err)
        writeJson(res, 1, err)
    }
}
exports.delSchedule = async function (req, res) {
    try {
        const query = req.body
        const schid = query.schid || ''
        if (!schid) {
            throw('参数错误')
        } else {
            const num = await db.query('select count(1) as num from schedule where id=? and peoid=?', [schid, req.peoid])
            if (num[0].num > 0) {
                await db.query('delete from schedule where id=?', [schid])
                await db.query('delete from news where schid=? and whoid=?', [schid, req.peoid])
                writeJson(res, 0, '删除成功')
            } else {
                throw('没有权限')
            }
        }
    } catch (err) {
        console.log(err)
        writeJson(res, 1, err)
    }
}

exports.ScheduleListByDay = async function (req, res) {
    try {
        const daytime = req.query.daytime || ''
        if (!daytime) {
            throw('参数错误')
        } else {
            const data = await db.query("select a.state,b.* from news as a right join (select * from schedule where peoid=? and to_days(addtime)=to_days(?)) as b on a.schid=b.id where  a.forid=? and a.type='0' or a.type is null", [req.peoid, new Date(daytime), req.peoid])
            for(let i=0;i<data.length;i++){
                data[i].startime=sd.format(new Date(data[i].startime), 'YYYY-MM-DD HH:mm:ss')
                data[i].closetime=sd.format(new Date(data[i].closetime), 'YYYY-MM-DD HH:mm:ss')
            }
            //如果state=0 是未读被人修改
            //将修改未读全部设置为已读
            await db.query('update news as a,(select id from schedule where peoid=? and to_days(addtime)=to_days(?)) as b set a.state=1 where a.schid=b.id and a.state=0 and a.type=0 and a.forid=?', [req.peoid, new Date(daytime), req.peoid])
            writeJson(res, 0, data)
        }
    } catch (err) {
        console.log(err)
        writeJson(res, 1, err)
    }
}

exports.ScheduleById = async function (req, res) {
    try {
        const schid = req.query.schid || ''
        if (!schid) {
            throw('参数错误')
        } else {
            const data = await db.query('select * from schedule where id=? and peoid=?', [schid, req.peoid])
            writeJson(res, 0, data)
        }
    } catch (err) {
        console.log(err)
        writeJson(res, 1, err)
    }
}

exports.ProjectPeopleList = async function (req, res) {
    try {
        const result = await db.query('select proid from peo_pro where peoid=?', [req.peoid])
        if (result.length > 0) {
            const proids = []
            for (let i = 0; i < result.length; i++) {
                proids.push(result[i].proid)
            }
            const data = await db.query('select c.id as state,d.peoid,d.name from relation as c right join (select a.id as peoid,a.name from people as a,(select peoid from peo_pro where peoid !=? and proid in (?) group by peoid) as b  where a.id=b.peoid) as d on c.forid=d.peoid  where c.whoid=? or c.whoid is null', [req.peoid,proids,req.peoid])

            writeJson(res, 0, data)
        } else {
            writeJson(res, 0, [])
        }
    } catch (err) {
        console.log(err)
        writeJson(res, 1, err)
    }
}

exports.ScheduleShare = async function (req, res) {
    try {
        const query = req.body
        const peoids = (query.peoids == undefined) ? [] : JSON.parse(query.peoids) //人员数组
        const num = await db.query('select count(1) as num from relation where whoid=?', req.peoid)
        if (num[0].num > 0) {
            //更新
            await db.query('delete from relation where whoid=?', [req.peoid])
            if (peoids.length > 0) {
                const data = []
                for (let i = 0; i < peoids.length; i++) {
                    const result = []
                    result.push(peoids[i])
                    result.push(req.peoid)
                    data.push(result)
                }
                await db.query('insert into relation (forid,whoid) values ?', [data])
                writeJson(res, 0, '共享成功')
            } else {
                writeJson(res, 0, '修改成功')
            }
        } else {
            //添加
            if (peoids.length > 0) {
                //添加
                const data = []
                for (let i = 0; i < peoids.length; i++) {
                    const result = []
                    result.push(peoids[i])
                    result.push(req.peoid)
                    data.push(result)
                }
                await db.query('insert into relation (forid,whoid) values ?', [data])
                writeJson(res, 0, '共享成功')
            } else {
                throw('参数错误')
            }
        }
    } catch (err) {
        console.log(err)
        writeJson(res, 1, err)
    }
}

exports.ScheduleShareListByDay = async function (req, res) {
    try {
        const day = req.query.day || ''
        if (!day) {
            throw("参数错误")
        } else {
            const data = await db.query('select whoid from relation where forid=? group by whoid', [req.peoid])
            if (data.length > 0) {
                const whoids = []
                for (let i = 0; i < data.length; i++) {
                    whoids.push(data[i].whoid)
                }
                const result = await db.query('select a.name,b.* from people as a,(select * from schedule where  peoid in (?) and to_days(addtime)=to_days(?)) as b where a.id=b.peoid order by b.addtime desc', [whoids, new Date(day)])
                for(let i=0;i<result.length;i++){
                    result[i].startime=sd.format(new Date(result[i].startime), 'YYYY-MM-DD HH:mm:ss')
                    result[i].closetime=sd.format(new Date(result[i].closetime), 'YYYY-MM-DD HH:mm:ss')
                }
                //将共享未读全部设置为已读
                await db.query('update news as a left join (select * from schedule where peoid in(?) and to_days(addtime)=to_days(?)) as b on a.schid=b.id set state =1 where  a.forid=? and a.state=0 and a.type=1', [whoids, new Date(day), req.peoid])
                writeJson(res, 0, result)
            } else {
                writeJson(res, 0, [])
            }
        }
    } catch (err) {
        console.log(err)
        writeJson(res, 1, err)
    }
}

exports.UpdateScheduleShare = async function (req, res) {
    try {
        const query = req.body
        const schid = query.schid || ''
        const content = query.content || ''
        const peoid = query.peoid || '' //人员id
        const addtime = query.addtime || '' // 添加时间
        const startime = query.startime || ''
        const closetime = query.closetime || ''
        if (!schid || !content || !startime || !closetime || !peoid) {
            throw("参数错误")
        } else {
            if (new Date(addtime).getTime() > new Date(startime).getTime() || new Date(startime).getTime() > new Date(closetime).getTime() || new Date(addtime).getDate() > new Date(startime).getDate()) {
                throw("时间参数错误")
            } else {
                const nums = await db.query('select count(1) as num from relation where whoid=? and forid=?', [peoid, req.peoid])
                if (nums[0].num > 0) {
                    const remindtime = dat.addMinutes(new Date(startime), -TIME.remindtime)
                    const repetitiontime = TIME.repetitiontime
                    const data = await db.query('update schedule set content=?,remindtime=?,repetitiontime=?,startime=?,closetime =? where id= ? and peoid=?', [content, remindtime, repetitiontime, new Date(startime), new Date(closetime), schid, peoid])
                    if (data.affectedRows > 0) {
                        //插入到消息列表
                        await db.query('insert into news (schid,whoid,forid,type) values (?,?,?,?)', [schid, req.peoid, peoid, 0])
                        writeJson(res, 0, '修改成功')
                    } else {
                        throw("消息id和人员不匹配")
                    }
                } else {
                    throw("没有权限")
                }
            }
        }
    } catch (err) {
        console.log(err)
        writeJson(res, 1, err)
    }
}
exports.ScheduleRedDot = async function (req, res) {
    try {
        const nums = await db.query('select count(1) as num from news where forid =? and state =0', [req.peoid])
        if (nums[0].num > 0) {
            writeJson(res, 0, true)
        } else {
            writeJson(res, 0, false)
        }
    } catch (err) {
        console.log(err)
        writeJson(res, 1, err)
    }
}
exports.ScheduleHome = async function (req, res) {
    try {
        let datetime =req.query.datetime || ''
        if(!datetime){
            datetime=new Date(`${new Date().getFullYear()}-${new Date().getMonth()+1}`)
        }else{
            datetime=new Date(datetime)
        }
        const startTime = new Date(`${new Date(datetime).getFullYear()}-${new Date(datetime).getMonth()+1}`)
        const endTime = dat.addMonths(datetime, +1)
        const data = await db.query('select addtime, sum(closetime-startime) as TimeX  from schedule where peoid = ? and to_days(addtime) between to_days(?) and to_days(?)  group by to_days(addtime)', [req.peoid, startTime, endTime])
        //根据时间查小红点
        for (let i = 0; i < data.length; i++) {
            const nums = await db.query('select a.state from news as a inner join (select * from schedule where peoid=? and to_days(addtime)=to_days(?)) as b on a.schid=b.id where  a.forid=? and a.state=0 and a.type=0', [req.peoid, data[i].addtime, req.peoid])
            if (nums.length > 0) {
                //有未读消息
                data[i].state = true
            } else {
                //没有未读消息
                data[i].state = false
            }
            if (data[i].TimeX <= 2 * 60 * 60) {
                data[i].TimeX = 1
            } else if (data[i].TimeX <= 4 * 60 * 60) {
                data[i].TimeX = 2
            } else {
                data[i].TimeX = 3
            }
            data[i].addtime =sd.format(new Date(data[i].addtime), 'YYYY-MM-DD')
        }
        //查共享小红点
        const nums = await db.query('select count(1) as num from news where forid=? and state=0 and type=1', [req.peoid])
        if (nums[0].num > 0) {
            writeJson(res, 0, {result: data, ScheduleShareRedDot: true})
        } else {
            writeJson(res, 0, {result: data, ScheduleShareRedDot: false})
        }
    } catch (err) {
        console.log(err)
        writeJson(res, 1, err)
    }
}


exports.ScheduleShareHome = async function (req, res) {
    try {
        let datetime =req.query.datetime || ''
        if(!datetime){
            datetime=new Date(`${new Date().getFullYear()}-${new Date().getMonth()+1}`)
        }else{
            datetime=new Date(datetime)
        }
        const startTime = datetime
        const endTime = dat.addMonths(datetime, +1)
        const data=await db.query('select whoid from relation where forid=?',[req.peoid])
        if(data.length>0){
            const whoids=[]
            for(let i=0;i<data.length;i++){
                whoids.push(data[i].whoid)
            }
           const result=await db.query('select b.addtime from news as a inner join (select id,addtime from schedule where  peoid in (?) and to_days(addtime) between to_days(?) and to_days(?)) as b on a.schid=b.id where a.state=0 and a.type=1 and a.forid=? group by to_days(b.addtime)',[whoids,startTime,endTime,req.peoid])
            for(let i=0;i<result.length;i++){
                result[i].addtime=sd.format(new Date(result[i].addtime), 'YYYY-MM-DD')
            }
            writeJson(res, 0, result)
        }else{
            throw ('还木有银跟你共享，快去结伴吧')
        }
    } catch (err) {
        console.log(err)
        writeJson(res, 1, err)
    }
}


