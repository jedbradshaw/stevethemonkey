{* Define main URL and Title *}
{assign var=siteurl value="http://`$content.http_host"}
{assign var=metatitleappend value=$theme_vars_meta_title_append}
{assign var=sitetitle value=$theme_vars_site_title}
<!DOCTYPE html>
<!--[if lt IE 7 ]><html class="ie ie6" lang="{$content.language}"> <![endif]-->
<!--[if IE 7 ]><html class="ie ie7" lang="{$content.language}"> <![endif]-->
<!--[if IE 8 ]><html class="ie ie8" lang="{$content.language}"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--><html lang="{$content.language}"> <!--<![endif]-->
<head>
	<meta charset="utf-8">
	
	{include file=includes/meta_titles.tpl}

	{include file=includes/meta_fb.tpl}

	{include file=includes/meta_twitter.tpl}

	{include file=includes/meta_icons.tpl}
	
	{if $content.blog=="yes" && $content.showBlog!="yes"}
	<link rel="alternate" type="application/rss+xml" title="RSS" href="{$server_name}/rss/"/>
	{/if}
	{if $content.showBlog=="yes"}
	<link rel="alternate" type="application/rss+xml" title="RSS" href="{$server_name}/rss/{$url}/"/>
	{/if}

	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	
	<script src="/javascripts/{$js}.js"></script> {* Includes core functions. Do not delete. Add custom jquery in ~/javascripts/custom.js and it will be included via this reference. *}
	
	<script src="/javascripts/owl.carousel.min.js"></script>
	<script src="/javascripts/backstretch.js"></script>
	<script src="/javascripts/doubletaptogo.js"></script>
	<script src="/javascripts/overlaps.js"></script>
	
	<link rel="stylesheet" href="/css/{$css}.css" type="text/css" charset="utf-8"/> {* Automically combined and generated from files listed ~/css/files.json *}
	
	<link rel="stylesheet" href="/css/print.css" type="text/css" media="print" charset="utf-8"/>

	<!--[if lt IE 9]>
	<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
	<script src="http://ie7-js.googlecode.com/svn/version/2.1(beta4)/IE9.js"></script>
	<![endif]-->
	
	<link href='https://fonts.googleapis.com/css?family=Yanone+Kaffeesatz:300,700,400|Roboto+Slab' rel='stylesheet' type='text/css'>
	
	{* 	Add custom inline javascript like Analytics tracking code inside the 'literal' tags below. Any raw javascript needs to be wrapped in these tags when used in Smarty templates. *}
	{literal}
	
	{/literal}
</head>
<body class="{if $content.homepage}homepage{/if} page_{$content.url} parent_{$content.parent} top_parent_{$content.topParent} page_id_{$content.id}">
	
	{* 
	
		Create the template using containers, sections and modules. See this page for help:
		http://setseed.com/support/using-the-super-skeleton-theme/
	*}
	
	<div class="container" 
		data-backgrounds="[&quot;/graphics/brown-bg{if $theme_vars_paw=="false"}-wo-paw{/if}.jpg&quot;]"
        data-background-fade="3000"
        data-background-duration="5000"
        data-background-color="#3F2D1F"
        data-background-opacity="1"
        data-scroll-decay="0.5"
		id="header"
		>
		<section class="row flexibreak-big"  data-flexibreak-small="navsmall">
			{include file=modules/logo.tpl  
				align=left
			}
			
			{include file=modules/content_block.tpl
				content=$sitewideContent.Header_Call_To_Action
				valign=top
				align=right
			}
			{include file=modules/social_links.tpl
				valign=top
				align=right
				style=icons
			}
	
			{include file=modules/nav.tpl
				align=right
				valign=bottom
			}
		</section>
		<div id="navsmall" class="flexibreak-small">
			<section class="row">
	
				{include file=modules/content_block.tpl
					content=$sitewideContent.Header_Call_To_Action
					id="small_call_to_action"
				}
		
			</section>
			<section class="row">
			
				{include file=modules/logo.tpl 
					align=left
					width="one_third"
				}
			
				{include file=modules/mobile_nav.tpl 
					align=right
					style="reveal-right"
					valign=middle
				}
		
			</section>
		</div>
		
	</div>

	{if $security}
		<div class="container"
		>
			<section class="row" >
			{include file=includes/login.tpl assign=login}
			{include file=modules/content_block.tpl
				content=$login
			}
			</section>
		</div>
	{else}
		{if $content.contentSplit.Promotional_Area}
		<div class="container" id="promo-area"
		data-backgrounds="[&quot;/graphics/promo-bg.jpg&quot;]"
        data-background-fade="3000"
        data-background-duration="5000"
        data-background-color="#9A8D5D"
        data-background-opacity="1"
        data-scroll-decay="0.5"
		>
			<section class="row clearfix">
				{include file=modules/content_block.tpl
					content=$content.contentSplit.Promotional_Area
				}
			</section>
		</div>
		
		{/if}		
		<div class="container">
			{if $content.contentSplit.normal}
			<section class="row clearfix">
				{include file=modules/content_block.tpl
					content=$content.contentSplit.normal
				}
			</section>
			{/if}
		</div>
		
		{if $content.contentSplit.Above_Footer}
		<div class="container" id="above-footer"
		data-backgrounds="[&quot;/graphics/above-footer-bg{if $theme_vars_paw=="false"}-wo-paw{/if}.jpg&quot;]"
        data-background-fade="3000"
        data-background-duration="5000"
        data-background-color="#716C52"
        data-background-opacity="1"
        data-scroll-decay="0.9"
		>
			<section class="row clearfix">
				{include file=modules/content_block.tpl
					content=$content.contentSplit.Above_Footer
				}
			</section>
		</div>
		
		{/if}
		
	{/if}
	
	<div class="container" id="footer">
		<section class="row clearfix">
			{include file=modules/content_block.tpl
				content=$sitewideContent.Footer
			}
		</section>
	</div>
	
	
	<div id="search-form-popdown">
		<div class="tri"></div>
		<form action="/actions/SearchForward/" method="post" id="searchFormSmall">
			<input type="hidden" name="language" value="{$content.language}"/>
			<input id="navSearch" type="text" name="string" value="" />
			<p id="search-form-popdown-button" class="submit_form"><a href="#">{$langs.Search}</a></p>
		</form>
	</div>
</body>
</html>