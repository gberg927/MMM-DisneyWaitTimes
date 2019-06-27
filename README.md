# MMM-DisneyWaitTimes
Disney World Wait Times for Magic Mirror

![alt text](https://github.com/gberg927/MMM-DisneyWaitTimes/blob/master/wait-times-demo.png)

## Dependencies
  * An installation of [MagicMirror<sup>2</sup>](https://github.com/MichMich/MagicMirror)
  * The [Themeparks API](https://github.com/cubehouse/themeparks)
  
## Installation
 1. Clone this repo into your `modules` directory.
 2. Execute `npm install` in this module's directory.
 3. Configure your `config.js` file.
 
## Config
| **Option** | **Description** |
| --- | --- |
| `park`     | An array of Parks that the wait times will be retrieved for.


The `feeds` property contains an array with multiple objects. These objects have the following properties:

| Option     | Description
| ---------- | -----------
| `name`     | The name of the Park that will be used to retrieve wait times.
| `ride`     | An array of the rides you would like to display the wait times for. This is a string representation of the ride name.
| `logRide`  | A boolean value that controls whether or not all ride objects will be logged for this park. Used for debugging purposes mainly.

Here is an example of an entry in `config.js`
```
{
    module: "MMM-DisneyWaitTimes",
    header: "Magic Kingdom",
    position: "top_left",
    config: {
            park: {
                    name: "Magic Kingdom",
                    rides: [
                            'Big Thunder Mountain Railroad',
                            'Buzz Lightyear\'s Space Ranger Spin',
                            '"it\'s a small world"',
                            'Jungle Cruise',
                            'Peter Pan\'s Flight',
                            'Pirates of the Caribbean',
                            'Space Mountain',
                            'Splash Mountain',
                            'Haunted Mansion',
                            'The Many Adventures of Winnie the Pooh',
                            'Tomorrowland Speedway',
                            'Under the Sea - Journey of The Little Mermaid',
                            'Seven Dwarfs Mine Train ',
                    ]
                    ,logRide: false
            }
    }
},
```
