<meta property="og:title" content="{if $h1==""}{$h2}{else}{$h1}{/if}" />
	<meta property="og:type" content="article" />
	{if $content.imgUrl!=""}<meta property="og:image" content="{$siteurl}{$content.imgUrl}" />
	{else}<meta property="og:image" content="{$img}" />{/if}
	<meta property="og:description" content="{if $content.description!=""}{$content.description}{else}{$h1}{if $h2!=""} - {$h2}{/if}{if $h2==""} - {$p}{/if}{if $p==""} - {$li}{/if}{/if}" />
	<meta property="og:site_name" content="{$sitetitle}"/>
