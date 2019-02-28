$(function () {
    //获取注册时输入的手机号码
    var rephone=localStorage.phone;
    delete localStorage.phone;
    //正则
    var json={
        name:/^([\w(\u4e00-\u9fa5)]){2,6}$/,
        user:/^([a-zA-Z]{1}[a-zA-Z0-9]{7,15})$/,
        password: /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{6,16}$/,
        code:/^([a-zA-Z0-9]{4})$/
    }
    //昵称
    $('.name input').focus();
    $('.name input').focus(function () {
        $('.name span').addClass('green').removeClass('red');
        $('.name span').html('* 昵称由字母数字汉字下划线组成,2-6位。');
    })
    $('.name input').blur(function () {
        if($('.name input').val()==''){
            $('.name span').addClass('red').removeClass('green');
            $('.name span').html('* 请输入您的昵称!');
        }
        else if(!json.name.test($('.name input').val())){
            $('.name span').addClass('red').removeClass('green');
            $('.name span').html('* 昵称格式错误!');
        }else{
            $.ajax({
                url:'/Dname',
                data:{name:$('.name input').val()},
                success:function (res) {
                   if(res.data){
                       $('.name span').addClass('red').removeClass('green');
                       $('.name span').html('* 该昵称已经被他人使用!');
                   }else{
                       $('.name span').addClass('green').removeClass('red');
                       $('.name span').html('* 可以使用的昵称!');
                   }
                }
            })
        }
    })
    //账号
    $('.user input').focus(function () {
        $('.user span').css('visibility','visible');
        $('.user span').addClass('green').removeClass('red');
        $('.user span').html('* 账号以字母开头,由英文字母和数字组成的8-16位字符。');
    })
    $('.user input').blur(function () {
        if($('.user input').val()==''){
            $('.user span').addClass('red').removeClass('green');
            $('.user span').html('* 请输入您的账号!');
        }
        else if(!json.user.test($('.user input').val())){
            $('.user span').addClass('red').removeClass('green');
            $('.user span').html('* 账号格式错误!');
        }else{
            $.ajax({
                url:'/Duser',
                data:{user:$('.user input').val()},
                success:function (res) {
                    if(res.data){
                        $('.user span').addClass('red').removeClass('green');
                        $('.user span').html('* 该账号已经被他人使用!');
                    }else{
                        $('.user span').addClass('green').removeClass('red');
                        $('.user span').html('* 可以使用的账号!');
                    }
                }
            })
        }
    })
    //密码
    $('.pass input').focus(function () {
        $('.pass span').css('visibility','visible');
        $('.pass span').addClass('green').removeClass('red');
        $('.pass span').html('* 密码由字母数字字符最少两种组成,6-16位。');
    })
    $('.pass input').blur(function () {
        again();
        if($('.pass input').val()==''){
            $('.pass span').addClass('red').removeClass('green');
            $('.pass span').html('* 请先输入密码。');
        }
        else if(!json.password.test($('.pass input').val())){
            $('.pass span').addClass('red').removeClass('green');
            $('.pass span').html('* 密码格式不正确。');
        }else{
            $('.pass span').addClass('green').removeClass('red');
            $('.pass span').html('* 密码格式正确。');
        }
    })
    //再次确认密码
    $('.againpass input').blur(function () {
        again();
    })
    function again() {
        if(!$('.againpass input').val()==''){
            if($('.pass input').val()!=''){
                if($('.againpass input').val()==$('.pass input').val()){
                    $('.againpass span').css('visibility','visible');
                    $('.againpass span').addClass('green').removeClass('red');
                    $('.againpass span').html('* 两次密码一致。');
                }else{
                    $('.againpass span').css('visibility','visible');
                    $('.againpass span').addClass('red').removeClass('green');
                    $('.againpass span').html('* 两次密码输入不一致，请重新输入。');
                }
            }
        }
    }
    //验证码
    var code ;
    function createCode(){
        code="";
        var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R', 'S','T','U','V','W','X','Y','Z');
        for(var i = 0; i <4; i++) {
            var index = Math.floor(Math.random()*36);
            code += random[index];
        }
        $('#inp2').val(code);
    }
    createCode();
    $('.code a').click(function () {
        createCode();
    });
    $('#inp2').click(function () {
        createCode();
    });
    //当点击注册并登陆的时候
    $('.sure').click(function () {
        if($('.name span').html()=='* 可以使用的昵称!' && $('.user span').html()=='* 可以使用的账号!' && $('.pass span').html()=='* 密码格式正确。' && $('.againpass span').html()=='* 两次密码一致。'){
            var inputcode=$('#inp1').val().toUpperCase();
            if(inputcode.length == 0){
                myalert('请输入验证码!');
            }else if(!json.code.test(inputcode)){
                myalert('验证码格式错误!');
            }else if(inputcode != code){
                myalert('验证码不正确!');
            }else{
                $.ajax({
                    url:'/Dsubmit',
                    type:'post',
                    data:{
                        name:$('.name input').val(),
                        user:$('.user input').val(),
                        pass:$('.pass input').val(),
                        phone:rephone
                    },
                    success:function (res) {
                        if(!res.error){
                            window.location='./index.html?uid='+res.id;
                        }
                    }
                })
            }
        }else{
            myalert('信息填写有误!');
        }
    })
    //提示函数
    function myalert(str) {
        $('#tip').show();
        $('.mid p').html(str);
    }
    $('.big a').click(function () {
        if($('.mid p').html()=='验证码格式错误!' || $('.mid p').html()=='验证码不正确!'){
            createCode();
            $('#inp1').val('');
        }
        $('#tip').hide();
    })
//导航
    function nav(){
        $('.reg-login').click(function(){
            window.location.href=`./login.html`;
        });
        $('.video-class').click(function(){
            window.location.href=`./classtype1.html?uid=${userId}`;
        });
        $('.shop-mall').click(function(){
            window.location.href=`./shoplist.html?uid=${userId}`;
        });
        $('.community-page').click(function(){
            window.location.href=`./community.html?uid=${userId}`;
        });
        // $('.shop-car').click(function(){
        //     window.location.href=`./shoppingtrolley.html?uid=${userId}`;
        // });
        // $('.penson-center').click(function(){
        //     window.location.href=`./mine.html?uid=${userId}`;
        // });
        // $('.return-index').click(function(){
        //     window.location.href=`./index.html?uid=${userId}`;
        // });
    };
    nav();



})