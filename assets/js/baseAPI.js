//每次调用$.get() $.post() $.ajax()时候会先调用这个函数
// 在这个函数中可以拿到给AJax提供的配置对象
$.ajaxPrefilter(function(options) {
    console.log(options.url);
    //再发起真真的个ajax请求之前 统一拼接根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;

    //统一为有权限的接口,设置 headers 请求
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || '',
        }
    };

    //全局统一挂在 complete 回调函数 
    options.complete = function(res) {
        // 在complete回调函数中,可以使用res.responseJSON 拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //1.强制清空token
            localStorage.removeItem('token');
            // 2.强制跳转岛登陆页
            location.href = 'login.html';

        }
    }

})