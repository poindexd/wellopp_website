function chromeViewportWorkAround(){var t=window.screen.height;navigator.userAgent.match(/Android/i)&&navigator.userAgent.match(/Chrome/i)&&(document.getElementById("splash").style.height=t+"px")}function stats(){$("#stats").fadeTo(1e3,1),$(".percentage").easyPieChart({animate:2e3,lineWidth:4,onStep:function(t){this.$el.find("span").text(Math.round(t)).digits()},onStop:function(t,e){this.$el.find("span").text(Math.round(e)).digits()},trackColor:"#ddd",scaleColor:!1})}$(document).ready(function(){$(".button-collapse").sideNav(),$(".parallax").parallax(),$(".slider").slider({full_width:!0,height:400,transition:2e3,interval:8e3}),$("body").fadeTo(500,1,function(){stats()})}),$.fn.digits=function(){return this.each(function(){$(this).text($(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g,"$1,"))})};