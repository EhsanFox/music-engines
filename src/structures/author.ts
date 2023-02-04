import { AuthorBase } from "../types";

export class Author implements AuthorBase {
  constructor(
    readonly name: string,
    readonly id: string,
    readonly url: string
  ) {}
}
