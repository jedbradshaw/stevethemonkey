{assign var=h1 value="<h1"|explode:$content.content|strip_tags_exclude:"<h1>"}
{assign var=h1 value=">"|explode:$h1[1]}
{assign var=h1 value="</h1"|explode:$h1[1]}
{assign var=h1 value=$h1[0]}
{assign var=h2 value="<h2"|explode:$content.content|strip_tags_exclude:"<h2>"}
{assign var=h2 value=">"|explode:$h2[1]}
{assign var=h2 value="</h2"|explode:$h2[1]}
{assign var=h2 value=$h2[0]}
{assign var=p value="<p"|explode:$content.content|strip_tags_exclude:"<p>"}
{assign var=p value=">"|explode:$p[1]}
{assign var=p value="</p"|explode:$p[1]}
{assign var=p value=$p[0]}
{assign var=li value="<li"|explode:$content.content|strip_tags_exclude:"<li>"}
{assign var=li value=">"|explode:$li[1]}
{assign var=li value="</li"|explode:$li[1]}
{assign var=li value=$li[0]}
{assign var=img value="img src=\""|explode:$content.content|strip_tags_exclude:"<img>"}
{assign var=img value="\""|explode:$img[1]}
{assign var=img value=$img[0]}
<title>{if $content.longtitle!=""&&$content.longtitle!=$content.title}{$content.longtitle}{else}{if $h1==""}{$h2}{else}{$h1}{/if}{if $h1!=""||$h2!=""} - {/if}{$metatitleappend}{/if}</title>
	<meta name="description" content="{if $content.description!=""}{$content.description}{else}{$h1}{if $h2!=""} - {$h2}{/if}{if $h2==""} - {$p}{/if}{if $p==""} - {$li}{/if}{/if}"/>