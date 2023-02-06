declare module "himalaya" {
  export function parse(str: string, options?: any): Array<AnyElement>;

  export type Type = "element" | "comment" | "text";

  export interface Node {
    type: Type;
  }

  export interface Attribute {
    key: string;
    value: string | null;
  }

  export interface Element extends Node {
    type: "element";
    tagName: string;
    children: AnyElement[];
    attributes: Attribute[];
  }

  export interface Comment extends Node {
    type: "comment";
    content: string;
  }

  export interface Text extends Node {
    type: "text";
    content: string;
  }

  export type AnyElement = Element | Comment | Text;
}
