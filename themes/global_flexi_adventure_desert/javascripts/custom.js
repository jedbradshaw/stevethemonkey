/*

	Starting Blocks Theme Custom jQuery File

	======
	Contents:
	------
	#Basic init setup
	#'Default' Gallery Style (Lightbox with thumbs) - including support for prodcuts based on this gallery style
	#'Montage' Gallery Style - including support for prodcuts based on this gallery style
	#'Slideshow' Gallery Styles (single and multi) - including support for prodcuts based on these gallery styles
	#'Gallery with thumbs' Gallery Style - including support for prodcuts based on these gallery styles
	#'Carousel Slide' Widget
	#'Live Shopping Basket' Widget
	# Livechat Status Widget
	#Responsive video helper for jPlayer
	#Responsive video helper for JWPlayer
	#Responsive Calendar
	#Full width banner
	#Blog Loop
	

*/

/*

	#Popdown widgets

*/
	function hideSearchPopdown() {
		$("#search-form-popdown").removeClass("visible");
		setTimeout(function () {
			$("#search-form-popdown").removeClass("animate");					
		}, 300);
		$(".display-popdown-widget a.active").removeClass("active");
	
	}
	$(document).ready(function(){
		$("html").click(function(e){
			hideSearchPopdown();
		});
		$(".display-popdown-widget a").click(function(e){
			if ($(this).hasClass("active")) {
				$(this).removeClass("active");
				hideSearchPopdown(e);
			} else {
				$(this).addClass("active");
				var $pd = $("#"+$(this).data("target"));
				var lh = $(this).outerWidth() / 2;
				var ol = $(this).offset().left + lh;
				var t = $(this).offset().top + $(this).outerHeight() + 3;
				var pl = 160;
				ol = ol - pl;
				$(".tri",$pd).css("margin-left","-6px");
				if (ol + 320 > $(window).width()-20) {
					var diff = ol + 320 - $(window).width() + 10;
					ol = ol - diff;
					diff = diff-6;
					$(".tri",$pd).css("margin-left",diff+"px");
				}
				$pd.css("left",ol+"px").css("top",t+"px");
				setTimeout(function () {
					$pd.addClass("animate");
					$pd.addClass("visible");
				}, 1);
				$("input",$pd).focus();
			}

			return false;
		});
	});
