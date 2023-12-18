import React from "react";

// export interface UserType {
//     data:object,
//     message:string,
//     status:boolean
// }
// export interface UserContextProps {
//     user: UserType[];
//     addUser: (event: UserType) => void;
//     removeUser: () => void;
//   }

export const UserContext = React.createContext({
    user:{},
    addUser: (_user:any)=>{},
    removeUser:()=>{}
})

export const useUser = () =>{
    return React.useContext(UserContext)
}

export const UserProvider = UserContext.Provider