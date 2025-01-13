export function getFieldName<T, K extends keyof T = keyof T>(name: K): K {
  return name;
}
