import { TokenType } from "./utils/tokenType";

/**
 * Creates an immutable token object with type, lexeme, literal value, and line number
 * @typedef {Object} Token
 * @property {TokenType} type - The token type from TokenType enum
 * @property {string} lexeme - The string representation of the token
 * @property {*} literal - The literal value (number, string, boolean, etc.)
 * @property {number} line - The source line where the token appears
 * @property {function(): string} toString - Returns string representation of the token
 */

type Token = { 
    type: TokenType | string,
    lexeme: string;
    literal: number | string | undefined | null;
    line: number;
    toString: () => string;
}

/**
 * Token factory function
 * @param {TokenType} type - The token type
 * @param {string} lexeme - The lexeme string
 * @param {*} literal - The literal value
 * @param {number} line - The source line number
 * @returns {Token} An immutable token object
 */
function createToken(type: TokenType, lexeme:string, literal: number | string | undefined | null, line: number): Token {
  return {
    type: TokenType[type],
    lexeme: lexeme,
    literal: literal,
    line: line,
    toString: function () {
      return `${this.type} ${this.lexeme} ${this.literal}`;
    },
  } as const;
}

export { Token, createToken };
