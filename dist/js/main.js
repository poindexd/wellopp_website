function stats(){$("#stats").fadeTo(1e3,1),$(".percentage").easyPieChart({animate:2e3,lineWidth:4,size:120,text:0,onStart:function(t){this.text=this.$el.data("text"),this.percent=this.$el.data("percent")},onStep:function(t){this.$el.find("span").text(Math.round(this.text*(t/this.percent))).digits()},onStop:function(t,e){this.$el.find("span").text(Math.round(this.text)).digits()},barColor:"#ffffff00",trackColor:"#ddd",scaleColor:!1})}$(document).ready(function(){$(".button-collapse").sideNav(),$(".parallax").parallax(),$(".slider").slider({full_width:!0,height:400,transition:2e3,interval:8e3}),$("body").fadeTo(500,1,function(){stats()}),$("#submit").on("click",function(t){t.preventDefault(),$(this).addClass("disabled"),$.ajax({type:"post",url:"mail.php",data:$("form").serialize(),success:function(t){$("#form_container").html("<br><p>"+t+"</p>")}})})}),$.fn.digits=function(){return this.each(function(){$(this).text($(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g,"$1,"))})};