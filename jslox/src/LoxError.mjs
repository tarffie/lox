/** 
  * Class which will operate error handling for jslox
  * constructor receive 2 parameters which are used to run #report
  * @param {number} line
  * @param {string} message
  */
class LoxError extends Error {
  constructor(line, message) {
    super(line, message)
    this.#report(line, "", message)
  }

  #report(line, where, message) {
    console.error("[line " + line + "] Error" + where + ": " + message)
  }
}

export { LoxError }
