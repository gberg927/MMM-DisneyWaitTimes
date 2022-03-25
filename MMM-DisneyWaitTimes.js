Module.register("MMM-DisneyWaitTimes", {
  defaults: {
    updateInterval: 10 * 60 * 1000
  },

  getScripts: function () {
    return ["moment.js"];
  },

  getStyles: function () {
    return ["disney.css"];
  },

  getHeader: function () {
    var headerDiv = document.createElement("div");
    headerDiv.innerHTML = this.data.header;

    var timeSpan = document.createElement("span");
    timeSpan.className = "parkTime";

    if (this.openingTime != null && this.closingTime != null) {
      timeSpan.innerHTML = " " + this.openingTime + " - " + this.closingTime;
    }

    headerDiv.appendChild(timeSpan);

    return headerDiv.innerHTML;
  },

  start: function () {
    Log.info("Starting module: " + this.name);

    this.rides = [];
    this.openingTime;
    this.closingTime;
    this.errorMessage;

    setInterval(function () {
      this.processWaitTimes();
    }, this.config.updateInterval);
    this.processWaitTimes();
  },

  getDom: function () {
    var table = document.createElement("table");
    table.className = "small";
    if (this.errorMessage) {
      var row = document.createElement("tr");
      row.className += "row";
      table.appendChild(row);

      var nameCell = document.createElement("td");
      nameCell.className = "error";
      nameCell.innerHTML = this.errorMessage;
      row.appendChild(nameCell);
    } else {
      for (var i = 0, ride; (ride = this.rides[i++]); ) {
        var row = document.createElement("tr");
        row.className += "row";
        table.appendChild(row);

        var nameCell = document.createElement("td");
        nameCell.className = "bright title";
        nameCell.innerHTML = ride.name;
        row.appendChild(nameCell);

        var timeCell = document.createElement("td");
        timeCell.className = "bright title light time";

        if (ride.status == "Closed") {
          timeCell.innerHTML = "closed";
        } else if (ride.status == "Down") {
          timeCell.innerHTML = "down";
        } else if (ride.status == "Refurbishment") {
          timeCell.innerHTML = "refurb";
        } else {
          timeCell.innerHTML = ride.waitTime;
        }

        row.appendChild(timeCell);
      }
    }
    return table;
  },

  socketNotificationReceived: function (notification, payload) {
    console.log("n: " + notification)
    if (notification === "POPULATE_WAIT_TIMES_" + this.config.park.name) {
      this.rides = payload.waitTimes;
      this.updateDom();
    } else if (
      notification ===
      "POPULATE_OPENING_TIMES_" + this.config.park.name
    ) {
      this.openingTime = payload.openingTime;
      this.closingTime = payload.closingTime;
      this.updateDom();
    } else if (notification === "ERROR_" + this.config.park.name) {
      this.errorMessage = payload.errorMessage;
      this.updateDom();
    }
  },

  processWaitTimes: function () {
    this.sendSocketNotification("GET_WAIT_TIMES", this.config.park);
  }
});
