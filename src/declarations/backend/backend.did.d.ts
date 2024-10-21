import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Calculation {
  'result' : number,
  'operand1' : number,
  'operand2' : number,
  'operation' : Operation,
}
export type Operation = { 'add' : null } |
  { 'multiply' : null } |
  { 'divide' : null } |
  { 'subtract' : null };
export interface _SERVICE {
  'calculate' : ActorMethod<[Operation, number, number], number>,
  'getHistory' : ActorMethod<[], Array<Calculation>>,
  'getSavedResults' : ActorMethod<[], Array<number>>,
  'saveResult' : ActorMethod<[number], undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
