//  We dont use the `enum` Typescript type because:
// https://medium.com/@martin_hotell/10-typescript-pro-tips-patterns-with-or-without-react-5799488d6680

export type EnumLiteralsOf<T extends object> = T[keyof T];
export type ValueOf<T> = T[keyof T];
