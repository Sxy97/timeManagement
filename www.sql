-- --------------------------------------------------------
-- 主机:                           60.205.212.103
-- 服务器版本:                        5.5.37-log - MySQL Community Server (GPL)
-- 服务器操作系统:                      linux2.6
-- HeidiSQL 版本:                  9.5.0.5196
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- 导出 time_management 的数据库结构
CREATE DATABASE IF NOT EXISTS `time_management` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `time_management`;

-- 导出  表 time_management.admin 结构
CREATE TABLE IF NOT EXISTS `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(50) CHARACTER SET utf8mb4 NOT NULL COMMENT '姓名',
  `number` char(50) CHARACTER SET utf8mb4 NOT NULL COMMENT '账号',
  `password` varchar(50) CHARACTER SET utf8mb4 NOT NULL COMMENT '密码',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='后台管理员用户';

-- 正在导出表  time_management.admin 的数据：~1 rows (大约)
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` (`id`, `name`, `number`, `password`) VALUES
	(1, 'admin', 'admin', 'c4096e4bbc70fdaac457d9ee9cc93e98');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;

-- 导出  表 time_management.company 结构
CREATE TABLE IF NOT EXISTS `company` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(50) CHARACTER SET utf8mb4 NOT NULL COMMENT '公司名',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COMMENT='公司表';

-- 正在导出表  time_management.company 的数据：~3 rows (大约)
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
INSERT INTO `company` (`id`, `name`) VALUES
	(6, '红科1'),
	(7, '红科2'),
	(8, '秒啊time');
/*!40000 ALTER TABLE `company` ENABLE KEYS */;

-- 导出  表 time_management.jobcontent 结构
CREATE TABLE IF NOT EXISTS `jobcontent` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `proid` int(11) NOT NULL COMMENT '项目id',
  `content` text CHARACTER SET utf8mb4 NOT NULL COMMENT '内容',
  `addtime` datetime NOT NULL COMMENT '添加时间',
  `peoid` int(11) NOT NULL COMMENT '添加人id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8 COMMENT='工作内容表';

-- 正在导出表  time_management.jobcontent 的数据：~24 rows (大约)
/*!40000 ALTER TABLE `jobcontent` DISABLE KEYS */;
INSERT INTO `jobcontent` (`id`, `proid`, `content`, `addtime`, `peoid`) VALUES
	(1, 3, '修改了bug1', '2018-03-16 16:19:20', 4),
	(2, 3, '修改了bug2', '2018-03-18 16:19:46', 5),
	(3, 3, '修改了bug3', '2018-03-18 16:19:48', 4),
	(4, 2, '修改了bug1', '2018-03-16 16:41:30', 4),
	(5, 2, '修改了bug1', '2018-03-18 01:41:49', 4),
	(6, 2, '修改了bug3', '2018-03-18 01:42:10', 3),
	(7, 2, '修改了bug7', '2018-03-18 01:42:42', 4),
	(8, 3, '修改了老大一bug', '2018-03-19 23:08:24', 4),
	(9, 3, 'da', '2018-03-26 14:34:50', 4),
	(10, 3, 'da', '2018-03-26 14:34:51', 4),
	(11, 3, 'da', '2018-03-26 14:34:52', 4),
	(12, 3, 'da', '2018-03-26 14:34:53', 4),
	(13, 3, 'da', '2018-03-26 14:34:54', 4),
	(14, 3, 'da', '2018-03-26 14:34:54', 4),
	(15, 3, 'da', '2018-03-26 14:34:54', 4),
	(16, 3, 'ddsd', '2018-03-26 14:35:23', 4),
	(17, 3, 'qwq', '2018-03-26 14:35:51', 4),
	(18, 3, 'sa', '2018-03-26 15:00:39', 4),
	(19, 3, 'asasas', '2018-03-26 15:03:23', 4),
	(20, 3, 'dads', '2018-03-26 16:18:06', 4),
	(21, 3, 'dads', '2018-03-26 16:18:15', 4),
	(22, 3, 'wqw', '2018-03-26 16:18:29', 4),
	(23, 3, 'fssfs', '2018-03-26 16:18:46', 4),
	(24, 3, 'eqweqe', '2018-03-26 16:21:48', 4);
/*!40000 ALTER TABLE `jobcontent` ENABLE KEYS */;

