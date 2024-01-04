import {atom } from 'recoil';

export const userAtom = atom({
    key:'User Information',
    default:{
        message: '',
        status: 0,
        data: {
          _id: '',
          username: '',
          email: '',
          role: '',
          createdAt: '',
          updatedAt: '',
          __v: 0,
        },
    
    }
})