const NodeHelper = require("node_helper");
const axios = require("axios");
const { DateTime } = require("luxon");
const parks = require("./parks.json");

module.exports = NodeHelper.create({
  start: function () {
    console.log(`Starting module helper: ${this.name}`);
  },

  getWaitTimes: function (park) {
    const sendError = (msg) => {
      console.log(`Error Processing Wait Times: ${msg}`);
      var payload = {
        errorMessage: msg
      };

      this.sendSocketNotification(
        `ERROR_${park.name.replace(/ /g, "_")}`,
        payload
      );
    };

    const getPark = () => {
      const selectedPark = parks.find((p) => p.name === park.name);
      const selectedRides = park.rides.map((r) => {
        return {
          id: selectedPark.rides.find((r2) => r2.name === r)?.id || null,
          name: r
        };
      });

      return {
        ...selectedPark,
        rides: selectedRides
      };
    };

    const processWaitTimes = async (selectedPark) => {
      console.log(`${selectedPark.name}: Processing Wait Times...`);
      const waitTimes = await axios.get(
        `https://api.themeparks.wiki/preview/parks/${selectedPark.id}/waittime`
      );

      const results = [];
      for (const ride of selectedPark.rides) {
        const waitTime = waitTimes.data.find(
          (waitTime) => waitTime.id === ride.id
        );
        const result = {
          name: ride.name,
          status: waitTime?.status || null,
          waitTime: waitTime?.waitTime || null
        };
        results.push(result);
      }
      results.sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      );
      const payload = { waitTimes: results };
      console.log(`${selectedPark.name}: Processed Wait Times...`);

      this.sendSocketNotification(
        `POPULATE_WAIT_TIMES_${selectedPark.name}`,
        payload
      );
    };

    const processOpeningTimes = async (selectedPark) => {
      console.log(`${selectedPark.name}: Processing Opening Times...`);
      const openingTimes = await axios.get(
        `https://api.themeparks.wiki/preview/parks/${selectedPark.id}/calendar`
      );

      if (!openingTimes.data || !openingTimes.data.length) {
        return;
      }

      const today = DateTime.now()
        .setZone(selectedPark.timezone)
        .startOf("day");

      const todayOpeningTime = openingTimes.data.find((openingTime) =>
        DateTime.fromISO(openingTime.date)
          .setZone(selectedPark.timezone)
          .startOf("day")
          .equals(today)
      );

      const openingTime = DateTime.fromISO(todayOpeningTime.openingTime)
        .setZone(selectedPark.timezone)
        .toFormat("hh:mm a");
      const closingTime = DateTime.fromISO(todayOpeningTime.closingTime)
        .setZone(selectedPark.timezone)
        .toFormat("hh:mm a");

      const payload = { openingTime, closingTime };
      console.log(`${selectedPark.name}: Processed Opening Times...`);

      this.sendSocketNotification(
        `POPULATE_OPENING_TIMES_${selectedPark.name}`,
        payload
      );
    };

    const selectedPark = getPark();
    if (!selectedPark) {
      sendError("Selected park not found");
      return;
    }

    processWaitTimes(selectedPark);
    processOpeningTimes(selectedPark);
  },

  socketNotificationReceived: function (notification, payload) {
    if (notification === "GET_WAIT_TIMES") {
      this.getWaitTimes(payload);
    }
  }
});