-- 导出  表 time_management.news 结构
CREATE TABLE IF NOT EXISTS `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `schid` int(11) NOT NULL COMMENT '日程id',
  `whoid` int(11) NOT NULL COMMENT '谁（推送的）',
  `forid` int(11) NOT NULL COMMENT '给谁（推送）',
  `state` int(11) NOT NULL DEFAULT '0' COMMENT '0未读/1已读',
  `type` int(11) NOT NULL COMMENT '0修改/1共享',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=151 DEFAULT CHARSET=utf8 COMMENT='消息表';

-- 正在导出表  time_management.news 的数据：~142 rows (大约)
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
INSERT INTO `news` (`id`, `schid`, `whoid`, `forid`, `state`, `type`) VALUES
	(1, 1, 5, 4, 1, 0),
	(2, 5, 5, 4, 1, 0),
	(3, 1, 4, 4, 1, 1),
	(4, 3, 5, 4, 1, 1),
	(5, 2, 2, 4, 1, 1),
	(6, 13, 4, 5, 0, 1),
	(7, 14, 4, 5, 0, 1),
	(8, 4, 3, 4, 1, 0),
	(15, 4, 12, 4, 1, 0),
	(16, 4, 12, 4, 1, 0),
	(17, 13, 4, 6, 0, 1),
	(18, 13, 4, 12, 0, 1),
	(19, 14, 4, 6, 0, 1),
	(20, 14, 4, 12, 0, 1),
	(21, 15, 4, 6, 0, 1),
	(22, 15, 4, 12, 0, 1),
	(23, 16, 4, 6, 0, 1),
	(24, 16, 4, 12, 0, 1),
	(25, 17, 4, 6, 0, 1),
	(26, 17, 4, 12, 0, 1),
	(27, 18, 4, 6, 0, 1),
	(28, 18, 4, 12, 0, 1),
	(29, 19, 4, 6, 0, 1),
	(30, 19, 4, 12, 0, 1),
	(31, 20, 4, 6, 0, 1),
	(32, 20, 4, 12, 0, 1),
	(33, 21, 4, 6, 0, 1),
	(34, 21, 4, 12, 0, 1),
	(35, 22, 4, 6, 0, 1),
	(36, 22, 4, 12, 0, 1),
	(37, 23, 4, 6, 0, 1),
	(38, 23, 4, 12, 0, 1),
	(39, 24, 4, 6, 0, 1),
	(40, 24, 4, 12, 0, 1),
	(41, 25, 4, 6, 0, 1),
	(42, 26, 4, 6, 0, 1),
	(43, 29, 12, 4, 1, 1),
	(44, 30, 12, 4, 1, 1),
	(45, 31, 4, 6, 0, 1),
	(46, 32, 4, 6, 0, 1),
	(48, 34, 4, 6, 0, 1),
	(49, 35, 4, 6, 0, 1),
	(50, 36, 4, 6, 0, 1),
	(51, 37, 4, 6, 0, 1),
	(52, 38, 4, 6, 0, 1),
	(53, 39, 4, 6, 0, 1),
	(54, 40, 4, 6, 0, 1),
	(55, 41, 4, 6, 0, 1),
	(56, 42, 4, 6, 0, 1),
	(57, 43, 4, 6, 0, 1),
	(58, 44, 4, 6, 0, 1),
	(59, 45, 4, 6, 0, 1),
	(60, 46, 4, 6, 0, 1),
	(61, 47, 4, 6, 0, 1),
	(62, 48, 4, 6, 0, 1),
	(63, 49, 4, 6, 0, 1),
	(64, 50, 4, 6, 0, 1),
	(65, 51, 4, 6, 0, 1),
	(66, 52, 4, 6, 0, 1),
	(67, 53, 4, 6, 0, 1),
	(68, 54, 4, 6, 0, 1),
	(69, 10, 6, 4, 1, 1),
	(70, 55, 4, 6, 0, 1),
	(71, 56, 4, 6, 0, 1),
	(72, 57, 4, 6, 0, 1),
	(73, 58, 4, 6, 0, 1),
	(74, 59, 4, 6, 0, 1),
	(75, 60, 4, 6, 0, 1),
	(76, 61, 4, 6, 0, 1),
	(77, 62, 4, 6, 0, 1),
	(78, 63, 4, 6, 0, 1),
	(79, 64, 4, 6, 0, 1),
	(80, 65, 4, 6, 0, 1),
	(81, 66, 4, 6, 0, 1),
	(82, 67, 4, 6, 0, 1),
	(83, 68, 4, 6, 0, 1),
	(84, 69, 4, 6, 0, 1),
	(85, 70, 4, 6, 0, 1),
	(86, 71, 4, 6, 0, 1),
	(87, 72, 4, 6, 0, 1),
	(89, 74, 4, 6, 0, 1),
	(90, 75, 4, 6, 0, 1),
	(91, 76, 3, 4, 1, 1),
	(92, 76, 4, 3, 1, 0),
	(93, 76, 4, 3, 1, 0),
	(94, 76, 4, 3, 1, 0),
	(95, 76, 4, 3, 1, 0),
	(96, 76, 4, 3, 1, 0),
	(97, 76, 4, 3, 1, 0),
	(98, 76, 4, 3, 1, 0),
	(99, 76, 4, 3, 1, 0),
	(100, 76, 4, 3, 1, 0),
	(101, 76, 4, 3, 1, 0),
	(102, 76, 4, 3, 1, 0),
	(103, 76, 4, 3, 1, 0),
	(104, 76, 4, 3, 1, 0),
	(105, 76, 4, 3, 1, 0),
	(106, 77, 3, 4, 1, 1),
	(107, 77, 4, 3, 0, 0),
	(108, 77, 4, 3, 0, 0),
	(109, 77, 4, 3, 0, 0),
	(110, 76, 4, 3, 0, 0),
	(111, 78, 3, 4, 1, 1),
	(112, 79, 4, 6, 0, 1),
	(113, 53, 3, 4, 0, 0),
	(114, 37, 3, 4, 0, 0),
	(115, 39, 3, 4, 0, 0),
	(116, 32, 3, 4, 0, 0),
	(117, 38, 3, 4, 0, 0),
	(118, 59, 3, 4, 0, 0),
	(119, 34, 3, 4, 0, 0),
	(120, 80, 3, 4, 1, 1),
	(121, 81, 3, 4, 1, 1),
	(122, 82, 3, 4, 1, 1),
	(123, 40, 3, 4, 1, 0),
	(124, 83, 3, 4, 1, 1),
	(125, 84, 3, 4, 1, 1),
	(126, 85, 3, 4, 1, 1),
	(127, 86, 3, 4, 1, 1),
	(128, 87, 3, 4, 1, 1),
	(129, 56, 3, 4, 0, 0),
	(130, 56, 3, 4, 0, 0),
	(131, 83, 4, 3, 0, 0),
	(132, 88, 4, 3, 0, 1),
	(133, 89, 4, 3, 0, 1),
	(134, 90, 4, 3, 0, 1),
	(135, 91, 4, 3, 0, 1),
	(136, 92, 4, 3, 0, 1),
	(137, 93, 4, 3, 0, 1),
	(138, 94, 4, 3, 0, 1),
	(139, 95, 4, 3, 0, 1),
	(140, 96, 4, 3, 0, 1),
	(141, 97, 4, 3, 0, 1),
	(142, 98, 4, 3, 0, 1),
	(143, 99, 4, 3, 0, 1),
	(144, 100, 4, 3, 0, 1),
	(145, 101, 4, 3, 0, 1),
	(146, 102, 4, 3, 0, 1),
	(147, 103, 4, 3, 0, 1),
	(148, 104, 4, 3, 0, 1),
	(149, 105, 4, 3, 0, 1),
	(150, 106, 4, 3, 0, 1);
/*!40000 ALTER TABLE `news` ENABLE KEYS */;

-- 导出  表 time_management.people 结构
CREATE TABLE IF NOT EXISTS `people` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(50) CHARACTER SET utf8mb4 NOT NULL COMMENT '姓名',
  `phone` char(50) CHARACTER SET utf8mb4 NOT NULL COMMENT '手机号',
  `password` char(50) CHARACTER SET utf8mb4 NOT NULL COMMENT '密码',
  `token` varchar(50) CHARACTER SET utf8mb4 DEFAULT NULL,
  `state` int(11) NOT NULL DEFAULT '0' COMMENT '0为未审批/1审批成功/2已拒绝',
  `expirationtime` datetime DEFAULT NULL COMMENT '过期时间',
  `registrationtime` datetime NOT NULL COMMENT '注册时间',
  `clientid` char(50) NOT NULL COMMENT '手机标识符',
  PRIMARY KEY (`id`),
  UNIQUE KEY `phone` (`phone`),
  KEY `token` (`token`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COMMENT='员工表';

-- 正在导出表  time_management.people 的数据：~8 rows (大约)
/*!40000 ALTER TABLE `people` DISABLE KEYS */;
INSERT INTO `people` (`id`, `name`, `phone`, `password`, `token`, `state`, `expirationtime`, `registrationtime`, `clientid`) VALUES
	(3, '小红', '10000000000', 'c4096e4bbc70fdaac457d9ee9cc93e98', '', 1, NULL, '2018-03-16 00:00:00', 'ec7fd6931de18072f4658cd432a0d075'),
	(4, 'sxy', '17736903640', 'c4096e4bbc70fdaac457d9ee9cc93e98', '945a82d07875ad76983826a5c2b4cbf5', 1, NULL, '2018-03-17 00:00:06', 'ec7fd6931de18072f4658cd432a0d075'),
	(5, 'sxydsd', '17736903642', 'd97f15643b23b647b2fcf58e715cffbc', NULL, 0, NULL, '2018-03-18 00:00:01', 'ec7fd6931de18072f4658cd432a0d075'),
	(6, 'ssa', '17736903649', 'd97f15643b23b647b2fcf58e715cffbc', NULL, 1, NULL, '2018-03-16 00:00:02', 'ec7fd6931de18072f4658cd432a0d075'),
	(8, 'sxy', '17736903646', 'c4096e4bbc70fdaac457d9ee9cc93e98', NULL, 0, NULL, '2018-03-14 00:00:09', 'ec7fd6931de18072f4658cd432a0d075'),
	(9, 'sss', '11111111111', 'c4096e4bbc70fdaac457d9ee9cc93e98', NULL, 1, NULL, '2018-03-19 22:57:15', 'ec7fd6931de18072f4658cd432a0d075'),
	(11, 'sss', '11111111110', 'c4096e4bbc70fdaac457d9ee9cc93e98', NULL, 0, NULL, '2018-03-23 09:29:30', 'ec7fd6931de18072f4658cd432a0d075'),
	(12, 'sss', '11111111112', 'c4096e4bbc70fdaac457d9ee9cc93e98', '58911261395d1d4fccd40d4b8e9bc9c2', 1, NULL, '2018-03-23 11:50:16', 'ec7fd6931de18072f4658cd432a0d075');
/*!40000 ALTER TABLE `people` ENABLE KEYS */;

-- 导出  表 time_management.peo_pro 结构
CREATE TABLE IF NOT EXISTS `peo_pro` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `proid` int(11) DEFAULT NULL COMMENT '项目id',
  `peoid` int(11) NOT NULL COMMENT '人员id',
  `comid` int(11) NOT NULL COMMENT '公司id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COMMENT='人员项目关系表';

-- 正在导出表  time_management.peo_pro 的数据：~14 rows (大约)
/*!40000 ALTER TABLE `peo_pro` DISABLE KEYS */;
INSERT INTO `peo_pro` (`id`, `proid`, `peoid`, `comid`) VALUES
	(1, 1, 4, 6),
	(2, 2, 4, 6),
	(3, 3, 4, 7),
	(4, 3, 5, 7),
	(5, NULL, 4, 6),
	(6, NULL, 6, 6),
	(7, 1, 6, 6),
	(8, 2, 6, 6),
	(9, 3, 6, 6),
	(10, 1, 3, 6),
	(11, 2, 3, 6),
	(12, 3, 3, 6),
	(13, 4, 3, 7),
	(14, 4, 5, 7);
/*!40000 ALTER TABLE `peo_pro` ENABLE KEYS */;

-- 导出  表 time_management.project 结构
CREATE TABLE IF NOT EXISTS `project` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(50) CHARACTER SET utf8mb4 NOT NULL DEFAULT '0' COMMENT '项目名字',
  `cid` char(50) CHARACTER SET utf8mb4 NOT NULL DEFAULT '0' COMMENT '公司id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='项目表';

-- 正在导出表  time_management.project 的数据：~5 rows (大约)
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` (`id`, `name`, `cid`) VALUES
	(1, '时间管理', '6'),
	(2, '西城项目', '6'),
	(3, '出入库项目', '6'),
	(4, '节点网通项目', '7'),
	(5, 'tnb', '8');
