<div class="clearfix module content-block align-{$align}  {if $width}width width-{$width} width-valign-{$valign}{/if} {if !$width}valign-{$valign}{if $valign} valign{/if}{/if} {if $clear}clear-{$clear}{/if}  {if $style}style-{$style}{/if}" {if $id}id="{$id}"{/if}>
	<div>
	{$content}
	</div>
</div>
{*

	How to use this module:
	
	Add a code block like this to your ~/templates/main.tpl inside a section.row element:
	
		{include file=modules/content_block.tpl
			property=value
			...
		}
	
	You can use the following properties and values:
	align: left (default)|center|right|justify
	valign: top (default)|bottom|middle
	clear: none (default)|left|right
	width: auto (default) | one_half | three_quarters | four_fifths | three_fifths | two_fifths | one_fifth | one_quarter | two_thirds | one_third
	
*}