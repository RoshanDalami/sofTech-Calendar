import { atom } from "recoil";

export const allTodos = atom({
  key:'allTodos',
  default: 0  
})
export const allInprogress = atom({
  key:'allInprogress',
  default: 0  
})
export const allCompleted = atom({
  key:'allCompleted',
  default: 0  
})
export const allBacklogs = atom({
  key:'allBacklogs',
  default: 0  
})