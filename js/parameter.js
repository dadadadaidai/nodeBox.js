      $(function(){

        // Line Width
        $('#slider1_line').slider( {
        animate: 'slow',
        range: 'min',
        step: 0.1,
        value: Setting.lineWidth,
        min: 0.1,
        max: 3,
        slide: function(e, ui) {
            jQuery('#slider1-value').val( ui.value );
            Setting.lineWidth = ui.value ;
        }

      });

        // Handle Length
        $('#slider2_line').slider( {
        animate: 'slow',
        range: 'min',
        step: 50,
        value: Setting.handleLength,
        min: -400,
        max: 1000,
        slide: function(e, ui) {
            jQuery('#slider2-value').val( ui.value );
            Setting.handleLength = ui.value ;
        }
      });
        
        // View Scale
        $('#slider3_line').slider( {
        animate: 'slow',
        range: 'min',
        step: 0.1,
        value: 1,
        min: 0.1,
        max: 2,
        slide: function(e, ui) {
            jQuery('#slider3-value').val( ui.value );
            Setting.Scale = ui.value;
            $('#main').css("-webkit-transform", "scale(" + Setting.Scale + ","+ Setting.Scale +")");
            $('#main').css("left",  -1920*(1-Setting.Scale));
            $('#main').css("top",  -1080*(1-Setting.Scale));
        }
      });
        
        // 
        $('#slider4_line').slider( {
        animate: 'slow',
        range: 'min',
        step: 50,
        value: 200,
        min: 50,
        max: 800,
        slide: function(e, ui) {
            jQuery('#slider4-value').val( ui.value );
            GL.drag[4][4] = ui.value;
        }
      });

        for(i=1; i < 5; i++){
            jQuery('#slider' + i + '-value').val(jQuery('#slider' + i + '-value').slider('value'));
        }

        });

  $(function() {
    $('.slider').tipsy({trigger: 'focus', gravity: 'w'});
  });