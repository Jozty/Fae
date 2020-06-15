export type Cast<X, Y> = X extends Y ? X : Y

export type HasTail<T extends any[]> = 
  T extends ([] | [any])
    ? false
    : true

export type IsEmpty<T extends any[]> = 
  T extends []
    ? true
    : false