/*

	#Basic init setup

*/
	var scrolling = false;
	var scrollingTimer;
	$(document).scroll(function(){
		scrolling = true;
		clearTimeout(scrollingTimer);
		scrollingTimer = setTimeout(function () {
			scrolling = false;
		}, 100);
		
		$("#backToTop").show().css("opacity","0");
		if ($(document).scrollTop()>200) {
			$("#backToTop").css("opacity","1");
		} else {
			$("#backToTop").css("opacity","0");
		}

		$("*[data-scroll-decay]").each(function(){
			var st = $(document).scrollTop();
			var tt = $(this).offset().top;
			var th = $(this).outerHeight();
			var wh = $(window).height();
			
			var decay = 0.5;
			if (typeof $(this).data("scroll-decay") != 'undefined') {
				decay = $(this).data("scroll-decay");
			}
			
			var bottom_edge = tt + th;
			var viewport_visible_test = wh + th + st;
			var track = wh + th;
			var available_for_effect = $(" > .backstretch > img:last",$(this)).height() - $("> .backstretch",$(this)).innerHeight();

	
			if (bottom_edge<viewport_visible_test && bottom_edge>st) {
				var pos = viewport_visible_test-bottom_edge;
				var pc = pos/track*100;
				var move = pc * available_for_effect / 100;

				move = -Math.abs(move);						
				move = move*decay;
				
				$("> .backstretch img:last",$(this))
				.css("-moz-transform","translateY("+move+"px)")
				.css("-webkit-transform","translateY("+move+"px)")
				.css("-o-transform","translateY("+move+"px)")
				.css("transform","translateY("+move+"px)");

			}
			
		

		});
	});
	$(window).load(function(){
		setRecentBlogWidths();
		if ($("#logo img").width()<$("#logo").width()) {
			$("#logo").css("width",$("#logo img").width()+"px");
		}
		imageMarginHelper();

		modules();
		flexiBreak();
		moduleHeights();
		checkOverlaps();
		backstretches();

		setTimeout(function () {
			$(document).trigger("scroll");
		}, 50);
			
	});
	$(window).resize(function(){
		if (!scrolling){
			var st = $(document).scrollTop();
			$("#mobile-menu-auto").addClass("hidden");
			imageMarginHelper();
			hideSearchPopdown();
			modules();
			flexiBreak();
			moduleHeights();
			checkOverlaps();
			setRecentBlogWidths();
			$("body,html").scrollTop(st);
			setTimeout(function () {
				$(document).trigger("scroll");
			}, 50);
		}
	});
	$(document).ready(function(){
		$("body").addClass("js");
		$("body").addClass("prepping");
		modules();
		flexiBreak();
		moduleHeights();
		checkOverlaps();
		$("body").removeClass("prepping");
		
		$(".column").each(function(){
			if ($(this).text().trim()==""&&!$(this).children().length) {
				$(this).addClass("empty-column");
			}
		});
		
		$(".mobile-menu a").click(function(){
			if (!$(this).parents(".mobile-menu").hasClass("style") || $(this).parents(".mobile-menu").hasClass("style-append")) {
				if (!$("#mobile-menu-auto").length) {
					$(this).parents(".row").after('<section class="row mobile-menu-row"><ul id="mobile-menu-auto" class="hidden"></ul></section>');
					var $target = $("#mobile-menu-auto");
					$(".nav > ul").children(":not(#nav-logo)").each(function(){
						$target.append($(this).clone());
					});
					$target.find("> li > a").removeAttr("style");
				} else {
					var $target = $("#mobile-menu-auto");				
				}
				setTimeout(function () {
					if ($target.hasClass("hidden")) {
						$target.removeClass("hidden");
					} else {
						$target.addClass("hidden");
					}				
				}, 0);
			}
			if ($(this).parents(".mobile-menu").hasClass("style-reveal-left")||$(this).parents(".mobile-menu").hasClass("style-reveal-right")) {
				var revealDirection = ($(this).parents(".mobile-menu").hasClass("style-reveal-left")?"left":"right");
				if (!$("#mobile-menu-behind").length) {
					$("body").addClass("mobile-menu-position-"+revealDirection);
					$("body").wrapInner('<div id="mobile-menu-page-wrap"></div>');
					$("#mobile-menu-page-wrap").click(function(){
						$("body").removeClass("mobile-menu-revealing-left mobile-menu-revealing-right");
						setTimeout(function () {
							$("body").removeClass("mobile-menu-animating-"+revealDirection);
						}, 700);
					});
					checkMobileMenuHeights();
					$("body").prepend('<div id="mobile-menu-behind"><ul></ul></section>');
					var $target = $("#mobile-menu-behind ul");
					$(".nav > ul").children(":not(#nav-logo)").each(function(){
						$target.append($(this).clone());
					});
					$target.find("> li > a").removeAttr("style");
				}
				setTimeout(function () {

					$("body").addClass("mobile-menu-animating-"+revealDirection+" mobile-menu-revealing-"+revealDirection);

				}, 10);
			}
			return false;
		});
		
		$("*[data-scroll-effect]").each(function(){		
			$(this).addClass("parallax");
		});
		// Fix for image margins when floated before headings
		$("div.Right_Image,div.Left_Image").each(function(){
			if ($(this).prev().length && $(this).next().length) {
				if ($(this).prev()[0].tagName.toLowerCase()=="p"&&$(this).next()[0].tagName.toLowerCase()=="h1") {
					$(this).css("margin-top","30px");
				}
				if (
					$(this).prev()[0].tagName.toLowerCase()=="p"&&
					(
						$(this).next()[0].tagName.toLowerCase()=="h2"
						||$(this).next()[0].tagName.toLowerCase()=="h3"
						||$(this).next()[0].tagName.toLowerCase()=="h4"
					)
				) {
					$(this).css("margin-top","18px");
				}
			}

		});
		// Small bit of code to enable 'warning' class to be added to stock level based on 'Warning stock level' theme variable.
		$(".separateOptionStock").change(function(){
			if (parseInt($("option:selected",$(this)).attr("data-stock"))<parseInt($(".stockAndPrice",$(this).parent()).attr("data-warning-threshold"))) {
				$(".stockAndPrice .stock",$(this).parent()).addClass("warning");
			} else {
				$(".stockAndPrice .stock",$(this).parent()).removeClass("warning");
			}
		});	
		imageMarginHelper();
		
		$(".submit_form a").click(function(){
			$(this).parents("form").submit();
			return false;
		});
		$(".bpe_image").each(function(){
			if (typeof $("img",$(this)).attr("alt") != 'undefined') {
				if (typeof $("img",$(this)).attr("title") == 'undefined') {
					$("img",$(this)).attr("title",$("img",$(this)).attr("alt"));
				}
			}
		});
		$(".Caption,.Heavy_Border_Caption,.Light_Border_Caption").each(function(){
			if (typeof $("img",$(this)).attr("alt") != 'undefined') {
				var text = $("img",$(this)).attr("alt").split("||");
				var newString = "";
				for (var i=0; i < text.length; i++) {
					if (i==0) {
						newString = "<strong>"+text[i]+"</strong>";
					} else {
						newString = newString+"<br/>"+text[i];
					}
				};
				$(this).addClass("clearfix");
				$(this).wrapInner("<div class='captionWrap'></div>");
				$(".captionWrap",$(this)).append('<span class="caption">'+newString+'</span>');
			}
		});
		$("body").addClass("js");

		$(".focusSwapWrap input[type=text]").focus(function(){
			$(this).parent('.focusSwapWrap').addClass("focus");
		});
		$(".focusSwapWrap input[type=text]").blur(function(){
			if ($(this).val().replace(/ /g,'')=="") {
				$(this).val("");
				$(this).parent('.focusSwapWrap').removeClass("focus");	
			}
		});
		$( '#nav li:has(ul)' ).doubleTapToGo();
		$("#updateQuantitiesP").click(function(){
			$("#quantityForm").submit();
		});	
		

	});
	function backstretches() {
		$("*[data-backgrounds]").each(function(){
			var duration = 4000;
			var fade = 1000;
			var opacity = 1;
			var colour = "transparent";
			if (typeof $(this).data("background-color") != 'undefined') {
				colour = $(this).data("background-color");
			}
			if (typeof $(this).data("background-opacity") != 'undefined') {
				opacity = $(this).data("background-opacity");
			}
			if (typeof $(this).data("background-duration") != 'undefined') {
				duration = $(this).data("background-duration");
			}
			if (typeof $(this).data("background-fade") != 'undefined') {
				fade = $(this).data("background-fade");
			}
			$(this).backstretch($(this).data("backgrounds"), {duration: duration, fade: fade});
			$(".backstretch",$(this)).css("opacity",opacity);
			$(this).css("background-color",colour);
		});
	}
	function moduleHeights() {
		$(".row:visible:not(.mobile-menu-row)").each(function(){
			// calculate row height
			var rowhl = 0;
			var rowhr = 0;
			var subrowh=0;
			var firstrow=true;
			var wrapperspace = 0;
			if ($("> *:not(.module)",$(this)).length) {
				wrapperspace = 
				parseFloat($("> *:not(.module)",$(this)).css("padding-top")) 
				+ parseFloat($("> *:not(.module)",$(this)).css("margin-top")) 
				+ parseFloat($("> *:not(.module)",$(this)).css("border-top-width"))
				+ parseFloat($("> *:not(.module)",$(this)).css("padding-bottom")) 
				+ parseFloat($("> *:not(.module)",$(this)).css("margin-bottom")) 
				+ parseFloat($("> *:not(.module)",$(this)).css("border-bottom-width"))
				;
				rowhl = wrapperspace;
			}
			$(".module",$(this)).each(function(){
				if ($(this).outerHeight(true)>rowhl) {
					rowhl = $(this).outerHeight(true);
				}
			});
			rowhl = rowhl+subrowh;
			
			$(".align-left:not(.valign),.align-:not(.valign)",$(this)).each(function(){
				if ($(this).hasClass("clear-left") || firstrow) {
					firstrow = false;
					subrowh = subrowh+$(this).outerHeight(true);

				} else {
					if ($(this).outerHeight(true)>subrowh) {
						subrowh=$(this).outerHeight(true);
					}
				}
			});
			if (subrowh>rowhl) {
				rowhl = subrowh;				
			}
			subrowh=0;
			firstrow=true;
			$(".align-right:not(.valign)",$(this)).each(function(){

				if ($(this).hasClass("clear-right") || firstrow) {
					firstrow=false
					subrowh = subrowh+$(this).outerHeight(true);
				} else {
					if ($(this).outerHeight(true)>subrowh) {
						subrowh=$(this).outerHeight(true);
					}
				}

				rowhr = rowhr+subrowh;

			});
			
			subrowh=0;
			firstrow=true;
			$(".align-center",$(this)).each(function(){
				if (!$(this).next().length&&!$(this).prev().length) {
					subrowh = $(this).outerHeight(true);
				}
				rowhr = rowhr+subrowh;
				if ($(this).outerHeight(true)>rowhr) {
					rowhr=$(this).outerHeight(true);
				}

			});
			
			
			$(".align-justify",$(this)).each(function(){

				if (!$(this).hasClass("clear-right")) {
					if ($(this).prev().hasClass("align-right")) {
						if ($(this).prev().hasClass("clear-right")) {
							var oldrow = $(this).prev().outerHeight(true);
						} else {
							var oldrow = 0;
							$(this).prevUntil(".clear-right",".align-right").each(function(){
								if ($(this).outerHeight(true)>oldrow) {
									oldrow = $(this).outerHeight(true);
								}
							});								
						}
						if ($(this).outerHeight(true) > oldrow) {
							rowhr = rowhr-oldrow;
							rowhr = rowhr+$(this).outerHeight(true);
						}
					}
					if (!$(this).next().length&&!$(this).prev().length) {
						rowhr = rowhr+$(this).outerHeight(true);
					}
				}
				
				
				if (!$(this).hasClass("clear-left")) {
					if ($(this).prev().hasClass("align-left")) {
						if ($(this).prev().hasClass("clear-left")) {
							var oldrow = $(this).prev().outerHeight(true);
						} else {
							var oldrow = 0;
							$(this).prevUntil(".clear-left",".align-left").each(function(){
								if ($(this).outerHeight(true)>oldrow) {
									oldrow = $(this).outerHeight(true);
								}
							});								
						}
						if ($(this).outerHeight(true) > oldrow) {
							rowhl = rowhl-oldrow;
							rowhl = rowhl+$(this).outerHeight(true);
						}
					}
				}
				

			});
				

			var wh = 0;
			$(".width",$(this)).each(function(){
				if ($(this).hasClass("width-valign-middle")||$(this).hasClass("width-valign-bottom")) {
					if ($(this).find("> div").outerHeight(true)>wh) {
						wh=$(this).find("> div").outerHeight(true);
					}
					
				} else {
					if ($(this).outerHeight(true)>wh) {
						wh=$(this).outerHeight(true);
					}
					
				}
			});
			$(".width",$(this)).css("height",wh+"px");
			
			
			
			if (rowhl>rowhr) {
				var r = rowhl;
			} else {
				var r = rowhr;
			}
			if (wh > r) {
				r = wh;
			}
			$(this).css("height",r+"px");
			if (typeof $(this).data("min-height")!='undefined') {
				if ($(this).data("min-height")=="window") {
					var wh = $(window).height();					
				} else {
					var wh = parseFloat($(this).data("min-height"));
				}

				var p = wh / 2;
				var pt = p - r/2;
				var pb = p + r/2;
				var deduct = parseFloat($(this).parent(".container").css("padding-top")) + parseFloat($(this).parent(".container").css("border-top-width")) + parseFloat($(this).css("margin-top"));
			
				pt = pt - deduct;
				pb = pb - deduct;
				if (pt>0&&pb>0) {
					if (pb>r) { 
						$(this).css("padding-top",pt+"px").css("padding-bottom",pb+"px");
					} else {
						$(this).css("padding-top","0px").css("padding-bottom","0px");
					}

				} else {
					$(this).css("padding-top","0px").css("padding-bottom","0px");
				}
			}

			$(".width-valign-middle").each(function(){
				var t = $(this).find("> div,> ul").height() / 2;
				$(this).find("> *").css("margin-bottom","-"+t+'px');
			});	
							
		});
	}
	function checkMobileMenuHeights() {
		if ($("#mobile-menu-page-wrap").length) {
			if ($("#mobile-menu-page-wrap").height()<$(window).height()) {
				$("#mobile-menu-page-wrap").css("min-height",$(window).height()+"px");
			}
			if ($("#mobile-menu-behind").height()<$(window).height()) {
				$("#mobile-menu-behind").css("min-height",$(window).height()+"px");
			}			
		}
	}
	function modules() {
		$(".align-center:not(.width)").each(function(){
			var $t = $(this);
			var l = $t.css("left");
			var r = $t.css("right");
			$t.css({opacity:0,float:"left","width":"auto","right":"auto","left":"auto"});
			var w = $t.outerWidth() + 1;
			$t.css({width:w+"px",float:"none",opacity:1,"left":l,"right":r});
		});
		$(".valign-middle:not(.width)").each(function(){
			var t = $(this).height() / 2;
			$(this).css("margin-bottom","-"+t+'px');				
		});
			
		$(".row:visible").each(function(){

			var $row = $(this);			
			$row.css("height","auto");
			$(".width",$(this)).css("height","auto");
			
			// Loop through all valign-bottom align-right clear-right items and adjust the bottom position so they stack. 
			var offset =0
			var $els = $($(".valign-bottom.clear-right",$(this)).get().reverse());
			$els.each(function(){
				$(this).css("bottom",offset+"px");
				offset=offset+$(this).outerHeight(true);
			});
			if ($els.last().hasClass("valign-bottom")) {
				$els.last().prevUntil(":not(.align-right,.align-justify),.clear-right",".valign-bottom.align-right").css("bottom",offset+"px");
			}
			
			// Loop through all valign-bottom align-left clear-left items and adjust the bottom position so they stack. 
			var offset =0
			var $els = $($(".valign-bottom.clear-left",$(this)).get().reverse());
			$els.each(function(){
				$(this).css("bottom",offset+"px");
				offset=offset+$(this).outerHeight(true);
			});
			if ($els.last().prev().hasClass("valign-bottom")) {
				$els.last().prevUntil(":not(.align-left,.align-justify),.clear-left",".valign-bottom.align-left").css("bottom",offset+"px");
			}
			
			
		
			
			// Go through valign-top align-right items and adjust right position so they sit on the same row
			var widths = parseFloat($(".valign-top.align-right",$(this)).css("right"));
			$(".valign-top.align-right",$(this)).each(function(){
				widths = widths+$(this).outerWidth(true);
				if (!$(this).next().hasClass("clear-right") && $(this).next(".valign-top.align-right").length) {
					$(this).next().css("right",widths+"px");
				}

			});
			
			// Go through valign-middle align-right items and adjust right position so they sit on the same row
			var widths = parseFloat($(".valign-middle.align-right",$(this)).css("right"));
			$(".valign-middle.align-right",$(this)).each(function(){
				widths = widths+$(this).outerWidth(true);
				if (!$(this).next().hasClass("clear-right") && $(this).next(".valign-middle.align-right").length) {
					$(this).next().css("right",widths+"px");
				}

			});
			
			// Go through valign-bottom align-right items and adjust right position so they sit on the same row
			var widths = parseFloat($(".valign-bottom.align-right",$(this)).css("right"));
			$(".valign-bottom.align-right",$(this)).each(function(){
				widths = widths+$(this).outerWidth(true);
				if (!$(this).next().hasClass("clear-right") && $(this).next(".valign-bottom.align-right").length) {
					$(this).next().css("right",widths+"px");
				}

			});
			
			// Go through valign-bottom align-left items and adjust right position so they sit on the same row
			var widths = parseFloat($(".valign-bottom.align-left",$(this)).css("left"));
			$(".valign-bottom.align-left",$(this)).each(function(){
				widths = widths+$(this).outerWidth(true);
				if (!$(this).next().hasClass("clear-left") && $(this).next(".valign-bottom.align-left").length) {
					$(this).next().css("left",widths+"px");
				}

			});
			
			// Go through valign-middle align-left items and adjust right position so they sit on the same row
			var widths = parseFloat($(".valign-middle.align-left",$(this)).css("left"));
			$(".valign-middle.align-left",$(this)).each(function(){
				widths = widths+$(this).outerWidth(true);
				if (!$(this).next().hasClass("clear-left") && $(this).next(".valign-middle.align-left").length) {
					$(this).next().css("left",widths+"px");
				}

			});
			
			// Go through valign-middle align-right items and adjust right position so they sit on the same row
			var widths = parseFloat($(".valign-middle.align-right",$(this)).css("right"));
			$(".valign-middle.align-right",$(this)).each(function(){
				widths = widths+$(this).outerWidth(true);
				if (!$(this).next().hasClass("clear-right") && $(this).next(".valign-middle.align-right").length) {
					$(this).next().css("right",widths+"px");
				}
			});
			
			
			// Go through valign-top align-left items and adjust right position so they sit on the same row
			var widths = parseFloat($(".valign-top.align-left",$(this)).css("left"));
			$(".valign-top.align-left",$(this)).each(function(){
				widths = widths+$(this).outerWidth(true);
				if (!$(this).next().hasClass("clear-left") && $(this).next(".valign-top.align-left").length) {
					$(this).next().css("left",widths+"px");
				}

			});
			
			
			// Go through valign-top align-right items and adjust right position so they sit on the same row
			var widths = parseFloat($(".valign-top.align-right",$(this)).css("right"));
			$(".valign-top.align-right",$(this)).each(function(){
				widths = widths+$(this).outerWidth(true);
				if (!$(this).next().hasClass("clear-left") && $(this).next(".valign-top.align-right").length) {
					$(this).next().css("right",widths+"px");
				}

			});
			
			// Check any valign-middle or valign-bottom justify items to make sure they they don't overlap left aligned items.
			var leftedge = 20;
			$(".align-left,.align-",$(this)).each(function(){
				var rightedge = $(this).outerWidth(true) + $(this).position().left;
				if (rightedge>leftedge) {
					leftedge =rightedge;					
				}
			});
			$(".valign-bottom.align-justify,.valign-middle.align-justify,.valign-top.align-justify",$(this)).each(function(){
				$(this).css("left",leftedge+"px");
			});
			
			
			
		});
		
		$(".module.align-justify.style-equal").each(function(){
			var $lis = $("> * > *",$(this));
			var n = $lis.length;
			var space = n * 10 -10;
			var width = ($(this).width() - space) / n;
			width = Math.floor(width);
			$lis.css("width",width+"px");
		});
		$(".module.align-justify:not(.style-equal,.style-space)").each(function(){
			var w = $(this).innerWidth();
			var ews = 0;
			var $m = $(this);
			$("> * >*",$(this)).each(function(){
				if ($("> a",$(this)).length) {
					var $el = $(">a",$(this));
					var incOuter = true;			
				} else {
					var $el = $(this);
					var incOuter = false;
				}
				if (typeof $m.attr("padding-left") == 'undefined') {
					$m.attr("padding-left",$el.css("padding-left"));
					$m.attr("padding-right",$el.css("padding-right"));
				}
				
				$el.css("padding-left","0px").css("padding-right","0px");
				if (incOuter) { 
					 var ew = $el.parent().outerWidth(true);
				} else {
					 var ew = $el.outerWidth(true);
				}

				ews = ews+ew;
			});
			var d = w - ews - 2;
			var c = $("> * > *",$(this)).length;
			var p = d/c;
			p = p/2;
			
			$("> * > *",$(this)).each(function(){
				if ($("> a",$(this)).length) {
					var $el = $(">a",$(this));					
				} else {
					var $el = $(this);
				}

				if (p<parseFloat($m.attr("padding-right"))) {
					$el.css({"padding-left":$m.attr("padding-left"),"padding-right":$m.attr("padding-right")});				
				} else {
					$el.css({"padding-left":p+"px","padding-right":p+"px"});						
				}
			});				
		});
		$(".nav.valign-bottom.logo-first,.nav.valign-middle.logo-first,.nav.valign-bottom.logo-last,.nav.valign-middle.logo-last").each(function(){
			$(">ul>li:not(#nav-logo)",$(this)).css("margin-top","0px");
			var th = $("> ul > li#nav-logo",$(this)).outerHeight();
			var $t = $(this);
			$(">ul>li:not(#nav-logo)",$(this)).each(function(){
				var h = $(">a,>form",$(this)).outerHeight();
				var mt = th-h;
				if ($t.hasClass("valign-middle")) {
					mt = mt/2;
				}
				$(this).css("margin-top",mt+"px");
			});
			
		});
	
		
	}
	function testFlexiBreak($container) {

		var offset = 0;
		var ok = true;
		$("> *:gt(0)",$container).each(function(){
			var thisoffset = $(this).position().left;
			if (thisoffset>offset) {
				offset = thisoffset;
			} else {
				ok =false;
			}
			if ($container.hasClass("contains-text")) {
				if ($(this)[0].scrollWidth > $(this).innerWidth()) {
					ok=false;
				}
			}
		});
		if (!$container.hasClass("allow-line-breaks")) {
			var h = $("> li:not(#nav-search,#nav-basket,#nav-logo) > a",$container).first().height();
			$("> li:gt(0):not(#nav-search,#nav-basket,#nav-logo) > a",$container).each(function(){
				if ($(this).height()!=h) {
					ok=false;
				}
			});			
		}
	
		return ok;
	}
	function flexiBreak() {
		$(".flexibreak-small").hide();
		$(".flexibreak-big").show();
		$(".flexibreak-big .flexibreak-container").each(function(){
			var $container = $(this);
			$container.removeClass("flexibreak1 flexibreak2 flexibreak3");
			modules();
			if (!testFlexiBreak($container)) {
				$container.addClass("flexibreak1");
				if (!testFlexiBreak($container)) {
					$container.removeClass("flexibreak1 flexibreak2 flexibreak3");
					$container.addClass("flexibreak2");
					if (!testFlexiBreak($container)) {
						$container.removeClass("flexibreak1 flexibreak2 flexibreak3");
						$container.addClass("flexibreak3");
						if (!testFlexiBreak($container)) {
							$container.parents(".flexibreak-big").hide();
							if (!$container.parents(".flexibreak-big").parent().children(":not(.flexibreak-big)").length) {
								$container.parents(".flexibreak-big").parent().hide().addClass("flex-wrap-hidden");
							}
							$("#"+$container.parents(".flexibreak-big").data("flexibreak-small")).show();
						}
					}
				}
			}
		});
		modules();
	}
	
	function checkOverlaps() {
		
		$(".flexibreak-big:visible").each(function(){
			var $row = $(this);
			$row.removeClass("rowscale1 rowscale2 rowscale3");
			var $modules = $(".module:not(.width)",$row);
			if ($modules.overlaps($(".module:not(.width)",$row)).length) {
				$row.addClass("rowscale1");
				if ($modules.overlaps($modules).length) {
					$row.addClass("rowscale2");
					if ($modules.overlaps($modules).length) {
						$row.addClass("rowscale3");
						if ($modules.overlaps($modules).length) {
							$row.hide();
							if (!$row.parent().children(":not(.flexibreak-big)").length) {
								$row.parent().hide().addClass("flex-wrap-hidden");
							}
							$("#"+$row.data("flexibreak-small")).show();
							modules();
							moduleHeights();
						}
					}
				}	
			}
		});
	}
	function setRecentBlogWidths () {
		$(".recent_blog_articles").each(function(){
			if ($(this).width()<287) {
				$(this).addClass("narrow"); 
			} else {
				$(this).removeClass("narrow"); 
			}
		});
	}
	function imageMarginHelper () {
		$(".Right_Image,.Left_Image").each(function(){
			$(this).removeClass("enoughSpaceForText");
			var avail = $(this).parent().innerWidth();
			var thisW = $("img",$(this)).width();
			var space = avail-thisW;
			if (space>70) {
				$(this).addClass("enoughSpaceForText");
			}
		});
	}


