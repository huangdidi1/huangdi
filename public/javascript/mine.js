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
$('.order_head li').css('border-bottom','2px solid white');
$('.order_head li').eq(0).css('border-bottom',' 2px solid #c7c497');
$('.btn1').click(function(){
    $('.btn1').removeClass('ac');
    $(this).addClass('ac');
});
$.ajax({
    url:'/Pfirst',
    data:{
        id:userId
    },
    success:function(res){
        $('#sleft .name').html(res.name);
        if(!res.img){
            $('.head-img').attr('src',"../images/mine/head.jpg");
        }else{
            $('.head-img').attr('src',res.img);
        }
    }
})
$.ajax({
    url: '/Porder',
    data: {
        id: userId
    },
    success: function (res) {
        if (!res.error) {
            // console.log(res.data);
            var goodsInfo = res.goodsInfo;
            var orderInfo=res.orderInfo;
            console.log(orderInfo);
            console.log(goodsInfo);
            for (var i = 0; i < orderInfo.length; i++) {
                console.log(1)
                var sum=goodsInfo[i].os_num*goodsInfo[i].ss_price;
                $('.sum_order tbody').append(`
                <tr ofNum="${orderInfo[i].of_num}">
                    <td class="order-num">${orderInfo[i].of_num}</td>
                    <td class="goods-list" ofNum="${orderInfo[i].of_num}">
                        
                    </td>
                    <td class="sum-price">${sum}</td>
                    <td class="oprater">
                        <button class="buy" ofNum="${orderInfo[i].of_num}">支付</button>
                        <button class="no-buy" ofNum="${orderInfo[i].of_num}">删除</button>
                   </td>
                </tr>
                `)
                // $('.sum_order').append('<ul class="order1 order">\n' +
                //     '                            <li class="ordernum">'+res.data[i].of_num+'</li>\n' +
                //     '                            <li class="shopname">'+res.data[i].s_name+'</li>\n' +
                //     '                            <li class="num">'+res.data[i].os_num+'</li>\n' +
                //     '                            <li class="price">'+res.data[i].ss_price+'</li>\n' +
                //     '                            <li class="orderprice">'+res.data[i].of_price+'</li>\n' +
                //     '                            <li><button class="buy">支付</button>\n' +
                //     '                                <button class="no-buy">删除</button></li>\n' +
                //     '                        </ul>')
            }

            $('.goods-list').each(function(){
                for(var i=0;i<goodsInfo.length;i++) {
                    if ($(this).attr('ofNum') == goodsInfo[i].of_num) {
                        $(this).append(`
                            <div>
                                <li class="goods-name">${goodsInfo[i].s_name}</li>
                                <li class="goods-num">${goodsInfo[i].os_num}</li>
                                <li class="goods-price">${goodsInfo[i].ss_price}</li>
                            </div>
                        `);
                    }
                }
            })

            //
            // }
        }
    }
});
$('.changehead').click(function () {
    $('#changeBox').show();
});
var myCan=document.getElementById('myCan');
var ctx=myCan.getContext("2d");
var demoImg=document.getElementsByClassName('demoImg')[0];
//导入图片
$('.but1').change(function () {
    var file=$('.but1')[0].files[0];
    var reader=new FileReader();
    reader.onload= function (e) {
        $('.demoImg').attr('src', e.target.result);
    };
    reader.readAsDataURL(file);
});
//选择框移动
var chooseBox=document.getElementsByClassName('chooseBox')[0];
chooseBox.onmousedown=function (e) {
    var x=e.offsetX;
    var y=e.offsetY;
    document.onmousemove=function (e) {
        var l=e.clientX-383-x;
        var t=e.clientY-100-y;
        if(l<0)l=0;
        if(l>178)l=178;
        if(t>178)t=178;
        if(t<0)t=0;
        chooseBox.style.left=l+'px';
        chooseBox.style.top=t+'px';
    }
    document.onmouseup=function () {
        document.onmousemove=false;
        document.onmouseup=false;
    }
}
//截取图片到画布
$('.but2').click(function () {
    var w=parseFloat(demoImg.naturalWidth/300);
    var h=parseFloat(demoImg.naturalHeight/300);
    var x=$('.chooseBox').position().left*w;
    var y=$('.chooseBox').position().top*h;
    ctx.drawImage(demoImg,x,y,120*w,120*h,0,0,120,120);
});
//上传头像到数据库
$('.but3').click(function () {
    $.ajax({
        url: '/Pphoto',
        data:{
            id:userId,
            src:myCan.toDataURL()
        },
        success:function (res) {
            if(!res.error){
                $('.head-img').attr('src',myCan.toDataURL());
                $('.changehead').attr('src',myCan.toDataURL());
                $('#changeBox').hide();
            }
        }
    })
})
//取消
$('.but4').click(function () {
    $('#changeBox').hide();
})

