require("babel-polyfill");
var NodeHelper = require("node_helper");
var Themeparks = require("themeparks");

module.exports = NodeHelper.create({	
	start: function() {
		console.log("Starting module: " + this.name);
	},

	processWaitTimes: function(park) {
		var self = this;
		console.log(park.name + ": Processing Wait Times...");
		
		var disneyPark;
		var openingTime;
		var closingTime;
		
		switch(park.name) {
			case "Magic Kingdom":
				disneyPark = new Themeparks.Parks.WaltDisneyWorldMagicKingdom();
				break;
			case "Epcot":
				disneyPark = new Themeparks.Parks.WaltDisneyWorldEpcot();
				break;
			case "Hollywood Studios":
				disneyPark = new Themeparks.Parks.WaltDisneyWorldHollywoodStudios();
				break;
			case "Animal Kingdom":
				disneyPark = new Themeparks.Parks.WaltDisneyWorldAnimalKingdom();
				break;
		}
		
		// get park opening times
		disneyPark.GetOpeningTimes(function(err, times) {
			if (err) 
			{
				console.log(park.name + ": Error Processing Opening Times...");
				return console.error(err);
			}
			
			for(var i=0, time; time=times[i++];) {
				if (time.type == "Operating") {
					if (new Date() >= new Date(time.openingTime) && new Date() <= new Date(time.closingTime)) {
						openingTime = new Date(time.openingTime);
						closingTime = new Date(time.closingTime);
					}
					else if (new Date(time.openingTime).getDate() == new Date().getDate()) {
						openingTime = new Date(time.openingTime);
						closingTime = new Date(time.closingTime);
					}
				}
			}
		});
		
		// access wait times via callback
		disneyPark.GetWaitTimes(function(err, rides) {
			if (err) 
			{
				console.log(park.name + ": Error Processing Wait Times...");
				return console.error(err);
			}
			
			waitTimes = [];			
			for(var i = 0, ride; ride = rides[i++];) {
				if (park.logRide) {
					console.log(ride.name);
					console.log(park.rides);
				}
				if (park.rides && park.rides.includes(ride.name)) {
					waitTimes.push(ride);
				}
			}
			console.log(park.name + ": Processed Wait Times...");
			
			var payload = {
				waitTimes: waitTimes,
				openingTime: openingTime,
				closingTime: closingTime,
			};
			
			self.sendSocketNotification("POPULATE_WAIT_TIMES_" + park.name.replace(/ /g,"_"), payload);
		});
	},
	
	socketNotificationReceived: function(notification, payload) {
		if (notification === 'GET_WAIT_TIMES') {
			this.processWaitTimes(payload);
		}
	},
});
