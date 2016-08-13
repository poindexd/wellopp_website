$(document).ready(function() {
  $('.button-collapse').sideNav();
  $('.parallax').parallax();
  $('.slider').slider({full_width: true, height:400, transition: 2000, interval: 8000});
  $('body').fadeTo(500, 1, function(){
    stats();
  });
  
});

$.fn.digits = function(){ 
    return this.each(function(){ 
        $(this).text( $(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") ); 
    })
}

function stats(){

  $('#stats').fadeTo(1000, 1);

  $('.percentage').easyPieChart({
    animate: 2000,
    lineWidth: 4,
    onStep: function(value) {
      this.$el.find('span').text(Math.round(value)).digits();
    },
    onStop: function(value, to) {
      this.$el.find('span').text(Math.round(to)).digits();
    },
    //trackColor:'#143f52',
    trackColor: '#ddd',
    scaleColor:false
  });
}