function order(){
    $.ajax({
        url: '/Porder',
        data: {
            id: userId
        },
        success: function (res) {
            if (!res.error) {
                // console.log(res.data);
                $('.sum_order tbody').html('');
                var goodsInfo = res.goodsInfo;
                var orderInfo=res.orderInfo;
                for (var i = 0; i < orderInfo.length; i++) {
                    var sum=goodsInfo[i].os_num*goodsInfo[i].ss_price;
                    $('.sum_order tbody').append(`
                <tr ofNum="${orderInfo[i].of_num}">
                    <td class="order-num">${orderInfo[i].of_num}</td>
                    <td class="goods-list" ofNum="${orderInfo[i].of_num}">
                        
                    </td>
                    <td class="sum-price">${sum}</td>
                    <td class="oprater">
                        <button class="buy" ofNum="${orderInfo[i].of_num}">支付</button>
                        <button class="no-buy" ofNum="${orderInfo[i].of_num}">删除</button>
                   </td>
                </tr>
                `)
                    // $('.sum_order').append('<ul class="order1 order">\n' +
                    //     '                            <li class="ordernum">'+res.data[i].of_num+'</li>\n' +
                    //     '                            <li class="shopname">'+res.data[i].s_name+'</li>\n' +
                    //     '                            <li class="num">'+res.data[i].os_num+'</li>\n' +
                    //     '                            <li class="price">'+res.data[i].ss_price+'</li>\n' +
                    //     '                            <li class="orderprice">'+res.data[i].of_price+'</li>\n' +
                    //     '                            <li><button class="buy">支付</button>\n' +
                    //     '                                <button class="no-buy">删除</button></li>\n' +
                    //     '                        </ul>')
                }

                $('.goods-list').each(function(){
                    for(var i=0;i<goodsInfo.length;i++) {
                        if ($(this).attr('ofNum') == goodsInfo[i].of_num) {
                            $(this).append(`
                            <div>
                                <li class="goods-name">${goodsInfo[i].s_name}</li>
                                <li class="goods-num">${goodsInfo[i].os_num}</li>
                                <li class="goods-price">${goodsInfo[i].ss_price}</li>
                            </div>
                        `);
                        }
                    }
                })

                //
                // }
            }
        }
    });
};
function payorder(){
    $.ajax({
        url: '/Ppayorder',
        data: {
            id: userId
        },
        success: function (res) {
            if (!res.error) {
                $('.sum_order2 tbody').html('');
                var goodsInfo1 = res.goodsInfo1;
                var orderInfo1=res.orderInfo1;

                for (var i = 0; i < orderInfo1.length; i++) {
                    console.log(1);
                    var sum=goodsInfo1[i].os_num*goodsInfo1[i].ss_price;
                    var obj=$(`
                <tr ofNum="${orderInfo1[i].of_num}">
                    <td class="order-num ">${orderInfo1[i].of_num}</td>
                    <td class="goods-list" ofNum="${orderInfo1[i].of_num}">
                        
                    </td>
                    <td class="sum-price">${sum}</td>
                    <td class="oprater">
                        <button class="buy1" ofNum="${orderInfo1[i].of_num}">确认收货</button>
                       
                   </td>
                </tr>
                `);
                    console.log($('.sum_order2'));
                    $('.sum_order2 tbody').append(obj)
                }
                $('.goods-list').each(function(){
                    for(var i=0;i<goodsInfo1.length;i++) {
                        if ($(this).attr('ofNum') == goodsInfo1[i].of_num) {
                            $(this).append(`
                            <div>
                                <li class="goods-name">${goodsInfo1[i].s_name}</li>
                                <li class="goods-num">${goodsInfo1[i].os_num}</li>
                                <li class="goods-price">${goodsInfo1[i].ss_price}</li>
                            </div>
                        `);
                        }
                    }
                })

                //
                // }
            }
        }
    });
};
function completeorder(){
    $.ajax({
        url: '/Pcompleteorder',
        data: {
            id: userId
        },
        success: function (res) {
            if (!res.error) {
                $('.sum_order3 tbody').html('');
                var goodsInfo2 = res.goodsInfo2;
                var orderInfo2=res.orderInfo2;
                /*console.log(orderInfo2);*/
                for (var i = 0; i < orderInfo2.length; i++) {
                    var sum=goodsInfo2[i].os_num*goodsInfo2[i].ss_price;
                    var obj=$(`
                <tr ofNum="${orderInfo2[i].of_num}">
                    <td class="order-num3 ">${orderInfo2[i].of_num}</td>
                    <td class="goods-list3" ofNum="${orderInfo2[i].of_num}">
                        
                    </td>
                    <td class="sum-price3">${sum}</td>
                    <td class="oprater3">
                        <button class="del" ofNum="${orderInfo2[i].of_num}">删除订单</button>
                       
                   </td>
                </tr>
                `);
                    /*console.log($('.sum_order3'));*/
                    $('.sum_order3 tbody').append(obj)
                }
                $('.goods-list3').each(function(){
                    for(var i=0;i<goodsInfo2.length;i++) {
                        if ($(this).attr('ofNum') == goodsInfo2[i].of_num) {
                            $(this).append(`
                            <div>
                                <li class="goods-name3">${goodsInfo2[i].s_name}</li>
                                <li class="goods-num3">${goodsInfo2[i].os_num}</li>
                                <li class="goods-price3">${goodsInfo2[i].ss_price}</li>
                            </div>
                        `);
                        }
                    }
                })

                //
                // }
            }
        }
    });
};

