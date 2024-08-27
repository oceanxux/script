变量名称: MAOTAI_CONFIG
格式为（如图）：省份,城市,经度,维度,设备id,token,MT-Token-Wap



配置获取: http://api.vus.tax/
app获取验证码，到这里获取配置即可，替换省和市，然后在省市后面后面加上经纬度，经纬度可以在这里获取自己位置的：获取经纬度


# linux,do.js
注意首次运行需要在面板中设置执行前命令，执行成功后可去掉
apk add chromium
apk add chromium-chromedriver

# 环境变量
export LINUXDO_USERNAME = "用户名"
export LINUXDO_PASSWORD = "密码"
export SCROLL_DURATION = 5 // 首页滚轮滚动时间，控制加载帖子数量，默认为0秒
export VIEW_COUNT = 1000 // 点赞要求的帖子浏览量，默认大于1000浏览量才进行点赞
