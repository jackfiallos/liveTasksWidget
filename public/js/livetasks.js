(function() {
	// Se crea una variable jQuery de alcance limitado solo a este widget
	var jQuery;

	/******** Cargar jQuery si no esta presente *********/
	if (window.jQuery === undefined || window.jQuery.fn.jquery !== '1.9.1') {
	    var script_tag = document.createElement('script');
	    script_tag.setAttribute("type","text/javascript");
	    script_tag.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js");
	    if (script_tag.readyState) {
	    	// Para versiones viejitas de IE
	      	script_tag.onreadystatechange = function () {
				if (this.readyState == 'complete' || this.readyState == 'loaded') {
	            	scriptLoadHandler();
	          	}
	      	};
	    }
	    else { // Cualquier otro navegador
	     	script_tag.onload = scriptLoadHandler;
	    }
	    // Intanta encontrar el elemento head, de lo contrario se deja el script como hijo de la primera etiqueta html encontrada
	    (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
	} else {
	    // Se instancia jQuery en nuestra variable global
	    jQuery = window.jQuery;
	    main();
	}

	/******** Llamar a jQuery una vez que ha sido cargado ******/
	function scriptLoadHandler() {
	    // Establecer que jQuery no haga conflictos con ninguna otra libreria y usar jQuery en lugar de $
	    jQuery = window.jQuery.noConflict(true);
	    main(); 
	}

	/******** Funcion principal, aqui va toda la logica ********/
	function main() { 
	    jQuery(document).ready(function($) { 
	        /******* Cargar los estilos *******/
	        var style = jQuery("<link>", { 
	            rel: "stylesheet", 
	            type: "text/css", 
	            href: "http://localhost:3000/css/style.css" 
	        });
	        style.appendTo('head'); 

	        var content = '<div class="qoverlay"></div>';
	        content    += '<div class="qcontent"></div>';

	        /******* Cargar el boton principal *******/
	        var linkButton = jQuery('<div id="anotatewidget"><a href"#"><img src="http://localhost:3000/images/feedback.png" /></a></div>'+content);
	        linkButton.appendTo('body');

	        jQuery('#anotatewidget').on('click', function(){
	        	jQuery('.qoverlay, .qcontent').show();
	        });

	        jQuery(document).keydown(function(e) {
	        	if ((jQuery('.qoverlay').is(':visible')) && (e.keyCode == 27)) {
	      			jQuery('.qoverlay, .qcontent').hide();
	    		}
			});
	    });
	}
})(); // Para que funcione el script se debe de llamar como una funcion anonima