$('.pay').hide();
$('.complete').hide();
$('.order_head li').click(function(){
    $('.order_head li').css('border-bottom','2px solid white');
    $(this).css('border-bottom',' 2px solid #c7c497')
})
/*订单*/
$('.btn_order').click(function () {
    $('.div1').show();
    $('.div2').hide();
    $('.div3').hide();
    $('.div4').hide();
    $('.nopay').show();
    $('.pay').hide();
    $('.complete').hide();
    $('.order_head li').css('border-bottom','2px solid white');
    $('.order_head li').eq(0).css('border-bottom',' 2px solid #c7c497');

    order();

});
/*订单删除支付详情*/
$('.sum_order table tbody').on('click','tr',function(e){
    console.log(e.target)
    if($(e.target).attr('class') == 'buy'){
        mybuy();
        $(this).attr('ofNum',num);
        // console.log($(this).attr('ofNum'))
        var num='',
            num=$(this).attr('ofNum');
        $('.a10').click(function(){
            $.ajax({
                url:'/addPayorder',
                data:{id:num},
                success:function(res){
                    console.log(res);
                    order();
                }
            })

        })


    }else if($(e.target).attr('class') == 'no-buy'){
        mydroporder();
        console.log($(this))
        var num=$(this).attr('ofNum');
        // alert(num)
        $('.a8').click(function(){
            // $(this).attr('ofNum',num);
            $.ajax({
                url:'/Pdroporder',
                data:{num:num},
                success:function(res){
                    order();
                }
            })

        })


    }else{
        /*myorderdetailed();
        $('.order-num').attr('data_index',$(this).attr('data_index'));
        // $.ajax({
        //     url:'/Porderdetailed',
        //     data:{id:$(this).attr('data_index')},
        //     success:function(res){
        //         console.log(res);
        //         // if(!res.error){
        //         //     /!*$('.order1 input').val(res.data.of_num);*!/
        //         //     $('.order1 input').val(res.data.of_num);
        //         //     $('.order2 input').val(res.data.s_name);
        //         //     $('.order3 input').val(res.data.u_phone);
        //         //     $('.order4 input').val(res.data.s_name);
        //         //     $('.order5 input').val(res.data.os_num);
        //         //     $('.order6 input').val(res.data.ss_price);
        //         //     $('.order7 input').val(res.data.of_price);
        //         //
        //         // }
        //     }
        // })*/
    }

});
$('.btn_nopay').click(function () {
    $('.nopay').show();
    $('.pay').hide();
    $('.complete').hide();
    order();
});
$('.btn_pay').click(function () {
    $('.nopay').hide();
    $('.pay').show();
    $('.complete').hide();
    payorder();
    /*$.ajax({
        url: '/Ppayorder',
        data: {
            id: 1
        },
        success: function (res) {
            if (!res.error) {
                $('.sum_order2 tbody').html('');
                var goodsInfo1 = res.goodsInfo1;
                var orderInfo1=res.orderInfo1;

                for (var i = 0; i < orderInfo1.length; i++) {
                    console.log(1);
                    var obj=$(`
                <tr ofNum="${orderInfo1[i].of_num}">
                    <td class="order-num ">${orderInfo1[i].of_num}</td>
                    <td class="goods-list" ofNum="${orderInfo1[i].of_num}">
                        
                    </td>
                    <td class="sum-price">${orderInfo1[i].of_price}</td>
                    <td class="oprater">
                        <button class="buy1" ofNum="${orderInfo1[i].of_num}">确认收货</button>
                       
                   </td>
                </tr>
                `);
                    console.log($('.sum_order2'));
                    $('.sum_order2 tbody').append(obj)
                }
                $('.goods-list').each(function(){
                    for(var i=0;i<goodsInfo1.length;i++) {
                        if ($(this).attr('ofNum') == goodsInfo1[i].of_num) {
                            $(this).append(`
                            <div>
                                <li class="goods-name">${goodsInfo1[i].s_name}</li>
                                <li class="goods-num">${goodsInfo1[i].os_num}</li>
                                <li class="goods-price">${goodsInfo1[i].ss_price}</li>
                            </div>
                        `);
                        }
                    }
                })

                //
                // }
            }
        }
    });*/
});
$('.sum_order2 table tbody').on('click','tr',function(e){
    console.log(e.target)
    if($(e.target).attr('class') == 'buy1'){
        mygetshop();
        $(this).attr('ofNum',num);
        // console.log($(this).attr('ofNum'))
        var num='',
            num=$(this).attr('ofNum');
        $('.a13').click(function(){
            $.ajax({
                url:'/Pgetshop',
                data:{id:num},
                success:function(res){
                    console.log(res)
                    payorder();
                }
            })
        })


    }

});

