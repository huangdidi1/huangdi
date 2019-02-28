$(function () {
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
//获取用户名称
    function getRequest(){
        $.ajax({
            url:'/index',
            data:{id:userId},
            success:function(res){
                if(res.error==0){
                    // $('.logAndReg').css({opacity:0});
                    // $('.perCenter p:first').css({opacity:0});
                    // $('.uName').append('<span>'+res.name+'</span>') ;
                     $('.person-center').html(res.name) ;
                }
            }
        })
    };
    // if(!window.location.search.match(/(?<=uid=)\d+/).length){
    //     userId=0;
    // }else{
    //     userId=window.location.search.match(/(?<=uid=)\d+/)[0];
    //     getRequest();
    //     $('#index-nav .reg-login').html('退出登录');
    // }
    // $('.reg-login').click(function(){
    //     window.location.href=`./login.html`;
    // });
    // $('.video-class').click(function(){
    //     if(userId){
    //         window.location.href=`./classtype1.html?uid=${userId}`;
    //     }else{
    //         window.location.href=`./classtype1.html`;
    //     }
    // });
    // $('.shop-mall').click(function(){
    //     if(userId){
    //         window.location.href=`./shoplist.html?uid=${userId}`;
    //     }else{
    //         window.location.href=`./shoplist.html`;
    //     }
    // });
    // $('.community-page').click(function(){
    //     if(userId){
    //         window.location.href=`./community.html?uid=${userId}`;
    //     }else{
    //         window.location.href=`./community.html`;
    //     }
    // });
    // $('.shop-car').click(function(){
    //     if(userId){
    //         window.location.href=`./shoppingtrolley.html?uid=${userId}`;
    //     }else{
    //         window.location.href=`./shoppingtrolley.html`;
    //     }
    // });
    // $('.penson-center').click(function(){
    //     if(userId){
    //         window.location.href=`./mine.html?uid=${userId}`;
    //     }else{
    //         window.location.href=`./mine.html`;
    //     }
    // });
    // $('.return-index').click(function(){
    //     window.location.href=`./index.html?uid=${userId}`;
    // });
    //轮播图效果
    var mySwiper = new Swiper ('.swiper-container', {
        direction: 'horizontal', // 垂直切换选项
        loop: true, // 循环模式选项
        pagination: {
            el: '.swiper-pagination',
        },
        speed:1000,


        autoplay : {
            delay:3000
        },
        effect: 'coverflow',
        grabCursor: true,
        // cubeEffect: {
        //     shadow: false, //是否显示投影
        //     slideShadows: true, //是否显示slide阴影
        //     shadowOffset: 20, //投影距离
        //     shadowScale: 0.94, //投影缩放比例
        // },
        coverflowEffect:{
            rotate:70,//slide做3d旋转时Y轴的旋转角度。
            stretch:0,//每个slide之间的拉伸值，越大slide靠得越紧。 默认0。
            depth:600,//slide的位置深度。值越大z轴距离越远，看起来越小。 默认100。
            modifier:1//depth和rotate和stretch的倍率，相当于depth*modifier、rotate*modifier、stretch*modifier，值越大这三个参数的效果越明显。默认1。
            // slideShadows：开启slide阴影。默认 true。
        },

        // 如果需要前进后退按钮
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        box:{

            rows: 6, // 切割行

            cols: 3 // 切割列

        },
    });
    //回到顶部 和吸顶效果
    $(window).scroll(
        function(){
            var sTop=$(document).scrollTop();
            // console.log(sTop)
            if(sTop>=800){
                $('.index-backto-top').stop().animate({opacity:1},500)
            }else{
                $('.index-backto-top').stop().animate({opacity:0},500)
            };
            if(sTop>=577) {
                $('#index-nav').css({'background':'#fafafa'})
            }else{
                $('#index-nav').css({'background':'rgba(0,0,0,0)'})
            }
        }
    );
    //点击回到顶部
    $('.index-backto-top').click(
        function(){
            $(document.documentElement).animate({scrollTop:0},500)
        }
    );
})





	
      


