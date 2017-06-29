	app.controller("mainController", function($scope, $http){

	/*CALENDAR VAR*/
	$scope.ymd = ""; $scope.myCalendar;

	/*MODAL VAR*/
	$scope.room = 0;

	/*HTML VAR*/
	$scope.labelForms = ['Personal Data','Reservation Data','Companion','Rooms','Reservation'];
    $scope.labelForm = $scope.labelForms[0];

    /*FORM VAR*/
    $scope.emailU = "";
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
		/* enableArrow():          */
		/* funcion que habilita el */
		/* boton de seguir cuando  */
		/* las opciones estan      */ 
		/* llenas                  */
		/*                         */
		/***************************/
		$scope.enableArrow = function(){
			    if (document.getElementById("nameU").value != "" && 
			        document.getElementById("lastnameU").value != "" && 
			        document.getElementById("code").value != "" && 
			        document.getElementById("emailU").value != "" ){
			        $(".arrowForm.right").removeClass("unable");
			    }else{
			        $(".arrowForm.right").addClass("unable");

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

      	console.log($scope.ymd);

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
});

