$(function(){
    var sWidth = $(".carousel").width(); //获取图的宽度
	var len = $(".carousel ul li").length;//图片个数  
    var index = 0; //轮播到第几张图片
    var btn = 0;

    $("#circle-0").css("opacity","1");
    $(".carousel ul").css("width",sWidth*(len+1));//设置所有的li在同一排

    $("#control-left").mouseover(function(event) {
        $("#control-left").css("opacity","1");
    });
    $("#control-left").mouseleave(function(event) {
        $("#control-left").css("opacity","0.3");
    });
    $("#control-right").mouseover(function(event) {
        $("#control-right").css("opacity","1");
    });
    $("#control-right").mouseleave(function(event) {
        $("#control-right").css("opacity","0.3");
    });

    $("#control-left").click(function(event){//上一页按钮
        clearBtn();
        index = index - 1;
        if(index == -1){
            index = len - 1;
            showEndPic();
        }else{
        showPics(index);
        }
        setBtn(index); 
    });

    $("#control-right").click(function(event){//下一页按钮
        clearBtn();
        index = index + 1;
        if(index == len){
            index = 0;
            showFirstPic();
        }else{
        showPics(index);
        }   
         setBtn(index); 
    });

    $("#circle-0").click(function(event){
        clearBtn();
        btn = 0;
        jumpToPic(btn,index);
        index = 0;
        setBtn(index); 
    });
    $("#circle-1").click(function(event){
        clearBtn();
        btn = 1;
        jumpToPic(btn,index);
        index = 1;
        setBtn(index);
    });
    $("#circle-2").click(function(event){
        clearBtn();
        btn = 2;
        jumpToPic(btn,index);
        index = 2;
        setBtn(index);
    });
    
    function showPics(index){
        var nowLeft = -index*sWidth;  
        $(".carousel ul").stop(true,false).animate({left:nowLeft},500); 
    }

    function showFirstPic(){//从最后到第一张
        $(".carousel ul").append($(".carousel ul li:first").clone());
        var nowLeft = -len*sWidth; 
        $(".carousel ul").stop(true,false).animate({left:nowLeft},500,function() {  
            $(".carousel ul").css("left","0");  
            $(".carousel ul li:last").remove();  
        }); 
    }
    function showEndPic(){//从第一张到最后
        $(".carousel ul").prepend($(".carousel ul li:last").clone());
        var nowLeft1 = -(len-1)*sWidth; 
        var nowLeft2 = -sWidth;
        $(".carousel ul").css("left",nowLeft2);
        $(".carousel ul").stop(true,false).animate({left:"0px"},500,function() {  
            $(".carousel ul").css("left",nowLeft1);//nowLeft应该从加元素之前看  
            $(".carousel ul li:first").remove();  
        }); 
    }
    function jumpToPic(btn,index){//点击下方按钮调用的函数
        if(btn < index){
            $(".carousel ul li:eq(index)").prepend($(".carousel ul li:eq(btn)").clone()); 
            var nowLeft1= -index*sWidth; 
            var nowLeft2 = -btn*sWidth;
            var nowLeft3 = -(index+1)*sWidth; 
            //$(".carousel ul").css("left",nowLeft3); 
            $(".carousel ul").stop(true,false).animate({left:nowLeft1},500,function() {  
                $(".carousel ul").css("left",nowLeft2); 
                $(".carousel ul li:eq(index)").remove();
            }); 
        }else if(btn > index){
            $(".carousel ul li:eq(index)").append($(".carousel ul li:eq(btn)").clone()); 
            var nowLeft1= -(index+1)*sWidth; 
            var nowLeft2 = -btn*sWidth; 
            $(".carousel ul").stop(true,false).animate({left:nowLeft1},500,function() {  
                $(".carousel ul").css("left",nowLeft2); 
                $(".carousel ul li:eq(index+1)").remove();
            }); 
        }
    }
    function setBtn(index){//设置下方按钮
        if(index == 0){
            $("#circle-0").css("opacity","1");
        }else if(index == 1){
            $("#circle-1").css("opacity","1");
        }else if(index == 2){
            $("#circle-2").css("opacity","1");
        } 
    }
    function clearBtn(){//设置下方按钮
        $("#circle-0").css("opacity","0.3");
        $("#circle-1").css("opacity","0.3");
        $("#circle-2").css("opacity","0.3");
    }
});