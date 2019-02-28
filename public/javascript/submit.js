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
        // var goodsId=window.location.search.match(/(?<=goodsId=)\d+/)[0];
        var ofNum=window.location.search.match(/(?<=ofNum=)\d+/)[0];
        var totalPrice=0;
        var scaId=[];
        // console.log(goodsId);
        console.log(userId);
        console.log(ofNum);
        function show(){
            $.ajax({
                url:'/getOrder',
                data:{uid:userId,ofNum:ofNum},
                success:function(res){
                    console.log(res.data)
                    var orderInfo=res.data;
                    for(var i=0;i<res.data.length;i++){
                        scaId.push({scaId:res.data[i].sca_id,sId:res.data[i].s_id,sColor:res.data[i].ss_color,goodsNum:res.data[i].goods_num});
                    }
                    console.log(scaId);
                    for(var i=0;i<orderInfo.length;i++){
                        $('.confirm-order-form').append(`
                            <ul class="confirm-order-form-list-goods clearfix">
                                <li class="confirm-order-form-goods-detail">
                                    <div class="confirm-order-form-goods-detail-img">
                                        <img src="${orderInfo[i].s_showimg}" alt="">
                                    </div>
                                    <div class="confirm-order-form-goods-detail-describe">
                                        ${orderInfo[i].s_name}
                                    </div>
                                    <div class="confirm-order-form-goods-detail-class">
                                        <span>${orderInfo[i].ss_color}</span>
                                    </div>
                                </li>
                                <li>￥${orderInfo[i].ss_price}</li>
                                <li>${orderInfo[i].goods_num}</li>
                                <li class="subtotal">￥${orderInfo[i].ss_price*orderInfo[i].goods_num}</li>
                            </ul>
                        `);
                    }
                    $('.subtotal').each(function(){
                        console.log(111);
                        console.log($(this).text().match(/\d+/)[0]);
                        totalPrice=totalPrice+parseFloat($(this).text().match(/\d+/)[0]);
                    });
                    $('.due-price').text(`￥${totalPrice}`);
                    
                }
            });
            $.ajax({
                url:'/getAddress',
                data:{uid:userId},
                success:function(res){
                    console.log(scaId);
                    var flag=0;
                    console.log(res.data);
                    var addressInfo=res.data;
                    for(var i=0;i<addressInfo.length;i++){
                        $('.sel-address-list').append(`
                            <li class="address-box" boxId="${i}" aId="${addressInfo[i].a_id}">
                                <div class="single-address-prefix">
                                    <p>
                                        <span class="single-address-city">${addressInfo[i].a_province}</span>
                                        <span>${addressInfo[i].a_name}</span>(收)
                                    </p>
                                </div>
                                <div class="single-address-suffix">
                                    <p>${addressInfo[i].a_detailed}</p>
                                    <p>${addressInfo[i].a_phone}</p>
                                </div>
                            </li>
                        `);
                        if(addressInfo[i].a_default==true){
                            flag=i;
                        }
                    }
                    console.log(flag,1111);
                    $('.address-box').eq(flag).addClass('active');
                    $('.address-all').text(`${addressInfo[flag].a_province+addressInfo[flag].a_detailed}`);
                    $('.addressee').text(`${addressInfo[flag].a_name}\t${addressInfo[flag].a_phone}`);
                    flag=addressInfo[flag].a_id;
                    console.log(flag);
                    $('.address-box').click(function(){
                        // console.log(1)
                        
                        $('.address-box').each(function(){
                            $(this).removeClass('active');
                        })
                        $(this).addClass('active');
                        flag=$(this).attr('aId');
                        for(var i=0;i<addressInfo.length;i++){
                            if(addressInfo[i].a_id==flag){
                                $('.address-all').text(`${addressInfo[i].a_province+addressInfo[i].a_detailed}`);
                                $('.addressee').text(`${addressInfo[i].a_name}\t${addressInfo[i].a_phone}`);
                            }
                        }
                    });
                    $('.pay').click(function(){
                        $('#tip').show()
                        $('.confirm').click(function(){
                            $('#tip').hide()
                            $.ajax({
                                url:'/payOrder',
                                data:{ofNum:ofNum,aId:flag,scaId:scaId},
                                success:function(){
                                    console.log(11111);
                                }
                            });
                            $.ajax({
                                url:'/addPay',
                                data:{ofNum:ofNum,aId:flag,scaId:scaId},
                                success:function(){
                                    console.log(22222);
                                }
                            });
                            // $.ajax({
                            //     url:'/delCart',
                            //     data:{ofNum:ofNum,aId:flag,scaId:scaId},
                            //     success:function(){
                            //         console.log(333333);
                            //     }
                            // });
                            $.ajax({
                                url:'/delInventory',
                                data:{ofNum:ofNum,aId:flag,scaId:scaId},
                                success:function(){
                                    console.log(44444);
                                }
                            });
                            $.ajax({
                                url:'/delSaleVolume',
                                data:{ofNum:ofNum,aId:flag,scaId:scaId},
                                success:function(){
                                    console.log(555555);
                                }
                            });
                            // $('body').html('');
                        });
                        $('.cancel').click(function(){
                            $('#tip').hide()
                            $.ajax({
                                url:'/noPay',
                                data:{ofNum:ofNum,aId:flag},
                                success:function(){
                                    console.log(555555);
                                }
                            });
                        });
                        
                    });
                }
            })
        }
        show();
    }
);