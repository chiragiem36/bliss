/*
export const someMutation = (state) => {}
 */

export const setKey = (state, o) => {
  state[o.p] = o.v
}
