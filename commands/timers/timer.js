module.exports = class Timer {
  constructor(waitTime, userMessage, userInfoEmbed, Discord, Users){
    this.waitTime = waitTime; // Miliseconds
    this.userInfoEmbed = userInfoEmbed;
    this.userMessage = userMessage; // The most rececnt message sent by a user
    this.Discord = Discord;
    this.Users = Users; // DB Connection
  }

  /*
   *
   * Methods that provide support to query into
   * the Sequelize DB
   * 
   */

  async findUser(){
    /*
     * Description: Finds a user in the DB.
     * Parameter(s): userToFind (Model)
     * 
     * Return: First Instance of userToFind (Model) if exists,
     *         null otherwise 
     * 
     */
    return (await this.Users.findOne({
      where: {
        userid: this.userMessage.author.id
      }
    }));
  }

  async addUser(){
    /*
     * Description: Adds a user into the DB
     * Parameter(s): userToAdd (Model)
     * 
     * Return: Model (refer to Sequelize API)
     * 
     */
    if (this.findUser() != null){
      return;
    }
    try {
      return (await this.Users.create({
        userid: this.userMessage.author.id,
      }));
    } catch (error){
      console.error(error);
    }
  }

  async getUserMins(){
    /*
     * Description: Gets the number of minutes from a user
     * Parameter(s): user
     * 
     * Return: Minutes (Miliseconds)
     * 
     */
    return (await this.Users.findOne({
      where: {
        userid: this.userMessage.author.id
      }
    })).minutes;
  }

  async addMins(){
    /*
     * Description: Updates/Adds the minutes of users associated
     *              with the timer
     * Parameter(s): None, uses the Users database
     * 
     * Return: No Return Value
     * 
     */
    const currentUser = (await this.findUser());
    try {
      await (this.Users.update({ minutes: currentUser.minutes + (this.waitTime / 1000) }, {
        where: {
          userid: currentUser.userid,
        }
      }))
    } catch (err){
      console.error(err);
    }
  }

  /*
   *
   * Timer-Related Methods
   * 
   */ 

  async start (){
    /*
     * Description: Starts a timer for the specified user and waitTime
     * Parameter(s): none, uses the waitTime, userInfoEmbed, and userMessage to
     *               properly simulate a timer
     * 
     * Return: No Return Value
     * 
     */

    // Adds the user to the database if they aren't already in it
    await this.addUser();
    await this.addMins();

    // Add their total number of minutes studied to the embed message
    this.userInfoEmbed.addFields({name: 'Total Time Studied', value: `${await this.getUserMins()} seconds`, inline: true});

    // Begin the timer
    this.userMessage.channel.send(`Starting ${this.waitTime / 1000}s Pomodoro Timer...`);
    setTimeout(() => {
      this.userMessage.channel.send(this.userInfoEmbed);
      return this.userMessage.channel.send(`Timer has been finished ${this.userMessage.author}. Good work!`)
    }, this.waitTime);
  }


  /*
   *
   * Mandatory/Important Features
   * 
   */ 

  // TODO: Break implementation, leave chaining for later
   
  /*
   *
   * Possible Implementations
   * 
   */ 

  // TODO: Potential room for a possible check time method, allowing the user to
  // check how much time left they have of their timer


  // TODO: Possibility for chaining study sessions, e.g 2 study sessions of 30 minutes
  // gives the user a special notification or something, changing their total
  // time studied for the session to be 1 hour instead of 30 minutes constantly.
  // However, it should still ping them that their timer is over and that their
  // short break is beginning



  

  //   // // // Rest Timer start    
  //   // switch(this.time) {
  //   // case 3000:
  //   // setTimeout(() => {
  //   //     this.message.channel.send(`Rest has started, I'll ping you in 3 seconds!`);
  //   //     setTimeout(() => {
  //   //         this.message.channel.send(`${this.message.author} Rest is over, send another command to continue the train!`);
  //   //     }, this.time);
  //   // }, this.time);
  //   // break;
  //   // case 30000:
  //   //   setTimeout(() => {
  //   //     this.message.channel.send(`Rest has started, I'll ping you in 10 mins!`);
  //   //     setTimeout(() => {
  //   //         this.message.channel.send(`${this.message.author} Rest is over, send another command to continue the train!`);
  //   //     }, 600000);
  //   // }, this.time);
  //   // break;
  //   // }

  // }
}

