export type IconName<T extends string> = T extends `${infer Base}${
  | 'Filled'
  | 'Outlined'}`
  ? Base
  : T
