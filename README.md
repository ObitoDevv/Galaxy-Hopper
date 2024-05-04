# Galaxy Hopper 

Created with Cocos Creator 3.3.0, following the [Quick-Start first game Tutorial] [(Click Here)](https://docs.cocos.com/creator/manual/en/getting-started/first-game/)


# Galaxy Hopper Features:

## 1.Player Movement and Jumping:

  -The Player class handles player movement and jumping.
  
  -The player can move left (A key) or right (D key).
  
  -Jumping is triggered by pressing the W key.
  
  -The player character jumps with a specified height and duration.
  
  -The player’s speed is controlled by acceleration and maximum move speed.
  
## 2.Game Logic and Scoring:

  -The Game class manages game logic.  
  
  -Coins are spawned at random positions.
  
  -The player collects stars by getting close to them.
  
  -The game keeps track of the player’s score.
  
  -The game ends if the player fails to collect coins within a certain time.
  
## 3.Coin Collection:
  -The Coin class represents collectible stars.
  
  -Coins have a pick-up radius.
  
  -When the player gets close enough to a star, it triggers collection.
  
  -Collected stars play a sound effect, increase the score, and are destroyed.
  
## 4.Audio Effects:

  -The game includes audio effects for jumping and star collection.
## 5.Scene Management:

  -The game scene transitions to a “game over” state when the player is out of the scene. 
  
  -The player node becomes inactive, and the scene reloads.
  
## 6.Random Coin Spawning:

  -Coin spawn at random positions within specified bounds.
  
  -The duration between star spawns varies randomly.

  ![Screenshot (69)](https://github.com/ObitoDevv/Obito-game-master/assets/57661791/5bbefa50-6387-4015-985d-2142cce20e00) 



 ![Screenshot (73)](https://github.com/ObitoDevv/Obito-game-master/assets/57661791/ed28555c-4324-49c5-9643-970f27944763)

