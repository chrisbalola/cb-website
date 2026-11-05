// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SharedDependencies {}

interface LocalizedPageParams {
  locale: string;
}

export type SharedPageParams<T = undefined> = Promise<LocalizedPageParams & T>;
