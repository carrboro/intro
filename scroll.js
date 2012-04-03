//set up scrolling for anchor links. from http://css-tricks.com/snippets/jquery/smooth-scrolling/
$(document).ready(function() {
  function filterPath(string) {
  return string
    .replace(/^\//,'')
    .replace(/(index|default).[a-zA-Z]{3,4}$/,'')
    .replace(/\/$/,'');
  }
  var locationPath = filterPath(location.pathname);
  var scrollElem = scrollableElement('html', 'body');

  $('a[href*=#]').each(function() {
    var thisPath = filterPath(this.pathname) || locationPath;
    if (  locationPath == thisPath
    && (location.hostname == this.hostname || !this.hostname)
    && this.hash.replace(/#/,'') ) {
      var $target = $(this.hash), target = this.hash;
      if (target) {
        var targetOffset = $target.offset().top;
        $(this).click(function(event) {
          event.preventDefault();
          $(scrollElem).animate({scrollTop: targetOffset}, 400, function() {
            location.hash = target;
          });
        });
      }
    }
  });

  // use the first element that is "scrollable"
  function scrollableElement(els) {
    for (var i = 0, argLength = arguments.length; i <argLength; i++) {
      var el = arguments[i],
          $scrollElement = $(el);
      if ($scrollElement.scrollTop()> 0) {
        return el;
      } else {
        $scrollElement.scrollTop(1);
        var isScrollable = $scrollElement.scrollTop()> 0;
        $scrollElement.scrollTop(0);
        if (isScrollable) {
          return el;
        }
      }
    }
    return [];
  }

});




//initiate fancybox
$(document).ready(function() {
	$(".fancybox").fancybox({'type': 'iframe', 'width': 1060});
});




//create jquery stopscroll event. from http://james.padolsey.com/javascript/special-scroll-events-for-jquery/
$(document).ready(function(){
    var special = jQuery.event.special,
        uid1 = 'D' + (+new Date()),
        uid2 = 'D' + (+new Date() + 1);
    special.scrollstart = {
        setup: function() {
            var timer,
                handler =  function(evt) {
                    var _self = this,
                        _args = arguments;
                    if (timer) {
                        clearTimeout(timer);
                    } else {
                        evt.type = 'scrollstart';
                        jQuery.event.handle.apply(_self, _args);
                    }
                    timer = setTimeout( function(){
                        timer = null;
                    }, special.scrollstop.latency);
                };
            jQuery(this).bind('scroll', handler).data(uid1, handler);
        },
        teardown: function(){
            jQuery(this).unbind( 'scroll', jQuery(this).data(uid1) );
        }
    }; 
    special.scrollstop = {
        latency: 300,
        setup: function() {
            var timer,
                    handler = function(evt) {
                    var _self = this,
                        _args = arguments;
                    if (timer) {
                        clearTimeout(timer);
                    }
                    timer = setTimeout( function(){
                        timer = null;
                        evt.type = 'scrollstop';
                        jQuery.event.handle.apply(_self, _args); 
                    }, special.scrollstop.latency); 
                };
            jQuery(this).bind('scroll', handler).data(uid2, handler);
        },
        teardown: function() {
            jQuery(this).unbind( 'scroll', jQuery(this).data(uid2) );
        }
    };
});




//update navigation to show current section on scroll
$(document).ready(function(){
	jQuery(window).bind('scrollstop', function(){
		var intro = document.getElementById('intro');
		var introPos = intro.getBoundingClientRect().top - 100;
		var work = document.getElementById('work');
		var workPos = work.getBoundingClientRect().top - 100;
		var resume = document.getElementById('resume');
		var resumePos = resume.getBoundingClientRect().top - 100;
		var interests = document.getElementById('interests');
		var interestsPos = interests.getBoundingClientRect().top - 100;
		var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
		$("nav li").removeClass("active");
		if ( interestsPos > 0 && resumePos > 0 && workPos > 0 ) {
			$("nav li.intro-nav").addClass("active");
		}  else if ( interestsPos > 0 && resumePos > 0 ) {
			$("nav li.work-nav").addClass("active");
		}  else if ( interestsPos > 0 ) {
			$("nav li.resume-nav").addClass("active");
		}  else {
			$("nav li.interests-nav").addClass("active");
		}
	});
});