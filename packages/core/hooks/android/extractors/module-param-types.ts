import { RNJavaSerialisableType } from '../common';

export function extractMethodParamTypes(
  javaType: string
): RNJavaSerialisableType {
  // Splitting before the generic should be redundant (we erased them earlier),
  // but just in case the implementation changes in future.
  const splitBeforeGeneric = javaType.split('<')[0];

  if (splitBeforeGeneric.includes('@NonNull String')) {
    return RNJavaSerialisableType.nonnullString;
  }
  if (splitBeforeGeneric.includes('String')) {
    return RNJavaSerialisableType.string;
  }
  if (splitBeforeGeneric.includes('Integer')) {
    return RNJavaSerialisableType.int;
  }
  if (splitBeforeGeneric.includes('int')) {
    return RNJavaSerialisableType.nonnullInt;
  }
  if (splitBeforeGeneric.includes('Boolean')) {
    return RNJavaSerialisableType.boolean;
  }
  if (splitBeforeGeneric.includes('boolean')) {
    return RNJavaSerialisableType.nonnullBoolean;
  }
  if (splitBeforeGeneric.includes('Double')) {
    return RNJavaSerialisableType.double;
  }
  if (splitBeforeGeneric.includes('double')) {
    return RNJavaSerialisableType.nonnullDouble;
  }
  if (splitBeforeGeneric.includes('Float')) {
    return RNJavaSerialisableType.float;
  }
  if (splitBeforeGeneric.includes('float')) {
    return RNJavaSerialisableType.nonnullFloat;
  }
  if (splitBeforeGeneric.includes('@NonNull ReadableMap')) {
    return RNJavaSerialisableType.nonnullObject;
  }
  if (splitBeforeGeneric.includes('ReadableMap')) {
    return RNJavaSerialisableType.object;
  }
  if (splitBeforeGeneric.includes('@NonNull ReadableArray')) {
    return RNJavaSerialisableType.nonnullArray;
  }
  if (splitBeforeGeneric.includes('ReadableArray')) {
    return RNJavaSerialisableType.array;
  }
  if (splitBeforeGeneric.includes('@NonNull Callback')) {
    return RNJavaSerialisableType.nonnullCallback;
  }
  if (splitBeforeGeneric.includes('Callback')) {
    return RNJavaSerialisableType.Callback;
  }
  if (splitBeforeGeneric.includes('Promise')) {
    return RNJavaSerialisableType.Promise;
  }
  if (splitBeforeGeneric.includes('void')) {
    return RNJavaSerialisableType.void;
  }

  return RNJavaSerialisableType.other;
}
