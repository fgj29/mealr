import { useEffect, useState } from "react";

/** False on SSR and the first client paint so auth UI does not hydrate-mismatch. */
export function useClientReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  return ready;
}
