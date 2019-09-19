export function isRefRefObject<T>(ref: React.Ref<T>): ref is React.RefObject<T> {
  return ref !== null && "current" in ref
}