/*
	#'Default' Gallery Style (Lightbox with thumbs) - including support for prodcuts based on this gallery style

*/
	$(window).resize(function(){
		if ($("#lightboxContainer").length) {
			$('<img src="'+$("#lightboxInner img").attr("src")+'" style="display:none;max-width:10000px !important;width:auto;"/>').appendTo("html").load(function(){
				var originalWidth = $(this).width();
				var originalHeight = $(this).height();
				var ratio = originalWidth/originalHeight;
				var newMaxWidth = $(window).width()-60;
				var newHeight = newMaxWidth/ratio;
				if (originalWidth>newMaxWidth) {
					var w = newMaxWidth;
					var h = newHeight;
				} else {
					var w = originalWidth;
					var h = originalHeight;
				}
				$("#lightboxContainer").stop(false,true).animate({
		        	width: w,
		        	height: h
		        },300);
		        $("#lightboxStuff").stop(false,true).animate({
		        	width: w
		        },300);
		 	});
		}
	});
	$(document).ready(function(){
		$(".responsive_lightbox").click(function(){
			var clicked = $(this);
			var parentsId = $(this).parents(".galleryWrapper").attr("id");
			$(".lightboxCurrent").removeClass("lightboxCurrent");
			clicked.addClass("lightboxCurrent");
			$('embed, object, select',"#wrapper").css({ 'visibility' : 'hidden' });
			var formName = $(this).parents(".galleryWrapper").attr("id").replace(/gallery/, "");
			$('body').append("<div id='lightboxOverlay'></div><div id='lightboxOuter'><div id='lightboxContainer'><div id='lightboxExtra1'><div id='lightboxExtra2'><div id='lightboxExtra3'><div id='lightboxClose'>x</div><div id='lightboxPrev'>&lt;</div><div id='lightboxNext'>&gt;</div><div id='lightboxInner'></div></div></div></div></div><div id='lightboxStuff'><div id='lightboxShop'></div><div id='lightboxCaption'></div></div></div>");
			$(".shopGalleryVariant[name="+formName+"]").appendTo("#lightboxShop").fadeIn();
			$("#lightboxShop form").append("<input type='hidden' name='pic_url' value='' />");
			$("#lightboxOverlay").css("height",$(document).height()+"px");
			$("#lightboxOuter").css("top",$(document).scrollTop()+100+"px");
			
			$("#lightboxContainer").css({
				opacity: 0,
				display: "block"
			});
			$("#lightboxContainer").animate({
				opacity: 1
			});
			function showImage (href,title) {
				function cont4 () {
					function cont3 () {
						showNav();
						$("."+formName+"input").val(title);
						$("input[name=pic_url]",$("#lightboxShop form")).val(href);
						$("#lightboxCaption").html("<p>"+title+"</p>");
						$("#lightboxInner").html('<img src="'+href+'" alt="'+title+'" style="display:none"/>');
						$("#lightboxInner img").css({
							opacity: 0,
							display: "block"
						});
						$("#lightboxInner img").animate({
							opacity: 1
						},300);
					}
					$('<img src="'+href+'" style="display:none;max-width:1000px !important;"/>').appendTo("body").load(function(){
					        var originalWidth = $(this).width();
							var originalHeight = $(this).height();
							var ratio = originalWidth/originalHeight;
							var newMaxWidth = $(window).width()-60;
							var newHeight = newMaxWidth/ratio;
							if (originalWidth>newMaxWidth) {
								var w = newMaxWidth;
								var h = newHeight;
							} else {
								var w = originalWidth;
								var h = originalHeight;
							}
							$("#lightboxContainer").stop(false,true).animate({
					        	width: w,
					        	height: h
					        },300,cont3);
					        $("#lightboxStuff").stop(false,true).animate({
					        	width: w
					        },300);
					 });
				}
				$("#lightboxNext,#lightboxPrev,#lightboxClose").fadeOut(300);		
				$("#lightboxInner img").fadeOut(300,cont4);		



			}
			function showNav () {
				$("#lightboxClose").fadeIn();
				$("#lightboxClose").unbind().click(function(){
					function cont2 () {
						$("#lightboxOverlay,#lightboxOuter").remove();
						$('embed, object, select',"#wrapper").css({ 'visibility' : 'visible' });
					}
					$("#lightboxOuter,#lightboxOverlay").fadeOut(300,cont2);

					$(".shopGalleryVariant[name="+formName+"]").appendTo("body").hide();
				});
				var totalEls = $("#"+parentsId+" .responsive_lightbox").length-1;
				var clickedEl = 0;
				var currentEl = 0;
				$("#"+parentsId+" .responsive_lightbox").each(function(){
					if ($(this).hasClass("lightboxCurrent")) {
						clickedEl = currentEl;
					}
					currentEl++;
				});
				if (clickedEl!=totalEls) {
					$("#lightboxNext").fadeIn();				
					$("#lightboxNext").unbind().click(function(){
						var stop = 0;
						var stop2 = 0;
						$("#"+parentsId+" .responsive_lightbox").each(function(){
							stop++;
							if ($(this).hasClass("lightboxCurrent")) {
								stop2 = stop;
							}
						});
						var stop3 = 0;
						$("#"+parentsId+" .responsive_lightbox").each(function(){
							if (stop3 == stop2) {
								$(".lightboxCurrent").removeClass("lightboxCurrent");
								$(this).addClass("lightboxCurrent");
								var href = $(this).attr("href");
								var title = $(this).attr("title");
								showImage(href,title);
							}
							stop3++;
						});	
					});	
				}
				if (clickedEl!=0) {
					$("#lightboxPrev").fadeIn();
					$("#lightboxPrev").unbind().click(function(){
						var prev = 0;
						var clicked = 0;
						$("#"+parentsId+" .responsive_lightbox").each(function(){
							if ($(this).hasClass("lightboxCurrent")) {
								current = prev;
							}
							prev++;
						});
						var prev = 0;
						$("#"+parentsId+" .responsive_lightbox").each(function(){
							if (prev==current-1) {
								$(".lightboxCurrent").removeClass("lightboxCurrent");
								$(this).addClass("lightboxCurrent");
								var href = $(this).attr("href");
								var title = $(this).attr("title");
								showImage(href,title);
							}
							prev++;
						});
					});	
				}
			}
			function cont () {
				$("."+formName+"input").val(clicked.attr("title"));
				$("input[name=pic_url]",$("#lightboxShop form")).val(clicked.attr("href"));
				$("#lightboxCaption").html("<p>"+clicked.attr("title")+"</p>");
				$("#lightboxStuff").fadeIn();
				$("#lightboxInner").html('<img src="'+clicked.attr("href")+'" alt="'+clicked.attr("title")+'" style="display:none"/>');
				$("#lightboxInner img").css({
					opacity: 0,
					display: "block"
				});
				$("#lightboxInner img").animate({
					opacity: 1
				},300);	
				
				showNav();

			}

			var preloader = new Image();

			preloader.onload = function() {
				var originalWidth = preloader.width;
				var originalHeight = preloader.height;
				var ratio = originalWidth/originalHeight;
				var newMaxWidth = $(window).width()-60;
				var newHeight = newMaxWidth/ratio;
				if (originalWidth>newMaxWidth) {
					var w = newMaxWidth;
					var h = newHeight;
				} else {
					var w = originalWidth;
					var h = originalHeight;
				}

				$("#lightboxStuff").css("width",w+"px");
				$("#lightboxContainer").stop(false,true).animate({
		        	width: w,
		        	height: h
		        },300,cont);
		
				
			};
			preloader.src = clicked.attr("href");
			return false;
		});	
	});



