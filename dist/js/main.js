function stats(){$("#stats").fadeTo(1e3,1),$(".percentage").easyPieChart({animate:2e3,lineWidth:4,onStep:function(t){this.$el.find("span").text(Math.round(t)).digits()},onStop:function(t,e){this.$el.find("span").text(Math.round(e)).digits()},barColor:"#ffffff00",trackColor:"#ddd",scaleColor:!1}),surveyCounter()}function surveyCounter(){setTimeout(surveyCounter,100*Math.rand()),$("#stats .percentage span").eq(0).html(new Date)}$(document).ready(function(){$(".button-collapse").sideNav(),$(".parallax").parallax(),$(".slider").slider({full_width:!0,height:400,transition:2e3,interval:8e3}),$("body").fadeTo(500,1,function(){stats()}),$("#submit").on("click",function(t){t.preventDefault(),$(this).addClass("disabled"),$.ajax({type:"post",url:"mail.php",data:$("form").serialize(),success:function(t){$("#form_container").html("<br><p>"+t+"</p>")}})})}),$.fn.digits=function(){return this.each(function(){$(this).text($(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g,"$1,"))})};