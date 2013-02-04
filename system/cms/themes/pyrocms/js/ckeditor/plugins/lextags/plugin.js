(function (lextags) {
	CKEDITOR.plugins.add(lextags, {
		requires: ['placeholder'],
	  	afterInit: function(editor) {
			var dataFilter = editor.dataProcessor && editor.dataProcessor.dataFilter;
			if (dataFilter) {
				dataFilter.addRules({
			  		text: function(text, ele) {
			  			//not too costly indexOf, before we do the heavy regex stuff
			  			if(text.indexOf('{{') < 0) {
			  				return text;
			  			}

			  			//setup regex stuff for matching tags
			  			var re = /({{\s?.[^})]+\s?}})/g, tags, matches = [], match_count = 0;

			  			// gather all matches
			  			// we can't replace the tags immediately,
			  			// because updating the regexd string - text - makes a nice loop to infinity
			  			while ((tags = re.exec(text)) !== null)
						{
							var placeholder = CKEDITOR.plugins.placeholder.createPlaceholder(editor, null, tags[0], true);
							matches.push({'tag': tags[0], 'placeholder': placeholder});
						}

						// replace all occurences of tag with the corrsponding placeholder
						match_count = matches.length;
						for(var x = 0;x<match_count;x++)
						{
							text = text.replace(matches[x]['tag'], matches[x]['placeholder']);
						}

			  			return text;
					},
				}, 5);
			}
		}
	});
})('lextags');