// ==UserScript==
// @name        vip视频解析 
// @namespace    ocean
// @version      
// @description  苹果Alook浏览器使用此脚本方法:点击安装此脚本后可见完整代码，全选复制备用，之后进设置/自定义设置/JavaScript扩展/添加/被动扩展，名称随意填写，将匹配类型修改为_链接网址，匹配值_*，运行时间不动。最后将代码完整的粘贴到JavaScript代码框内，保存后生效。解析接口失效后请自行到其他脚本内提取替换更新，遇到页面无法启动脚本时请自行增减域名。更新代码时切记:字符均为半角，编码格式为utf-8 切记!!!
// @include *
// @author       ocean
// @downloadURL =
// ==/UserScript==

/ 正文开始
var 通用 =
    '<span style="display:block;float:left;width:5vw;height:5vw;font-size:2.5vw;color:#fff;line-height:5vw;text-align:center;border-radius:100%;box-shadow:0px 0px 3px #a9a9a9;background:transparent;margin:3.78vw 2.1vw;">&#9660</span>';

// 播放器链接
var playerUrl = "https://v2.shenjw.com:4438/wap.php?url=";

//综合解析下面的链接就是接口，替换时注意不要将""删掉

var apis = [{
    name: 通用 + "水星",
    "url": "http://json.xingkf.cn/api/?key=5jBsAar4Ju3dKvcNU3&url=",
    "title": "水星"
  },{
    name: 通用 + "追忆",
    "url": "http://115.231.220.36:8801/jx/tvbox/2.php?url=",
    "title": "追忆"
  },{
    name: 通用 + "壁纸",
    "url": "http://124.71.8.170:3389/json.php?url=|http://124.71.8.170:3389/json.php?cat_ext=cGFyc2Vz&url=",
    "title": "壁纸"
  },{
    name: 通用 + "八号",
    "url": "https://api.52wyb.com/index/?url=",
    "title": "八号"
  },{
    name: 通用 + "鱼家",
    "url": "http://json.84jia.com/home/api?type=ys&uid=8096440&key=cepwyzACGJPQSTVX04&url=|http://json.84jia.com/home/api?type=ys&uid=162970&key=bghjkmnrszEGIMNRW4&url=|http://jx.meowtv.cn/?url=",
    "title": "鱼家"
  },{
    name: 通用 + "爱酷",
    "url": "https://cache.json.icu/8520.php?url=|https://api.json.icu/api/?key=ca874f2179e68cc78b6f0d1c8addb58e&url=|https://douban.armytea.com/json.php?url=|https://api.json.icu/api/?key=811820edf0b6414f05a648bc0e0ba1e5&url=|https://api.json.icu/api/?key=cebaa8d3da1540559d397891ec522e0e&url=",
    "title": "爱酷"
  },{
    name: 通用 + "左岸",
    "url": "http://110.42.2.247:880/analysis/json/?uid=2334&my=fhloqstzDIKLMORTZ9&url=|http://116.196.99.168/akys.php/?url=|http://106.14.14.200:8956/jx.php?url=",
    "title": "左岸"
  },{
    name: 通用 + "阳途",
    "url": "http://open.yangtuyun.cn/open/jx_api/170?key=tfgrHWsqlU&url=",
    "title": "阳途"
  },{
    name: 通用 + "初恋",
    "url": "https://json.oorl.cn/api/?key=RLdYwbPtVKxum234dg&url=|https://json.oorl.cn/api/?key=OafVOwHB6Hd0x9WZhK&url=|http://jxxcc-cc.dianshia.top:8821/api/?key=UAOfSBFIaFI3IvLi8r&url=|http://jxxcc-cc.dianshia.top:8821/api/?key=UAOfSBFIaFI3IvLi8r&url=|https://vip.liuliyun.vip:8686//api/?key=9CMB6wpsuGf5J9Ovsf&url=|http://124.221.100.97:3031/api/?key=W0JuOBDrhRmfcN8exW&url=|http://106.53.99.43:92/api/?key=a6e816db773781601df448e9c5d11166&url=",
    "title": "初恋"
  },{
    name: 通用 + "茶语",
    "url": "http://authi.cnlav.cn/home/api?type=ys&uid=335819&key=fjnotCDEGJKLPRV458&url=|http://authi.cnlav.cn/home/api?type=ys&uid=3159853&key=bhopuvwxzHLPRUWY89&url=|http://authi.cnlav.cn/home/api?type=ys&uid=6712384&key=cjtvACEGILMRVWY678&url=",
    "title": "茶语"
  },{
    name: 通用 + "晓城",
    "url": "https://svip.cygc.xyz/api/?key=a92A1mlWR57tSlxCjW&url=|https://bfq.cddys.me/nimasile2/API.php?url=",
    "title": "晓城"
  },{
    name: 通用 + "茶茶",
    "url": "http://htp.behds.cn/json/520239app10/jsonff185.php?url=",
    "title": "茶茶"
  },{
    name: 通用 + "久云",
    "url": "http://jx.jjtv.bf/json/99.php?url=|http://119.91.123.253:2345/Api/yun.php?url={ua:okhttp/3.12.0}",
    "title": "久云"
  },{
    name: 通用 + "295",
    "url": "https://295jx.295yun.vip:295/api/?key=6QyRWRQpNLJePE55s1&url=",
    "title": "295"
  },{
    name: 通用 + "花花",
    "url": "http://vip.hhtv.vip:38801/ytjx.php?key=1234abcd&url=",
    "title": "花花"
  },{
    name: 通用 + "觅影",
    "url": "http://39.104.230.177:1111/api/?key=wD2olCBAAP0ZIZXL7n&url=",
    "title": "觅影"
  },{
    name: 通用 + "君离",
    "url": "http://api.jlgw.top/api/diy/?key=vvtwOacOTswJ4P3j36&url=|http://jx.xn--sqro98f.icu/api/diy/?key=vvtwOacOTswJ4P3j36&url=",
    "title": "君离"
  },{
    name: 通用 + "乱对",
    "url": "http://vip.2068tv.com//api//?key=oPp1j0ZBsSV7r9cFlG&url=|http://122.228.84.103:7777/api/?key=ewHDw89rbnX76D75ff&url=|http://122.228.84.103:7777/api/?key=lEoJRrX01Drg8Of5aA&url=|http://122.228.84.103:7777/api/?key=TJ5aojxggobuP4CTTw&url=|https://api.huohua.vip/api/?key=wrN9IgE4KZLZRTDUwV&url=|https://api.huohua.vip/api/?key=Y5mrHE7CaQRzUOVKZc&url=|https://svip.kumyun.cn:1213/home/api?type=ys&cc=mp4&uid=3537010&key=abjkmrvCDEGKOPWZ56&url=|http://cl.ruifeng.lol/api/?key=G7ONc3o0i2P1eyM96P&url=|http://cl.ruifeng.lol/api/?key=bRMYcfNy5tQnLEhlxY&url=",
    "title": "乱对"
  },{
    name: 通用 + "清风",
    "url": "http://xiutan.shiyifacai.com/json/qingfeng.php?url=",
    "title": "清风"
  },{
    name: 通用 + "迷你",
    "url": "https://json.mnvia.xyz/api/?key=KMqx4Gm4B666f3zQgb&url=",
    "title": "迷你"
  },{
    name: 通用 + "三路",
    "url": "http://jx.xn--od1aq39b.net:8899/api/?key=wm5nLOMqcgT4Xy6nua&url=",
    "title": "三路"
  },{
    name: 通用 + "鱼仔",
    "url": "http://116.196.99.168/ql.php/?v=|http://116.196.99.168/369.php?v=|http://116.196.99.168/%E7%88%B1%E9%85%B7.php?url=|http://116.196.99.168/12.php?v=",
    "title": "鱼仔"
  },{
    name: 通用 + "涂成",
    "url": "https://110.42.2.98:22222/api/?key=NQk7InG1Kn7SaXOVY2&url=|https://110.42.2.98:22222/api/?key=QxR68LYoItCdbTOVgM&url=|http://42.157.129.144:2323/CH/caihong_1993138546.php?url=",
    "title": "涂成"
  },{
    name: 通用 + "晨光",
    "url": "https://www.cgdyw.net/jiexi/jiekou-1/api.php{json:2}|https://www.cgdyw.net/jiexi/jiekou-2/api.php{json:2}|https://www.cgdyw.net/jiexi/jiekou-3/api.php{json:2}|https://www.cgdyw.net/jiexi/jiekou-4/api.php{json:2}",
    "title": "晨光"
  },{
    name: 通用 + "东明",
    "url": "http://110.40.147.212/analysis.php?v=",
    "title": "东明"
  },{
    name: 通用 + "麒麟",
    "url": "https://t1.qlplayer.cyou/player/analysis.php?v=",
    "title": "麒麟"
  },{
    name: 通用 + "一溜",
    "url": "http://111.180.191.20:1616/player/analysis.php?v=",
    "title": "一溜"
  },{
    name: 通用 + "虾米",
    "url": "http://116.196.99.168/77.php/?v=|http://appto.tvhh.eu.org:91/jx/xmflv/?v=",
    "title": "虾米"
  },{
    name: 通用 + "百度",
    "url": "https://ysxjjkl.souyisou.top/?search=%s",
    "title": "百度"
  },{
    name: 通用 + "阿里",
    "url": "https://www.alipansou.com/search?k=%s&s=0&t=-1",
    "title": "阿里"
  },{
    name: 通用 + "量子",
    "url": "http://cj.lziapi.com/api.php/provide/vod/from/lzm3u8",
    "title": "量子"
  },{
    name: 通用 + "非凡",
    "url": "http://ffzy2.tv/api.php/provide/vod/from/ffm3u8",
    "title": "非凡"
  }];


