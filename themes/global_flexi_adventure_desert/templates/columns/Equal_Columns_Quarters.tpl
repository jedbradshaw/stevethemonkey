{if $content.sentAsEmail}
<table width="100%">
	<tr>
		<td width="23%" valign="top">
		{$editable.first_column}{if $editable.first_column==""}&nbsp;{/if}			
		</td>
		<td width="2.6%">
		&nbsp;
		</td>
		<td width="23%" valign="top">
		{$editable.second_column}{if $editable.second_column==""}&nbsp;{/if}			
		</td>
		<td width="2.6%">
		&nbsp;
		</td>
		<td width="23%" valign="top">
		{$editable.third_column}{if $editable.third_column==""}&nbsp;{/if}			
		</td>
		<td width="2.6%">
		&nbsp;
		</td>
		<td width="23%" valign="top">
		{$editable.fourth_column}{if $editable.fourth_column==""}&nbsp;{/if}
		</td>
	</tr>
</table>
{else}
<div class="column_row">
	<div class='column oneCol first'>
		{$editable.first_column}{if $editable.first_column==""}&nbsp;{/if}
	</div>
	<div class='column oneCol lastiftwo'>
		{$editable.second_column}{if $editable.second_column==""}&nbsp;{/if}
	</div>
	<div class="cleariftwo"></div>
	<div class='column oneCol firstiftwo'>
		{$editable.third_column}{if $editable.third_column==""}&nbsp;{/if}
	</div>
	<div class='column oneCol last'>
		{$editable.fourth_column}{if $editable.fourth_column==""}&nbsp;{/if}
	</div>
</div>
{/if}