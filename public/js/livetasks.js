(function() {
	// Create jQuery variable, scoping to widget
	var jQuery;
	var server = 'http://localhost:3000';

	/******** Load jQuery if not present *********/
	if (window.jQuery === undefined || window.jQuery.fn.jquery !== '1.9.1') {
	    // jQuery
	    var script_tag = document.createElement('script');
	    script_tag.setAttribute('type', 'text/javascript');
	    script_tag.setAttribute('src', 'http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js');

	    var knockout = document.createElement('script');
	    knockout.setAttribute('type', 'text/javascript');
	    knockout.setAttribute('src', server+'/js/knockout-2.2.1.js');

	    var sockets = document.createElement('script');
	    sockets.setAttribute('type', 'text/javascript');
	    sockets.setAttribute('src', server+'/socket.io/socket.io.js');

	    if (script_tag.readyState) {
	    	// For IE old versions
	      	script_tag.onreadystatechange = function () {
				if (this.readyState == 'complete' || this.readyState == 'loaded') {
	            	scriptLoadHandler();
	          	}
	      	};
	    }
	    else { // Newest browsers
	     	script_tag.onload = scriptLoadHandler;
	    }

	    // Trying to find head element then append scripts
	    (document.getElementsByTagName('head')[0] || document.documentElement).appendChild(script_tag);
	    (document.getElementsByTagName('head')[0] || document.documentElement).appendChild(sockets);
	    (document.getElementsByTagName('body')[0] || document.documentElement).appendChild(knockout);
	} else {
	    // Create an instance of jQuery
	    jQuery = window.jQuery;
	    main();
	}

	/******** For old browsers, instantiate jQuery and init ******/
	function scriptLoadHandler() {
	    jQuery = window.jQuery.noConflict(true);
	    main(); 
	}

	/******** jQuery initializated, main logic here ********/
	function main() { 
	    jQuery(document).ready(function($) { 
	        // Load styles
	        var style = jQuery("<link>", { 
	            rel: "stylesheet", 
	            type: "text/css", 
	            href: server+"/css/style.css" 
	        }).appendTo('head');

	        var fm_1140 = jQuery("<link>", { 
	            rel: "stylesheet", 
	            type: "text/css", 
	            href: server+"/css/1140.css" 
	        }).appendTo('head');

	        var fm_1140_ie = jQuery("<link>", { 
	            rel: "stylesheet", 
	            type: "text/css", 
	            href: server+"/css/1140.ie.css" 
	        }).appendTo('head');

	        var content = '<div class="qoverlay"></div>';
	        content    += '<div class="qcontent"></div>';

	        var linkButton = null;

	        /******* Using sockets communication */
	        var qsocket = io.connect(server);

	        qsocket.on('connect', function(){
	        	console.log('Client listen');
	        	begin();
	        });
			/******* End of sockets */

			var begin = function(){
				/******* Place inside body the start button */
		        linkButton = jQuery('<div id="anotatewidget"><a href"#"><img src="'+server+'/images/feedback.png" /></a></div>'+content);
		        linkButton.appendTo('body');

		        /**
		         * Sidebutton click event
		         * launch the tasks window
		         */
		        jQuery('#anotatewidget').on('click', function(e){
		        	var objModel = {
					    name: 'Jack'
					};

		        	jQuery('.qoverlay, .qcontent').show().empty();

		        	jQuery.get(server+'/templates/tasks.html', null, function (tmp_data) {
		        		jQuery(tmp_data).appendTo('.qcontent');
			            ko.applyBindings(objModel);
			        });
		        });

		        /**
		         * 
		         */
		        jQuery(document).on('click', '#btnsubmit', function(e){
		        	e.preventDefault();
		        	jQuery.ajax({
		        		type: jQuery(this).parent().attr('method'),
						url: jQuery(this).parent().attr('action'),
						dataType: 'json',
						data: {
							uri: jQuery(location).attr('href'), 
							task: jQuery('#qtask').val()
						},
						beforeSend:function(){
    						//
  						},
  						complete:function(){
  							//
  						},
  						success:function(response){
  							jQuery('<li>').html(response.task).appendTo('ul.tasklist');
  						},
		        	});
		        });

		        /**
		         * Close tasks window
		         * when esc key press
		         */
		        jQuery(document).keydown(function(e) {
		        	if ((jQuery('.qoverlay').is(':visible')) && (e.keyCode == 27)) {
		      			jQuery('.qoverlay, .qcontent').hide();
		    		}
				});

				/* 
				 * Socket linstener (news event)
				 */
				qsocket.on('news', function (data) {
					jQuery('<li>').html(data.task).appendTo('ul.tasklist');
				});
			};
	    });
	}
})(); // Call as anonymous function