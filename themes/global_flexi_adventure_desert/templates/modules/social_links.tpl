<div class="module clearfix social-links {if $align}align-{$align}{/if} {if !$width}{if $valign}valign-{$valign}{if $valign} valign{/if}{/if}{/if} {if $clear}clear-{$clear}{/if} {if $style}style-{$style}{/if} {if $width}width width-{$width} width-valign-{$valign}{/if}">
	<div class="flexibreak-container">
		{if $theme_vars_facebook_link}
		<a href="{$theme_vars_facebook_link}" title="Facebook" class="social-link-facebook social-link">Facebook</a>
		{/if}
		{if $theme_vars_gplus_link}
		<a href="{$theme_vars_gplus_link}" title="Google+" class="social-link-googleplus social-link">Google+</a>
		{/if}
		{if $theme_vars_linkedin_link}
		<a href="{$theme_vars_linkedin_link}" title="LinkedIn" class="social-link-linkedin social-link">LinkedIn</a>
		{/if}
		{if $theme_vars_pinterest_link}
		<a href="{$theme_vars_pinterest_link}" title="Pinterest" class="social-link-pinterest social-link">Pinterest</a>
		{/if}
		{if $theme_vars_twitter_link}
		<a href="{$theme_vars_twitter_link}" title="Twitter" class="social-link-twitter social-link">Twitter</a>
		{/if}
		{if $theme_vars_youtube_link}
		<a href="{$theme_vars_youtube_link}" title="YouTube" class="social-link-youtube social-link">YouTube</a>
		{/if}
		{if $theme_vars_instagram_link}
		<a href="{$theme_vars_instagram_link}" title="Instagram" class="social-link-instagram social-link">Instagram</a>
		{/if}
		{if $theme_vars_vimeo_link}
		<a href="{$theme_vars_vimeo_link}" title="Vimeo" class="social-link-vimeo social-link">Vimeo</a>
		{/if}
	</div>
</div>

{*

	How to use this module:
	
	Add a code block like this to your ~/templates/main.tpl inside a section.row element:
	
		{include file=modules/social_links.tpl
			property=value
			...
		}
	
	You can use the following properties and values:
	align: left (default)|center|right|justify
	valign: top (default)|bottom|middle
	clear: none (default)|left|right
	width: auto (default) | one_half | three_quarters | four_fifths | three_fifths | two_fifths | one_fifth | one_quarter | two_thirds | one_third
	style:	none/default (Shows icon and text) 
			icon (only icons)
			text (only text)
	
*}