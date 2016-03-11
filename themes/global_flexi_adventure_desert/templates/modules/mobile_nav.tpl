<div class="clearfix module mobile-menu align-{$align}  {if $style}style style-{$style}{/if} {if $width}width width-{$width}{/if} {if $clear}clear-{$clear}{/if} {if $valign}valign-{$valign}{if $valign} valign{/if}{/if}">
<a href="">Menu</a>
</div>

{*

	How to use this module. 
	
	Add a code block like this to your ~/templates/main.tpl inside a section.row element (you'll typically use this inside a section.row.flexibreak-small div so it only gets used when the main layout can't fit on a screen. See here for more details:
	http://setseed.com/support/using-the-super-skeleton-theme/building-the-main-template/#mobileversions ):
	
		{include file=modules/mobile_nav.tpl
			property=value
			...
		}
	
	You can use the following properties and values:
	align: left (default)|center|right|justify
	valign: top (default)|bottom|middle
	clear: none (default)|left|right
	width: auto (default) | one_half | three_quarters | four_fifths | three_fifths | two_fifths | one_fifth | one_quarter | two_thirds | one_third
	style: 	inline-append (default) 
			reveal-left
			reveal-right
	
*}