//添加链接

function createSelect(apis) {
    var myul = document.createElement("ul");
    myul.id = "myul";
    myul.setAttribute("style",
        "display:none;background:#fff;box-shadow:0px 1px 10px rgba(0,0,0,0.3);margin:0;padding:0 4.2vw;position:fixed;bottom:17vh;right:6vw;z-index:99999;height:70vh;overflow:scroll;border-radius:1.26vw;");
    for (var i = 0; i < apis.length; i++) {
        var myli = document.createElement("li");
        var that = this;
        myli.setAttribute("style",
            "margin:0;padding:0;display:block;list-style:none;font-size:4.2vw;width:30.6vw;text-align:left;line-height:12.6vw;letter-spacing:0;border-bottom:1px solid #f0f0f0;position:relative;overflow:hidden;text-overflow:hidden;white-space:nowrap;");
        (function (num) {
            myli.onclick = function () {
                window.open(apis[num].url + location.href, '_blank');
            };
            myli.ontouchstart = function () {
                this.style.cssText += "color:yellow;background:#373737;border-radius:1.26vw;";
            }
            myli.ontouchend = function () {
                this.style.cssText += "color:black;background:transparent;border-radius:0;";
            }
        })(i);
        myli.innerHTML = apis[i].name;
        myul.appendChild(myli);
    }
    document.body.appendChild(myul);
}
// 添加链接
function createSelect(apis) {
    var myul = document.createElement("ul");
    myul.id = "myul";
    myul.setAttribute("style",
        "display:none;background:#fff;box-shadow:0px 1px 10px rgba(0,0,0,0.3);margin:0;padding:0 4.2vw;position:fixed;bottom:17vh;right:6vw;z-index:99999;height:70vh;overflow:scroll;border-radius:1.26vw;");
    for (var i = 0; i < apis.length; i++) {
        var myli = document.createElement("li");
        myli.setAttribute("style",
            "margin:0;padding:0;display:block;list-style:none;font-size:4.2vw;width:30.6vw;text-align:left;line-height:12.6vw;letter-spacing:0;border-bottom:1px solid #f0f0f0;position:relative;overflow:hidden;text-overflow:hidden;white-space:nowrap;");
        myli.innerHTML = apis[i].name;
        (function (num) {
            myli.onclick = function () {
                window.open(apis[num].url + location.href, '_blank');
            };
            myli.ontouchstart = function () {
                this.style.cssText += "color:yellow;background:#373737;border-radius:1.26vw;";
            };
            myli.ontouchend = function () {
                this.style.cssText += "color:black;background:transparent;border-radius:0;";
            };
        })(i);
        myul.appendChild(myli);
    }
    document.body.appendChild(myul);
}

