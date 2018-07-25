# hive-mind
This is a game written in JavaScript. It is built around the
immense strategic challenges that bees go through every day in order to
create a stable hive environment. Hopefully it will educate players on the
amazing life of bees, and also gives significant strategic challenge and
satisfaction.

It is coded with vanilla JavaScript, and uses Jest for testing.

### To run
After cloning, either run `index.html` in a browser without stringent
security requirements (e.g. Firefox), or install npm and run
`npm run start` and enter the specified localhost in your browser's search
bar.

### Gameplay

Since the eventual goal is to recruit a lot of bees, individual control over each bee would be laborious, and make the game difficult to the point of absurdity. Instead, the player will have control at a higher level, assigning positions to bees and tasks to be completed by the hive.

Each hive will act as a handle for all the bees that live there. Through entering the hive you can change their roles, plan construction on the hive, and observe the resources available to the hive.

The game will start as a swarm of unassigned bees along with a new queen. The world will be foggy and mysterious. The first steps will be assigning roles to the bees, scouting for a safe nesting spot (a hive that chooses a bad location shouldn't last long, ideally), sending the queen to a drone mating location, and starting construction on a new hive. Just a few cells will be enough to make a new batch of brood. This must be done quickly because the current bee population will starve and die eventually.

Bee positions include:

**Queen:** Obviously the hive needs a queen. The player will have the ability to specify how many eggs to lay and what proportion of them will be workers (female) and drones (male).

**Drone:** Drones only have one role in life: to mate with the queen. More accurately, the mate with *a* queen. They go to drone locations, sometimes miles from the hive, and wait around for virgin queens. At the end of the day, they go back to a have, not necessarily their own. They are tolerated in most hives, except, that is, when the weather gets cold or the food gets scarce. In the case of the former, the workers throw them out into the cold. In the case of the latter they also cannibalize the baby drones.

**Scout:** Without scouting, the hive is blind. At the start of the game, the world will be a blank slate. The player must specify where  the bees should scout in order to gain information about the outside world. Additionally, the information on the players map may be unreliable, and constant scouting is needed to ensure that the map stay up-to-date with reality.

**Forager:** Foragers collect nectar, pollen, water, and plant resin for the hive to use and refine.

**Refiner:** Refiners turn raw materials into honey, wax, bee bread, royal jelly, and propolis so that they can be used by the hive.

**Builder:** Builders take wax and propolis and use it to build honeycomb.

**Nurse:** Nurse bees take care of the just hatched bees. They feed them bee bread and cap them inside a cell to pupate.

**Groomer:** Groomer bees pick harmful mites out of bee hair and ensure that they don't destroy the hive. They can also screen bees that are covered in pesticides.

Surroundings:

Trees,
flowers,
Monocultures that slowly spread and destroy flowers...

#### Broad Strokes Gameplay:
* Recruit a horde of bees
* Use them to harvest nectar and pollen from nearby flowers
* Recruit drones so your queen can mate
* Assign roles to different bees
* Repel invaders with your stingers
* Once you have enough hive members, split your hive and spread your population

### Core minimum functionality goals
* [ ] Player has resources that are depleted by bee population and is able to use them to make purchases
* [ ] Player can use the resources they have to gain more resources in the future
* [ ] The game includes hives, bees, and flowers
* [ ] Bees can harvest resources from flowers and bring them to the hive
* [ ] There are obstacles that the player can surmount through using resources and making trade-offs

### Ideas for future development:
* Create ants, bears, mice, and other invaders
* Create a broader map and universe to explore along with a
mini-map representation.
* Include flowers that need to be tended and harvested for honey
* Reward the player for helping the flowers and have the flowers reproduce
* Manage resources and create a huge bee colony
* Add obstacles later in the game, such as pesticides
* Add elements that raise awareness of the modern issues that keep killing off
bee colonies.
* Control the beehive's temperature using workers to fan the hive
* Get all bees in a cluster for the winter, then see which hives survive
* Use an algorithm like [this one](https://en.wikipedia.org/wiki/Bees_algorithm)
for bees to find the appropriate flower stores. This would imply that the player
should recruit certain bees as scouts.
* Implement a 'hive view' to micro manage specific hive functions
* Have hive menu that's composed of hexagons where you can assign bees to certain activities

### Nitty-gritty checklist
* [x] Menu of possible objects to place
* [x] A resources bar on the menu that measures honey/pollen/water/resin supply
* [x] The ability to move a bee towards a destination
* [x]A cost to each recruit/item
* [x]A starting (randomly generated?) map of flowers read from a
JSON file.
* Added functionality for bees and the ability to sync with their hive
e.g. `bees.goHome` should send the hive where they were created
* A sign of which object you've chosen and a translucent version that hovers
around the mouse, and a signifier
* Rotate bee sprites so that they are facing in their direction of travel
* Implement drag and drop listener (or think of different game mechanic for
  selecting multiple bees).
