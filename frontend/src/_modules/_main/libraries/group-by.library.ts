/**
 * Função Group By
 * 
 * @param array 
 * @param predicate 
 * @returns 
 */
export const groupBy = <T>(array: T[], predicate: (value: T, index: number, array: T[]) => string) =>
array.reduce((acc, value, index, array) => {
  (acc[predicate(value, index, array)] ||= []).push(value);
  return acc;
}, {} as { [key: string]: T[] });

/**
 * Função Group By with Map
 * 
 * @param array 
 * @param predicate 
 * @returns 
 */
export const groupByToMap = <T, Q>(array: T[], predicate: (value: T, index: number, array: T[]) => Q) =>
array.reduce((map, value, index, array) => {
  const key = predicate(value, index, array);
  map.get(key)?.push(value) ?? map.set(key, [value]);
  return map;
}, new Map<Q, T[]>());  
