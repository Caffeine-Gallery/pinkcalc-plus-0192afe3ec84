export const idlFactory = ({ IDL }) => {
  const Operation = IDL.Variant({
    'add' : IDL.Null,
    'multiply' : IDL.Null,
    'divide' : IDL.Null,
    'subtract' : IDL.Null,
  });
  const Calculation = IDL.Record({
    'result' : IDL.Float64,
    'operand1' : IDL.Float64,
    'operand2' : IDL.Float64,
    'operation' : Operation,
  });
  return IDL.Service({
    'calculate' : IDL.Func(
        [Operation, IDL.Float64, IDL.Float64],
        [IDL.Float64],
        [],
      ),
    'getHistory' : IDL.Func([], [IDL.Vec(Calculation)], ['query']),
    'getSavedResults' : IDL.Func([], [IDL.Vec(IDL.Float64)], ['query']),
    'saveResult' : IDL.Func([IDL.Float64], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
