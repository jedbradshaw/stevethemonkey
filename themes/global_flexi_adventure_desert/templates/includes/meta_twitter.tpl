<meta name="twitter:title" content="{if $h1==""}{$h2}{else}{$h1}{/if}" />
	<meta name="twitter:description" content="{if $content.description!=""}{$content.description}{else}{$h1}{if $h2!=""} - {$h2}{/if}{if $h2==""} - {$p}{/if}{if $p==""} - {$li}{/if}{/if}" />
	{if $content.imgUrl!=""}<meta name="twitter:image" content="{$siteurl}{$content.imgUrl}" />
	{else}<meta name="twitter:image" content="{$img}" />{/if}
