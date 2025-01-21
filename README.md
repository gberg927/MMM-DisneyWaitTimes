# MMM-DisneyWaitTimes

Disney World Wait Times for Magic Mirror

![alt text](https://github.com/gberg927/MMM-DisneyWaitTimes/blob/master/wait-times-demo.png)

## Dependencies

- An installation of [MagicMirror<sup>2</sup>](https://github.com/MichMich/MagicMirror)
- The [Themeparks API](https://github.com/cubehouse/themeparks)

## Installation

1. Install MMM-DisneyWaitTimes Module

```javascript
cd ~MagicMirror/modules/
git clone git@github.com:gberg927/MMM-DisneyWaitTimes.git
cd MMM-DisneyWaitTimes
npm install
```

2. Add module to ~MagicMirror/config/config.js

## Config

| **Option** | **Description**                                     |
| ---------- | --------------------------------------------------- |
| `park`     | The park that the wait times will be retrieved for. |

| Option | Description                                                                                                           |
| ------ | --------------------------------------------------------------------------------------------------------------------- |
| `name` | The name of the Park that will be used to retrieve wait times.                                                        |
| `ride` | An array of the rides you would like to display the wait times for. This is a string representation of the ride name. |

Here is an example for Magic Kingdom - Disney World configuration in `config.js`

```
  {
    module: "MMM-DisneyWaitTimes",
    header: "Magic Kingdom - Walt Disney World",
    position: "top_left",
    config: {
      park: {
        name: "Magic Kingdom - Walt Disney World",
        rides: [
          "Astro Orbiter",
          "Big Thunder Mountain Railroad",
          "Buzz Lightyear's Space Ranger Spin",
          "Country Bear Musical Jamboree",
          "Dumbo the Flying Elephant",
          "Enchanted Tales with Belle",
          "Haunted Mansion",
          "it's a small world",
          "Jungle Cruise",
          "Liberty Square Riverboat",
          "Mad Tea Party",
          "Main Street Vehicles",
          "Mickey's PhilharMagic",
          "Monsters Inc. Laugh Floor",
          "Peter Pan's Flight",
          "Pirates of the Caribbean",
          "Prince Charming Regal Carrousel",
          "Seven Dwarfs Mine Train",
          "Space Mountain",
          "Swiss Family Treehouse",
          "The Barnstormer",
          "The Hall of Presidents",
          "The Magic Carpets of Aladdin",
          "The Many Adventures of Winnie the Pooh",
          "Tiana's Bayou Adventure",
          "Tom Sawyer Island",
          "Tomorrowland Speedway",
          "Tomorrowland Transit Authority PeopleMover",
          "TRON Lightcycle / Run",
          "Under the Sea - Journey of The Little Mermaid",
          "Walt Disney World Railroad - Fantasyland",
          "Walt Disney World Railroad - Frontierland",
          "Walt Disney World Railroad - Main Street, U.S.A.",
          "Walt Disney's Carousel of Progress",
          "Walt Disney's Enchanted Tiki Room"
        ]
      }
    }
  }
```

More resort/park examples can be found in the [examples directory](https://github.com/gberg927/MMM-DisneyWaitTimes/tree/master/examples).
