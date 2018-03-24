var GeTui = require('../GT.push');
var GTCONFIG = require("../util/config");
var Target = require('../getui/Target');
var SingleMessage = require('../getui/message/SingleMessage');
var TransmissionTemplate = require('../getui/template/TransmissionTemplate');
var gt = new GeTui(GTCONFIG.HOST, GTCONFIG.APPKEY, GTCONFIG.MASTERSECRET);

exports.tuiSong =function(title,content,payload,cid){
    gt.connect(function (err) {
        if(err){
            console.log(err)
        }else{
            pushMessageToSingle(title,content,payload,cid) //发送单个消息
        }
    });
}

function pushMessageToSingle(title,content,payload,cid) {
    var template = TransmissionTemplateDemo(title,content,payload);
    //单推消息体
    var message = new SingleMessage({
        isOffline: true,                        //是否离线
        offlineExpireTime: 3600 * 12 * 1000,    //离线时间
        data: template                          //设置推送消息类型
    });
    //接收方
    var target = new Target({
        appId: GTCONFIG.APPID,
        clientId: cid
        //alias:ALIAS
    });

    target.setAppId(GTCONFIG.APPID).setClientId(cid);
    //target.setAppId(APPID).setAlias(ALIAS);
    gt.pushMessageToSingle(message, target, function (err, res) {
        if (err != null && err.exception != null && err.exception instanceof RequestError) {
            var requestId = err.exception.requestId;
            console.log(err.exception.requestId);
            //发送异常重传
            gt.pushMessageToSingle(message, target, requestId, function (err, res) {
                console.log(err);
                console.log(res);
            });
        } else {
            console.log(res)
        }
    });
}

function TransmissionTemplateDemo(title,content,payload) {
    /**
     * 发送穿透消息
     */
    var template = new TransmissionTemplate({
        appId: GTCONFIG.APPID,
        appKey: GTCONFIG.APPKEY,
        transmissionType: 2,
        transmissionContent: {title: title, content: content, payload: payload}
    });
    //iOS推送需要设置的pushInfo字段
    //var payload = new APNPayload();
    //var alertMsg = new SimpleAlertMsg();
    //alertMsg.alertMsg="AlertMsg";
    //payload.alertMsg = alertMsg;
    //payload.badge=5;
    //payload.contentAvailable =1;
    //payload.category="ACTIONABLE";
    //payload.sound="test1.wav";
    //payload.customMsg.payload1="payload";
    //template.setApnInfo(payload);
    return template;
}

