/**
 * Created by Administrator on 2018/12/4.
 */
$(function () {
    var oFace=$('.iface');//表情按钮
    var oImgBtn=$('.f1');
    var oQQ=$('.icon');//表情列表
    var oClose1=$('.close');//表情关闭
    var oImg=$('.icon2');//图片列表
    var oClose2=$('.close1');//图片关闭
    var oLi=$('.qqul li');
    var oText=$('textarea');
    var oRelease=$('button');
    var oList=$('.list1');//动态列表
    var oS=$('.ok');//发布成功
    var oDiv1=$('.div1');
    var arr=[];//存QQ表情
    var oUlImg=$('.icon3');
    var arr4=[];
    var userId='';
    function nav(){
        if(window.location.search.match(/(?<=uid=)\d+/)){
            if(window.location.search.match(/(?<=uid=)\d+/).length){
                userId=window.location.search.match(/(?<=uid=)\d+/)[0];
                console.log(userId);
                $('.reg-login').html('退出登录')
            }
        }else{
            $('.releaseBottom button').attr('disabled',true);
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
    oText.click(function () {
        oQQ.fadeOut();
    });
    //表情显示
    oFace.click(function () {
        oQQ.fadeIn();
    });
    //表情关闭
    oClose1.click(function () {
        oQQ.fadeOut();
    });
    //图片显示
    oImgBtn.change(function () {
        oImg.fadeIn();
        var arr1=$('.f1')[0].files;
        for(var i=0;i<arr1.length;i++){
            arr4.push(arr1[i])
        }
        /*获取文件，因为可以上传多个，所以是数组，咱们获取第一个就可以了*/
        for(var i=0;i<arr4.length;i++){
            if(i>=8){
                $('.push').hide();
            }else{
                $('.push').show();
            }
            if(i>8){
                break;
            }
            var oFReader = new FileReader(); /*创建一个文件阅读器*/
            var file = arr4[i];
            oFReader.readAsDataURL(file);
            oFReader.onloadend = function(ev){
                /*或者目标文件的解析结果*/
                var src = ev.target.result;
                var oLi1=$('<li><img src="" alt=""><div><p>X</p></div></li>');
                oLi1.children().eq(0).attr('src',src);
                oUlImg.prepend(oLi1);
            }
        }
    });
    $('.f2').change(function () {
        var arr2=$('.f2')[0].files;
        for(var i=0;i<arr2.length;i++){
            arr4.push(arr2[i])
        }
        $('.icon3 li').remove();
        for(var i=0;i<arr4.length;i++){
            if(i>=8){
                $('.push').hide();
            }else{
                $('.push').show();
            }
            if(i>8){
                break;
            }
            var oFReader = new FileReader(); /*创建一个文件阅读器*/
            var file = arr4[i];
            oFReader.readAsDataURL(file);
            oFReader.onloadend = function(ev){
                /*或者目标文件的解析结果*/
                var src = ev.target.result;
                var oLi1=$('<li><img src="" alt=""><div><p>X</p></div></li>');
                oLi1.children().eq(0).attr('src',src);
                oUlImg.prepend(oLi1);
            }
        }
    });
    $('.icon3').on('click','p',function () {
        var n=$(this).parent().parent().index();
        arr4.splice(n,1);
        console.log(arr4);
        $(this).parent().parent().remove();
        if(arr4.length<=9){
            $('.push').show();
        }else{
            $('.push').hide();
        }
    });
    //图片关闭
    oClose2.click(function () {
        oImg.fadeOut();
        oImgBtn.val('');
        $('.f2').val('');
        arr4.length=0;
        $('.icon3 li').remove();
    });
    //添加表情
    oLi.each(function () {
        $(this).click(function () {
            var str=oText.val();
            arr.push($(this).children().attr('src'));
            // oText.val(str+$(this).attr('title'));
            oText.val(str+'['+$(this).attr('title')+']');
        })
    });
    //发布
    oRelease.click(function () {
        oQQ.fadeOut();
        oImg.fadeOut();
        var arr3=[];
        var formData=new FormData();
        for(var i=0;i<arr4.length;i++){
            formData.append('files',arr4[i]);
            arr3.push(arr4[i].name)
        }
        console.log(arr3);
        if(oText.val()||arr4.length){
            var str=oText.val();
            var oDate1=new Date();
            var oDate=oDate1.getFullYear()+'-'+(oDate1.getMonth()+1)+'-'+oDate1.getDate()+' '+oDate1.getHours()+':'+oDate1.getMinutes()+':'+oDate1.getSeconds();
            $.ajax({
                url:'/release',
                type:'post',
                data:{
                    id:userId,
                    name:arr.join('%'),
                    content:str,
                    img:arr3.join('|'),
                    time:oDate
                },
                success:function (res) {
                    arr.length=0;
                    $.ajax({
                        url:'/upload',
                        type:'post',
                        data:formData,
                        contentType:false,//阻止设置请求头
                        processData:false,//阻止设置请求头
                        success:function (res) {
                            console.log(res)
                        }
                    });
                    console.log(res);
                    var reg=/[[\u4e00-\u9fa5]+]/g;
                    var strimg=res.data.split('%');
                    var imgsrc=res.src.split('|');
                    console.log('这个图片'+imgsrc[0]);
                    var oNewLi=$('<li p_id="'+res.p_id+'" u_id="'+res.u_id+'"><img src="" alt=""><p>'+str.replace(reg,'<img src="'+strimg[0]+'">')+'</p><strong class="iconfont u1">&#xe618;</strong><b class="iconfont">&#xe61e;</b> <span>'+res.zan+'</span> <i class="iconfont1">&#xe648;</i><u>'+res.discuss+'</u><em class="iconfont1">&#xe630;</em></li>');
                    oList.prepend(oNewLi);
                    var object=oNewLi.children().eq(1).children();
                    var object1=oNewLi.children().eq(0);
                    console.log('这是要添加的图片',imgsrc);
                    if(imgsrc[0]!=''){
                        object1.eq(0).attr('src','../images/push/'+imgsrc[0]);
                        object1.eq(0).addClass('upimg');
                    }
                    for(var i=0;i<object.length;i++){
                        object.eq(i).attr('src',strimg[i])
                    }
                    oText.val('');
                    oS.fadeIn();
                    setTimeout(function () {
                        oS.fadeOut();
                    },1000);
                    strimg.length=0;
                    imgsrc.length=0;
                    arr.leng=0;
                }
            });
            oImgBtn.val('');
            $('.f2').val('');
            arr4.length=0;
            $('.icon3 li').remove();
        }else{
            oText.css('background','#eee');
            setTimeout(function () {
                oText.css('background','');
                oText.val('');
            },1000)
        }

    });
    //页面加载
    $.ajax({
        url:'/load ',
        type:'post',
        success:function (res) {
            if(res.length){
                var j=0;
                var aUl=$('.list ul');
                function getrandom(n,m) {
                    return Math.floor(Math.random()*(m-n)+n)
                }
                function createLi() {
                    var reg=/[[\u4e00-\u9fa5]+]/g;
                    var strimg=res[j].look.split('%');
                    var imgsrc=res[j].src.split('|');
                    var str=res[j].p_content;
                    console.log('这个图片'+imgsrc[0]);
                    var oNewLi=$('<li u_id="'+res[j].u_id+'" p_id="'+res[j].p_id+'"><img src="" alt=""><p title="'+str+'">'+str.replace(reg,'<img src="'+strimg[0]+'">')+'</p><strong class="iconfont u1">&#xe618;</strong><b class="iconfont">&#xe61e;</b> <span>'+res[j].p_zan+'</span> <i class="iconfont1">&#xe648;</i><u>'+res[j].p_discuss+'</u><em class="iconfont1">&#xe630;</em></li>');
                    var object=oNewLi.children().eq(1).children();
                    var object1=oNewLi.children().eq(0);
                    var object2=oNewLi.children().eq(1);
                    if(imgsrc[0]!=''){
                        object1.eq(0).attr('src',imgsrc[0]);
                        object1.eq(0).addClass('upimg');
                    }else{
                        var num=getrandom(60,100);
                        object2.css({
                            'height':num+'px',
                            'text-overflow':'ellipsis',
                            'display': '-webkit-box',
                            '-webkit-line-clamp':'5',
                            '-webkit-box-orient':'vertical',
                            'font-size':'12px',
                            'line-height': '19px',
                            'overflow': 'hidden'
                        });
                    }
                    for(var i=0;i<object.length;i++){
                        object.eq(i).attr('src',strimg[i])
                    }
                    return oNewLi;
                }
                function create20Li() {
                    var arr=[];
                    if(res.length<20){
                        for(var i=0;i<res.length;i++){
                            if(j<res.length){
                                var oLi=createLi();
                            }else{
                                return 0 ;
                            }
                            j++;
                            aUl.each(function () {
                                arr.push($(this));
                            });
                            arr.sort(function (a,b) {
                                return a.height()-b.height();
                            });
                            arr[0].append(oLi);
                        }
                    }else{
                        for(var i=0;i<20;i++){
                            if(j<res.length){
                                var oLi=createLi();
                            }else{
                                return 0 ;
                            }
                            j++;
                            aUl.each(function () {
                                arr.push($(this));
                            });
                            arr.sort(function (a,b) {
                                return a.height()-b.height();
                            });
                            arr[0].append(oLi);
                        }
                    }
                    return arr[0].height();//返回高度最小的下标
                }
                var a=create20Li();
                $(window).scroll(function () {
                    var scrTop=$(document).scrollTop();
                    var cliHeight=$(window).height();
//        var bodHeight=document.body.offsetHeight; //直接获取body的高度
                    if(scrTop+cliHeight>=a-100){  //滚动距离+可见区域的高度>=物体离顶部的高度
                        a=create20Li();
                    }
                });
            }
        }
    });
    //详情
    $('.list ul').on('click','li',function () {
        window.location.href='http://localhost:1015/pages/information.html?u_id='+$(this).attr('u_id')+'&p_id='+$(this).attr('p_id')+'&uid='+userId+'';
    })
});