/*
	#'Montage' Gallery Style - including support for prodcuts based on this gallery style

*/
	$(window).load(function(){
		setMontageMargin();
		$(".montageSlideshow").hide().css("width","0");
		setTimeout(function() {
			$(".montageSlideshow").css("width","100%").show();
		}, 1);
	});
	$(document).ready(function(){
		$(".montageSlideshow").each(function(){
			var formId = $(this).attr("id").replace("gallery","");
			if ($("form[name="+formId+"]").length) {
				$(this).after("<div class='montageProductWrapper'></div>");
				var $wrapper = $(this).next();
				$wrapper.append($(this));
				$wrapper.append($("form[name="+formId+"]").show().addClass("montageProductForm"));
				var $form = $("form",$wrapper);
				$(".montage-pic",$wrapper).append('<span class="montageCheckbox"></span>');
				$(".montage-pic:first",$wrapper).addClass("selected");
				$(".montageSlideshow",$wrapper).addClass("with-product");
				$form.append("<input type='hidden' name='pic_url' value='' />");
				$("."+formId+"input",$form).val($("img:first",$wrapper).attr("alt"));
				var href = $("img:first",$wrapper).attr("src").split("?");
				$("input[name=pic_url]",$form).val(href[0]);
			}
		});
		$(".with-product .montage-pic").click(function(){
			$montage = $(this).parents(".with-product");
			$(".selected",$montage).removeClass("selected");
			$(this).addClass("selected");
			var $form = $(this).parents(".with-product").next();
			var formId = $(this).parents(".with-product").attr("id").replace("gallery","");
			$("."+formId+"input",$form).val($("img",$(this)).attr("alt"));
			var href = $("img",$(this)).attr("src").split("?");
			$("input[name=pic_url]",$form).val(href[0]);
		});
	});
	$(window).resize(function(){
		setMontageMargin();
	});
	function setMontageMargin () {
		$(".imagesInMontage4").each(function(){
			var w = $(this).width();
			var p = $(".item1",$(this)).width()+$(".item2",$(this)).width();
			var g = w-p;
			$(".for-margin",$(this)).css("margin-top",g+"px");
		});
	}


