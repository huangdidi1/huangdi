/**
 * Created by Administrator on 2018/12/7.
 */
$(function () {
    var information=window.location.search.split('&');
    var u_id=information[0].split('=')[1];
    var p_id=information[1].split('=')[1];
    var newu_id=information[2].split('=')[1];
    console.log(newu_id);
    var arr1=[];
    var oText=$('textarea');
    var uhair;
    var newname;
    $.ajax({
        url:'/uname',
        data:{u_id:newu_id},
        success:function (res) {
            newname=res.u_name;
            uhair=res.u_img;
        }
    });//获取用户名字头像
    $.ajax({
        url:'/iscollect',
        type:'post',
        data:{
            p_id:p_id,
            u_id:newu_id
        },
        success:function (res) {
            if(res.error==0){
                $('.u1').css('color','#1e97a2');
            }else{
                $('.u1').css('color','#b9b7be');
            }
        }
    });//是否收藏
    $.ajax({
        url:'/iszan',
        type:'post',
        data:{
            p_id:p_id,
            u_id:newu_id
        },
        success:function (res) {
            if(res.error==0){
                $('.izan').css('color','#1e97a2');
            }else{
                $('.izan').css('color','#b9b7be');
            }
        }
    });//是否赞
    $.ajax({
        url:'/inload',
        type:'post',
        data:{
            u_id:u_id,
            p_id:p_id
        },
        success:function (res) {
             console.log(res);
            var reg=/[[\u4e00-\u9fa5]+]/g;
            $('.top img').attr('src',res.json.head);
            $('.user').html(res.json.name);
            var arr=res.json.p_time.split('-');
            console.log(arr);
            var str=arr[0]+'年'+arr[1]+'月'+arr[2].split(' ')[0]+'日 '+arr[2].split(' ')[1];
            $('.time').html(str);
            arr=res.json.src.split('|');
            for(var i=0;i<arr.length;i++){
                var img=$('<img src="" alt="">');
                img.attr('src',arr[i]);
                $('.mid').append(img);
            }
            var strimg=res.json.look.split('%');
            $('.bottom').html(res.json.p_content.replace(reg,'<img src="'+strimg[0]+'">'));
            for(var i=0;i<strimg.length;i++){
                $('.bottom').children().eq(i).attr('src',strimg[i])
            }
            $('.count span').html(res.json.p_zan);
            $('.count u').html(res.json.p_discuss);
            var dis=res.dis;
            if(res.json.p_discuss){
                for(var i=0;i<dis.length;i++){
                    var strr=dis[i].d_time.match(/\d+:\d+:\d+/);
                    var reg=/[[\u4e00-\u9fa5]+]/g;
                    var content=dis[i].d_content.replace(reg,'<img src="">');
                    var strimg=dis[i].src.split('%');
                    var oDiv=$(`<div u_id="${dis[i].u_id}" d_id="${dis[i].d_id}" class="single-reply clearfix">
                    <img class="ui-avatar" src="${dis[i].u_img}" alt="">
                    <div class="comments-content">
                        <a href="">${dis[i].u_name}</a>:
                        <em class="em1">${content}</em>
                        <div class="ri">
                            <em class="em2">${strr}</em>
                            <i class="iconfont1 i1">&#xe648;</i>
                            <em class="iconfont1 em3">&#xe630;</em>
                        </div>
                    </div>
                </div><div class="comments-list"><ul></ul></div>`);
                    var object=oDiv.children().eq(1).children().eq(1).children();
                    for(var j=0;j<strimg.length;j++){
                        object.eq(j).attr('src',strimg[j])
                    }
                    $('.cont').prepend(oDiv);
                }
                $.ajax({
                    url:'/rep',
                    type:'post',
                    data:{
                        p_id:p_id
                    },
                    success:function (res) {
                        console.log(res);
                        var rep=res;
                        $('.single-reply').each(function () {
                            var obj=$(this).next().children();
                            for(var i=0;i<rep.length;i++){
                                if($(this).attr('d_id')==rep[i].d_id){
                                    var strimg=rep[i].r_src.split('%');
                                    var reg=/[[\u4e00-\u9fa5]+]/g;
                                    var strr=rep[i].r_time.match(/\d+:\d+:\d+/);
                                    var content1=rep[i].r_content.replace(reg,'<img src="">');
                                    var oList=$(`<li r_id="${rep[i].r_id}" u_id="${rep[i].r_newid}" d_id="${rep[i].d_id}" p_id="${rep[i].p_id}">
                            <div class="single1-reply clearfix">
                                <img class="ui-avatar" src="${rep[i].r_newsrc}" alt="">
                                <div class="comments-content">
                                    <a class="a1" href="">${rep[i].r_oldname}</a>
                                    <i class="i4">回复</i>
                                    <a class="a2" href="">${rep[i].r_newname}</a>
                                    <em class="em7">${content1}</em>
                                    <div class="ri1">
                                        <em class="em5">${strr}</em>
                                        <i class="iconfont1 i2">&#xe648;</i>
                                        <em class="iconfont1 em4">&#xe630;</em>
                                    </div>
                                </div>
                            </div>
                        </li>`);
                                    var obj2=oList.children().children().children().children().eq(1).children().eq(3).children();
                                    for(var j=0;j<strimg.length;j++){
                                        obj2.eq(j).attr('src',strimg[j])
                                    }
                                    obj.append(oList);
                                }
                            }
                        })
                    }
                });
            }else{
                $('.cont').hide();
            }
        }
    });//页面加载
    var userId='';
    function nav(){
        if(window.location.search.match(/(?<=uid=)\d+/).length){
            userId=window.location.search.match(/(?<=uid=)\d+/)[0];
            console.log(userId);
            $('.reg-login').html('退出登录')
        }
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
        $('.shop-car').click(function(){
            window.location.href=`./shoppingtrolley.html?uid=${userId}`;
        });
        $('.person-center').click(function(){
            window.location.href=`./mine.html?uid=${userId}`;
        });
        $('.return-index').click(function(){
            window.location.href=`./index.html?uid=${userId}`;
        });
    };
    nav();
    //评论
    $('.single').click(function () {
        $(this).hide();
        $('.write .text').show();
    });
    //QQ表情
    $('.qq').click(function () {
        $('.icon').fadeIn();
    });
    //关闭
    $('.close').click(function () {
        $('.icon').fadeOut();
    });
    //添加表情
    $('.qqul li').each(function () {
        $(this).click(function () {
            var str=oText.val();
            arr1.push($(this).children().attr('src'));
            // oText.val(str+$(this).attr('title'));
            oText.val(str+'['+$(this).attr('title')+']');
        });
    });
    //发表评论
    $('.btn1').click(function () {
        $('.icon').fadeOut();
        var oDate1=new Date();
        var oDate=oDate1.getFullYear()+'-'+(oDate1.getMonth()+1)+'-'+oDate1.getDate()+' '+oDate1.getHours()+':'+oDate1.getMinutes()+':'+oDate1.getSeconds();
        console.log(oDate);
        var string=$('textarea').val();
        $.ajax({
            url:'/discuss',
            type:'post',
            data:{
                u_id:newu_id,
                p_id:p_id,
                name:arr1.join('%'),
                content:string,
                time:oDate
            },
            success:function (res) {
                console.log(res);
                $('.count u').html(parseInt($('.count u').html())+1);
                $('.cont').show();
                var strr=res.time.split(' ')[1];
                var reg=/[[\u4e00-\u9fa5]+]/g;
                var content=res.content.replace(reg,'<img src="">');
                arr1.length=0;
                var strimg=res.name.split('%');
                var oDiv=$(`<div u_id="${res.u_id}" d_id="${res.d_id}" class="single-reply clearfix">
                    <img class="ui-avatar" src="${uhair}" alt="">
                    <div class="comments-content">
                        <a href="">${res.username}</a>:
                        <em class="em1">${content}</em>
                        <div class="ri">
                            <em class="em2">${strr}</em>
                            <i class="iconfont1 i1">&#xe648;</i>
                            <em class="iconfont1 em3">&#xe630;</em>
                        </div>
                    </div>
                </div>`);
                var object=oDiv.children().eq(1).children().eq(1).children();
                for(var i=0;i<strimg.length;i++){
                    object.eq(i).attr('src',strimg[i])
                }
                $('.cont').prepend(oDiv);
                $('.text').hide();
                $('.single').show();
            }
        });
        arr1.length=0;
        $('textarea').val('');
    });
    //回复
    $('.cont').on('click','.i1',function (e) {
        $('.btn2').unbind('click');
        var obj=$(e.target).parent().parent().parent();
        var userid=$(e.target).parent().parent().parent().attr('u_id');
        var discussid=$(e.target).parent().parent().parent().attr('d_id');
        var usernames=$(e.target).parent().parent().children().eq(0).html();
        $('.single').hide();
        $('.text').show();
        $('textarea').attr('placeholder','回复：'+usernames+'').focus();
        $('.btn1').hide();
        $('.btn2').show();
        console.log($('.btn2'));
        $('.btn2').click(function () {
            var contents=$('textarea').val();
            var oDate1=new Date();
            var oDate=oDate1.getFullYear()+'-'+(oDate1.getMonth()+1)+'-'+oDate1.getDate()+' '+oDate1.getHours()+':'+oDate1.getMinutes()+':'+oDate1.getSeconds();
            $.ajax({
                url:'/reply',
                type:'post',
                data:{
                    replyer_id:newu_id,
                    replyed_id:userid,
                    d_id:discussid,
                    new_name:newname,
                    new_src:uhair,
                    content:contents,
                    src:arr1.join('%'),
                    time:oDate,
                    p_id:p_id
                },
                success:function (res) {
                    console.log(res);
                    $('.count u').html(parseInt($('.count u').html())+1);
                    var strimg=res.src.split('%');
                    var reg=/[[\u4e00-\u9fa5]+]/g;
                    var strr=res.time.split(' ')[1];
                    var content1=res.content.replace(reg,'<img src="">');
                    var oList=$(`<div class="comments-list">
                    <ul>
                        <li r_id="${res.r_id}" u_name="${newname}" u_id="${res.replyer_id}" d_id="${res.d_id}" p_id="${res.p_id}">
                            <div class="single1-reply clearfix">
                                <img class="ui-avatar" src="${uhair}" alt="">
                                <div class="comments-content">
                                    <a class="a1" href="">${newname}</a>
                                    <i class="i4">回复</i>
                                    <a class="a2" href="">${res.replyedname}</a>
                                    <em class="em7">${content1}</em>
                                    <div class="ri1">
                                        <em class="em5">${strr}</em>
                                        <i class="iconfont1 i2">&#xe648;</i>
                                        <em class="iconfont1 em4">&#xe630;</em>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>`);
                    var obj2=oList.children().children().children().children().eq(1).children().eq(3).children();
                    for(var i=0;i<strimg.length;i++){
                        obj2.eq(i).attr('src',strimg[i])
                    }
                    obj.after(oList);
                    arr1.length=0;
                    $('textarea').val('').removeAttr('placeholder');
                    $('.icon1').hide();
                    $('.btn1').show();
                    $('.btn2').hide();
                    $('.text').hide();
                    $('.single').show();

                }

            });
        });
    });
    //回复回复的
    $('.cont').on('click','.i2',function () {
        $('.btn3').unbind('click');
        var obj=$(this).parent().parent().parent().parent();
        var userid=obj.attr('u_id');
        var discussid=obj.attr('d_id');
        var usernames=$(this).parent().parent().children().eq(0).html();
        $('.single').hide();
        $('.text').show();
        $('textarea').attr('placeholder','回复：'+usernames+'').focus();
        $('.btn1').hide();
        $('.btn2').hide();
        $('.btn3').show();
        $('.btn3').click(function () {
            var contents=$('textarea').val();
            var oDate1=new Date();
            var oDate=oDate1.getFullYear()+'-'+(oDate1.getMonth()+1)+'-'+oDate1.getDate()+' '+oDate1.getHours()+':'+oDate1.getMinutes()+':'+oDate1.getSeconds();
            $.ajax({
                url:'/reply1',
                type:'post',
                data:{
                    replyer_id:newu_id,
                    replyed_id:userid,
                    d_id:discussid,
                    content:contents,
                    new_name:newname,
                    new_src:uhair,
                    src:arr1.join('%'),
                    time:oDate,
                    p_id:p_id
                },
                success:function (res) {
                    console.log(res);
                    $('.count u').html(parseInt($('.count u').html())+1);
                    var strimg=res.src.split('%');
                    var reg=/[[\u4e00-\u9fa5]+]/g;
                    var strr=res.time.split(' ')[1];
                    var content1=res.content.replace(reg,'<img src="">');
                    var oList=$(`<li r_id="${res.r_id}" u_id="${res.replyer_id}" d_id="${res.d_id}" p_id="${res.p_id}">
                            <div class="single1-reply clearfix">
                                <img class="ui-avatar" src="${uhair}" alt="">
                                <div class="comments-content">
                                    <a class="a1" href="">${newname}</a>
                                    <i class="i4">回复</i>
                                    <a class="a2" href="">${res.replyedname}</a>
                                    <em class="em7">${content1}</em>
                                    <div class="ri1">
                                        <em class="em5">${strr}</em>
                                        <i class="iconfont1 i2">&#xe648;</i>
                                        <em class="iconfont1 em4">&#xe630;</em>
                                    </div>
                                </div>
                            </div>
                        </li>`);
                    var obj2=oList.children().children().children().children().eq(1).children().eq(3).children();
                    for(var i=0;i<strimg.length;i++){
                        obj2.eq(i).attr('src',strimg[i])
                    }
                    obj.after(oList);
                    arr1.length=0;
                    $('textarea').val('').removeAttr('placeholder');
                    $('.icon1').hide();
                    $('.btn1').show();
                    $('.btn2').hide();
                    $('.btn3').hide();
                    $('.text').hide();
                    $('.single').show();
                }
            });
        });
    });
    //移入显示回复
    $('.cont').on('mouseenter','.single-reply',function () {
        $(this).children().children().eq(2).children().eq(1).show();
        if($(this).attr('u_id')==newu_id){
            $(this).children().children().eq(2).children().eq(2).show();
        }
    });
    $('.cont').on('mouseenter','li',function () {
        $(this).children().children().eq(1).children().eq(4).children().eq(1).show();
        if($(this).attr('u_id')==newu_id){
            $(this).children().children().eq(1).children().eq(4).children().eq(2).show();
        }
    });
    $('.cont').on('mouseleave','li',function () {
        $(this).children().children().eq(1).children().eq(4).children().eq(1).hide();
        $(this).children().children().eq(1).children().eq(4).children().eq(2).hide();
    });
    $('.cont').on('mouseleave','.single-reply',function () {
        $(this).children().children().eq(2).children().eq(1).hide();
        $(this).children().children().eq(2).children().eq(2).hide();
    });
    //收藏
    $('.u1').click(function () {
        $.ajax({
                url:'/iscollect',
                type:'post',
                data:{
                    p_id:p_id,
                    u_id:newu_id
                },
                success:function (res) {
                    if(res.error==0){
                        $.ajax({
                                url:'/uncollect',
                                type:'post',
                                data:{
                                    p_id:p_id,
                                    u_id:newu_id
                                },
                                success:function (res) {
                                    if(res.error==0){
                                        console.log(1)
                                        $('.u1').css('color','#b9b7be');
                                    }
                                }
                        })
                    }else{
                        $.ajax({
                            url:'/collect',
                            type:'post',
                            data:{
                                p_id:p_id,
                                u_id:newu_id
                            },
                            success:function (res) {
                                if(res.error==0){
                                    $('.u1').css('color','#1e97a2');
                                }
                            }
                        })
                    }
                }
            });




    });
    //赞
    $('.izan').click(function () {
        $.ajax({
                url:'/iszan',
                type:'post',
                data:{
                    p_id:p_id,
                    u_id:newu_id
                },
                success:function (res) {
                    if(res.error==0){
                        $.ajax({
                                url:'/unzan',
                                type:'post',
                                data:{
                                    p_id:p_id,
                                    u_id:newu_id
                                },
                                success:function (res) {
                                    if(res.error==0){
                                        $('.izan').css('color','#b9b7be');
                                        $('.span3').html(parseInt($('.span3').html())-1);
                                    }
                                }
                        })
                    }else{
                        $.ajax({
                            url:'/zan',
                            type:'post',
                            data:{
                                p_id:p_id,
                                u_id:newu_id
                            },
                            success:function (res) {
                                if(res.error==0){
                                    $('.izan').css('color','#1e97a2');
                                    $('.span3').html(parseInt($('.span3').html())+1);
                                }
                            }
                        })
                    }
                }
            });




    });
    //删除评论
    $('.cont').on('click','.em3',function () {
        var obj=$(this).parents('.single-reply');
        var n=obj.attr('d_id');
        $.ajax({
            url:'/del',
            data:{
                d_id:n,
                p_id:p_id
            },
            success:function (res) {
                $('.count u').html(parseInt($('.count u').html())-res.count);
                var oLi=$('li[d_id]');
                oLi.each(function () {
                    if($(this).attr('d_id')==n){
                        $(this).parent().parent().remove();
                    }
                });
                obj.remove();
            }
        })
    });
    //删除回复
    $('.cont').on('click','.em4',function () {
        var obj=$(this).parents('li');
        var n=obj.attr('r_id');
        $.ajax({
            url:'/del2',
            data:{
                r_id:n
            },
            success:function (res) {
                $('.count u').html(parseInt($('.count u').html())-res.count);
                obj.remove();
            }
        })
    });
});