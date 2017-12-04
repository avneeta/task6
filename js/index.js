jQuery(document).ready(function($) {
	$(".scroll").click(function(event){
		event.preventDefault();
		$('html,body').animate({scrollTop:$(this.hash).offset().top},1000);
	});
});	


$(document).ready(function() {
	$( "#user-login").click(function() {
		var userid = $("#userid").val();
		var password = $("#password").val();

		login(userid,password);
	});

	$().UItoTop({ easingType: 'easeOutQuart' });

});

//Login function
function login(userid,password) {
	// var data = {
	// 	userid:userid,
	// 	password:password
	// };

	// $.post( "http://localhost:1337/api/login", data)
	//  .done(function( response ) {
	//  	console.log(response);	 	
	//  	$.get("http://localhost:1337/api/create");
	//   });

	$.ajax({
	   url: "http://localhost:1337/api/login",
	   method:"POST",
	   xhrFields: {
	      withCredentials: true
	   }
	}).done(function( response ) {
	 	console.log(response);	 	
		$.ajax({
		   url: "http://localhost:1337/api/create",
		   method:"GET",
		   xhrFields: {
		      withCredentials: true
		   }
		}).done(function( response ) {
		 	console.log(response);	 	
		 	
	  	});
  	});
}