/*
	#'Slideshow' Gallery Styles (single and multi) - including support for prodcuts based on these gallery styles
*/
	
	$(document).ready(function(){
		$(".owl-slideshow-single").each(function(){
			$(this).owlCarousel({
				navigation : true, 
				slideSpeed : 300,
				autoPlay : 3000,
	    		stopOnHover : true,
				paginationSpeed : 400,
				goToFirstSpeed : 2000,
			    singleItem : true,
			    autoHeight : true,
			    transitionStyle:"fade",
				navigationText : ["&lt;","&gt;"]
			});
		});
		$(".owl-slideshow-multi").each(function(){
			$(this).owlCarousel({
				items : 4,
				slideSpeed : 300,
				autoPlay : 3000,
	    		stopOnHover : true,
				paginationSpeed : 400,
				goToFirstSpeed : 2000,
				navigationText : ["&lt;","&gt;"]
			});
		});

		$(".owl-slideshow-multi,.owl-slideshow-single").each(function(){
			var formId = $(this).attr("id").replace("gallery","");
			if ($("form[name="+formId+"]").length) {
				$(this).after("<div class='slideshowProductWrapper'></div>");
				var $wrapper = $(this).next();
				$wrapper.append($(this));
				$wrapper.append($("form[name="+formId+"]").show().addClass("slideshowProductForm"));
				var $form = $("form",$wrapper);
				$(".item",$wrapper).append('<span class="slideshowCheckbox"></span>');
				$(".item:first",$wrapper).addClass("current");

				$(".owl-slideshow-multi,.owl-slideshow-single",$wrapper).addClass("with-product");
				$form.append("<input type='hidden' name='pic_url' value='' />");
				$("."+formId+"input",$form).val($(".item:first img",$wrapper).attr("alt"));
				var href = $("img:first",$wrapper).attr("src").split("?");
				$("input[name=pic_url]",$form).val(href[0]);
			}
		});
		$(".owl-slideshow-multi.with-product .item,.owl-slideshow-single.with-product .item").click(function(){
			
			var $galThumbs = $(this).parents(".with-product");
			$(".current",$galThumbs).removeClass("current");
			$(this).addClass("current");

			var $form = $(this).parents(".with-product").next();
			var formId = $(this).parents(".with-product").attr("id").replace("gallery","");
			$("."+formId+"input",$form).val($("img",$(this)).attr("alt"));
			var href = $("img",$(this)).attr("src").split("?");
			$("input[name=pic_url]",$form).val(href[0]);
		});

	});

