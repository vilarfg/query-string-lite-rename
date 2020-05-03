// Copyright (c) 2020 Fernando G. Vilar
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Query } from "query-string-lite";

export type Dictionary = Record<string, string>;

type Extends<T1, T2> = T1 extends T2 ? T1 : never;

// taken and adapted from [Stack Overflow](https://stackoverflow.com/a/57726844)
type KeyFromValue<V extends string, T extends Dictionary> = {
  [K in keyof T]: V extends T[K] ? K : never;
}[keyof T];

type Invert<T extends Dictionary> = Extends<
  {
    [V in T[keyof T]]: KeyFromValue<V, T>;
  },
  Dictionary
>;

type RenamedQuery<D extends Dictionary, Q extends Query> = Extends<
  {
    [k in D[Extract<keyof Q, keyof D>]]: Extends<
      Invert<D>[k],
      Extract<keyof Q, keyof D>
    >;
  } &
    {
      [P in Exclude<keyof Q, keyof D>]: Q[P];
    },
  Query
>;

export function rename<D extends Dictionary>(
  dictionary: D,
): <Q extends Query>(query: Q) => RenamedQuery<D, Q>;
export function rename<D extends Dictionary, Q extends Query>(
  dictionary: D,
  query: Q,
): RenamedQuery<D, Q>;
export function rename<D extends Dictionary, Q extends Query>(
  dictionary: D,
  query?: Q,
): (<Q extends Query>(query: Q) => RenamedQuery<D, Q>) | RenamedQuery<D, Q> {
  function rename<Q extends Query>(query: Q): RenamedQuery<D, Q> {
    const q = {} as RenamedQuery<D, Q>;
    for (const k in query) {
      q[
        (k in dictionary ? dictionary[k] : k) as keyof RenamedQuery<D, Q>
      ] = (query[k] as unknown) as RenamedQuery<D, Q>[keyof RenamedQuery<D, Q>];
    }
    return q;
  }
  return query ? rename(query) : rename;
}

export default function <D extends Dictionary>(
  dictionary: D,
): {
  to<Q extends Query>(query: Q): RenamedQuery<D, Q>;
  from<Q extends Query>(
    query: Q,
  ): RenamedQuery<Extends<Invert<D>, Dictionary>, Q>;
} {
  const toDict = { ...dictionary };
  const fromDict = {} as Invert<D>;
  for (const k in toDict) {
    fromDict[toDict[k]] = (k as string) as Invert<D>[D[typeof k]];
  }
  return {
    to: rename(toDict),
    from: rename(fromDict),
  };
}
