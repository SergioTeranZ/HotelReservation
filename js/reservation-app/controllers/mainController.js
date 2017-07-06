	app.controller("mainController", function($scope, $http,RegistrationService){


		$scope.hotelId = '39a6b5cf-d561-42cc-b87d-d4b189842865';

		/*CALENDAR VAR*/
			$scope.dmy = ""; 
			$scope.myCalendar;

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
				$scope.editbtn = false;

			/*view 7*/
				$scope.rooms = [];
				$scope.roomShowed = null;
				$scope.roomSelected = null;

			/*view 8*/
				$scope.nights = null;
				$scope.payments = [];
				$scope.payment = null;
				$scope.discount = null;
				$scope.totalPay = null;
				$scope.bill = null;
				$scope.objPersonU = null;

    $scope.init = function() {
		//******************************************************//
		//                                                      //
		//                  ARROWS FUNCTIONS (init)             //
		//                                                      //
		//******************************************************//
			// Cantidad slides del form
			var cant = 8;
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
			        
			        if($scope.count == (cant-1) ){
			        	setBill();
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
				if($scope.count <= 3){ $scope.labelForm = $scope.labelsForm[0]; }
				else if($scope.count == 4){ $scope.labelForm = $scope.labelsForm[1]; }
				else if($scope.count == 5){ $scope.labelForm = $scope.labelsForm[2]; }
				else if($scope.count == 6){ $scope.labelForm = $scope.labelsForm[3]; }
				else if($scope.count == 7){ $scope.labelForm = $scope.labelsForm[4]; }
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
	        
	      $scope.dmy = d+"/"+m+"/"+currDate.getFullYear();

				calendarIn =  new dhtmlXCalendarObject(["cal_DateIn"]);
				calendarOut = new dhtmlXCalendarObject(["cal_DateOut"]);
				calendarDoBU= new dhtmlXCalendarObject(["cal_DateBirthU"]);
				calendarDoBC= new dhtmlXCalendarObject(["cal_DateBirthC"]);


				calendarIn.hideTime();
				calendarOut.hideTime();
				calendarDoBU.hideTime();
				calendarDoBC.hideTime();

				calendarIn.setDateFormat("%d/%m/%Y");
				calendarOut.setDateFormat("%d/%m/%Y");
				calendarDoBU.setDateFormat("%d/%m/%Y");
				calendarDoBC.setDateFormat("%d/%m/%Y");

				console.log(">>"+$scope.dmy+"\n>>"+calendarDoBU.getDate(true));

				calendarIn.setSensitiveRange($scope.dmy,null);
				calendarOut.setSensitiveRange($scope.dmy,null);

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
					calendarIn.setSensitiveRange($scope.dmy,$scope.dateOut);
				})				

		//******************************************************//
		//                                                      //
		//                   ROOMS FUNCTIONS (init)             //
		//                                                      //
		//******************************************************//
			RegistrationService.listRooms($scope.hotelId).then(function(result) {   
	      var res = result.entity;
	      
	      for( i in res ){
	      	$scope.rooms.push(res[i]);
	      }// fin for
	    
	    }) // fin then

	    /***************************/
	    /*                         */
	    /* showRoom():             */
	    /* muestra habitacion      */
	    /* escogida                */
	    /*                         */
	    /***************************/
	    $scope.showRoom = function(id){
 				for(i in $scope.rooms){
	      	if($scope.rooms[i].id == id){
	      		$scope.roomShowed = $scope.rooms[i];
	      	}//fin if
	      } //fin for
	    }

		//******************************************************//
		//                                                      //
		//                    BILL FUNCTIONS (init)             //
		//                                                      //
		//******************************************************//
			RegistrationService.getPayments($scope.hotelId).then(function(result) {   
	      var res = result.entity;
	      
	      for( i in res ){
	      	$scope.payments.push(res[i]);
	      }// fin for
	    
	    }) // fin then

    }; /* fin init()*/

	//******************************************************//
	//                                                      //
	//                   MODAL FUNCTIONS                    //
	//                                                      //
	//******************************************************//
		$('#ModalRooms').on('show.bs.modal', function(e){
	    $scope.roomId = $(e.relatedTarget).data('room');
      $scope.showRoom($scope.roomId);
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
	        	
	        	if(r.id == $scope.roomId && (r.capacity >= $scope.countCompanions() + 1)){
	        		$scope.roomSelected = r;
	        		$("#room"+$scope.roomId).addClass("active");
	        	} //fin if
	        } // fin for
	    }; /*fin selectRoom()*/ 


	    /***************************/
	    /*                         */
	    /* countCompanions():      */
	    /* Cuenta cantidad de      */ 
	    /* acompanantes            */
	    /*                         */
	    /***************************/
	    $scope.countCompanions = function(){
	    	var c = 0;
	    	for (i in $scope.companions){
	    		if($scope.companions[i].type == 0 ){
	    			c +=1;
	    		}
	    	}
	    	return c;
	    }

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
								    $scope.dateBirthU = res[i].dob;
										$scope.countryU = res[i].country;
										$scope.stateU = res[i].stateU;
										$scope.cityU = res[i].city;

										calendarDoBU.setDate(new Date($scope.dateBirthU));
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
								    $scope.dateBirthC = res[i].dob;
										$scope.countryC = res[i].country;
										$scope.stateC = res[i].state;
										$scope.cityC = res[i].city;

										calendarDoBC.setDate(new Date($scope.dateBirthC));
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
	    $scope.setGenderC = function(g){$scope.genderC = g;}

	    /***************************/
	    /*                         */
	    /* checkCompanion():       */
	    /* Regresa true si ya      */
	    /* existe el correo de     */
	    /* acompanate              */
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
	    /* importantFieldsC():     */
	    /* Regresa true si ningun  */ 
	    /* campo importante esta   */
	    /* vacio                   */
	    /*                         */
	    /***************************/	
	    function importantFieldsC(){
	    	return (
	    		($scope.nameC != null     && $scope.nameC != "")     &&
	    	 	($scope.lastnameC != null && $scope.lastnameC != "") &&
    	 		($scope.dniC != null      && $scope.dniC != "")      && 
    	 		($scope.dateBirthC != null && $scope.dateBirthC != "") &&
    	 		($scope.genderC != null   && $scope.genderC != "")   &&
    	 		($scope.emailC != null    && $scope.emailC != "")	
    	 		)
	    }

	    /***************************/
	    /*                         */
	    /* addCompanion():         */
	    /* Agrega acompanante a    */ 
	    /* arreglo                 */
	    /*                         */
	    /***************************/
	    $scope.addCompanion = function(){

				console.log(">"+calendarDoBC.getDate(true)+"\n>"+$scope.dateBirthC);

		    var dobC = $scope.dateBirthC;

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


	    	if(	importantFieldsC() && !checkCompanion($scope.emailC) && ($scope.countCompanions() < $scope.maxCompanion)){	

					$scope.companions.push(obj);
					//$scope.cantCompanion+=1;

	    	}

	    	if(	importantFieldsC() && checkCompanion($scope.emailC)){

		    	for(i in $scope.companions){
		    		if($scope.companions[i].email == $scope.emailC){
		    			$scope.companions[i] = obj;
		    		} // fin if
		    	} // fin for

	    	} // fin else if

				$scope.editbtn = false;
				$scope.emailC = null;
				$scope.nameC = null;
				$scope.lastnameC = null;
				$scope.dniC = null;
				$scope.phoneC = null;
				$scope.dateBirthC = null;
				$scope.genderC = null;   	
	    
				if(($scope.roomSelected != null) && ($scope.countCompanions()+1 > $scope.roomSelected.capacity)){
					$scope.roomSelected = null;
					$scope.selectRoom() 
				}
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
							$scope.editbtn = true;
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


	    /***************************/
	    /*                         */
	    /* calculateTotalPayment():*/
	    /* Calcula total a pagar   */
	    /* por la reserva, en      */
	    /* funcion de las noches   */
	    /* reservadas              */
	    /*                         */
	    /***************************/	
			function calculateTotalPayment(){
				$scope.nights = countNights();
				return ($scope.nights*$scope.roomSelected.rate);
			}

	    /***************************/
	    /*                         */
	    /* countNights(): 				 */
	    /* Cuenta la cantidad de   */
	    /* noches reservadas       */
	    /*                         */
	    /***************************/	
			function countNights(){
				
				var dmyIn = $scope.dateIn.split("/");
				var dIn =  new Date(dmyIn[2], dmyIn[1]-1, dmyIn[0]);

				var dmyOut = $scope.dateOut.split("/");
				var dOut = new Date(dmyOut[2], dmyOut[1]-1, dmyOut[0]);

				var res = Math.round((dOut-dIn)/(1000*60*60*24));
				console.log(res);
				return res;
			}

	    /***************************/
	    /*                         */
	    /* setPayment():  				 */
	    /* Setea el tipo de pago   */
	    /*                         */
	    /***************************/	
	    $scope.setPayment = function(p){ 
	    	$scope.payment = p;
	    	$scope.bill.offer._payment = $scope.payment; 
	    }

	    /***************************/
	    /*                         */
	    /* transformDate():     	 */
	    /* Da el formato necesario */ 
	    /* para crear la           */
	    /* reservacion             */
	    /*                         */
	    /***************************/
	    function transformDate(date){
	    	var d = date.split("/")[0];
	    	var m = date.split("/")[1];
	    	var y = date.split("/")[2];
	    	return y+"-"+m+"-"+d+"T21:36:24.635Z";
	    }

	    /***************************/
	    /*                         */
	    /* setBill(): 						 */
	    /* Crea factura						 */
	    /* (sin metodo de pago)    */
	    /*                         */
	    /***************************/	
	    function setBill(){
	    	
	    	$scope.totalPay = parseInt(calculateTotalPayment());

	    	var objOffer =  {
						"_payment": $scope.payment,
						"in_date": transformDate($scope.dateIn),
						"out_date": transformDate($scope.dateOut),
						"discount": $scope.discount,
						"total": $scope.totalPay,
						"status": 0,
						"code": $scope.code,
						"locator": ""
					};

				var objRoom = [{"_room": $scope.roomSelected.id}];

				if ($scope.objPersonU == null){
					
					$scope.objPersonU = {
								"first_name": $scope.nameU,
								"last_name": $scope.lastnameU,
								"dni": $scope.dniU,
								"dob": $scope.dateBirthU,
								"type": 1,
								"gender": $scope.genderU,
								"email": $scope.emailU,
								"country": $scope.countryU,
								"state": $scope.stateU,
								"city": $scope.cityU
					};

					$scope.companions.push($scope.objPersonU);
				}

				var objPersons = $scope.companions; 

	    	$scope.bill = {
					"offer": objOffer,
					"rooms": objRoom,
					"persons": objPersons,
					"hotel": $scope.hotelId
				} // fin $scope.bill
	    } // fin setBill()

	    /***************************/
	    /*                         */
	    /* sendReservation():      */
	    /* Envia factura  				 */
	    /*                         */
	    /***************************/
			$scope.sendReservation = function(){
				//setBill();
				console.log($scope.bill);
				RegistrationService.create($scope.bill).then(function(result) {   
				  var res = result;
				  console.log(res)
				  if(res.message =="saved"){
				  	alert("Reservation created");
				  }
				}) // fin then
			}
});