/*
	#'Gallery with thumbs' Gallery Style - including support for prodcuts based on these gallery styles

*/
	$(window).resize(function(){
		$(".enlarge img").fadeOut();
		clearTimeout(afterResizingGallery);
		afterResizingGallery = setTimeout(function () {
			afterResizeGallery();
		}, 400);
	});
	var afterResizingGallery;
	function afterResizeGallery () {
		$(".galleryWithThumbs").each(function(){
			var $e = $(".enlarge",$(this));
			$e.css("height","auto");
			var $t = $(this);
			var $a = $("a.current",$t);
			showPic($a,$e);
		});
	}
	$(document).ready(function(){
		$(".owl-gallery-thumbs").each(function(){
			$(this).owlCarousel({
				items : 10,
				slideSpeed : 300,
				paginationSpeed : 400,
				navigationText : ["&lt;","&gt;"],
				itemsDesktop : [1000,8], 
				itemsDesktopSmall : [768,6],
				itemsTablet: [480,5],
				itemsMobile : false
			});
		});
		
		$(".galleryWithThumbs").each(function(){

			var $e = $(".enlarge",$(this));
			var $t = $(this);
			var $a = $("a:first",$t);
			showPic($a,$e);

			$("a",$t).click(function(){
				$(".current",$t).removeClass("current");
				showPic($(this),$e);
				return false;
			});
		});
		$(".galleryWithThumbs").each(function(){
			var formId = $(this).attr("id").replace("gallery","");
			if ($("form[name="+formId+"]").length) {
				$(this).after("<div class='galleryThumbsProductWrapper'></div>");
				var $wrapper = $(this).next();
				$wrapper.append($(this));
				$wrapper.append($("form[name="+formId+"]").show().addClass("galleryThumbsProductForm"));
				var $form = $("form",$wrapper);
				$(".galleryWithThumbs",$wrapper).addClass("with-product");
				$form.append("<input type='hidden' name='pic_url' value='' />");
				$("."+formId+"input",$form).val($(".owl-gallery-thumbs img:first",$wrapper).attr("alt"));
				var href = $("img:first",$wrapper).attr("src").split("?");
				$("input[name=pic_url]",$form).val(href[0]);
			}
		});
		$(".galleryWithThumbs.with-product .owl-gallery-thumbs a").click(function(){
			var $galThumbs = $(this).parents(".with-product");
			var $form = $(this).parents(".with-product").next();
			var formId = $(this).parents(".with-product").attr("id").replace("gallery","");
			$("."+formId+"input",$form).val($("img",$(this)).attr("alt"));
			var href = $("img",$(this)).attr("src").split("?");
			$("input[name=pic_url]",$form).val(href[0]);
		});
	});
	function showPic ($a,$e) {
		$a.addClass("current");
		$("img",$e).fadeOut();
		var $i = $("<img src='"+$a.attr("href")+"' style='display:none;'/>");
		$e.append($i);
		$i.one('load', function() {
		  $e.css("height",$(this).height()+"px");
		  $i.fadeIn();
		}).each(function() {
		  if(this.complete) $(this).load();
		});
	}


