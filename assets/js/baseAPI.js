//每次调用$.get() $.post() $.ajax()时候会先调用这个函数
// 在这个函数中可以拿到给AJax提供的配置对象
$.ajaxPrefilter(function(options) {
    console.log(options.url);
    //再发起真真的个ajax请求之前 统一拼接根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;
})