(function (pyrolextags) {
   CKEDITOR.plugins.add(lextags, {
      requires: ['placeholder'],
      init: function(editor) { /* My stuff */ },
      afterInit: function(editor) {
         var dataProcessor = editor.dataProcessor;
         var dataFilter = dataProcessor && dataProcessor.dataFilter;
         if (dataFilter) {
            dataFilter.addRules({
               elements: {
                  'p': function(element) {
                   	alert("ole");
                  }
               }
            }, 5);
         }
      }
   });
})('lextags');