export interface Interactor<Q, T> {
  execute: (requestModel: Q) => T
}
