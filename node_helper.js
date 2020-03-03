require("babel-polyfill");
const NodeHelper = require("node_helper");
const Themeparks = require("themeparks");

const DisneyWorldMagicKingdom = new Themeparks.Parks.WaltDisneyWorldMagicKingdom();
const DisneyWorldEpcot = new Themeparks.Parks.WaltDisneyWorldEpcot;
const DisneyWorldHollywoodStudios = new Themeparks.Parks.WaltDisneyWorldHollywoodStudios;
const DisneyWorldAnimalKingdom = new Themeparks.Parks.WaltDisneyWorldAnimalKingdom;

module.exports = NodeHelper.create({
	start: function() {
		console.log("Starting module helper: " + this.name);
	},

	processWaitTimes: function(park) {
		var self = this;
		console.log(park.name + ": Processing Wait Times...");

		const CheckOpeningTimes = (disneyPark) => {
			disneyPark.GetOpeningTimes().then((times) => {
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

				var payload = {
					openingTime: openingTime,
					closingTime: closingTime,
				};

				self.sendSocketNotification("POPULATE_OPENING_TIMES_" + park.name.replace(/ /g,"_"), payload);
			}).catch((error) => {
				console.log(park.name + ": Error Processing Opening Times...");
				console.error(error);
			});
		};

		const CheckWaitTimes = (disneyPark) => {
			disneyPark.GetWaitTimes().then((rides) => {
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
					waitTimes: waitTimes
				};

				self.sendSocketNotification("POPULATE_WAIT_TIMES_" + park.name.replace(/ /g,"_"), payload);
			}).catch((error) => {
				console.log(park.name + ": Error Processing Wait Times...");
				console.error(error);
			});
		};

		switch(park.name) {
		case "Magic Kingdom":
			CheckOpeningTimes(DisneyWorldMagicKingdom);
			CheckWaitTimes(DisneyWorldMagicKingdom);
			break;
		case "Epcot":
			CheckOpeningTimes(DisneyWorldEpcot);
			CheckWaitTimes(DisneyWorldEpcot);
			break;
		case "Hollywood Studios":
			CheckOpeningTimes(DisneyWorldHollywoodStudios);
			CheckWaitTimes(DisneyWorldHollywoodStudios);
			break;
		case "Animal Kingdom":
			CheckOpeningTimes(DisneyWorldAnimalKingdom);
			CheckWaitTimes(DisneyWorldAnimalKingdom);
			break;
		}
	},

	socketNotificationReceived: function(notification, payload) {
		if (notification === "GET_WAIT_TIMES") {
			this.processWaitTimes(payload);
		}
	},
});
