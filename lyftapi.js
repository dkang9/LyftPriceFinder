
var estimates = makeLyftAPICalls(40.447492, -79.943451, 40.443872, -79.914696, 2);
console.log("obj:  " + JSON.parse(estimates));

function makeLyftAPICalls(startLat, startLong, endLat, endLong, radius) {
	
	//this token needs to be updated after authentication expires
	access_token = "gAAAAABX1IBbdgXV30khHMX5AGjIGdJYQoTcGZWYCvimbyysX7boysJshFGFdvmkEP01_glyy2w87ooD72qxqniFyVfnBEOHott2s6_q4DYtau1BHYBiHBaQIwFaf08IhkN0ubls6-rIDr1kc4O15dW_g_XipxjWcFWwJJtG80mVRF6mFV_fLDS235zUEZbwcfj4tH28kI2MLHibNKhLTQRNdLcYT_A25A==";

	var numberOfPoints = 8;
    var degreesPerPoint = 360 / numberOfPoints;
    var currentAngle = 0;

    var estimates = [];
    var minFare = Number.MAX_VALUE;
    var minObj = {};

    for (var rad = .1; rad <= radius; rad += 0.1) {
    
	    for(var i=0; i < numberOfPoints; i++) {
	        var x2 = Math.cos(currentAngle) * rad;
	        var y2 = Math.sin(currentAngle) * rad;

	        var s_lat = startLat+x2;
	        var s_lng = startLong+y2;

	        xhr = new XMLHttpRequest();
			xhr.open("GET", "https://api.lyft.com/v1/cost?start_lat=" + (startLat+.01) + "&start_lng=" + startLong + "&end_lat=" + endLat + "&end_lng=" + endLong + "", false);
			xhr.setRequestHeader("Authorization", "Bearer " + access_token);
			xhr.send();
			var arr = JSON.parse(xhr.response).cost_estimates;
			var max = arr[arr.length-1].estimated_cost_cents_max;
			var min = arr[arr.length-1].estimated_cost_cents_min;
			var avgFare = (max*1.0 + min)/2;
			console.log(avgFare);

	        var estimate = {
	        	"start_lat": s_lat, 
	        	"start_lng": s_lng, 
		        "end_lat": endLat, 
		        "end_lng": endLong, 
		    	"primetime_percentage": "0%", 
		    	"estimated_cost_cents": avgFare
		    };
		    estimates.push(estimate);

		    if(avgFare < minFare) {
		    	minFare = avgFare;
		    	minObj = estimate;
		    }

		    currentAngle += degreesPerPoint;

	    }
	    currentAngle = 0;
	}

	var toRet = {
		"estimates": estimates,
		"minFare": minObj
	};
	console.log(toRet);
	return JSON.stringify(toRet);

}