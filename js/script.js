/* Author: 
Olegnax.com
*/

(function(a){a(function(){var b=Modernizr.input.placeholder;if(!b){var c=a("input[placeholder]"),d=c.length,e,f="placeholder";while(d--)c[d].value=c[d].value?c[d].value:c.eq(d).addClass(f).attr("placeholder"),c.eq(d).focus(function(){var b=a(this);this.value==b.attr("placeholder")&&(b.removeClass(f),this.value="")}).blur(function(){var b=a(this);this.value==""&&(b.addClass(f),this.value=b.attr("placeholder"))}),function(b){a(b.form).bind("submit",function(){b.value==a(b).attr("placeholder")&&(b.value="")})}(c[d])}})})(jQuery)

jQuery(document).ready(function($) {


	/* validate subscribe form */
	jQuery("#subscribe").validate({
		submitHandler: function(form) {	
			jQuery(form).find("input[type=submit]").attr('disabled', 'disabled');	
				
			ajaxContact(form);
			return false;
		},
		rules: {
				email: "required email"
		 },  
		 messages: {
		
			 email: {
				 required: "We need your email address to contact you",
				 email: "Your email address must be in the format of name@domain.com"
			 }
	 }
	});
	
	/* validate contacts form */
	jQuery("#contacts").validate({
		submitHandler: function(form) {	
			jQuery(form).find("input[type=submit]").attr('disabled', 'disabled');	
				
			ajaxContact(form);
			return false;
		},
		rules: {
				message: "required",
				email: "required email",
				name: "required"
		 },  
		 messages: {
		
			 email: {
				 required: "We need your email address to contact you",
				 email: "Your email address must be in the format of name@domain.com"
			 }
	 }
	});
	
	/* initialize lightbox */
	jQuery("a[data-pp^='lightbox']").prettyPhoto({
	theme: 'light_square',
    overlay_gallery: false															
	});
        
    jQuery("a[data-pp^='lightbox']").prepend("<span></span>");
    jQuery("a[data-pp^='lightbox'] span").stop().animate({opacity:0},0)
   
            
    jQuery("a[data-pp^='lightbox']").hover(function(){
        jQuery(this).find("span").stop().animate({opacity:1},300)
    }, function(){
        jQuery(this).find("span").stop().animate({opacity:0},100)
    });

	/* Twitter feed */
	jQuery(".tweets").tweet({
		count: 3, // count of messages
		username: "olegnax", //twitter username
		loading_text: "Loading tweets..."
	});
								
	/* testimonials slider */							
	jQuery('.testimonials .slide').eq(0).fadeIn(1000);						
								
	var testimonials = function() {	
	jQuery('.testimonials .slide').filter(':visible').fadeOut(1000,function(){
		if(jQuery(this).next('li.slide').size()){
			jQuery(this).next().fadeIn(2000);
		}
		else{
			jQuery('.testimonials .slide').eq(0).fadeIn(1000);
		}
	});
	};
	var interval = setInterval(testimonials, 5000);
	jQuery('.testimonials .slide').hover(function() {
		clearInterval(interval);
	}, function() {
		interval = setInterval(testimonials, 5000);
			
		
});




/* ajax function for forms */
function ajaxContact(theForm) {
		var $ = jQuery;
	
        var formData = $(theForm).serialize(),
			note = $(theForm).prev('.Note');
	
        $.ajax({
            type: "POST",
            url: "inc/send.php",
            data: formData,
            success: function(response) {
				
				$(theForm).animate({opacity: 0},'fast');
				
				if (response === 'subscribe') {				
				
					note.html('You are sucessfully subscribed!').slideDown('fast');                        
									
				} else {					
				
					if (response === 'contacts') {				
				
					note.html('Your message sent to us!').slideDown('fast');                        
									
					} else {					
					
						note.html('Something going wrong...').slideDown('fast');
					
					}
					
					}
					
				setTimeout(function() {						
					note.html('').slideUp('fast');
					$(theForm).find("input[type=submit]").removeAttr('disabled');	
					$(theForm).find("input[type=text], textarea").val('');
					$(theForm).animate({opacity: 100},'fast');						
					},3000);
					
            },
			error: function() {			
					
					$(theForm).animate({opacity: 0},'fast');
				
					note.html('Something going wrong...').slideDown('fast');
					
					setTimeout(function() {
						
						note.html('').slideUp('fast');
						$(theForm).find("input[type=submit]").removeAttr('disabled');	
						$(theForm).find("input[type=text], textarea").val('');
						$(theForm).animate({opacity: 100},'fast');						
						},3000);
				
            }
        });

        return false;
    }
								
								
								
})