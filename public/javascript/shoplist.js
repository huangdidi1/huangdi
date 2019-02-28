$(
    function(){
        //导航栏
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
        //获取后台数据
        //创建商品列表
        function render(id,img,price,name,saleVolume,commentSum){
            return `
            <div class='shop-list-goods'>
                <div goodsId='${id}'>
                    <img src="${img}">
                    <span>￥${price}</span>
                    <p>
                        <a href='../pages/goodsdetail.html?goodsId=${id}'>${name}</a>
                    </p>
                    <p>
                        <span class='shop-list-sale-volume'>总销量：${saleVolume}</span>|
                        <span class='shop-list-sale-comment'>评价：${commentSum}</span>
                    </p>
                </div>
            </div>`
        }
        function show(){
            $('.shop-list-wrap-box').html('');
            $.ajax({
                url:'/getGoodsList',
                success:function(res){
                    console.log(res.data);
                    var goodsInfo=res.data;
                    // var listAsc=goodsInfo.reverse();
                    function showGoods(){
                        for(var i=0;i<goodsInfo.length;i++){
                            $('.shop-list-wrap-box').append(render(goodsInfo[i].s_id,goodsInfo[i].s_showimg,goodsInfo[i].ss_price,goodsInfo[i].s_name,goodsInfo[i].s_salevolume,goodsInfo[i].comment_sum));
                        }
                    }
                    showGoods();
                }
            })
        }
        show();
        //创建商品推荐列表
        $('.order-recommend').click(show);
        
        //创建商品价格列表
        $('.order-price').click(function(){
            $('.shop-list-wrap-box').html('');
            $.ajax({
                url:'/getGoodsPrice',
                success:function(res){
                    console.log(res.data);
                    var goodsInfo=res.data;
                    goodsInfo.reverse();
                    function showGoods(){
                        for(var i=0;i<goodsInfo.length;i++){
                            $('.shop-list-wrap-box').append(render(goodsInfo[i].s_id,goodsInfo[i].s_showimg,goodsInfo[i].ss_price,goodsInfo[i].s_name,goodsInfo[i].s_salevolume,goodsInfo[i].comment_sum));
                        }
                    }
                    showGoods();
                }
            })
        });
        //创建商品新品列表
        $('.order-time').click(function(){
            $('.shop-list-wrap-box').html('');
            $.ajax({
                url:'/getGoodsTime',
                success:function(res){
                    console.log(res.data);
                    var goodsInfo=res.data;
                    goodsInfo.reverse();
                    function showGoods(){
                        for(var i=0;i<goodsInfo.length;i++){
                            $('.shop-list-wrap-box').append(render(goodsInfo[i].s_id,goodsInfo[i].s_showimg,goodsInfo[i].ss_price,goodsInfo[i].s_name,goodsInfo[i].s_salevolume,goodsInfo[i].comment_sum));
                        }
                    }
                    showGoods();
                }
            });
        });
        //页面功能
        $('.class-list-btn').mouseenter(function () { 
            $('.class-list').css({
                'display':'block'
            });
        });
        $('.class-box').mouseenter(function () {
            $('.class-name').css({
                'color':'#fff'
            });
            
        });
        $('.class-box').mouseleave(function () {
            $('.class-list').css({
                'display':'none'
            });
            
        });
        $('.sel-box button').click(function () {
            $('.sel-box button').each(function(){
                $(this).removeClass('active');
            })
            $(this).addClass('active');
            $('.class-list-btn').text('分类');
            
        });
        //创建商品分类列表
        $('.class-list li').click(function () {
            $('.sel-box button').each(function(){
                $(this).removeClass('active');
            })
            $('.class-list-btn').text($(this).text());
            $('.class-list-btn').addClass('active');
            $('.shop-list-wrap-box').html('');
            var type=$(this).text();
            console.log(type);
            $.ajax({
                url:'/getGoodsType',
                data:{goodsType:type},
                success:function(res){
                    console.log(res.data);
                    var goodsInfo=res.data;
                    goodsInfo.reverse();
                    function showGoods(){
                        for(var i=0;i<goodsInfo.length;i++){
                            $('.shop-list-wrap-box').append(render(goodsInfo[i].s_id,goodsInfo[i].s_showimg,goodsInfo[i].ss_price,goodsInfo[i].s_name,goodsInfo[i].s_salevolume,goodsInfo[i].comment_sum));
                        }
                    }
                    showGoods();
                }
            });
        });
        //创建搜索列表
        $('.search-btn').click(function(){
            console.log($('.search-text').val());
            if($('.search-text').val()!=''){
                var keySearch=$('.search-text').val().replace(/\s+/g,"");
                $('.shop-list-wrap-box').html('');
                $.ajax({
                    url:'/getGoodsSearch',
                    data:{goodsSearch:keySearch},
                    success:function(res){
                        console.log(res.data);
                        var goodsInfo=res.data;
                        goodsInfo.reverse();
                        function showGoods(){
                            if(goodsInfo.length==0){
                                $('.shop-list-wrap-box').html('未搜索到该商品');
                            }else{
                                for(var i=0;i<goodsInfo.length;i++){
                                    $('.shop-list-wrap-box').append(render(goodsInfo[i].s_id,goodsInfo[i].s_showimg,goodsInfo[i].ss_price,goodsInfo[i].s_name,goodsInfo[i].s_salevolume,goodsInfo[i].comment_sum));
                                }
                            }
                            
                        }
                        showGoods();
                    }
                });
            }
            else{
                $('.search-text').attr('placeholder','请输入关键字');
            }
        });
        $('.shop-list-wrap-box').on('click','img',function(){
            console.log($(this).parent().attr('goodsId'));
            window.location.href=`./goodsdetail.html?goodsId=${$(this).parent().attr('goodsId')}&uid=2`;
        });
    }
);
