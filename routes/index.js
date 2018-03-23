var express = require('express');
var router = express.Router();
var Company = require('../controller/CompanyController')
var Project = require('../controller/ProjectController')
var People = require('../controller/PeopleController')
var Schedule = require('../controller/ScheduleController')
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});


/******* 公司模块 *******/
router.post("/back/addCompany", Company.addCompany)  //新建公司
// router.post("/delCompany", Company.delCompany)  //删除公司 TODO（删除公司下的所有项目及人员及内容）
router.post("/back/updateCompany", Company.updateCompany)  //更新公司名称
router.get("/back/CompanyList", Company.CompanyList)  //公司列表


/******* 项目模块 *******/
router.post("/back/addProject", Project.addProject)  //新建项目
//router.post("/delProject", Project.delProject)  //删除项目 TODO （删除项目下的人员及信息）
router.post("/back/updateProject", Project.updateProject)  //更新项目
router.get("/back/ProjectList", Project.ProjectList)  //总项目列表
router.get("/back/ProjectListByCid", Project.ProjectListByCid)  //根据公司id查询项目列表
router.get('/projectContentByDay',Project.projectContentByDay)//查询某天项目的内容提交
router.get('/projectContentDayList',Project.projectContentDayList)//查看项目页下的近七天


router.get("/ProjectHome", Project.ProjectHome)  //app项目首页
router.get('/privateProjectList',Project.privateProjectList) //个人所属公司列表
router.get("/privateProjectListByCid", Project.privateProjectListByCid)  //根据所属公司id查询个人项目列表




/******* 人员模块 *******/
router.post("/PeopleLogin",People.PeopleLogin) //app登录 TODO clientid
router.post("/PeopleRegister", People.PeopleRegister)  //人员注册 TODO clientid
router.get("/PeopleOutLogin",People.PeopleOutLogin) //app登出
router.post("/addProjectcontent",People.addProjectContent) //添加工作内容

router.post("/back/PeopleCheck", People.PeopleCheck)  //管理员审核注册人员
router.get("/back/PeopleOutLogin",People.backPeopleOutLogin) //后台管理员登出
router.post("/back/PeopleLogin",People.backPeopleLogin) //后台管理员登录
//router.post("/back/PeopleAllocation", People.PeopleAllocation)  //为人员分配公司及项目
router.post("/back/updatePeopleAllocation", People.updatePeopleAllocation)  //新增或更新人员分配公司及项目
router.get("/back/PeopleList", People.PeopleList)  //后台人员列表
router.get("/back/PeopleprojectDetails",People.PeopleprojectDetails)//为人员分配公司及项目的显示页
router.get('/back/PeopleprojectDetailsBycid',People.PeopleprojectDetailsBycid)//分配时根据公司id查询项目
router.get("/back/PeopleStateList", People.PeopleStateList)  //后台人员状态列表

/******* 日程模块 *******/
router.post("/addSchedule",Schedule.addSchedule)//添加日程 TODO(设置定时器)
router.post("/updateSchedule",Schedule.updateSchedule)//修改自己的日程 TODO(删除旧定时器设置新定时器)
router.post("/delSchedule",Schedule.delSchedule)//删除自己的日程
router.get('/ScheduleListByDay',Schedule.ScheduleListByDay)//查看某天自己的日程列表
router.get('/ScheduleById',Schedule.ScheduleById)//根据日程id 查看日程内容
router.get('/ProjectPeopleList',Schedule.ProjectPeopleList)//查看同项目下的人员列表
router.post('/ScheduleShare',Schedule.ScheduleShare)//共享或修改日程给谁
router.get('/ScheduleShareListByDay',Schedule.ScheduleShareListByDay)//查询某一天的共享日程
router.post('/UpdateScheduleShare',Schedule.UpdateScheduleShare)//修改别人的日程
router.get('/ScheduleRedDot',Schedule.ScheduleRedDot)//日程小红点
router.get('/ScheduleHome',Schedule.ScheduleHome)//我的日程首页 共享日程小红点(显示当月)
router.get('/ScheduleShareHome',Schedule.ScheduleShareHome)//共享日程首页（显示当月）


module.exports = router;


