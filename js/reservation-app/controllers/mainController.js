	app.controller("mainController", function($scope, $http,RegistrationService){


		$scope.hotelId = '39a6b5cf-d561-42cc-b87d-d4b189842865';

	/*CALENDAR VAR*/
		$scope.ymd = ""; $scope.myCalendar;

	/*MODAL VAR*/
		$scope.roomId = "";

	/*HTML VAR*/
		$scope.labelsForm = ['Personal Data','Reservation Data','Companion','Rooms','Reservation'];
    $scope.labelForm = $scope.labelsForm[0];
		$scope.genders = ['M','F','Other'];

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

		/*view 3*/
			$scope.nationalityU = null;

		/*view 4*/
			$scope.countryU = null;
			$scope.stateU = null;
			$scope.cityU = null;

		/*view 5*/
			$scope.dateIn = null;
			$scope.dateOut = null;

		/*view 6*/
	    $scope.emailC = null; 
	    $scope.nameC = null;
	    $scope.lastnameC = null;			
			$scope.dniC = null;  
			$scope.phoneC = null;  
			$scope.dateBirthC = null;
			$scope.genderC = null;
			$scope.ageC = null;
			$scope.companions = [];
			$scope.maxCompanion = 4;
			$scope.cantCompanion = 0;

		/*view 7*/
			$scope.rooms = [];
			$scope.roomSelected = null;

    $scope.init = function() {
		//******************************************************//
		//                                                      //
		//                  ARROWS FUNCTIONS (init)             //
		//                                                      //
		//******************************************************//
			// Cantidad slides del form
			var cant = 9;
			//$scope.labelForm = $scope.labelsForm[0];

			// Ocultando todos los slide que no son el primer form
			for(var i=2 ; i < cant; i++){
			    $("#viewForm"+i).hide();
			}   

			// Contador de slide en el que estoy parado
			$scope.count = 1;
		
			/***************************/
			/*                         */
			/* nextForm():             */
			/* funcion flecha siguiente*/
			/*                         */
			/***************************/
			$scope. nextForm = function(){
			    if(!$(".arrowForm.right").hasClass("unable")){
			        
			        // CONTADOR DE FRAGMENTO FORM
			        var viewFormN_1 = "#viewForm"+$scope.count;
			        
			        if( $scope.count < cant ){ $scope.count+=1; }
			        
			        var viewFormN = "#viewForm"+$scope.count;

			        $(viewFormN_1).hide();
			        $(viewFormN).show();        

			        if($scope.count == 2){$(".arrowForm.left").removeClass("unable");}

			        if($scope.count == cant-1){$(".arrowForm.right").addClass("unable"); }

			        if($scope.count >= 1  ){$(".arrowForm.right").removeClass("unable");}

			        setLabelForm();
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
			        var viewFormN_1 = "#viewForm"+$scope.count;
			        
			        if( 1 < $scope.count ){ $scope.count-=1; }

			        var viewFormN = "#viewForm"+$scope.count;

			        $(viewFormN_1).hide();
			        $(viewFormN).show();

			        // Evita que el show agrege estilo display:block al form
			        document.getElementById(viewFormN.split("#")[1]).style.display = "inline";

			        if($scope.count == 2){$(".arrowForm.left").removeClass("unable");}

			        if($scope.count == 1){$(".arrowForm.left").addClass("unable");}        

			        setLabelForm();

			    }
			}

			/***************************/
			/*                         */
			/* setLabelForm():         */
			/* Cambia el label del form*/
			/*                         */
			/***************************/
			function setLabelForm(){
				if($scope.count <= 4){ $scope.labelForm = $scope.labelsForm[0]; }
				else if($scope.count == 5){ $scope.labelForm = $scope.labelsForm[1]; }
				else if($scope.count == 6){ $scope.labelForm = $scope.labelsForm[2]; }
				else if($scope.count == 7){ $scope.labelForm = $scope.labelsForm[3]; }
				else if($scope.count == 8){ $scope.labelForm = $scope.labelsForm[4]; }
			}

		//******************************************************//
		//                                                      //
		//                 CALENDARS FUNCTIONS (init)           //
		//                                                      //
		//******************************************************//
	    	var currDate = new Date();
				        
        var m = currDate.getMonth() + 1;
        if (m < 10){m = "0"+m}
        
        var d = currDate.getDate();
        if (d < 10){d = "0"+d}
	        
	      $scope.ymd = currDate.getFullYear() +"-"+m+"-"+d;

				calendarIn =  new dhtmlXCalendarObject(["cal_DateIn"]);
				calendarOut = new dhtmlXCalendarObject(["cal_DateOut"]);
				calendarDoBU= new dhtmlXCalendarObject(["cal_DateBirthU"]);
				calendarDoBC= new dhtmlXCalendarObject(["cal_DateBirthC"]);

				calendarIn.setSensitiveRange($scope.ymd,null);
				calendarOut.setSensitiveRange($scope.ymd,null);

				calendarIn.hideTime();
				calendarOut.hideTime();
				calendarDoBU.hideTime();
				calendarDoBC.hideTime();

		    /***************************/
		    /*                         */
		    /* setDoBU():              */
		    /* Modifica la fecha de    */
		    /* nacimiento del usuario  */
		    /*                         */
		    /***************************/
				var setDoBU = calendarDoBU.attachEvent("onClick",function(){
					$scope.dateBirthU = calendarDoBU.getDate(true);
				})

		    /***************************/
		    /*                         */
		    /* setDoBC():              */
		    /* Modifica la fecha de    */
		    /* nacimiento del usuario  */
		    /*                         */
		    /***************************/
				var setDoBC = calendarDoBC.attachEvent("onClick",function(){
					$scope.dateBirthC = calendarDoBC.getDate(true);
				})


		    /***************************/
		    /*                         */
		    /* setDateIn():            */
		    /* Modifica la fecha de    */
		    /* ingreso                 */
		    /*                         */
		    /***************************/
				var setDateIn = calendarIn.attachEvent("onClick",function(){
					$scope.dateIn = calendarIn.getDate(true);
					calendarOut.setSensitiveRange($scope.dateIn,null);
				})

		    /***************************/
		    /*                         */
		    /* setDateOut():           */
		    /* Modifica la fecha de    */
		    /* salida                  */
		    /*                         */
		    /***************************/
				var setDateOut = calendarOut.attachEvent("onClick",function(){
					$scope.dateOut = calendarOut.getDate(true);
					calendarIn.setSensitiveRange(null,$scope.dateOut);
				})				

		//******************************************************//
		//                                                      //
		//                   ROOMS FUNCTIONS (init)             //
		//                                                      //
		//******************************************************//
		/*$scope.listRooms = function(){*/
				RegistrationService.listRooms($scope.hotelId).then(function(result) {   
                var res = result.entity;
                for( i in res ){
                	//console.log(res[i].name);
                	$scope.rooms.push(res[i]);
                }// fin for
            }) // fin then
		/*}*/
    }; /* fin init()*/

	//******************************************************//
	//                                                      //
	//                   MODAL FUNCTIONS                    //
	//                                                      //
	//******************************************************//
		$('#ModalRooms').on('show.bs.modal', function(e){
		    $scope.roomId = $(e.relatedTarget).data('room');
	      
	      for(i in $scope.rooms){
	      	if($scope.rooms[i].id == $(e.relatedTarget).data('room')){
	      		$scope.roomSelected = $scope.rooms[i];
	      		//console.log($scope.roomSelected);
	      	}//fin if
	      } //fin for
		
		});

	    /***************************/
	    /*                         */
	    /* selectRoom():           */
	    /* Seleccionar habitacion  */
	    /*                         */
	    /***************************/
	    $scope.selectRoom = function() {
	        for(i in $scope.rooms){
	        	var r = $scope.rooms[i];
	        	$("#room"+r.id).removeClass("active");
	        	if(r.id == $scope.roomId){
	        		$scope.roomSelected = r;
	        	}
	        } // fin for
	        
	        $("#room"+$scope.roomId).addClass("active");
	    }; /*fin selectRoom()*/ 

	//******************************************************//
	//                                                      //
	//                   FORM FUNCTIONS                     //
	//                                                      //
	//******************************************************//
	    /***************************/
	    /*                         */
	    /* getPersonU():           */
	    /* Obtiene info si ya      */
	    /* existe                  */
	    /*                         */
	    /***************************/
	    $scope.getPersonU = function() {
	    	
	    	var obj = {field: "email",value:[$scope.emailU]};
	    	
				RegistrationService.getPeople(obj).then(function(result) {   
                var res = result.listEntity;
                for(var i=0; i < res.length; i++){
                	if(res[i].email == $scope.emailU ){
            		    
            		    $scope.nameU = res[i].first_name;
								    $scope.lastnameU = res[i].last_name;
								    $scope.dniU = res[i].dni;
								    $scope.genderU = res[i].gender;

								    var d = res[i].dob.split("/")[0];
				        		if (d < 10 && d[0] != 0){d = "0"+d}

				        		var m = res[i].dob.split("/")[1];
				        		if (m < 10 && m[0] != 0){m = "0"+m}

								    $scope.dateBirthU = res[i].dob.split("/")[2]+'-'+m+'-'+ d;

										calendarDoBU.setDate(new Date($scope.dateBirthU));

										$scope.countryU = res[i].country;
										$scope.stateU = res[i].stateU;
										$scope.cityU = res[i].city;
                	} // fin if
                } // fin for   
            }) // fin then
	    }

	    /***************************/
	    /*                         */
	    /* getPersonC():           */
	    /* Obtiene info si ya      */
	    /* existe                  */
	    /*                         */
	    /***************************/
	    $scope.getPersonC = function() {
	    	
	    	var obj = {field: "email",value:[$scope.emailC]};
	    	
				RegistrationService.getPeople(obj).then(function(result) {   
                var res = result.listEntity;
                for(var i=0; i < res.length; i++){
                	if(res[i].email == $scope.emailC ){
            		    
            		    $scope.nameC = res[i].first_name;
								    $scope.lastnameC = res[i].last_name;
								    $scope.dniC = res[i].dni;
								    $scope.genderC = res[i].gender;

								    var d = res[i].dob.split("/")[0];
				        		if (d < 10 && d[0] != 0){d = "0"+d}

				        		var m = res[i].dob.split("/")[1];
				        		if (m < 10 && m[0] != 0){m = "0"+m}

								    $scope.dateBirthC = res[i].dob.split("/")[2]+'-'+m+'-'+ d;

										calendarDoBC.setDate(new Date($scope.dateBirthC));

										$scope.countryC = res[i].country;
										$scope.stateC = res[i].state;
										$scope.cityC = res[i].city;
                	}
                }
                
            })
	    }	    

	    /***************************/
	    /*                         */
	    /* setGender():            */
	    /* Cambia el genero        */
	    /* seleccionado            */
	    /*                         */
	    /***************************/
	    $scope.setGender = function(g){ $scope.genderU = g;}
	    
	    /***************************/
	    /*                         */
	    /* setGender():            */
	    /* Cambia el genero        */
	    /* seleccionado del 			 */ 
	    /* companion               */
	    /*                         */
	    /***************************/	    
	    $scope.setGenderC = function(g){$scope.genderC = g;console.log($scope.genderC)}

	    /***************************/
	    /*                         */
	    /* checkCompanion():       */
	    /* Regresa true si ya      */
	    /* existe el correo de 
	    /* acompanate               */
	    /*                         */
	    /***************************/	
	    function checkCompanion(email){
	    	for (i in $scope.companions){
	    		if ($scope.companions[i].email == email){
	    			return true;
	    		}
	    	}
	    	return false;
	    }

	    /***************************/
	    /*                         */
	    /* addCompanion():         */
	    /* Agrega acompanante a    */ 
	    /* arreglo                 */
	    /*                         */
	    /***************************/
	    $scope.addCompanion = function(){

				var dateSet = calendarDoBC.getDate(true);
				
				var d = parseInt(dateSet.split("-")[2]);
				if(d < 10){d = "0"+d}

		    var dobC = d+'/'+dateSet.split("-")[1]+'/'+dateSet.split("-")[0];

				console.log("1."+$scope.dateBirthC);
				console.log("2."+dobC);

	    	var obj = {	first_name: $scope.nameC,
										last_name: $scope.lastnameC,
										dni: $scope.dniC,
										dob: dobC,
										type: 0,
										gender: $scope.genderC,
										email: $scope.emailC,
										country: $scope.countryC,
										state: $scope.stateC,
										city: $scope.cityC
									};

	    	if(	$scope.nameC != null     && $scope.nameC != ""     &&
	    	 		$scope.lastnameC != null && $scope.lastnameC != "" &&
	    	 		$scope.dniC != null      && $scope.dniC != ""      && 
	    	 		$scope.dateBirthC != null && $scope.dateBirthC != "" &&
	    	 		$scope.genderC != null   && $scope.genderC != ""   &&
	    	 		$scope.emailC != null    && $scope.emailC != "" &&
	    	 		!checkCompanion($scope.emailC)){	

					$scope.companions.push(obj);
					$scope.cantCompanion+=1;

	    	}else if(	$scope.nameC != null     && $scope.nameC != ""     &&
				    	 		$scope.lastnameC != null && $scope.lastnameC != "" &&
				    	 		$scope.dniC != null      && $scope.dniC != ""      && 
				    	 		$scope.dateBirthC != null && $scope.dateBirthC != "" &&
				    	 		$scope.genderC != null   && $scope.genderC != ""   &&
				    	 		$scope.emailC != null    && $scope.emailC != "" &&
				    	 		checkCompanion($scope.emailC)){

		    	for(i in $scope.companions){
		    		if($scope.companions[i].email == $scope.emailC){
		    			$scope.companions[i] = obj;
		    		} // fin if
		    	} // fin for
	    	} // fin else if

				$scope.emailC = null;
				$scope.nameC = null;
				$scope.lastnameC = null;
				$scope.dniC = null;
				$scope.phoneC = null;
				$scope.dateBirthC = null;
				$scope.genderC = null;   	
	    }

	    /***************************/
	    /*                         */
	    /* editCompanion():        */
	    /* modifica acompanante del*/ 
	    /* arreglo                 */
	    /*                         */
	    /***************************/	 
	    $scope.editCompanion = function(email){

	    		for(i in $scope.companions){
	    			if( $scope.companions[i].email == email ){

			    		$scope.emailC = $scope.companions[i].email;
							$scope.nameC = $scope.companions[i].first_name;
							$scope.lastnameC = $scope.companions[i].last_name;
							$scope.dniC = $scope.companions[i].dni;
							$scope.phoneC = $scope.companions[i].phone;
							$scope.dateBirthC = $scope.companions[i].dob;
							$scope.genderC = $scope.companions[i].gender;

	    			}
	    		}
	    }   

	    /***************************/
	    /*                         */
	    /* deleteCompanion():      */
	    /* elimina acompanante del */ 
	    /* arreglo                 */
	    /*                         */
	    /***************************/	 
	    $scope.deleteCompanion = function(email){

	    		for(i in $scope.companions){
	    			if($scope.companions[i].email == email){
	    				$scope.companions.splice(i,1);
	    			}
	    		}
	    }

});