/*
	#'Carousel Slide' Widget
*/

	$(document).ready(function(){
		$(".carousel_slide").each(function(){
			if (!$(this).prev().hasClass("carousel_slide")) {
				$(this).before("<div class='owl-carousel'></div>");
			}
		});
		$(".owl-carousel").each(function(){
			$wrapper = $(this);
			$(this).nextAll().each(function(){
				if (!$(this).hasClass("carousel_slide")) {
					return false;
				} else {
					$(this).appendTo($wrapper);
				}
			});
		});

		$(".owl-carousel").each(function(){
			if ($(this).parents("#promo-area").length) {
				$(this).owlCarousel({
					navigation : true,
					slideSpeed : 300,
					paginationSpeed : 400,
					singleItem:true,
					navigationText : ["&lt;","&gt;"],
					autoPlay:true
				});
			} else {
				$(this).owlCarousel({
					navigation : true,
					slideSpeed : 300,
					paginationSpeed : 400,
					singleItem:true,
					navigationText : ["&lt;","&gt;"]
				});
			}

		});
	});


/*
	#'Live Shopping Basket' Widget
*/

	function bindMiniBasket () {
		var options = { 
		    success: function(){
				$("#miniBasket2").load("/actions/ShowMiniBasket/"+lang,function(){
					bindMiniBasket();					
					$("#loading").stop(true,false).fadeOut();
				});


			}  // post-submit callback 
		};
		$(".quantity").blur(function(e){
			if ($(e.target).attr("id")!="updateQuantities") {
				$("#miniBasketForm").submit();				
			}
		});
		$("#miniBasketForm").submit(function(){
			$("#loading").fadeIn();

			$("#miniBasketForm").ajaxSubmit(options);
			return false;
		});
		$(".removeCell a").click(function(){
			$("#loading").fadeIn();
			$.ajax({ url: $(this).attr("href"), success: function(){
				$("#miniBasket2").load("/actions/ShowMiniBasket/"+lang,function(){
				bindMiniBasket();
				$("#loading").stop(true,false).fadeOut();

				});
			}});
			return false;
		});
	}
	$(document).ready(function(){
		$("#miniBasket2").load("/actions/ShowMiniBasket/"+lang,function(){
			bindMiniBasket();
		});
		if ($("#miniBasket2").length) {
			$(".addToBasketLink").click(function(){
				$("#loading").fadeIn();
				$.ajax({ url: $(this).attr("href"), success: function(){
					$("#miniBasket2").load("/actions/ShowMiniBasket/"+lang,function(){
					bindMiniBasket();
					$("#loading").stop(true,false).fadeOut();
					});

				}});
				return false;
			});
			$(".addToBasketForm").ajaxForm(function(){
				$("#loading").fadeIn();
				$("#miniBasket2").load("/actions/ShowMiniBasket/"+lang,function(){
					bindMiniBasket();
					$("#loading").stop(true,false).fadeOut();
					$("#loader:visible").fadeOut();
				});
			});
		}
	});

