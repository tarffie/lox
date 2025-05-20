/** 
  * Class which will operate error handling for jslox
  * constructor receive 2 parameters which are used to run #report
  * @param {number} line
  * @param {string} message
  */
class LoxError extends Error {
  constructor(line: number, message: string) {
    super(message)
    this.report(line, "", message)
  }

  private report(line: number, where: string, message: string) {
    console.error("[line " + line + "] Error" + where + ": " + message)
  }
}

export { LoxError }
