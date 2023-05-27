import {useState} from "react";

/**
 * Wrapping util so we can manage loading state on individual async functions
 * @param functionForLoading The function to provide loading state for
 */
export function useLoadingState<Args extends unknown[], Returns>(
  functionForLoading: (...args: Args) => PromiseLike<Returns>
): [boolean, typeof functionForLoading] {
  const [isLoading, setIsLoading] = useState(false);

  async function wrappedFunctionWithLoading(...args: Args) {
    try {
      setIsLoading(true);
      return await functionForLoading(...args);
    } finally {
      setIsLoading(false);
    }
  }

  return [isLoading, wrappedFunctionWithLoading];
}
