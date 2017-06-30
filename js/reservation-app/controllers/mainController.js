	app.controller("mainController", function($scope, $http,RegistrationService){

	/*CALENDAR VAR*/
	$scope.ymd = ""; $scope.myCalendar;

	/*MODAL VAR*/
	$scope.room = 0;

	/*HTML VAR*/
	$scope.labelForms = ['Personal Data','Reservation Data','Companion','Rooms','Reservation'];
    $scope.labelForm = $scope.labelForms[0];

    /*FORM VAR*/
    /*view 1*/
    $scope.emailU = null; 
    $scope.nameU = null;
    $scope.lastnameU = null;
    $scope.code = null;
	
	/*view 2*/
	$scope.dniU = null;  
	$scope.phoneU = null;  
	$scope.dateBirthU = null;
	$scope.genderU = null;


    $scope.init = function() {
		//******************************************************//
		//                                                      //
		//                  ARROWS FUNCTIONS                    //
		//                                                      //
		//******************************************************//
			// Cantidad slides del form
			var cant = 9;
			//$scope.labelForm = $scope.labelForms[0];

			// Ocultando todos los slide que no son el primer form
			for(var i=2 ; i < cant; i++){
			    $("#iconForm"+i).hide();
			    $("#viewForm"+i).hide();
			    $("#labelForm"+i).hide();
			}   

			// Contador de slide en el que estoy parado
			var count = 1;
		
			/***************************/
			/*                         */
			/* nextForm():             */
			/* funcion flecha siguiente*/
			/*                         */
			/***************************/
			$scope. nextForm = function(){
			    if(!$(".arrowForm.right").hasClass("unable")){
			        
			        // CONTADOR DE FRAGMENTO FORM
			        var iconFormN_1 = "#iconForm"+count;
			        var viewFormN_1 = "#viewForm"+count;
			        var labelFormN_1 = "#labelForm"+count;
			        
			        if( count < cant ){
			            count+=1;
			        }
			        
			        var iconFormN = "#iconForm"+count;
			        var viewFormN = "#viewForm"+count;
			        var labelFormN = "#labelForm"+count;

			        $(viewFormN_1).hide();
			        $(viewFormN).show();

			        $(iconFormN_1).hide();
			        $(iconFormN).show();

			        $(labelFormN_1).hide();
			        $(labelFormN).show();        

			        $(viewFormN).stop().animate({left: -1000}, 400);

			        if($("#viewForm2").is(":visible")){
			            $(".arrowForm.left").removeClass("unable");
			        }

			        if($("#viewForm"+(cant-1)).is(":visible")){
			            $(".arrowForm.right").addClass("unable"); 
			        }
			    }
			}

			/***************************/
			/*                         */
			/* prevForm():             */
			/* funcion flecha anterior */
			/*                         */
			/***************************/
			$scope. prevForm = function(){
			    if(!$(".arrowForm.left").hasClass("unable")){
			        
			        // CONTADOR DE FRAGMENTO FORM
			        var viewFormN_1 = "#viewForm"+count;
			        var labelFormN_1 = "#labelForm"+count;
			        var iconFormN_1 = "#iconForm"+count;
			        
			        if( 1 < count ){
			            count-=1;
			        }

			        var labelFormN = "#labelForm"+count;
			        var viewFormN = "#viewForm"+count;
			        var iconFormN = "#iconForm"+count;

			        $(viewFormN_1).hide();
			        $(viewFormN).show();


			        $(iconFormN_1).hide();
			        $(iconFormN).show();

			        $(labelFormN_1).hide();
			        $(labelFormN).show();        


			        document.getElementById(viewFormN.split("#")[1]).style.display = "inline";

			        if($("#viewForm2").is(":visible")){
			            $(".arrowForm.left").removeClass("unable");
			        }

			        if($("#viewForm1").is(":visible")){
			            $(".arrowForm.left").addClass("unable");
			        }        

			    }
			}

		//******************************************************//
		//                                                      //
		//                 CALENDARS FUNCTIONS                  //
		//                                                      //
		//******************************************************//
	    	var currDate = new Date();
				        
	        var m = currDate.getMonth() + 1;
	        if (m < 10){m = "0"+m}
	        
	        $scope.ymd = currDate.getFullYear() +"-0"+(currDate.getMonth() + 1)+"-"+currDate.getDate();

			myCalendarInOut = new dhtmlXCalendarObject(["cal_DateIn","cal_DateOut"]);
			myCalendarDoB = new dhtmlXCalendarObject(["cal_DateBirth","cal_DateBirthC"]);

			myCalendarInOut.setSensitiveRange($scope.ymd,null);

			myCalendarInOut.hideTime();
			myCalendarDoB.hideTime();
    }; /* fin init()*/
	
	//******************************************************//
	//                                                      //
	//                   MODAL FUNCTIONS                    //
	//                                                      //
	//******************************************************//
		$('#ModalRooms').on('show.bs.modal', function(e){
		    $scope.room = $(e.relatedTarget).data('room');
		});

	    /***************************/
	    /*                         */
	    /* selectRoom():           */
	    /* Seleccionar habitacion  */
	    /*                         */
	    /***************************/
	    $scope.selectRoom = function() {
	        for(var i = 1 ; i <= 8 ; i++){
	        	$("#room"+i).removeClass("active");
	        }
	            $("#room"+$scope.room).addClass("active");
	    }; /*fin selectRoom()*/ 

	//******************************************************//
	//                                                      //
	//                   FROM FUNCTIONS                     //
	//                                                      //
	//******************************************************//
	    /***************************/
	    /*                         */
	    /* getPersonU():           */
	    /*   */
	    /*                         */
	    /***************************/
	    $scope.getPersonU = function() {
	    	var em = ["iatencio@lorebi.com"];
	    	em.push($scope.emailU);
	    	var obj = {field: "email",value:em};
	    	console.log(obj);
			RegistrationService.getPeople(obj).then(function(result) {   
                //result.data.entity 
                var res = result.listEntity;
                //console.log(res.listEntity);
                for(var i=0; i < res.length; i++){
                	if(res[i].email == $scope.emailU ){
                		console.log(res[i]);
            		    $scope.nameU = res[i].first_name;
					    $scope.lastnameU = res[i].last_name;
					    $scope.dniU = res[i].dni;
					    $scope.dateBirthU = res[i].dob;
						console.log($scope.dateBirthU.split("/"));
						//myCalendarInOut.setDate(new Date($scope.dateBirthU));
                	}
                }
                
            })
	    }

});

