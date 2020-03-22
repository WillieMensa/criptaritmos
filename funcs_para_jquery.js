/*
	funcs_para_jquery.js
	21/3/2020

	funciones que operan con jquery y son comunes a varios archivos de esta aplicacion

*/

		$(document).ready(function(){
			$("input").focus(function(){
				$(this).css("background-color", "lightblue");
			});
			$("input").blur(function(){
				$(this).css("background-color", "lime");
			});

			$("#version").append(version());

	    //	$("#panel").slideDown(5000);
			$("#flipup").click(function(){
				$("#panel").slideUp("slow");
			});
			$("#flipdown").click(function(){
				$("#panel").slideDown("slow");
			});

		});
