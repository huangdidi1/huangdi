$(function () {
    //正则
    var json={
        user:/^([a-zA-Z]{1}[a-zA-Z0-9]{7,15})$/,
        password: /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{6,16}$/,
        code:/^([a-zA-Z0-9]{4})$/,
        pcode:/^([0-9]{6})$/
    }
//验证码
    var code;
    var phone;
    function createCode(){
        code="";
        var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R', 'S','T','U','V','W','X','Y','Z');
        for(var i = 0; i <4; i++) {
            var index = Math.floor(Math.random()*36);
            code += random[index];
        }
        $('.inp2').val(code);
    }
    createCode();
    $('.partone-bot a').click(function () {
        createCode();
    });
    $('.partthree-bot a').click(function () {
        createCode();
    });
    $('.inp2').click(function () {
        createCode();
    });




    //01的账号框
    $('.partone-top input').blur(function () {
        if($('.partone-top input').val() != ''){
            if(!json.user.test($('.partone-top input').val())){
                $('.partone-top span').css('visibility','visible');
            }else{
                $('.partone-top span').css('visibility','hidden');
            }
        }else{
            $('.partone-top span').css('visibility','hidden');
        }
    })
    //在01点下一步时
    $('.nextone').click(function () {
        if($('.partone-bot .inp1').val()== ''){
            myalert('请输入验证码!');
        }else if(!json.code.test($('.partone-bot .inp1').val())){
            myalert('验证码格式错误!');
        }else if(!json.user.test($('.partone-top input').val())){
            myalert('请输入正确的账号!');
            createCode();
            $('.partone-bot .inp1').val('');
        }else if($('.partone-bot .inp1').val().toUpperCase() != code){
            myalert('验证码错误!');
            createCode();
            $('.partone-bot .inp1').val('');
        }else {
            $.ajax({
                url:'/Dnext',
                data:{user:$('.partone-top input').val()},
                success:function (res) {
                    if(res.error){
                        myalert('该账号不存在!');
                        createCode();
                        $('.partone-bot .inp1').val('');
                    }else{
                        $('.partone').css('display','none');
                        $('.parttwo').css('display','block');
                        $('.parttwo-top span').html($('.partone-top input').val());
                        var str=res.phone;
                        phone=res.phone;
                        var str1=str.substring(0,3);
                        var str2=str.substring(7,11);
                        $('.parttwo-mid span').html(str1+'****'+str2);
                        $('.header h1:eq(1)').addClass('opone');
                        $('.header p:eq(1)').addClass('optwo');
                    }
                }
            })
        }
    })
    //点击获取验证码
    $('.parttwo-mid button').click(function () {
        $('.parttwo-mid button').prop('disabled',true);
        $('.parttwo-mid button').css('opacity',0.5);
        var time=60;
        var timer;
        timer=setInterval(function () {
            $('.parttwo-mid button').html(''+time+'秒后重发');
            time--;
            if(time<0){
                clearInterval(timer);
                $('.parttwo-mid button').prop('disabled',false);
                $('.parttwo-mid button').html('再次发送');
                $('.parttwo-mid button').css('opacity',1);
            }
        },1000);
        $.ajax({
            url:'/Dcode',
            data:{phone:phone},
            success:function (res) {
                console.log(res.error);
            }
        })
    })
    //在02点确定的时候
    $('.nexttwo').click(function () {
        if($('.parttwo-bot input').val() == ''){
            myalert('请输入验证码!');
        }else if(!json.pcode.test($('.parttwo-bot input').val())){
            myalert('验证码格式错误!');
            $('.parttwo-bot input').val('');
        }else{
            $.ajax({
                url:'/Dregister',
                data:{
                    phone:phone,
                    code:$('.parttwo-bot input').val()
                },
                success:function (res) {
                    console.log(res.error)
                    if(res.error){
                        myalert('验证码错误!');
                        $('.parttwo-bot input').val('');
                    }else {
                        $('.parttwo').css('display','none');
                        $('.partthree').css('display','block');
                        $('.header h1:eq(2)').addClass('opone');
                        $('.header p:eq(2)').addClass('optwo');
                        createCode();
                    }
                }
            })
        }
    })

    //新密码
    $('.partthree-top input').focus(function () {
        $('.partthree-top span').css('visibility','visible');
        $('.partthree-top span').addClass('green').removeClass('red');
        $('.partthree-top span').html('* 密码由字母数字字符最少两种组成,6-16位。');
    })
    $('.partthree-top input').blur(function () {
        again();
        if($('.partthree-top input').val()==''){
            $('.partthree-top span').addClass('red').removeClass('green');
            $('.partthree-top span').html('* 请先输入密码。');
        }
        else if(!json.password.test($('.partthree-top input').val())){
            $('.partthree-top span').addClass('red').removeClass('green');
            $('.partthree-top span').html('* 密码格式不正确。');
        }else{
            $('.partthree-top span').addClass('green').removeClass('red');
            $('.partthree-top span').html('* 密码格式正确。');
        }
    })
    //再次确认密码
    $('.partthree-mid input').blur(function () {
        again();
    })
    function again() {
        if(!$('.partthree-mid input').val() == ''){
            if($('.partthree-top input').val() != ''){
                if($('.partthree-mid input').val()==$('.partthree-top input').val()){
                    $('.partthree-mid span').css('visibility','visible');
                    $('.partthree-mid span').addClass('green').removeClass('red');
                    $('.partthree-mid span').html('* 两次密码一致。');
                }else{
                    $('.partthree-mid span').css('visibility','visible');
                    $('.partthree-mid span').addClass('red').removeClass('green');
                    $('.partthree-mid span').html('* 两次密码输入不一致，请重新输入。');
                }
            }
        }
    }
    //在03点重设密码的时候
    $('.nextthree').click(function () {
        if($('.partthree-bot .inp1').val()==''){
            myalert('请输入验证码!');
        }else if(!json.code.test($('.partthree-bot .inp1').val())){
            myalert('验证码格式错误!');
            createCode();
            $('.partthree-bot .inp1').val('');
        }else if($('.partthree-top span').html() !='* 密码格式正确。' ||  $('.partthree-mid span').html()!='* 两次密码一致。') {
            myalert('请输入正确的密码!');
        }else if($('.partthree-bot .inp1').val().toUpperCase() != code){
            myalert('验证码错误!');
            createCode();
            $('.partthree-bot .inp1').val('');
        }else{
            $.ajax({
                url:'/Dreset',
                data:{
                    phone:phone,
                    pass:$('.partthree-top input').val()
                },
                success:function (res) {
                    if(!res.error){
                        $('.partthree').css('display','none');
                        $('.partfour').css('display','block');
                        $('.header h1:eq(3)').addClass('opone');
                        $('.header p:eq(3)').addClass('optwo');
                        var time=4;
                        var timer;
                        timer=setInterval(function () {
                            $('.partfour .p1').html('将于'+time+'秒后跳转到');
                            time--;
                            if(time<0){
                                clearInterval(timer);
                                window.location='http://localhost:2000/pages/login.html';
                            }
                        },1000);
                    }
                }
            })
        }
    })
    //在04
    $('.partfour a').click(function () {
        window.location='http://localhost:2000/pages/login.html';
    })
    //提示函数
    function myalert(str) {
        $('#tip').show();
        $('.mid p').html(str);
    }
    $('.big a').click(function () {
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

