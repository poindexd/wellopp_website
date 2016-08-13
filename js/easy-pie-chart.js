<<<<<<< HEAD
// Generated by CoffeeScript 1.6.3
/*
Easy pie chart is a jquery plugin to display simple animated pie charts for only one value

Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.

Built on top of the jQuery library (http://jquery.com)

@source: http://github.com/rendro/easy-pie-chart/
@autor: Robert Fleischmann
@version: 1.2.3

Inspired by: http://dribbble.com/shots/631074-Simple-Pie-Charts-II?list=popular&offset=210
Thanks to Philip Thrasher for the jquery plugin boilerplate for coffee script
*/

(function($) {
  $.easyPieChart = function(el, options) {
    var addScaleLine, animateLine, drawLine, easeInOutQuad, rAF, renderBackground, renderScale, renderTrack,
      _this = this;
    this.el = el;
    this.$el = $(el);
    this.$el.data("easyPieChart", this);
    this.init = function() {
      var percent, scaleBy;
      _this.options = $.extend({}, $.easyPieChart.defaultOptions, options);
      percent = parseInt(_this.$el.data('percent'), 10);
      _this.percentage = 0;
      _this.canvas = $("<canvas width='" + _this.options.size + "' height='" + _this.options.size + "'></canvas>").get(0);
      _this.$el.append(_this.canvas);
      if (typeof G_vmlCanvasManager !== "undefined" && G_vmlCanvasManager !== null) {
        G_vmlCanvasManager.initElement(_this.canvas);
      }
      _this.ctx = _this.canvas.getContext('2d');
      if (window.devicePixelRatio > 1) {
        scaleBy = window.devicePixelRatio;
        $(_this.canvas).css({
          width: _this.options.size,
          height: _this.options.size
        });
        _this.canvas.width *= scaleBy;
        _this.canvas.height *= scaleBy;
        _this.ctx.scale(scaleBy, scaleBy);
      }
      _this.ctx.translate(_this.options.size / 2, _this.options.size / 2);
      _this.ctx.rotate(_this.options.rotate * Math.PI / 180);
      _this.$el.addClass('easyPieChart');
      _this.$el.css({
        width: _this.options.size,
        height: _this.options.size,
        lineHeight: "" + _this.options.size + "px"
      });
      _this.update(percent);
      return _this;
    };
    this.update = function(percent) {
      percent = parseFloat(percent) || 0;
      if (_this.options.animate === false) {
        drawLine(percent);
      } else {
        animateLine(_this.percentage, percent);
      }
      return _this;
    };
    renderScale = function() {
      var i, _i, _results;
      _this.ctx.fillStyle = _this.options.scaleColor;
      _this.ctx.lineWidth = 1;
      _results = [];
      for (i = _i = 0; _i <= 24; i = ++_i) {
        _results.push(addScaleLine(i));
      }
      return _results;
    };
    addScaleLine = function(i) {
      var offset;
      offset = i % 6 === 0 ? 0 : _this.options.size * 0.017;
      _this.ctx.save();
      _this.ctx.rotate(i * Math.PI / 12);
      _this.ctx.fillRect(_this.options.size / 2 - offset, 0, -_this.options.size * 0.05 + offset, 1);
      _this.ctx.restore();
    };
    renderTrack = function() {
      var offset;
      offset = _this.options.size / 2 - _this.options.lineWidth / 2;
      if (_this.options.scaleColor !== false) {
        offset -= _this.options.size * 0.08;
      }
      _this.ctx.beginPath();
      _this.ctx.arc(0, 0, offset, 0, Math.PI * 2, true);
      _this.ctx.closePath();
      _this.ctx.strokeStyle = _this.options.trackColor;
      _this.ctx.lineWidth = _this.options.lineWidth;
      _this.ctx.stroke();
    };
    renderBackground = function() {
      if (_this.options.scaleColor !== false) {
        renderScale();
      }
      if (_this.options.trackColor !== false) {
        renderTrack();
      }
    };
    drawLine = function(percent) {
      var offset;
      renderBackground();
      _this.ctx.strokeStyle = $.isFunction(_this.options.barColor) ? _this.options.barColor(percent) : _this.options.barColor;
      _this.ctx.lineCap = _this.options.lineCap;
      _this.ctx.lineWidth = _this.options.lineWidth;
      offset = _this.options.size / 2 - _this.options.lineWidth / 2;
      if (_this.options.scaleColor !== false) {
        offset -= _this.options.size * 0.08;
      }
      _this.ctx.save();
      _this.ctx.rotate(-Math.PI / 2);
      _this.ctx.beginPath();
      _this.ctx.arc(0, 0, offset, 0, Math.PI * 2 * percent / 100, false);
      _this.ctx.stroke();
      _this.ctx.restore();
    };
    rAF = (function() {
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
        return window.setTimeout(callback, 1000 / 60);
      };
    })();
    animateLine = function(from, to) {
      var anim, startTime;
      _this.options.onStart.call(_this);
      _this.percentage = to;
      Date.now || (Date.now = function() {
        return +(new Date);
      });
      startTime = Date.now();
      anim = function() {
        var currentValue, process;
        process = Date.now() - startTime;
        if (process < _this.options.animate) {
          rAF(anim);
        }
        _this.ctx.clearRect(-_this.options.size / 2, -_this.options.size / 2, _this.options.size, _this.options.size);
        renderBackground.call(_this);
        currentValue = [easeInOutQuad(process, from, to - from, _this.options.animate)];
        _this.options.onStep.call(_this, currentValue);
        drawLine.call(_this, currentValue);
        if (process >= _this.options.animate) {
          return _this.options.onStop.call(_this, currentValue, to);
        }
      };
      rAF(anim);
    };
    easeInOutQuad = function(t, b, c, d) {
      var easeIn, easing;
      easeIn = function(t) {
        return Math.pow(t, 2);
      };
      easing = function(t) {
        if (t < 1) {
          return easeIn(t);
        } else {
          return 2 - easeIn((t / 2) * -2 + 2);
        }
      };
      t /= d / 2;
      return c / 2 * easing(t) + b;
    };
    return this.init();
  };
  $.easyPieChart.defaultOptions = {
    barColor: '#ef1e25',
    trackColor: '#f2f2f2',
    scaleColor: '#dfe0e0',
    lineCap: 'round',
    rotate: 0,
    size: 110,
    lineWidth: 3,
    animate: false,
    onStart: $.noop,
    onStop: $.noop,
    onStep: $.noop
  };
  $.fn.easyPieChart = function(options) {
    return $.each(this, function(i, el) {
      var $el, instanceOptions;
      $el = $(el);
      if (!$el.data('easyPieChart')) {
        instanceOptions = $.extend({}, options, $el.data());
        return $el.data('easyPieChart', new $.easyPieChart(el, instanceOptions));
      }
    });
  };
  return void 0;
})(jQuery);
=======
// Generated by CoffeeScript 1.6.3
/*
Easy pie chart is a jquery plugin to display simple animated pie charts for only one value

Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.

Built on top of the jQuery library (http://jquery.com)

@source: http://github.com/rendro/easy-pie-chart/
@autor: Robert Fleischmann
@version: 1.2.3

Inspired by: http://dribbble.com/shots/631074-Simple-Pie-Charts-II?list=popular&offset=210
Thanks to Philip Thrasher for the jquery plugin boilerplate for coffee script
*/
!function(t){t.easyPieChart=function(o,e){var n,i,a,s,r,c,l,p,h=this;return this.el=o,this.$el=t(o),this.$el.data("easyPieChart",this),this.init=function(){var o,n;return h.options=t.extend({},t.easyPieChart.defaultOptions,e),o=parseInt(h.$el.data("percent"),10),h.percentage=0,h.canvas=t("<canvas width='"+h.options.size+"' height='"+h.options.size+"'></canvas>").get(0),h.$el.append(h.canvas),"undefined"!=typeof G_vmlCanvasManager&&null!==G_vmlCanvasManager&&G_vmlCanvasManager.initElement(h.canvas),h.ctx=h.canvas.getContext("2d"),window.devicePixelRatio>1&&(n=window.devicePixelRatio,t(h.canvas).css({width:h.options.size,height:h.options.size}),h.canvas.width*=n,h.canvas.height*=n,h.ctx.scale(n,n)),h.ctx.translate(h.options.size/2,h.options.size/2),h.ctx.rotate(h.options.rotate*Math.PI/180),h.$el.addClass("easyPieChart"),h.$el.css({width:h.options.size,height:h.options.size,lineHeight:""+h.options.size+"px"}),h.update(o),h},this.update=function(t){return t=parseFloat(t)||0,h.options.animate===!1?a(t):i(h.percentage,t),h},l=function(){var t,o,e;for(h.ctx.fillStyle=h.options.scaleColor,h.ctx.lineWidth=1,e=[],t=o=0;o<=24;t=++o)e.push(n(t));return e},n=function(t){var o;o=t%6===0?0:.017*h.options.size,h.ctx.save(),h.ctx.rotate(t*Math.PI/12),h.ctx.fillRect(h.options.size/2-o,0,.05*-h.options.size+o,1),h.ctx.restore()},p=function(){var t;t=h.options.size/2-h.options.lineWidth/2,h.options.scaleColor!==!1&&(t-=.08*h.options.size),h.ctx.beginPath(),h.ctx.arc(0,0,t,0,2*Math.PI,!0),h.ctx.closePath(),h.ctx.strokeStyle=h.options.trackColor,h.ctx.lineWidth=h.options.lineWidth,h.ctx.stroke()},c=function(){h.options.scaleColor!==!1&&l(),h.options.trackColor!==!1&&p()},a=function(o){var e;c(),h.ctx.strokeStyle=t.isFunction(h.options.barColor)?h.options.barColor(o):h.options.barColor,h.ctx.lineCap=h.options.lineCap,h.ctx.lineWidth=h.options.lineWidth,e=h.options.size/2-h.options.lineWidth/2,h.options.scaleColor!==!1&&(e-=.08*h.options.size),h.ctx.save(),h.ctx.rotate(-Math.PI/2),h.ctx.beginPath(),h.ctx.arc(0,0,e,0,2*Math.PI*o/100,!1),h.ctx.stroke(),h.ctx.restore()},r=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){return window.setTimeout(t,1e3/60)}}(),i=function(t,o){var e,n;h.options.onStart.call(h),h.percentage=o,Date.now||(Date.now=function(){return+new Date}),n=Date.now(),e=function(){var i,l;if(l=Date.now()-n,l<h.options.animate&&r(e),h.ctx.clearRect(-h.options.size/2,-h.options.size/2,h.options.size,h.options.size),c.call(h),i=[s(l,t,o-t,h.options.animate)],h.options.onStep.call(h,i),a.call(h,i),l>=h.options.animate)return h.options.onStop.call(h,i,o)},r(e)},s=function(t,o,e,n){var i,a;return i=function(t){return Math.pow(t,2)},a=function(t){return t<1?i(t):2-i(t/2*-2+2)},t/=n/2,e/2*a(t)+o},this.init()},t.easyPieChart.defaultOptions={barColor:"#ef1e25",trackColor:"#f2f2f2",scaleColor:"#dfe0e0",lineCap:"round",rotate:0,size:110,lineWidth:3,animate:!1,onStart:t.noop,onStop:t.noop,onStep:t.noop},t.fn.easyPieChart=function(o){return t.each(this,function(e,n){var i,a;if(i=t(n),!i.data("easyPieChart"))return a=t.extend({},o,i.data()),i.data("easyPieChart",new t.easyPieChart(n,a))})}}(jQuery);
>>>>>>> 68011d226251434205e4b284cf013233145c31fe
