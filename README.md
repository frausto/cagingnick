# AdaptedMind FrontEnd Coding Challenge

## Overview

The geniuses at AdaptedMind have come up with a certain game that will become the next billion-dollar business! It is called Caging Nicolas Cage. It is still in the early stages of development, and you have been tasked with adding some functionality and improvements to the game.

The project has been started, but the current codebase is very buggy, unorganized, and doesn't have all the requirements implemented. We need your help to make this fantastic game even better!
  
There are two screens you can navigate between: **Choose** and **Play**.

### Screen 1: Choose 
![Choose Screen](/public/choose.png?raw=true "Choose Screen")

**Choose:**
On the choose screen, you should be able to pick your favorite image of Nicolas Cage to use in the game.
The chosen Nick will have a green check mark next to the name so that you will know your currently selected Nick. The image of the chosen Nick will appear in the cage in the top area.

### Screen 2: Play 
![Play Screen](/public/play.png?raw=true "Play Screen")

**Play:**
The picture of Nick will appear at a random location within the bounding box.
Clicking Nick adds points to the point counter in the top area.
Clicking outside of Nick, but still within the bounding box, will remove 3 points.

Each Nick has its own set of points and should be remembered even if the page is refreshed after hooking it up to the backend.

### Requirements:

  - Points cannot be negative
  - Points are saved for each Nick
  
  **Choose Screen**
  - The Nick options should appear side by side. You can click to choose a Nick.
  - Clicking on a Nick should set your current Nick for the game.

  **Play Screen**
  - Clicking the Nick currently causes the app to crash, it should increase your points and change Nick's location.
  - The Nick's position should be random to start.
  - The bounding box should be 80% of the width of the screen with 10% padding on each side. The height should be such that the bottom border should always be 20px from the bottom of the screen no matter the screen size.
  - The position of Nick should be constrained to be inside the bounding box, and should be able to appear anywhere within it.
  - Each Nick should keep track of its own set of points.
  - Clicking in the bounding box, and not on Nick, reduces your points by 3.
  - This screen should not be scrollable

  **Animations**
  - In the game, whenever you click Nicolas Cage's picture, it moves to somewhere else on the screen. This movement should be animated; it lasts for 1 second and uses an "ease-in-out" style animation (slow start and end). When it reaches the end, it should sparkle using the sparkle.webm asset provided in the public folder.
  - In the game, whenever you click Nicolas Cage's picture, the star animation (star_fly.webm provided in the public folder) should play such that the star moves from Nicolas Cage's image into the cage in the top area. Only after this happens do we update the total point count.

## Result

### Example of Expected Result
--------------------------------
![](/public/final.gif "example of the final result")

### Example User Flow:

1. Alice (our example user) starts on the **Choose Screen** and she clicks on her favorite picture of Nicolas Cage.
   - A green checkmark appears next to her choice and disappears from any previous choice. 
   - The chosen picture appears in the cage in the top area.
2) Alice clicks "Play" to go to the **Play Screen**
   - The picture of the chosen Nick moves to a random location within the bounding box
3) Alice clicks on the Nick inside the bounding box
   - A star flys from the picture of Nick into the cage in the top area
   - The picture of Nick moves to a new location inside the bounding box
   - The picture sparkles when it reaches its new location
   - The specified number of points are added to Alice's total score up top
4) Alice clicks inside the bounding box but misses the picture of Nick
   - 3 points are removed to Alice's total score up top
5) Alice goes back to the **Choose Screen** and chooses a different Nick
   - A New point total of zero gets shown
6) Alice goes to the **Play Screen** and plays the game
   - A new score is tallied up top
7) Alice goes back to the **Choose Screen** and chooses the first Nick
   - Her score from before is saved and she can continue playing

## Your Task

### Part 1:
Implement the requirements and fix the bugs! The current implementation is missing some functionality and has a few bugs. Please fix them.

### Part 2:
Make it look amazing with animations!

### Part 3:
Hook it up to the backend! We have provided a Firebase API for you to save your Nick scores. 

To get the array of nick scores you can use to initialize the data:
```
GET https://cagingnick-default-rtdb.firebaseio.com/cage/yourname.json
```

To update the data array with whatever data you want to save and track:
```
PUT https://cagingnick-default-rtdb.firebaseio.com/cage/yourname.json 

[
    {
        "id": 1,
        "image": "nick1.png",
        "name": "normal nick",
        "points": 10
    },
    {
        "id": 2,
        "image": "nick2.png",
        "name": "cool nick",
        "points": 7
    },
    {
        "id": 3,
        "image": "nick3.jpg",
        "name": "crazy nick",
        "points": 8
    }
]
```
Create the api connection and use it to save and track your score! Also add a button on the choose nick screen that resets all scores.

### Bonus:
Not required, but this extra functionality will effectively take this game from $1billion to $1trillion

1) Make the cage move within the top area. Have the cage continuously be moving around the top portion of the screen and make sure that the star animation still flies into the cage even as it moves.

### Final Note:
You can add libraries, reorganize the code, and otherwise have free reign to make any changes you want in the course of implementing your solution. Make a note of your choices as you go and have fun!

For example, at AdaptedMind we use several libraries to help with animations. For example:
-  https://github.com/framer/motion
-  https://reactcommunity.org/react-transition-group/

### Development
We use yarn for package management.

`yarn install`
`yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.\
You will also see any lint errors in the console.
