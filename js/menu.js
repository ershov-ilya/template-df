
	var idtopmenu = 0;
	var idtopmenu_a = 0
	
	var idmenu = 0;
	var changemenu = 1;
	var actividmenu = 0;
	var firschildelement = 0;


	function viewmenu (idtopmenu) { //console.log('onmouseover'+idtopmenu);
		firschildelement = $("#topmenu"+idtopmenu+" > li:first-child").attr('id');
		console.log(firschildelement);
		if (idtopmenu_a != idtopmenu) $('#'+firschildelement+' div').css("display", "block");
		if (idtopmenu_a && idtopmenu_a != idtopmenu) {
			$('#topmenu'+idtopmenu_a).css("display", "none");
		}
	
		if (changemenu == 0 && idtopmenu != idtopmenu_a) {
			$('#menu'+actividmenu).removeClass();
			if (actividmenu) $('#submenu'+actividmenu).css("display", "none");
			
			idmenu = 0; changemenu = 1; actividmenu = 0;
		}
		idtopmenu_a = idtopmenu;
	}


	function prodmenu (id) { console.log('onclick predmenu='+firschildelement);
		idmenu = id;

		$('#clearmenu').css("display", "block");
		
		if (actividmenu == 0) {
				changemenu = 0; 
				if ('#'+firschildelement != '#menu'+idmenu) { 
					$('#'+firschildelement+' div').css("display", "none");
					//$('#'+firschildelement+' div').addClass('menuoff');
					//$('#'+firschildelement).addClass("menuon");
				}
				$('#menu'+idmenu).addClass('menuon');
				actividmenu = idmenu;
		}
		else if (actividmenu != idmenu) {
			$('#menu'+actividmenu).toggleClass('menuon').toggleClass('menuoff');

			$('#submenu'+actividmenu).css("display", "none");
			if (actividmenu != idmenu) {
				//$('#menu'+actividmenu).css("display", "block");
				$('#submenu'+idmenu).css("display", "block");
			}
			//actividmenu = 0;
			changemenu = 0;
			//menuelem.className = "menuon";
			$('#menu'+idmenu).removeClass();
			$('#menu'+idmenu).addClass('menuon');
			actividmenu = idmenu;
		}
		//console.log(idmenu+' changemenu='+changemenu+' | actividmenu='+actividmenu);
	}
	

	// Main menu

	$(".catnav-categories li").hover(function() { //console.log('changemenu='+changemenu);
		if (changemenu == 1) { //console.log('catnav-categories li:hover changemenu='+changemenu);	
			$(this).children("ul").css("display", "block");
			$(this).find("ul > li:first-child div.catnav-submenu").css("display", "block");
		}
	}, function() { 
		if (changemenu == 1) { 
			$(this).children("ul").css("display", "none");
			
		}
	})


	$(".catnav-categories li ul li").hover(function() { 
			if (changemenu == 1) {	//console.log('.catnav-categories li ul li:hover-- changemenu='+changemenu);																	 
				$(this).children(".catnav-submenu").css("display", "block");
			}
		},function () {
			if (changemenu == 1) {	//alert('fdfgd');
				$(this).children(".catnav-submenu").css("display", "none");
				
			}
		})

	$("#clearmenu").hover(function() { //alert('submenu'+idmenu);
		$(this).css("display", "none");
		$('#menu'+idmenu).parent('ul').css("display", "none");
	})

