app.service("RegistrationService", function ($q, $http) {



    var base_url = 'http://back.lorebi.com:9763/hotel/';
    var url_booking = base_url+"booking/"; 
    var url_person = base_url+"person/"; 
    var url_room = base_url+"room/"; 

    /***************************/
    /*                         */
    /* create():               */
    /* crear reserva           */
    /*                         */
    /***************************/
    this.create = function create (obj){
	    var defered = $q.defer(); 
        $http({
            method: 'POST',
            url: url_booking + "create",
            data: obj,
        }).then(function(response) {
            defered.resolve(response); 
        }, function(errorMsg){
            defered.reject(errorMsg);
        });
            return defered.promise;
    };

    /***************************/
    /*                         */
    /* getPeople():            */
    /* trae gente en el        */
    /* sistema                 */
    /*                         */
    /***************************/
    this.getPeople = function getPeople (obj){
	    var defered = $q.defer(); 
        $http({
            method: 'POST',
            url: url_person + "getPeople",
            data: obj,
        }).then(function(response) {
            defered.resolve(response.data); 
        }, function(errorMsg){
            defered.reject(errorMsg);
        });
            return defered.promise;
    };

    /***************************/
    /*                         */
    /* listRooms():            */
    /* trae gente en el        */
    /* sistema                 */
    /*                         */
    /***************************/
    this.listRooms = function listRooms (obj){
        var defered = $q.defer(); 
        $http({
            method: 'POST',
            url: url_room + "list",
            data: obj,
        }).then(function(response) {
            defered.resolve(response.data); 
        }, function(errorMsg){
            defered.reject(errorMsg);
        });
            return defered.promise;
    };    

});

            
