import Error "mo:base/Error";
import Result "mo:base/Result";

import Float "mo:base/Float";
import Array "mo:base/Array";
import Text "mo:base/Text";
import Nat "mo:base/Nat";

actor Calculator {
  type Operation = {
    #add;
    #subtract;
    #multiply;
    #divide;
  };

  type Calculation = {
    operation: Operation;
    operand1: Float;
    operand2: Float;
    result: Float;
  };

  stable var history : [Calculation] = [];
  stable var savedResults : [Float] = [];

  public func calculate(op: Operation, x: Float, y: Float) : async Float {
    var result : Float = 0;
    
    switch (op) {
      case (#add) { result := x + y; };
      case (#subtract) { result := x - y; };
      case (#multiply) { result := x * y; };
      case (#divide) {
        if (y == 0) {
          throw Error.reject("Division by zero");
        };
        result := x / y;
      };
    };

    let calculation : Calculation = {
      operation = op;
      operand1 = x;
      operand2 = y;
      result = result;
    };

    history := Array.append(history, [calculation]);
    
    result
  };

  public query func getHistory() : async [Calculation] {
    history
  };

  public func saveResult(result: Float) : async () {
    savedResults := Array.append(savedResults, [result]);
  };

  public query func getSavedResults() : async [Float] {
    savedResults
  };
}