$('.btn_complete').click(function () {
    $('.nopay').hide();
    $('.pay').hide();
    $('.complete').show();
    completeorder();
    /*$.ajax({
        url: '/Pcompleteorder',
        data: {
            id: 1
        },
        success: function (res) {
            if (!res.error) {
                $('.sum_order3 tbody').html('');
                var goodsInfo2 = res.goodsInfo2;
                var orderInfo2=res.orderInfo2;
                /!*console.log(orderInfo2);*!/
                for (var i = 0; i < orderInfo2.length; i++) {
                    var obj=$(`
                <tr ofNum="${orderInfo2[i].of_num}">
                    <td class="order-num3 ">${orderInfo2[i].of_num}</td>
                    <td class="goods-list3" ofNum="${orderInfo2[i].of_num}">
                        
                    </td>
                    <td class="sum-price3">${orderInfo2[i].of_price}</td>
                    <td class="oprater3">
                        <button class="del" ofNum="${orderInfo2[i].of_num}">删除订单</button>
                       
                   </td>
                </tr>
                `);
                    /!*console.log($('.sum_order3'));*!/
                    $('.sum_order3 tbody').append(obj)
                }
                $('.goods-list3').each(function(){
                    for(var i=0;i<goodsInfo2.length;i++) {
                        if ($(this).attr('ofNum') == goodsInfo2[i].of_num) {
                            $(this).append(`
                            <div>
                                <li class="goods-name3">${goodsInfo2[i].s_name}</li>
                                <li class="goods-num3">${goodsInfo2[i].os_num}</li>
                                <li class="goods-price3">${goodsInfo2[i].ss_price}</li>
                            </div>
                        `);
                        }
                    }
                })

                //
                // }
            }
        }
    });*/
});
$('.sum_order3 table tbody').on('click','tr',function(e){
    console.log(e.target)
    if($(e.target).attr('class') == 'del'){
        mydelorder();
        $(this).attr('ofNum',num);
        // console.log($(this).attr('ofNum'))
        var num='',
            num=$(this).attr('ofNum');
        $('.a15').click(function(){
            $.ajax({
                url:'/Pdelorder',
                data:{id:num},
                success:function(res){
                    completeorder();
                    console.log(res)
                }
            })
        })


    }

});





