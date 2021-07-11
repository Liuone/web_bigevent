$(function() {
    //点击“去注册账号”的链接
    $('#link_reg').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();
    });
    //点击“去登陆”的连接
    $('#link_login').on('click', function() {
        $('.login-box').show();
        $('.reg-box').hide();
    });

    //从layui种获取form对象
    var form = layui.form;
    var layer = layui.layer;
    //通过form.varify()自定义规则
    form.verify({
            //自定义pwd校验规则
            pwd: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            //校验两次密码是否一致规则
            repwd: function(value) {
                //通过形参拿到的是确认密码框中的内容
                //还需要拿到密码框内容
                //然后进行一次等于判断 如果判断失败 return 一个消息
                var pwd = $('.reg-box [name=password]').val();
                if (pwd !== value) {
                    return '两次密码不一致';
                };
            }
        }),
        //监听表单注册事件
        $('#form_reg').on('submit', function(e) {
            //1.阻止默认的提交行为
            e.preventDefault();
            //2.发起ajax POST请求
            $.post('/api/reguser', {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val(),
            }, function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message, { icon: 6 });
                };
                layer.msg('注册成功', { icon: 6 });
                $('#link_login').click();
            })
        }),

        //监听表单登录事件
        $('#form_login').submit(function(e) {
            //1.阻止默认的提交行为
            e.preventDefault();
            // 2.发起Ajax POST请求
            $.ajax({
                method: 'POST',
                url: '/api/login',
                //快速获取表单数据
                data: $(this).serialize(),
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message, { icon: 6 });
                    };
                    layer.msg('登录成功', { icon: 6 });
                    //将登录成功得到的token字符串 保存到localStorage中
                    localStorage.setItem('token', res.token);
                    //跳转到后台主页
                    location.href = '/index.html';
                }
            })
        })
})