// ==UserScript==
// @name         🌀iOS 
// @version      1.0
// @description  iOS专用的VIP视频解析脚本，支持主流视频网站
// @author       Your Name
// @icon         data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='13' fill='%23007AFF'/%3E%3Cpath d='M32 16c8.837 0 16 7.163 16 16s-7.163 16-16 16-16-7.163-16-16 7.163-16 16-16' fill='white'/%3E%3C/svg%3E
// @match        *://*.youku.com/*
// @match        *://*.iqiyi.com/*
// @match        *://*.v.qq.com/*
// @match        *://*.mgtv.com/*
// @match        *://*.bilibili.com/*
// @match        *://*.tudou.com/*
// @compatible   safari
// @grant        GM_getValue
// @grant        GM_setValue
// @run-at       document-start
// @noframes
// ==/UserScript==

(function() {
    'use strict';
    
    // 解析接口列表
    const PARSE_APIS = [
        { name: "虎牙解析", "url": "https://huyajx.com/play?url=" },
        { "name": "虾米-1", "url": "https://jx.xmflv.com/?url=" },
        { "name": "虾米-2", "url": "https://jx.xmflv.cc/?url=" },
        // 新增接口
        { name: "熊二解析", "url": "http://47.94.240.226:9911/analysis/api/xionger2.php?url=" },
        { name: "火花解析", "url": "https://api.huohua.live/api/?key=m5CK267ypabEU1jBNS&url=" },
    ];

    // 创建悬浮按钮
    function createFloatingButton() {
        const btn = document.createElement('div');
        btn.innerHTML = `
            <div id="vip-parse-btn" style="
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: rgba(0,122,255,0.9);
                color: white;
                padding: 10px 20px;
                border-radius: 20px;
                font-size: 14px;
                z-index: 999999;
                box-shadow: 0 2px 10px rgba(0,0,0,0.2);
                -webkit-backdrop-filter: blur(10px);
                backdrop-filter: blur(10px);
            ">
                VIP解析
            </div>
        `;
        
        document.body.appendChild(btn);
        
        // 点击事件
        btn.onclick = function() {
            showParseDialog();
        };
    }

    // 显示解析对话框
    function showParseDialog() {
        const dialog = document.createElement('div');
        dialog.innerHTML = `
            <div id="parse-dialog" style="
                position: fixed;
                bottom: 80px;
                right: 20px;
                background: rgba(255,255,255,0.95);
                padding: 15px;
                border-radius: 15px;
                z-index: 999999;
                box-shadow: 0 2px 20px rgba(0,0,0,0.1);
                -webkit-backdrop-filter: blur(10px);
                backdrop-filter: blur(10px);
            ">
                <div style="margin-bottom:10px;font-weight:bold;color:#333">选择解析线路</div>
                ${PARSE_APIS.map((api, index) => `
                    <div class="parse-item" data-url="${api.url}" style="
                        padding: 8px 15px;
                        margin: 5px 0;
                        background: rgba(0,122,255,0.1);
                        border-radius: 8px;
                        color: #007AFF;
                        cursor: pointer;
                    ">${api.name}</div>
                `).join('')}
            </div>
        `;
        
        document.body.appendChild(dialog);
        
        // 绑定点击事件
        dialog.querySelectorAll('.parse-item').forEach(item => {
            item.onclick = function() {
                const url = this.dataset.url + location.href;
                window.open(url, '_blank');
                dialog.remove();
            };
        });
        
        // 点击外部关闭
        document.addEventListener('click', function closeDialog(e) {
            if (!e.target.closest('#parse-dialog') && !e.target.closest('#vip-parse-btn')) {
                dialog.remove();
                document.removeEventListener('click', closeDialog);
            }
        });
    }

    // 等待页面加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createFloatingButton);
    } else {
        createFloatingButton();
    }
})(); 