$(function () {
    var user='';     //记住账号所用
    var phone='';    //记住注册成功的手机号码
    if(!localStorage.user){
        $('.user input').val('');
    }else{
        $('.user input').val(localStorage.user);
    }
    $('.user input').focus();
    //正则
    var json={
        phone:/^(1[3-9]\d{9})$/,
        code:/^([0-9]{6})$/,
        user:/^([a-zA-Z]{1}[a-zA-Z0-9]{7,15})$/,
        password: /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{6,16}$/
    }
    //账号框
    $('.user input').blur(function () {
        if($('.user input').val()== ''){
            $('.user p').html('请输入账号!');
            $('.user p').css('visibility','visible');
            $('.user p').addClass('red').removeClass('green');
        }else if(!json.user.test($('.user input').val())){
            $('.user p').html('账号格式错误!');
            $('.user p').css('visibility','visible');
            $('.user p').addClass('red').removeClass('green');
        }else{
            $('.user p').css('visibility','hidden');
        }
    })
    //密码框
    $('.pass input').blur(function () {
        if($('.pass input').val()== ''){
            $('.pass p').html('请输入密码!');
            $('.pass p').css('visibility','visible');
            $('.pass p').addClass('red').removeClass('green');
        }else if(!json.password.test($('.pass input').val())){
            $('.pass p').html('密码格式错误!');
            $('.pass p').css('visibility','visible');
            $('.pass p').addClass('red').removeClass('green');
        }else{
            $('.pass p').css('visibility','hidden');
        }
    })
    //点登录按钮的时候
    $('.login').click(function () {
        if($('.user input').val()== '' && $('.pass input').val()== ''){
            myalert('请输入账号和密码!');
        }else if(!json.user.test($('.user input').val()) || !json.password.test($('.pass input').val())){
            myalert('账号或密码格式不正确!');
        }else{
            $.ajax({
                url:'/Dlogin',
                data:{
                    user:$('.user input').val(),
                    pass:$('.pass input').val()
                },
                type:'post',
                success:function (res) {
                    if(res.error){
                        myalert('账号或密码错误!');
                    }else{
                        user=$('.user input').val();
                        if($('.remember input').prop('checked') == true){
                            localStorage.user=user;
                            window.location='./index.html?uid='+res.id;
                        }else{
                            localStorage.user='';
                            window.location='./index.html?uid='+res.id;
                        }
                    }
                }
            })
        }
    })
    //手机号码框
    $('.phone input').on('input',function () {
        if(!json.phone.test($('.phone input').val())){
            $('.code button').css('opacity',0.5);
            $('.code button').attr('disabled',true);
            $('.phone p').html('请输入正确的手机号');
            $('.phone p').css('visibility','visible');
            $('.phone p').addClass('red').removeClass('green');
        }else{
            $.ajax({
                url:'/Dphone',
                data:{phone:$('.phone input').val()},
                success:function(res) {
                     if(res.data){
                         $('.code button').css('opacity',0.5);
                         $('.code button').attr('disabled',true);
                         $('.phone p').html('该手机号已被注册');
                         $('.phone p').css('visibility','visible');
                         $('.phone p').addClass('red').removeClass('green');
                     }else{
                         $('.code button').css('opacity',1);
                         $('.code button').prop('disabled',false);
                         $('.phone p').css('visibility','hidden');
                     }
                }
            })
        }
    })
    //获取验证码按钮被点击时
    $('.code button').click(function () {
        phone=$('.phone input').val();
        $('.code button').css('opacity',0.5);
        $('.code button').attr('disabled',true);
        $('.phone input').attr('disabled',true);
        var time=60;
        var timer;
        myalert('发送成功!');
        timer=setInterval(function () {
            $('.code button').html(''+time+'秒后可重发');
            time--;
            if(time<0){
                clearInterval(timer);
                phone='';
                $('.code button').html('再次发送');
                $('.code button').css('opacity',1);
                $('.code button').attr('disabled',false);
                $('.phone input').attr('disabled',false);
            }
        },1000)
        $.ajax({
            url:'/Dcode',
            data:{phone:phone},
            success:function (res) {
                console.log(res.error);
            }
        })
    })
    //协议
    $('.agree input').click(function () {
        if($('.agree input').prop('checked') == true){
            $('.agree p').css('visibility','hidden');
        }else{
            $('.agree p').css('visibility','visible');
            $('.agree p').addClass('red').removeClass('green');
        }
    })
    //当点注册按钮的时候
    $('.register').click(function () {
        if(phone==''){
            myalert('请先验证短信!');
        }else if($('.agree input').prop('checked') == false){
            $('.agree p').css('visibility','visible');
            $('.agree p').addClass('red').removeClass('green');
        }else if(!json.code.test($('.code input').val())){
            myalert('验证码格式错误!');
            $('.code input').val('');
        }else {
            $.ajax({
                url:'/Dregister',
                data:{
                    phone:phone,
                    code:$('.code input').val()
                },
                success:function (res) {
                    console.log(res.error)
                    if(res.error){
                        myalert('验证码错误!');
                        $('.code input').val('');
                    }else {
                        localStorage.phone=phone;
                        window.location='./register.html';
                    }
                }
            })
        }

    })
    //登录与注册切换
    $('#tab-login').click(function () {
        $('#tab-login').addClass('dfirst').siblings().removeClass('dfirst');
        $('#box-mid-left').css('display','block');
        $('#box-mid-right').css('display','none');
    })
    $('#tab-register').click(function () {
        $('#tab-register').addClass('dfirst').siblings().removeClass('dfirst');
        $('#box-mid-left').css('display','none');
        $('#box-mid-right').css('display','block');
    })
    //提示函数
    function myalert(str) {
        $('#tip').show();
        $('.mid p').html(str);
    }
    $('.big a').click(function () {
        $('#tip').hide();
    })
    //三方登录
    $('.threeout').on('click','li',function () {
        myalert('此功能正在开发中，尽情期待!');
    })
    //跳转登录密码界面
    $('.remember a').click(function () {
        window.location='./password.html';
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












