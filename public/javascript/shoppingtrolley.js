$(
    function(){
        // var goodsId=window.location.search.match(/(?<=goodsId=)\d+/)[0];
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
        var totalPrice=0;
        var totalNum=0;
        // console.log(goodsId);
        console.log(userId);
        function show(){
            $('.shop-trolley-goods-list').html('');
            $.ajax({
                url:'/getCart',
                data:{userId:userId},
                success:function(res){
                    console.log(res.data);
                    var goodsInfo=res.data;
                    for(var i=0;i<goodsInfo.length;i++){
                        $('.shop-trolley-goods-list').append(`
                            <ul class="clearfix">
                                <li class="single-goods-detail">
                                    <div class="single-goods-detail-sel"> <input type="checkbox" class="sel-checkbox" scaId="${goodsInfo[i].sca_id}"></div>
                                    <div class="single-goods-detail-img"><img src="${goodsInfo[i].s_showimg}" alt=""></div>
                                    <div class="single-goods-detail-describe">
                                        <span>${goodsInfo[i].s_name}</span>
                                    </div>
                                    <div class="single-goods-detail-class">${goodsInfo[i].ss_color}</div>
                                </li>
                                <li class="single-goods-price">￥${goodsInfo[i].ss_price}</li>
                                <li class="single-goods-volume">
                                    <div class="clearfix">
                                        <button class="minus">-</button>
                                        <input type="text" class="goods-sel-btn-num" value="${goodsInfo[i].goods_num}">
                                        <button class="add">+</button>
                                    </div>
                                </li>
                                <li class="single-goods-sum">￥${goodsInfo[i].ss_price*goodsInfo[i].goods_num}</li>
                                <li class="single-goods-del"><a class="del-goods" href="javascript:;" scaId="${goodsInfo[i].sca_id}">删除</a></li>
                            </ul>
                        `);
                        // totalPrice=totalPrice+goodsInfo[i].ss_price*goodsInfo[i].goods_num;
                    }
                    $('.goods-sum-price span').text(`￥0`);
                    $('.minus').each(function(){
                        $(this).click(function(){
                            var num=$(this).parent().find('.goods-sel-btn-num').val();
                            if(num>1){
                                num--;
                                $(this).parent().find('.goods-sel-btn-num').val(num);
                                // console.log($(this).parent().parent().parent().find('.single-goods-price').text())
                                $(this).parent().parent().parent().find('.single-goods-sum').text(`￥${$(this).parent().find('.goods-sel-btn-num').val()*$(this).parent().parent().parent().find('.single-goods-price').text().match(/\d+/)[0]}`)
                            }
                            // totalPrice=0;
                            // for(var i=0;i<$('.single-goods-sum').length;i++){
                            //     totalPrice=totalPrice+parseFloat($('.single-goods-sum').eq(i).text().match(/\d+/)[0]);
                            // }
                            // $('.goods-sum-price span').text(`￥${totalPrice}`);
                        });
                    });
                    $('.add').each(function(){
                        $(this).click(function(){
                            var num=$(this).parent().find('.goods-sel-btn-num').val();
                            
                                num++;
                                $(this).parent().find('.goods-sel-btn-num').val(num);
                                // console.log($(this).parent().parent().parent().find('.single-goods-price').text())
                                $(this).parent().parent().parent().find('.single-goods-sum').text(`￥${$(this).parent().find('.goods-sel-btn-num').val()*$(this).parent().parent().parent().find('.single-goods-price').text().match(/\d+/)[0]}`)
                            
                            // totalPrice=0;
                            // for(var i=0;i<$('.single-goods-sum').length;i++){
                            //     totalPrice=totalPrice+parseFloat($('.single-goods-sum').eq(i).text().match(/\d+/)[0]);
                            // }
                            // $('.goods-sum-price span').text(`￥${totalPrice}`);
                        });
                    });
                    $('.sel-checkbox').each(function(){
                        $(this).click(function(){
                            // console.log($(this).prop('checked'))
                            if($(this).prop('checked')){
                                totalNum+=1;
                                console.log(totalNum)
                                $('.totalNum').text(`${totalNum}`);
                                totalPrice=totalPrice+parseFloat($(this).parent().parent().parent().find('.single-goods-sum').text().match(/\d+/)[0]);
                                $('.goods-sum-price span').text(`￥${totalPrice}`);
                            }else{
                                totalNum-=1;
                                $('.totalNum').text(`${totalNum}`);
                                totalPrice=totalPrice-parseFloat($(this).parent().parent().parent().find('.single-goods-sum').text().match(/\d+/)[0]);
                                $('.goods-sum-price span').text(`￥${totalPrice}`);
                            }
                        });
                    });
                    $('.sel-checkbox-all').click(function(){
                        if($(this).prop('checked')){
                            $('.sel-checkbox').prop('checked',true);
                            $('.totalNum').text(`${$('.sel-checkbox').length}`);
                            for(var i=0;i<$('.single-goods-sum').length;i++){
                                // console.log($('.single-goods-sum').eq(i).text().match(/\d+/)[0]);
                                totalPrice=totalPrice+parseFloat($('.single-goods-sum').eq(i).text().match(/\d+/)[0]);
                            }
                            $('.goods-sum-price span').text(`${totalPrice}`)
                        }else{
                            totalPrice=0;
                            $('.sel-checkbox').prop('checked',false);
                            $('.totalNum').text(`0`);
                            $('.goods-sum-price span').text(`0`);
                        }
                    });
                    $('.settlement-btn').click(function(){
                        console.log(1);
                        var scaId=[];
                        $('.sel-checkbox').each(function(){
                            if($(this).prop('checked')){
                                scaId.push({scaid:`${$(this).attr('scaid')}`,goodsNum:`${$(this).parent().parent().parent().find('.goods-sel-btn-num').val()}`});
                            }
                        });
                        console.log(scaId);
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
                        console.log(timestamp)
                        console.log(totalPrice)
                        console.log($('.totalNum').text())
                        if($('.totalNum').text()!=0){
                            $.ajax({
                                url:'/addOrder',
                                data:{ofNum:timestamp,uid:userId,scaId:scaId,totalPrice:totalPrice,dateTime:dateTime},
                                success:function(res){
                                    console.log(res.error)
                                }
                            })
                            window.location.href=`./submit.html?uid=${userId}&ofNum=${timestamp}`;
                        }
                        
                    });
                    $('.del-goods').click(function(){
                        console.log(1);
                        var scaId=$(this).attr('scaid');
                        $.ajax({
                            url:'/delCartGoods',
                            data:{scaId:scaId},
                            success:function(res){
                                $('.shop-trolley-goods-list').html('');
                                show();
                                console.log(2);
                            }
                        });
                    });
                }
            });
        }
        show();
        
    }
);