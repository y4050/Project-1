  * Title & Blurb
    Tamagachi
    To see it grow and evovle as you play the game.
  
  * Motivation
    Used to play this game when I was a kid, so I want to see if I could biuld one with the skills I have to make it similar to the ones I've played. And in the process, to learn how hard it is to create a game like that.
  
  * User Stories & Wireframes
  ![wireframe 1](./assets/project1_wireframe1.png)
  * Using DOM and CSS to switch the img for pet to create animation effect, such as moving the img location in the container to make it look like the pet is moving. Or switching imgs for pet when the feed button is click.

  * Basic - 
    The webpage will display a background, with a section at the top for displaying the status of the pet.
    Actions will be availabe to user as buttons on the bottom of the page.
    The pet will be moving around the container by placing the img in different index of the div in the container array. Location should depend on time, with time set using setInterval.
  
  * Feed - 
    When user click feed, the Hungriness meter will be reduced by a set amount of value.
    The pet img will change to a different set of imgs, to look like it is eating. Probably with 2 imgs, one open mouth and one close, toggle between the imgs for a few second using timer with setInterval.

  * Train - 
   Same concept with feed function, but will increase both the Growth and Hungriness

  * Hungriness - 
    Hungriness will increase over time, using setInterval. When Hungriness reaches 100%, the pet will die and will log game over.

  * Growth - 
    Growth will increase by using the Train function. When it reaches 100%, change to a different set of pet imgs, to indicate the pet has evovled. And reset the Train value to 0. Will probably only include one evolution, when Growth reaches its second 100%, log "You won"