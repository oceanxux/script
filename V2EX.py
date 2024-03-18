# 20 15 * * *
import requests
import os
import re
from notify import send

class V2ex:
    name = "V2EX 论坛签到"


    def __init__(self, check_item):
        self.check_item = check_item

    @staticmethod
    def sign(session, cookie, proxies=None):
        msg = []
        response = session.get(url="https://www.v2ex.com/mission/daily", verify=True, cookies=cookie, proxies=proxies)
        pattern = (
            r"<input type=\"button\" class=\"super normal button\""
            r" value=\".*?\" onclick=\"location\.href = \'(.*?)\';\" />"
        )
        urls = re.findall(pattern=pattern, string=response.text)
        url = urls[0] if urls else None
        if url is None:
            return "cookie 可能过期"
        elif url != "/balance":
            headers = {"Referer": "https://www.v2ex.com/mission/daily"}
            data = {"once": url.split("=")[-1]}
            _ = session.get(
                url="https://www.v2ex.com" + url,
                verify=False,
                headers=headers,
                params=data,
                cookies=cookie,
                proxies=proxies,
            )
        response = session.get(url="https://www.v2ex.com/balance", verify=False, cookies=cookie, proxies=proxies)
        total = re.findall(
            pattern=r"<td class=\"d\" style=\"text-align: right;\">(\d+\.\d+)</td>",
            string=response.text,
        )
        total = total[0] if total else "签到失败"
        today = re.findall(
            pattern=r'<td class="d"><span class="gray">(.*?)</span></td>',
            string=response.text,
        )
        today = today[0] if today else "签到失败"
        username = re.findall(
            pattern=r"<a href=\"/member/.*?\" class=\"top\">(.*?)</a>",
            string=response.text,
        )
        username = username[0] if username else "用户名获取失败"
        msg += [
            {"name": "帐号信息", "value": username},
            {"name": "今日签到", "value": today},
            {"name": "帐号余额", "value": total},
        ]
        response = session.get(url="https://www.v2ex.com/mission/daily", verify=False, cookies=cookie, proxies=proxies)
        data = re.findall(
            pattern=r"<div class=\"cell\">(.*?)天</div>", string=response.text
        )
        data = data[0] + "天" if data else "获取连续签到天数失败"
        msg += [
            {"name": "签到天数", "value": data},
        ]
        return msg

    def main(self):
        cookie_str = os.environ.get("V2EX_COOKIE")
        if not cookie_str:
            return "未设置 V2EX_COOKIE 环境变量，请检查是否已正确设置"
        cookie = {}
        for item in cookie_str.split(";"):
            key, value = item.strip().split("=", 1)
            cookie[key] = value

        session = requests.session()
        session.headers.update(
            {
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36 Edg/87.0.664.66",
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
            }
        )
        
        # 添加代理设置，如果有的话
        proxies = {
            "http": "http://192.168.31.188:7890",  #代理地址
            "https": "http://192.168.31.188:7890"  #代理地址
        }

        msg = self.sign(session=session, cookie=cookie, proxies=proxies)
        msg = "\n".join([f"{one.get('name')}: {one.get('value')}" for one in msg])
        send('V2EX签到结果', msg)  # 使用sendNotify发送Telegram通知
        return msg

if __name__ == "__main__":
    print("----------V2EX 论坛开始尝试签到----------")
    print(V2ex(check_item={}).main())
    print("----------V2EX 论坛签到执行完毕----------")