/*地址*/
$('.btn_adress').click(function () {
    addsx();
});
function addsx(){
    $('.div1').hide();
    $('.div2').show();
    $('.div3').hide();
    $('.div4').hide();
    $.ajax({
        url:'/Padress',
        data:{id:userId},
        success:function(res){
            if(!res.error){
                $('.ul_adress').html('');
                for(var i=0;i<res.data.length;i++){
                    $('.ul_adress').append('<li class="adress1">\n' +
                        '                            <p class="p1">'+res.data[i].a_name+'</p>\n' +
                        '                            <p class="p2">'+res.data[i].a_province+'</p>\n' +
                        '                            <p class="p3">'+res.data[i].a_detailed+'</p>\n' +
                        '                            <p class="p4">'+res.data[i].a_phone+'</p>\n' +
                        '                            <p class="p5"><button class="alter1" data_index="'+res.data[i].a_id+'">修改</button>|<button class="drop1" data_index="'+res.data[i].a_id+'">删除</button></p>\n' +
                        '                            <p class="p6">设为默认</p>\n' +
                        '                        </li>')
                }
            }
        }
    })
}
/*新增地址*/
$('.btn_addadress').click(function(){
    $('#addad').show();
})
$('.big1 a').click(function () {
    $('#addad').hide();
})
/*确认添加地址*/
$('.a2').click(function(){
    $.ajax({
        url:'/Paddadress',
        data:{
            id:userId,
            province:$('.add1 input').val(),
            detailed:$('.add2 input').val(),
            name:$('.add3 input').val(),
            phone:$('.add4 input').val()
        },
        success:function(res){
            if(!res.error){
                addsx();
                $('.add1 input').val('');
                $('.add2 input').val('');
                $('.add3 input').val('');
                $('.add4 input').val('');
            }
        }

    })
    $('#addad').hide();
})
/*修改地址*/
$('.big2 a').click(function () {
    $('#alterad').hide();
})
$('.ul_adress').on('click',' .alter1',function(){
    $('#alterad').show();
    $('#alterad').attr('data_index',$(this).attr('data_index'));
    $.ajax({
        url:'/Palteradress',
        data:{id:$(this).attr('data_index')},
        success:function(res){
            if(!res.error){
                $('.add5 input').val(res.data.a_province);
                $('.add6 input').val(res.data.a_detailed);
                $('.add7 input').val(res.data.a_name);
                $('.add8 input').val(res.data.a_phone);
            }
        }
    })
});
$('.a4').click(function(){
    $.ajax({
        url:'/Pensurealtreadress',
        data:{
            id:$('#alterad').attr('data_index'),
            province:$('.add5 input').val(),
            detailed:$('.add6 input').val(),
            name:$('.add7 input').val(),
            phone:$('.add8 input').val()
        },
        success:function(res){
            if(!res.error){
                addsx();
            }
        }
    })
})
/*删除地址*/
// $('.ul_adress .drop1').click(function(){
//     console.log(1)
//     $('#dropadress').show();
// })
$('.ul_adress').on('click',' .drop1',function(){
    $('#dropadress').show();
    $('#dropadress').attr('data_index',$(this).attr('data_index'));
})
/*删除弹框*/
$('.big3 a').click(function () {
    $('#dropadress').hide();
})
$('.a6').click(function(){
    $.ajax({
        url:'/Pdropadress',
        data:{id:$('#dropadress').attr('data_index')},
        success:function(res){
            if(!res.error){
                addsx();

            }
        }
    })
});