// 唤出菜单
function createMenu() {
    var myBtn = document.createElement("div");
    myBtn.id = "myBtn";
    myBtn.innerHTML = "&#9855";
    myBtn.setAttribute("style",
        "width:10vw;height:10vw;position:fixed;bottom:10vh;right:6vw;z-index:100000;border-radius:100%;text-align:center;line-height:10vw;box-shadow:0px 1px 10px rgba(0,0,0,0.3);font-size:6vw;background:#fff;cursor:pointer;");
    myBtn.onclick = function () {
        var myul = document.getElementById("myul");
        if (myul.style.display == "none") {
            myul.style.display = "block";
            this.style.transform = "rotateZ(45deg)";
        } else {
            myul.style.display = "none";
            this.style.transform = "rotateZ(0deg)";
        }
    };
    document.body.appendChild(myBtn);
}

// 解析域名，填减时注意格式
if (location.href.match(".iqiyi.com") || location.href.match(".youku.com") || location.href.match(".le.com") ||
    location.href.match(".letv.com") || location.href.match("v.qq.com") || location.href.match("film.qq.com") || location.href.match(".tudou.com") ||
    location.href.match(".mgtv.com") || location.href.match("film.sohu.com") || location.href.match("tv.sohu.com") ||
    location.href.match(".acfun.cn") || location.href.match(".bilibili.com") || location.href.match(".pptv.com") ||
    location.href.match("vip.1905.com") || location.href.match(".yinyuetai.com") || location.href.match(".fun.tv") ||
    location.href.match("twitter.com") || location.href.match("facebook.com") || location.href.match("instagram.com") ||
    location.href.match(".56.com") || location.href.match("youtube.com") || location.href.match(".wasu.cn")) {
    createMenu();
    createSelect(apis);
}
