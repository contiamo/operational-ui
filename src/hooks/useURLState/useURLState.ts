import qs from "qs"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

/**
 * Create a state that is sync with url search param.
 *
 * @param name Name of your state
 * @param decoder Validate and decode the value from the url (you must return undefined if the value is not valid)
 * @param search Search string from the url
 * @param replaceState Replace state
 * @param getPathname Get the current location pathname
 * @param getHash Get the current location hash
 */
export const useURLState = <T>(
  name: string,
  initialValue: T,
  decoder: (urlParam?: any) => T | undefined,
  getSearchParams = () => qs.parse(window.location.search.replace("?", "")) || {},
  replaceState: History["replaceState"] = window.history.replaceState.bind(window.history),
  getPathname = () => window.location.pathname,
  getHash = () => window.location.hash,
): [T, Dispatch<SetStateAction<T>>] => {
  // Retrieve the value from the url search param
  const searchValue: any = getSearchParams()[name]

  // Check if the value is valid, regarding the validator
  const encodedValue = decoder(searchValue)

  // Set the initial value
  const [value, setValue] = useState<T>(encodedValue !== undefined ? encodedValue : initialValue)

  // Update the url search param on state update
  useEffect(() => {
    const params = getSearchParams()
    params[name] = value
    const search = `?${qs.stringify(params)}`
    replaceState({}, "", `${getPathname()}${search === "?" ? "" : search}${getHash()}`)
  }, [value])

  return [value, setValue]
}