/*个人信息*/
$('.btn_imfor').click(function () {
    $('.div1').hide();
    $('.div2').hide();
    $('.div3').show();
    $('.div4').hide();
    $.ajax({
        url:'/Pimfor',
        data:{
            id:userId
        },
        success:function(res){
            console.log(res);
            if(!res.img){
                $('.changehead').attr('src',"../images/mine/head.jpg");
            }else{
                $('.changehead').attr('src',res.img);
            }
           $('.name1 input').val(res.name);
           $('.num input').val(res.account);
           $('.pass input').val(res.pass);
            $('.sex select option').each(function(){
                if(($(this).html())==res.sex){
                    $(this).prop('selected',true);
                }
            })
           $('.call input').val(res.phone);
           $('.mail input').val(res.mail);}
    })
});
/*个人信息编辑*/
$('.s1').click(function(){
    $('.name1 input').attr('disabled',false);
    $('.pass input').attr('disabled',false);
    $('.call input').attr('disabled',false);
    $('.mail input').attr('disabled',false);
    $('.sex select').attr('disabled',false);
    $('.s2').attr('disabled',false);

});
$('.s2').click(function() {
    if (!json.name.test($('.name1 input').val())) {
        myalert('昵称格式错误');
    } else if (!json.password.test($('.pass input').val())) {
        myalert('密码格式错误');
    } else if (!json.phone.test($('.call input').val())) {
        myalert('电话格式错误');
    } else {
        $('#sleft .name').html($('.name1 input').val());
        $.ajax({
            url: '/Psave',
            data: {
                name: $('.name1 input').val(),
                pass: $('.pass input').val(),
                sex: $('.sex select').val(),
                phone: $('.call input').val(),
                mail: $('.mail input').val(),
                id: userId
            },
            success: function (res) {
                if (!res.error) {
                    myalert('修改成功');
                    $('.name1 input').attr('disabled', true);
                    $('.pass input').attr('disabled', true);
                    $('.call input').attr('disabled', true);
                    $('.mail input').attr('disabled', true);
                    $('.sex select').attr('disabled', true);
                    $('.s2').attr('disabled',true);
                }
            }
        });
    }
})
var json={
    phone:/^(1[3-9]\d{9})$/,
    name:/^([\w(\u4e00-\u9fa5)]){2,6}$/,
    password: /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{6,16}$/,
}




/*收藏*/
$('.btn_collect').click(function () {
    $('.div1').hide();
    $('.div2').hide();
    $('.div3').hide();
    $('.div4').show();
    $.ajax({
        url:'/Pcollectpush',
        data:{id:userId},
        success:function(res){
            if(!res.error){
                $('.c_essay').html('');
                for(var i=0;i<res.datac.length;i++){
                    var obj=$(
                        `<li>
                                <div class="ce_img">
                                    <img src="${res.datai[i][0].pi_img}" alt="">
                                </div>
                                <div class="detailed2">
                                    <p class="p1">${res.datac[i][0].p_content}</p>
                                </div>
                        </li>`
                    );
                    $('.c_essay').append(obj);
                };
            }
        }
    });
    $.ajax({
        url:'/Pcollectvideo',
        data:{id:userId},
        success:function(res){
            if(!res.error){
                $('.c_video').html('');
                for(var i=0;i<res.data.length;i++){
                    var obj=$(
                        `<li>
                                <div class="cv_img1">
                                    <img src="${res.data[i][0].Type3_src}" alt="">
                                </div>
                                <div class="detailed3">
                                    <p class="p1">${res.data[i][0].Type3_name}</p>
                                </div>
                        </li>`
                    );
                    $('.c_video').append(obj);
                };

            }
        }
    });
});


/*弹框*/
function myalert(str) {
    $('#tip').show();
    $('.mid p').html(str);
}
$('.big a').click(function () {
    $('#tip').hide();
})
/*支付*/
function mybuy(str){
    $('#tip1').show();
    $('.mid4 p').html(str);
}
$('.big4 a').click(function () {
    $('#tip1').hide();
})
/*收货*/
function mygetshop(str){
    $('#getshop').show();
    $('.mid7 p').html(str);
}
$('.big7 a').click(function () {
    $('#getshop').hide();
})
/*删除订单*/
function mydroporder(str) {
    $('#droporder').show();
    $('.mid6 p').html(str);
}
$('.big6 a').click(function () {
    $('#droporder').hide();
})
/*删除已完成订单*/
function mydelorder(str) {
    $('#delorder').show();
    $('.mid8 p').html(str);
}
$('.big8 a').click(function () {
    $('#delorder').hide();
})
/*订单详情*/
function myorderdetailed(str) {
    $('#orderdetailed').show();
    $('.mid5 ul').html(str);
}
$('.big5 a').click(function () {
    $('#orderdetailed').hide();
})