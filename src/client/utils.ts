import { FormMethod } from "react-router-dom";

export namespace utils {
  export type JsonObject = { [key: string]: JsonValue };

  export type JsonValue =
    | null
    | boolean
    | number
    | string
    | JsonObject
    | JsonValue[];

  type ExtendedRequestInit = Omit<RequestInit, "body" | "method"> &
    (
      | {
          body?: JsonObject;
          method: Exclude<Uppercase<FormMethod>, "GET">;
        }
      | {
          method?: "GET";
          body?: undefined;
        }
    );

  const CONTENT_TYPE = "Content-Type";
  const APPLICATION_JSON = "application/json";

  async function baseFetch(
    resource: RequestInfo | URL,
    options?: ExtendedRequestInit
  ) {
    const body =
      resource instanceof Request
        ? (await resource.clone().json()) ?? options?.body
        : options?.body;

    const headers = new Headers(
      resource instanceof Request
        ? resource.headers ?? options?.headers
        : options?.headers
    );

    const isFormData = body instanceof FormData;

    if (!headers.has(CONTENT_TYPE) && !isFormData) {
      headers.set(CONTENT_TYPE, APPLICATION_JSON);
    }

    return window.fetch(resource, {
      ...options,
      body: isFormData ? body : JSON.stringify(body),
    });
  }

  export async function fetch<
    TData extends Success = Success,
    TError extends Failure = Failure
  >(resource: RequestInfo | URL, options?: ExtendedRequestInit) {
    try {
      const res = await baseFetch(resource, options);
      const isOk = res.ok;
      const data = await res.json().catch(() => ({
        message: "Parse Error",
      }));
      return {
        ...data,
        message: data.message ?? (isOk ? "success" : "Some error occured"),
        ok: isOk,
      } as TData;
    } catch (e) {
      return { ok: false, message: "Network Error" } as TError;
    }
  }
}

export type Success = { ok: true; message: string };
export type Failure = { message: string; ok: false };

export function debounce<T extends (...args: any[]) => unknown>(
  func: T,
  delay: number
) {
  let timeoutId: NodeJS.Timeout;

  return function (this: unknown, ...args: Parameters<T>) {
    return new Promise((res) => {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        res(func(...args));
      }, delay);
    }) as ReturnType<T>;
  };
}
