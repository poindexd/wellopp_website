$(document).ready(function() {
	$('.button-collapse').sideNav();
	$('.parallax').parallax();
	$('.slider').slider({full_width: true, height:400, transition: 2000, interval: 8000});
	$('body').fadeTo(500, 1, function(){
		stats();
		$('.calign-2 .card').matchHeight({byRow:false});
		$('.calign .card-panel').matchHeight({byRow:false});
		$('.calign .card').matchHeight({byRow:true});
	});
	//$(window).resize(function(){
		//alignColumns();
	//});

	$('#submit').on('click', function (e) {
			e.preventDefault();
			$(this).addClass('disabled');
			$.ajax({
					type: 'post',
					url: 'mail.php',
					data: $('form').serialize(),
					success: function (data) {
						$('#form_container').html('<br><p>'+data+'</p>');
					}
			});
	});
	//alignColumns();
});

$.fn.digits = function(){ 
		return this.each(function(){ 
				$(this).text( $(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") ); 
		})
}

function alignColumns(){
	$('.calign').each(function(){
		var height = Math.max($(this).find('.col').map(function(el){
			return $(el).height();
		}));
		$(this).find('.col').each(function(){
			$(this).height(height);
		})
	});
}

function stats(){

	$('#stats').fadeTo(1000, 1);

	$('.percentage').easyPieChart({
		animate: 2000,
		lineWidth: 4,
		size: 120,
		text: 0,
		onStart: function(value) {
			this.text = this.$el.data('text');
			this.percent = this.$el.data('percent')
		},
		onStep: function(value) {
			this.$el.find('span').text(Math.round(this.text * (value/this.percent))).digits();
		},
		onStop: function(value, to) {
			this.$el.find('span').text(Math.round(this.text)).digits();
		},
		//trackColor:'#143f52',
		//trackColor: '#ffffff00',
		barColor: '#ffffff00',
		trackColor: '#ddd',
		scaleColor:false
	});

}