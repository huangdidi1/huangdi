$(
    function(){
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
        var goodsId=window.location.search.match(/(?<=goodsId=)\d+/)[0];
        console.log(goodsId);
        console.log(userId);
        var goodsColor='';
        //展示商品详情
        function show(){
            //展示左边图片区域
            $.ajax({
                url:'/getGoodsDetail',
                data:{goodsId:goodsId},
                success:function(res){
                    console.log(res.showImg,res.detailImg);
                    var showImg=res.showImg;
                    var detailImg=res.detailImg;
                    $('.goods-show-img').attr('src',`${showImg[0]}`);
                    for(var i=0;i<showImg.length;i++){
                        $('.img-box').append(`<div><img src="${showImg[i]}" alt="" class="goods-sel-show-img"></div>`)
                    }
                    for(var i=0;i<detailImg.length;i++){
                        $('.goods-detail-img-comment').append(`<img src="${detailImg[i]}" alt="" class="goods-detail-img">`)
                    }
                    $('.img-box').on('mouseenter','.goods-sel-show-img',function(){
                        $('.goods-show-img').attr('src',`${$(this).attr('src')}`);
                    })
                }
            });
            $.ajax({
                url:'/checkCol',
                data:{goodsId:goodsId,
                        userId:userId},
                success:function(res){
                    // console.log(res.data.length,1)
                    if(res.data.length==0){
                        $('.col-goods').text('收藏商品');
                        
                    }else if(res.data.length!=0){
                        $('.col-goods').text('已收藏');
                        $('.col-goods').css({
                            backgroundColor:'#1e97a2',
                            color:'#fff'
                        });

                    }
                }
            });
            //展示右边商品详情
            $.ajax({
                url:'/getThisDetail',
                data:{goodsId:goodsId},
                success:function(res){
                    console.log(res.data);
                    var goodsInfo=res.data;
                    for(var i=0;i<goodsInfo.length;i++){
                        $('.goods-class-img').append(`<img src="${goodsInfo[i].ss_colorImg}" alt="${goodsInfo[i].ss_color}" title="${goodsInfo[i].ss_color}" class="goods-class-img" classId="${i}">`)
                    }
                    console.log(goodsInfo[0].s_name)
                    $('title').text(`${goodsInfo[0].s_name}`);
                    $('.goods-describe-name').text(`${goodsInfo[0].s_name}`);
                    $('.price-num').text(`￥${goodsInfo[0].ss_price}`);
                    $('.goods-sale-volume i').text(`${goodsInfo[0].s_salevolume}`);
                    $('.goods-sale-comment i').text(`${goodsInfo[0].comment_sum}`);
                    $('.goods-change-btn button span').text(`${goodsInfo[0].comment_sum}`);
                    $('.inventory').text(`${goodsInfo[0].ss_inventory}`);
                    $('.goods-class-img').on('click','.goods-class-img',function(){
                        $('.goods-class-img').css({
                            'border':'none'
                        });
                        $(this).css({
                            'border':'1px solid #1e97a2'
                        });
                        goodsColor=$(this).attr('title');
                        console.log(goodsColor);
                        $('.goods-show-img').attr('src',`${$(this).attr('src')}`);
                        $('.price-num').text(`￥${goodsInfo[$(this).attr('classId')].ss_price}`);
                        $('.inventory').text(`${goodsInfo[$(this).attr('classId')].ss_inventory}`);
                    })
                }
            });
        }
        show();
        $('.col-goods').click(function(){
            $.ajax({
                url:'/checkCol',
                data:{goodsId:goodsId,
                        userId:userId},
                success:function(res){
                    // console.log(res.data.length,1)
                    if(res.data.length==0){
                        $.ajax({
                            url:'/addCol',
                            data:{goodsId:goodsId,
                                    userId:userId},
                            success:function(res){
                                $('.col-goods').text('已收藏');
                                    $('.col-goods').css({
                                        backgroundColor:'#1e97a2',
                                        color:'#fff'
                                    });
                            }
                        });
                        
                    }else if(res.data.length!=0){
                        $.ajax({
                            url:'/delCol',
                            data:{goodsId:goodsId,
                                    userId:userId},
                            success:function(res){
                                $('.col-goods').text('收藏商品');
                                    $('.col-goods').css({
                                        backgroundColor:'#fff',
                                        color:'#1e97a2'
                                    });
                            }
                        });

                    }
                }
            });
        });
        $('.just-buy').click(function(){
            var goodsNum=$('.goods-sel-btn-num').val();
            var timestamp = Date.parse(new Date())+userId;
            var date=new Date();
            var year = date.getFullYear(); //获取年   
            var month = date.getMonth()+1;//获取月
            var day = date.getDate(); //获取当日 
            var nowDate = year+'-'+month+'-'+day 
            var hours = date.getHours(); //获取年   
            var minutes = date.getMinutes()+1;//获取月
            var seconds = date.getSeconds(); //获取当日 
            var nowTime = hours+':'+minutes+':'+seconds
            var dateTime = nowDate +' '+nowTime;
            // console.log(dateTime)   
            // console.log(timestamp)
            if(goodsColor!=''){
                $.ajax({
                    url:'/addCart',
                    data:{goodsId:goodsId,userId:userId,goodsNum:goodsNum,goodsColor:goodsColor},
                    success:function(res){
                        
                        // console.log(res.data,scaId)
                        $.ajax({
                            url:'/seleCart',
                            data:{goodsId:goodsId,userId:userId},
                            success:function(res){
                                
                            var scaId=[]
                            scaId.push({scaid:res.data[0].sca_id,goodsNum:res.data[0].goods_num})
                            var totalPrice=0;
                            totalPrice=res.data[0].totalPrice; 
                            // console.log(scaId[0],totalPrice,dateTime,timestamp)    
                                $.ajax({
                                    url:'/addOrder',
                                    data:{ofNum:timestamp,uid:userId,scaId:scaId,totalPrice:totalPrice,dateTime:dateTime},
                                    success:function(res){
                                        
                                       
                                    }
                                })
                                window.location.href=`./submit.html?uid=${userId}&ofNum=${timestamp}`;
                            }
                        });
                        
                    }
                });
            }else{
                console.log('未选择颜色/规格')
            }
        });
        $('.minus').click(function(){
            var num=$('.goods-sel-btn-num').val();
            if(num>1){
                num--;
            }
            $('.goods-sel-btn-num').val(num);
        });
        $('.add').click(function(){
            var num=$('.goods-sel-btn-num').val();
            num++;
            $('.goods-sel-btn-num').val(num);
        });
        $('.goods-change-btn>button').click(function(){
            $('.goods-change-btn>button').removeClass('active');
            $(this).addClass('active');
        });
        //创建商品参数展示
        $('.show-goods-detail-img').click(function(){
            $('.goods-detail-img-comment').html('');
            $.ajax({
                url:'/getGoodsDetail',
                data:{goodsId:goodsId},
                success:function(res){
                    console.log(res.showImg,res.detailImg);
                    var detailImg=res.detailImg;
                    for(var i=0;i<detailImg.length;i++){
                        $('.goods-detail-img-comment').append(`<img src="${detailImg[i]}" alt="" class="goods-detail-img">`)
                    }
                }
            });
        });
        //创建商品评论展示
        $('.show-goods-comment').click(function(){
            $('.goods-detail-img-comment').html('');
            $.ajax({
                url:'/getComment',
                data:{goodsId:goodsId},
                success:function(res){
                    console.log(res.data);
                    var comment=res.data;
                    for(var i=0;i<comment.length;i++){
                        $('.goods-detail-img-comment').append(`
                            <table>
                                <tbody>
                                    <tr class="comment-box">
                                        <td class="comment-content" commentId=${comment[i].sc_id}>
                                            <div class="text">${comment[i].sc_content}</div>
                                            <div class="comment-img clearfix"></div>
                                            <div class="comment-time">${comment[i].sc_time.match(/\d+-\d+-\d+/)[0]}&nbsp;${comment[i].sc_time.match(/\d+:\d+:\d+/)[0]}</div>
                                        </td>
                                        <td class="goods-class">颜色/规格:<span>${comment[i].ss_color}</span></td>
                                        <td class="user-name">${comment[i].u_name}</td>
                                    </tr>
                                </tbody>
                            </table>
                        `)
                    }
                    $.ajax({
                        url:'/getCommentImg',
                        data:{goodsId:goodsId},
                        success:function(res){
                            console.log(res.commentImg);
                            var commentImg=res.commentImg;
                            $('.comment-content').each(function(){
                                for(var i=0;i<commentImg.length;i++){
                                    if($(this).attr('commentId')==commentImg[i].sc_id){
                                        $(this).find('.comment-img').append(`<img src="${commentImg[i].sci_img}">`);
                                    }
                                }
                            });
                        }
                    });
                }
            });
        });
        $('.add-to-cart').click(function(){
            console.log($('.goods-sel-btn-num').val())
            var goodsNum=$('.goods-sel-btn-num').val();    
            console.log(goodsNum)
            if(goodsColor!=''){
                $.ajax({
                    url:'/addCart',
                    data:{goodsId:goodsId,userId:userId,goodsNum:goodsNum,goodsColor:goodsColor},
                    success:function(res){
                        $('.success').css({'display':'inline-block'}).animate({
                            'top':'-40px'
                        },200);
                        setTimeout(function(){
                            $('.success').css({'display':'none','top':'-20px'});
                        },220);
                    }
                });
            }else{
                console.log('未选择颜色/规格')
            }
        });
        $('.go-to-cart').click(function(){
            window.location.href=`./shoppingtrolley.html?goodsId=${goodsId}&uid=${userId}`;
        });
    }
);