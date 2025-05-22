import { Token } from "../token";
export abstract class Expr {}
export class Binary extends Expr {
  constructor(public readonly left : Expr, public readonly operator : Token, public readonly right : Expr) {
    super();
  }
}
export class Grouping extends Expr {
  constructor(public readonly expression : Expr) {
    super();
  }
}
export class Literal extends Expr {
  constructor(public readonly value : any) {
    super();
  }
}
export class Unary extends Expr {
  constructor(public readonly operator : Token, public readonly right : Expr) {
    super();
  }
}
