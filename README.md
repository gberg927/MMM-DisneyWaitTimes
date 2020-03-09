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
npm run rebuild
```

2. Add module to ~MagicMirror/config/config.js

## Config

| **Option** | **Description**                                              |
| ---------- | ------------------------------------------------------------ |
| `park`     | An array of Parks that the wait times will be retrieved for. |

The `feeds` property contains an array with multiple objects. These objects have the following properties:

| Option    | Description                                                                                                                     |
| --------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `name`    | The name of the Park that will be used to retrieve wait times.                                                                  |
| `ride`    | An array of the rides you would like to display the wait times for. This is a string representation of the ride name.           |
| `logRide` | A boolean value that controls whether or not all ride objects will be logged for this park. Used for debugging purposes mainly. |

Here is an example for Magic Kingdom - Disney World configuration in `config.js`

```
  {
    module: "MMM-DisneyWaitTimes",
    header: "Magic Kingdom",
    position: "top_left",
    config: {
      park: {
        name: "Magic Kingdom",
        rides: [
          "Big Thunder Mountain Railroad",
          "Buzz Lightyear's Space Ranger Spin",
          "\"it's a small world\"",
          "Jungle Cruise",
          "Peter Pan's Flight",
          "Pirates of the Caribbean",
          "Space Mountain",
          "Splash Mountain",
          "Haunted Mansion",
          "The Many Adventures of Winnie the Pooh",
          "Tomorrowland Speedway",
          "Under the Sea - Journey of The Little Mermaid",
          "Seven Dwarfs Mine Train "
        ],
        logRide: false
      }
    }
  }
```

Magic Kingdom - Disneyland Paris full configuration in `config.js`

```
  {
    module: "MMM-DisneyWaitTimes",
    header: "Magic Kingdom - Disneyland Paris",
    position: "top_left",
    config: {
      park: {
        name: "Magic Kingdom - Disneyland Paris",
        rides: [
          "'it's a small world'",
          "Adventure Isle",
          "Alice's Curious Labyrinth",
          "Autopia®",
          "Big Thunder Mountain",
          "Blanche-Neige et les Sept Nains®",
          "Buzz Lightyear Laser Blast",
          "Casey Jr. – le Petit Train du Cirque",
          "Disneyland Railroad",
          "Disneyland Railroad Discoveryland Station",
          "Disneyland Railroad Fantasyland Station",
          "Disneyland Railroad Frontierland Depot",
          "Disneyland Railroad Main Street Station",
          "Dumbo the Flying Elephant",
          "Frontierland Playground",
          "Indiana Jones™ and the Temple of Peril",
          "La Cabane des Robinson",
          "La Galerie de la Belle au Bois Dormant",
          "La Tanière du Dragon",
          "Le Carrousel de Lancelot ",
          "Le Passage Enchanté d'Aladdin",
          "Le Pays des Contes de Fées",
          "Les Mystères du Nautilus",
          "Les Voyages de Pinocchio",
          "Mad Hatter's Tea Cups",
          "Main Street Vehicles",
          "Meet Mickey Mouse",
          "Mickey’s PhilharMagic",
          "Orbitron®",
          "Peter Pan's Flight",
          "Phantom Manor",
          "Pirate Galleon",
          "Pirates of the Caribbean",
          "Pirates' Beach",
          "Princess Pavilion",
          "Rustler Roundup Shootin' Gallery",
          "Star Tours: The Adventures Continue*",
          "Star Wars Hyperspace Mountain",
          "Thunder Mesa Riverboat Landing",
          "Welcome to Starport: A Star Wars Encounter"
        ],
        logRide: false
      }
    }
  }
```

Walt Disney Studios - Disneyland Paris full configuration in `config.js`

```
  {
    module: "MMM-DisneyWaitTimes",
    header: "Walt Disney Studios - Disneyland Paris",
    position: "top_left",
    config: {
      park: {
        name: "Walt Disney Studios - Disneyland Paris",
        rides: [
          "Cars Quatre Roues Rallye",
          "Crush's Coaster®",
          "Les Tapis Volants - Flying Carpets Over Agrabah®",
          "RC Racer",
          "Ratatouille: The Adventure",
          "Slinky® Dog Zigzag Spin",
          "Studio Tram Tour®: Behind the Magic",
          "The Twilight Zone Tower of Terror – A new Dimension of Chills",
          "Toy Soldiers Parachute Drop"
        ],
        logRide: false
      }
    }
  }
```
