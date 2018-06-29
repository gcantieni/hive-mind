# hive-mind
This is a game written in JavaScript. It is built around the
immense strategic challenges that bees go through every day in order to
create a stable hive environment. Hopefully it will educate players on the
amazing life of bees, and also gives significant strategic challenge and
satisfaction.

### To run
After cloning, either run `index.html` in a browser without stringent
security requirements (e.g. Firefox), or install npm and run
`npm run start` and enter the specified localhost in your browser's search
bar.

### Gameplay
* Recruit a horde of bees
* Use them to harvest nectar and pollen from nearby flowers
* Recruit drones to mate with your queen
* Assign roles to different bees
* Repel invaders with your stingers
* Once you have enough hive members, split your hive to increase your chances
of survival


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

### Nitty-gritty checklist
* ~~Menu of possible objects to place~~
* A sign of which object you've chosen and a translucent version that hovers
around the mouse
* A starting (randomly generated?) map of flowers read from a
JSON file.
* ~~A resources bar on the menu that measures honey/pollen/water/resin supply~~
* The ability to move a bee towards a destination
* A cost to each recruit/item
