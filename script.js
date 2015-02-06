var app = angular.module("mmr2Gpx", ['ngResource']);

// Create and register the new "instagram" service
app.factory('mmr2Gpx', function($resource){

	return {
		fetchWorkout: function(callback){

			// The ngResource module gives us the $resource service. It makes working with
			// AJAX easy. Here I am using a client_id of a test app. Replace it with yours.

			var api = $resource('http://www.mapmyrun.com/vxproxy/v7.0/workout/782830271/?field_set=time_series&callback=JSON_CALLBACK',
			{
				// This creates an action which we've chosen to name "fetch". It issues
				// an JSONP request to the URL of the resource. JSONP requires that the
				// callback=JSON_CALLBACK part is added to the URL.

				fetch:{method:'JSONP'}
			});

			api.fetch(function(response){

				// Call the supplied callback function
				callback(response.data);

			});
		}
	}

});

// The controller. Notice that I've included our instagram service which we
// defined below. It will be available inside the function automatically.

function Mmr2GpxController($scope, mmr){

	// Default layout of the app. Clicking the buttons in the toolbar
	// changes this value.

	$scope.layout = 'grid';

	$scope.response = [];

	// Use the instagram service and fetch a list of the popular pics
	mmr.fetchWorkout(function(data){

		// Assigning the pics array will cause the view
		// to be automatically redrawn by Angular.
		$scope.response = data;
	});

}