/*!40000 ALTER TABLE `project` ENABLE KEYS */;

-- 导出  表 time_management.relation 结构
CREATE TABLE IF NOT EXISTS `relation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `whoid` int(11) NOT NULL COMMENT '谁（共享）',
  `forid` int(11) NOT NULL COMMENT '对谁（共享）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8 COMMENT='共享关系表';

-- 正在导出表  time_management.relation 的数据：~4 rows (大约)
/*!40000 ALTER TABLE `relation` DISABLE KEYS */;
INSERT INTO `relation` (`id`, `whoid`, `forid`) VALUES
	(2, 6, 4),
	(53, 12, 4),
	(59, 3, 4),
	(61, 4, 3);
/*!40000 ALTER TABLE `relation` ENABLE KEYS */;

-- 导出  表 time_management.schedule 结构
CREATE TABLE IF NOT EXISTS `schedule` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `peoid` int(11) NOT NULL COMMENT '人员id',
  `content` text CHARACTER SET utf8mb4 NOT NULL COMMENT '日程内容',
  `addtime` datetime NOT NULL COMMENT '添加时间',
  `remindtime` datetime DEFAULT NULL COMMENT '提醒时间',
  `repetitiontime` int(11) DEFAULT NULL COMMENT '重复时间',
  `startime` datetime NOT NULL COMMENT '开始时间',
  `closetime` datetime NOT NULL COMMENT '结束时间',
  PRIMARY KEY (`id`),
  KEY `peoid` (`peoid`)
) ENGINE=InnoDB AUTO_INCREMENT=107 DEFAULT CHARSET=utf8 COMMENT='日程表';

-- 正在导出表  time_management.schedule 的数据：~100 rows (大约)
/*!40000 ALTER TABLE `schedule` DISABLE KEYS */;
INSERT INTO `schedule` (`id`, `peoid`, `content`, `addtime`, `remindtime`, `repetitiontime`, `startime`, `closetime`) VALUES
	(1, 4, '要干啥', '2018-03-18 11:15:08', '2018-03-18 11:15:10', 5, '2018-03-18 11:15:17', '2018-03-18 11:15:21'),
	(2, 2, '咋地', '2018-03-11 11:19:06', '2018-03-18 11:19:08', 4, '2018-03-18 11:19:11', '2018-03-18 11:19:12'),
	(3, 5, '不咋', '2018-03-18 18:19:27', '2018-03-18 11:19:28', 3, '2018-03-18 11:19:31', '2018-03-18 11:19:32'),
	(4, 4, 'xxx', '2018-03-16 13:12:06', '2018-03-19 21:29:09', 5, '2018-03-19 21:44:09', '2018-03-19 23:44:09'),
	(5, 4, '啥', '2018-02-19 17:11:27', '2018-03-18 17:11:38', 3, '2018-03-18 17:11:46', '2018-03-18 17:11:47'),
	(6, 4, '^^``', '2018-03-14 18:25:48', '2018-03-18 18:25:54', 3, '2018-03-18 18:25:56', '2018-03-18 19:55:57'),
	(8, 3, '要干啥啥', '2018-03-19 16:59:08', '2018-03-19 22:29:09', 5, '2018-03-19 22:44:09', '2018-03-19 23:44:09'),
	(9, 4, '1111111111', '2018-03-19 17:21:01', '2018-03-19 22:29:09', 5, '2018-03-19 16:44:09', '2018-03-19 21:44:09'),
	(10, 6, '22222222222', '2018-03-19 17:21:06', '2018-03-19 22:29:09', 5, '2018-03-19 14:44:09', '2018-03-19 15:44:09'),
	(12, 4, '333333333', '2018-03-19 17:22:05', '2018-03-19 22:29:09', 5, '2018-03-19 22:44:09', '2018-03-19 23:44:09'),
	(13, 4, 'ADzsfz', '2018-03-23 13:15:01', '2018-03-24 08:15:00', 5, '2018-03-24 08:30:00', '2018-03-24 09:00:00'),
	(14, 4, 'dgdxg', '2018-03-23 13:26:18', '2018-03-24 08:15:00', 5, '2018-03-24 08:30:00', '2018-03-24 09:00:00'),
	(15, 4, 'hihgiiigi', '2018-03-23 13:28:20', '2018-03-24 08:15:00', 5, '2018-03-24 08:30:00', '2018-03-24 09:30:00'),
	(16, 4, 'ftuhfyg', '2018-03-23 13:30:29', '2018-03-24 08:15:00', 5, '2018-03-24 08:30:00', '2018-03-24 09:00:00'),
	(17, 4, '111111111111', '2018-03-23 13:35:36', '2018-03-24 08:15:00', 5, '2018-03-24 08:30:00', '2018-03-24 09:00:00'),
	(18, 4, '21424', '2018-03-23 14:14:10', '2018-03-24 08:15:00', 5, '2018-03-24 08:30:00', '2018-03-24 09:30:00'),
	(19, 4, '污染哇日期', '2018-03-23 14:14:49', '2018-03-24 11:45:00', 5, '2018-03-24 12:00:00', '2018-03-24 14:00:00'),
	(22, 4, 'sa', '2018-03-23 14:26:17', '2018-03-24 13:45:00', 5, '2018-03-24 14:00:00', '2018-03-24 14:30:00'),
	(23, 4, '26', '2018-03-23 14:27:46', '2018-03-26 08:15:00', 5, '2018-03-26 08:30:00', '2018-03-26 09:30:00'),
	(24, 4, '3244', '2018-03-23 14:29:01', '2018-03-31 08:15:00', 5, '2018-03-31 08:30:00', '2018-03-31 09:30:00'),
	(25, 4, 'e\'e\'a\'e\'d\'da', '2018-03-23 14:37:04', '2018-03-31 08:15:00', 5, '2018-03-31 08:30:00', '2018-03-31 09:30:00'),
	(26, 4, '这是一个测试', '2018-03-23 14:37:28', '2018-03-31 08:15:00', 5, '2018-03-31 08:30:00', '2018-03-31 09:30:00'),
	(27, 12, '要干啥啥', '2018-03-23 14:57:37', '2018-03-27 22:29:09', 5, '2018-03-27 22:44:09', '2018-03-27 23:44:09'),
	(28, 12, '要干啥啥', '2018-03-23 14:59:06', '2018-03-27 22:29:09', 5, '2018-03-27 22:44:09', '2018-03-27 23:44:09'),
	(29, 12, '要干啥啥', '2018-03-23 14:59:47', '2018-03-27 22:29:09', 5, '2018-03-27 22:44:09', '2018-03-27 23:44:09'),
	(30, 12, '要干啥啥', '2018-03-23 15:00:10', '2018-03-27 22:29:09', 5, '2018-03-27 22:44:09', '2018-03-27 23:44:09'),
	(31, 4, '121', '2018-03-23 15:02:06', '2018-03-30 10:15:00', 5, '2018-03-30 10:30:00', '2018-03-30 11:30:00'),
	(32, 4, '111', '2018-03-23 15:02:50', NULL, 5, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(34, 4, 'ewqe', '2018-03-23 15:34:33', NULL, 5, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(35, 4, '1213', '2018-03-23 15:39:16', '2018-03-30 23:45:00', 5, '2018-03-31 00:00:00', '2018-03-31 01:30:00'),
	(36, 4, 'aea', '2018-03-23 15:42:27', '2018-03-30 08:15:00', 5, '2018-03-30 08:30:00', '2018-03-30 09:00:00'),
	(37, 4, 'sa', '2018-03-23 16:38:38', NULL, 5, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(38, 4, 'ewqeq', '2018-03-23 16:40:31', NULL, 5, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(39, 4, '123', '2018-03-23 16:42:22', NULL, 5, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(40, 4, 'aaaaaaaq', '2018-03-23 17:07:55', '2018-03-31 08:15:00', 5, '2018-03-31 08:30:00', '2018-03-31 10:00:00'),
	(41, 4, '323', '2018-03-23 17:08:09', '2018-03-31 08:15:00', 5, '2018-03-31 08:30:00', '2018-03-31 09:30:00'),
	(42, 4, 'wew', '2018-03-23 17:40:13', '2018-03-31 08:15:00', 5, '2018-03-31 08:30:00', '2018-03-31 09:30:00'),
	(43, 4, '问问', '2018-03-23 17:40:32', '2018-03-31 08:15:00', 5, '2018-03-31 08:30:00', '2018-03-31 09:30:00'),
	(44, 4, '111', '2018-03-23 17:41:22', '2018-03-31 08:15:00', 5, '2018-03-31 08:30:00', '2018-03-31 09:30:00'),
	(45, 4, '13', '2018-03-23 17:41:33', '2018-03-31 08:15:00', 5, '2018-03-31 08:30:00', '2018-03-31 09:30:00'),
	(46, 4, 'wenwen', '2018-03-23 17:41:44', '2018-03-31 08:15:00', 5, '2018-03-31 08:30:00', '2018-03-31 09:30:00'),
	(47, 4, '23', '2018-03-23 17:43:18', '2018-03-31 08:15:00', 5, '2018-03-31 08:30:00', '2018-03-31 09:30:00'),
	(48, 4, '2018/3/23', '2018-03-23 17:43:43', '2018-03-31 08:15:00', 5, '2018-03-31 08:30:00', '2018-03-31 09:30:00'),
	(49, 4, 'qwqw', '2018-03-23 17:44:20', '2018-03-31 08:15:00', 5, '2018-03-31 08:30:00', '2018-03-31 09:30:00'),
	(50, 4, '2018330', '2018-03-23 17:46:54', '2018-03-30 08:15:00', 5, '2018-03-30 08:30:00', '2018-03-30 09:00:00'),
	(51, 4, '2', '2018-03-23 17:51:14', '2018-03-30 08:15:00', 5, '2018-03-30 08:30:00', '2018-03-30 09:00:00'),
	(52, 4, '2222222', '2018-03-23 18:08:00', '2018-03-30 08:15:00', 5, '2018-03-30 08:30:00', '2018-03-30 09:00:00'),
	(53, 4, '1221', '2018-03-23 18:08:36', NULL, 5, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(54, 4, 'erwear', '2018-03-23 18:15:45', '2018-03-30 12:45:00', 5, '2018-03-30 13:00:00', '2018-03-30 13:30:00'),
	(55, 4, '1312321', '2018-03-23 19:37:56', '2018-03-30 15:15:00', 5, '2018-03-30 15:30:00', '2018-03-30 18:00:00'),
	(56, 4, '社区卫生', '2018-03-23 21:51:56', '2018-03-27 08:15:00', 5, '2018-03-27 08:30:00', '2018-03-27 11:30:00'),
	(57, 4, '而且为人', '2018-03-24 08:57:43', '2018-04-28 08:15:00', 5, '2018-04-28 08:30:00', '2018-04-28 09:30:00'),
	(58, 4, '企鹅企鹅', '2018-03-24 09:01:58', '2018-04-27 08:15:00', 5, '2018-04-27 08:30:00', '2018-04-27 12:00:00'),
	(59, 4, '123', '2018-03-24 11:18:53', NULL, 5, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(60, 4, '准备干', '2018-03-24 11:31:05', '2018-03-30 18:30:00', 5, '2018-03-30 18:45:00', '2018-03-30 19:45:00'),
	(61, 4, 'wowoowoowo', '2018-03-24 20:43:38', '2018-03-25 08:15:00', 5, '2018-03-25 08:30:00', '2018-03-25 13:44:00'),
	(62, 4, 'wowoowoowo', '2018-03-24 20:44:20', '2018-04-25 08:15:00', 5, '2018-04-25 08:30:00', '2018-04-25 13:44:00'),
	(63, 4, 'wowoowoowo', '2018-03-24 20:44:37', '2018-05-25 08:15:00', 5, '2018-05-25 08:30:00', '2018-05-25 13:44:00'),
	(64, 4, 'wowoowoowo', '2018-03-24 20:45:44', '2018-05-26 08:15:00', 5, '2018-05-26 08:30:00', '2018-05-26 13:44:00'),
	(65, 4, 'wowoowoowo', '2018-03-24 20:47:44', '2018-05-30 08:15:00', 5, '2018-05-30 08:30:00', '2018-05-30 13:44:00'),
	(66, 4, 'wowoowoowo', '2018-03-24 20:59:44', '2018-04-01 08:15:00', 5, '2018-04-01 08:30:00', '2018-04-01 13:44:00'),
	(67, 4, 'wowoowoowo', '2018-03-24 21:00:00', '2018-05-01 08:15:00', 5, '2018-05-01 08:30:00', '2018-05-01 13:44:00'),
	(68, 4, 'wowoowoowo', '2018-03-24 21:01:16', '2018-06-01 08:15:00', 5, '2018-06-01 08:30:00', '2018-06-01 13:44:00'),
	(69, 4, 'wowoowoowo', '2018-03-24 21:08:44', '2018-07-01 08:15:00', 5, '2018-07-01 08:30:00', '2018-07-01 13:44:00'),
	(70, 4, 'wowoowoowo', '2018-03-24 21:10:04', '2018-07-02 08:15:00', 5, '2018-07-02 08:30:00', '2018-07-02 13:44:00'),
	(71, 4, 'wowoowoowo', '2018-03-24 21:10:38', '2018-07-02 14:15:00', 5, '2018-07-02 14:30:00', '2018-07-02 20:44:00'),
	(72, 4, 'wowoowoowo', '2018-03-24 21:15:00', '2018-07-02 21:15:00', 5, '2018-07-02 21:30:00', '2018-07-02 22:44:00'),
	(74, 4, 'wowoowoowo', '2018-03-24 21:19:44', '2018-04-03 21:15:00', 5, '2018-04-03 21:30:00', '2018-04-03 22:44:00'),
	(75, 4, 'wowoowoowo', '2018-03-24 21:30:57', '2018-04-04 21:15:00', 5, '2018-04-04 21:30:00', '2018-04-04 22:44:00'),
	(76, 3, 'wqwq', '2018-03-26 11:04:20', '2018-03-26 11:59:45', 5, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(77, 3, 'www', '2018-03-26 11:24:28', '2018-03-26 11:59:50', 5, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(78, 3, '143234', '2018-03-26 11:37:04', '2018-03-31 13:15:00', 5, '2018-03-31 13:30:00', '2018-03-31 15:30:00'),
	(79, 4, '11111111111111', '2018-03-26 11:39:21', '2018-04-20 08:15:00', 5, '2018-04-20 08:30:00', '2018-04-20 09:00:00'),
	(80, 3, 'w\'q\'w\'q', '2018-03-26 13:20:24', '2018-03-31 09:15:00', 5, '2018-03-31 09:30:00', '2018-03-31 12:00:00'),
	(81, 3, '2', '2018-03-26 13:20:41', '2018-03-31 09:45:00', 5, '2018-03-31 10:00:00', '2018-03-31 12:00:00'),
	(82, 3, '3', '2018-03-26 13:21:08', '2018-03-31 09:45:00', 5, '2018-03-31 10:00:00', '2018-03-31 12:00:00'),
	(83, 3, '1312', '2018-03-26 13:22:15', '2018-03-30 11:45:00', 5, '2018-03-30 12:00:00', '2018-03-30 14:00:00'),
	(84, 3, '我的期待', '2018-03-26 13:22:29', '2018-03-30 09:45:00', 5, '2018-03-30 10:00:00', '2018-03-30 11:00:00'),
	(85, 3, '问问', '2018-03-26 13:30:49', '2018-03-29 08:15:00', 5, '2018-03-29 08:30:00', '2018-03-29 10:00:00'),
	(86, 3, '个回复', '2018-03-26 13:31:19', '2018-03-29 12:15:00', 5, '2018-03-29 12:30:00', '2018-03-29 14:00:00'),
	(87, 3, '的时代的', '2018-03-26 13:33:58', '2018-03-29 13:45:00', 5, '2018-03-29 14:00:00', '2018-03-29 17:00:00'),
	(88, 4, 'wowoowoowo', '2018-03-26 14:01:18', '2018-04-03 21:15:00', 5, '2018-04-03 21:30:00', '2018-04-03 22:44:00'),
	(89, 4, 'wowoowoowo', '2018-03-26 14:06:54', '2018-04-03 21:15:00', 5, '2018-04-03 21:30:00', '2018-04-03 22:44:00'),
	(90, 4, 'wowoowoowo', '2018-03-26 14:09:26', '2018-04-03 22:29:00', 5, '2018-04-03 22:44:00', '2018-04-03 23:44:00'),
	(91, 4, 'wowoowoowo', '2018-03-26 14:10:09', '2018-04-03 20:15:00', 5, '2018-04-03 20:30:00', '2018-04-03 21:30:00'),
	(92, 4, 'wowoowoowo', '2018-03-26 14:13:23', '2018-04-03 12:15:00', 5, '2018-04-03 12:30:00', '2018-04-03 20:30:00'),
	(93, 4, 'wowoowoowo', '2018-03-26 14:19:55', '2018-04-03 10:15:00', 5, '2018-04-03 10:30:00', '2018-04-03 11:30:00'),
	(94, 4, 'wowoowoowo', '2018-03-26 14:25:46', '2018-04-03 08:15:00', 5, '2018-04-03 08:30:00', '2018-04-03 09:30:00'),
	(95, 4, 'wowoowoowo', '2018-03-26 14:27:49', '2018-04-03 06:15:00', 5, '2018-04-03 06:30:00', '2018-04-03 07:30:00'),
	(96, 4, 'wowoowoowo', '2018-03-26 14:28:51', '2018-04-03 04:15:00', 5, '2018-04-03 04:30:00', '2018-04-03 05:30:00'),
	(97, 4, 'wowoowoowo', '2018-03-26 14:34:11', '2018-04-02 04:15:00', 5, '2018-04-02 04:30:00', '2018-04-02 05:30:00'),
	(98, 4, 'wowoowoowo', '2018-03-26 14:34:59', '2018-04-01 04:15:00', 5, '2018-04-01 04:30:00', '2018-04-01 05:30:00'),
	(99, 4, 'wowoowoowo', '2018-03-26 14:35:47', '2018-04-07 04:15:00', 5, '2018-04-07 04:30:00', '2018-04-07 05:30:00'),
	(100, 4, 'wowoowoowo', '2018-03-26 14:37:13', '2018-04-08 04:15:00', 5, '2018-04-08 04:30:00', '2018-04-08 05:30:00'),
	(101, 4, 'wowoowoowo', '2018-03-26 14:38:05', '2018-04-09 04:15:00', 5, '2018-04-09 04:30:00', '2018-04-09 05:30:00'),
	(102, 4, 'wowoowoowo', '2018-03-26 14:40:24', '2018-04-23 04:15:00', 5, '2018-04-23 04:30:00', '2018-04-23 05:30:00'),
	(103, 4, 'wowoowoowo', '2018-03-26 14:44:33', '2018-04-23 05:15:00', 5, '2018-04-23 05:30:00', '2018-04-23 06:30:00'),
	(104, 4, 'wowoowoowo', '2018-03-26 14:47:56', '2018-04-23 02:15:00', 5, '2018-04-23 02:30:00', '2018-04-23 03:30:00'),
	(105, 4, 'wowoowoowo', '2018-03-26 15:08:11', '2018-04-23 03:15:00', 5, '2018-04-23 03:30:00', '2018-04-23 04:30:00'),
	(106, 4, 'wowoowoowo', '2018-03-26 15:11:40', '2018-04-23 07:15:00', 5, '2018-04-23 07:30:00', '2018-04-23 08:30:00');
/*!40000 ALTER TABLE `schedule` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