/* 
	
	#Livechat Status Widget
*/


	$(document).ready(function(){
		
		function checkLivechat () {
			$.ajax({
				type: "GET",
				url: "/actions/LivechatStatus/",
				success: function(msg){
					if (msg=="online") {
						$(".livechatWidgetOffline").hide();
						$(".livechatWidgetOnline").show();
					} else {
						$(".livechatWidgetOffline").show();
						$(".livechatWidgetOnline").hide();
					}
				}
			});
			setTimeout(checkLivechat, 10000);
		}
		checkLivechat();
		$(".startConvo").click(function () {
			href = this.href;
			var popup = window.open(href,'','toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0,width=311,height=349');
			return false;
		});

	});

/*
	#Responsive video helper for jPlayer

*/

	var afterResizing;
	$(window).resize(function(){
		if (!$(".jplayerInit .jplayer").hasClass("playing")) {
			if ($(".jplayerInit").length && !$(".jp-video-full").length) {

				$(".jplayerInit .jplayer").jPlayer("destroy");
				$(".jplayerInit").each(function(){
					var img = $(this).attr("data-poster");
					var vid = $(this).attr("data-vid");
					var $t = $(this).parent();
					$(this).remove();
					$t.html("<a href='"+vid+"'><img src='"+img+"' /></a>");
				});

			}
			clearTimeout(afterResizing);
			if (!$(".jp-video-full").length) {
				afterResizing = setTimeout(function () {
					afterResize();
				}, 1000);
			}
		}
	});
	function afterResize() {
		var jplayerVideoCounter=0;
		$(".bpe_video:not(.Popup_Video) img").each(function(){
			if (!$(".jplayerInit",$(this).parents(".bpe_video")).length) {
		
			var width = $(this).width();
			var height = $(this).height();
			var image = $(this).attr("src");
			var video = $(this).parent().attr("href");
			$(this).parent().after("<div id=\"video"+jplayerVideoCounter+"\" class='jplayerInit' data-poster='"+image+"' data-vid='"+video+"'>"+playerHTML+"</div>");
			$(this).parent().remove();

			makeVideo("video"+jplayerVideoCounter,width,height,image,video,false,false);

			jplayerVideoCounter++;
			}
		});
	}
/*
	#Responsive video helper for JWPlayer

*/

	var afterResizingJW;
	$(window).resize(function(){
		if (window.jwplayer) {
			jwplayer().remove();
			$(".bpe_video:not(.Popup_Video)").show();
			clearTimeout(afterResizingJW);
			
			afterResizingJW = setTimeout(function () {
				afterResizeJW();
			}, 1000);
		}
	
	});
	function afterResizeJW() {
		var JWPlayerVideoCounter=1;
		$(".bpe_video:not(.Popup_Video) img").each(function(){

			var img = this;
			var width = $(this).width();
			var height = $(this).height();
			var image = $(this).attr("src");
			var video = $(this).parent().attr("href");
			$(this).parent().parent().hide();
			$(this).parent().parent().after("<div id=\"video"+JWPlayerVideoCounter+"\"></div>");
			makeVideo("video"+JWPlayerVideoCounter,width,height,image,video,false);


			JWPlayerVideoCounter++;
		});
	}

/* 

 	#Responsive Calendar

*/
	$(document).ready(function(){
		$(".calendar").click(function(e){
			if ($(e.target).hasClass("hasEvents") || $(e.target).parents(".hasEvents").length) {
				if ($(e.target).hasClass("hasEvents")) {
					var $t = $(e.target);
				} else {
					var $t = $(e.target).parents(".hasEvents");
				}
				if ($(window).width()<=768) {
					$("body").append("<div id='eventPopupWrapper'><div id='eventPopup'><div id='closeEventPopup'>x</div><div id='eventInfo'></div></div></div>");
					$("#eventInfo").append("<h4>"+$t.attr("data-full-date")+"</h4>");
					$(".event",$t).clone().appendTo($("#eventInfo"));
					$("#closeEventPopup").click(function(){
						$("#eventPopupWrapper").remove();
					});
				}
			}
		});

	});

/*
	#Full width banner

*/
	$(document).ready(function(){
		if ($("#fullWidthBanner").length) {
			if ($("#fullWidthBannerBG img").length) {
				var src = $("#fullWidthBannerBG img").attr("src");
				src = src.split("?");
				src = src[0]+"?width=1920&height=auto";
			} else {
				var src="/graphics/full-width-bg.jpg"
			}
			$("#fullWidthBanner").backstretch(src);
			$("h1,h2,h3,h4,p,li","#fullWidthBanner").filter(":not(.Button_Small,.Button_Medium,.Button_Large)").wrapInner("<span></span>");
		}
	});

/* 

 	#Blog Loop 

*/
	$(document).ready(function(){
		$(".blogItemLoop").each(function(){
			if (typeof $(this).attr("data-pic") != 'undefined') {
				$(this).backstretch($(this).attr("data-pic"));
			}
			$("h1,h2,h3,h4,p,li",$(this)).filter(":not(.Button_Small,.Button_Medium,.Button_Large,.blogDate)").wrapInner("<span></span>");
		});
	});



// If you add JWPlayer to your installation you can set some basic config for the player here.
var videoControlBar = "over";
var videoScreenColor = "#FFFFFF"; 
