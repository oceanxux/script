# new Env("恩山无线签到")
# cron 3 10 * * *
import requests
from lxml import etree
import os
import sys
import time
import re

requests.packages.urllib3.disable_warnings()

try:
    import notify
except ImportError:
    notify = None

cookie = os.environ.get("enshan_COOKIE")

def get_balance():
    url = "https://www.right.com.cn/forum/home.php?mod=spacecp&ac=credit&op=log&suboperation=creditrulelog"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:85.0) Gecko/20100101 Firefox/85.0',
        'Connection': 'keep-alive',
        'Host': 'www.right.com.cn',
        'Upgrade-Insecure-Requests': '1',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2',
        'Accept-Encoding': 'gzip, deflate, br',
        'Cookie': cookie
    }

    session = requests.session()
    response = session.get(url, headers=headers)

    try:
        # 使用更健壮的方式处理正则匹配
        credit_match = re.search(r'积分:\s*(\d+)', response.text)

        if credit_match:
            credit_amount = credit_match.group(1)
            res = f'当前总积分：{credit_amount}'
        else:
            res = '未能正确获取积分信息'

    except Exception as e:
        res = f'未能正确获取积分信息\n{str(e)}'

    return res

def sign_in():
    result_msg = ""
    s = requests.Session()
    s.headers.update({'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:85.0) Gecko/20100101 Firefox/85.0'})

    # 签到
    url = "https://www.right.com.cn/forum/home.php?mod=spacecp&ac=credit&op=log&suboperation=creditrulelog"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:85.0) Gecko/20100101 Firefox/85.0',
        'Connection': 'keep-alive',
        'Host': 'www.right.com.cn',
        'Upgrade-Insecure-Requests': '1',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2',
        'Accept-Encoding': 'gzip, deflate, br',
        'Cookie': cookie
    }

    try:
        r = s.get(url, headers=headers, timeout=120)
        if '每天登录' in r.text:
            h = etree.HTML(r.text)
            data = h.xpath('//tr/td[6]/text()')
            last_sign_in_time = data[0]
            result_msg = f'签到成功或今日已签到，最后签到时间：{last_sign_in_time}'
            
            # 在推送中添加签到余额等信息
            balance_info = get_balance()
            result_msg += f'\n{balance_info}'

        else:
            result_msg = '签到失败，可能是cookie失效了！'
            
    except requests.RequestException as e:
        result_msg = f'无法正常连接到网站，请尝试改变网络环境，试下本地能不能跑脚本，或者换几个时间点执行脚本。错误信息: {str(e)}'
    except Exception as e:
        result_msg = f'发生未知错误: {str(e)}'
    
    try:
        if notify:
            notify.send("铁子今日恩山论坛开始签到", result_msg)
    except NameError:
        pass

    return result_msg + '\n'

def main():
    msg = sign_in()
    print(msg)
    return msg

if __name__ == "__main__":
    print("----------恩山论坛开始尝试签到----------")
    main()
    print("----------恩山论坛签到执行完毕----------")
