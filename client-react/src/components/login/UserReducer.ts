import { createContext, Dispatch } from "react"

export type user = {
    id: number,
    mail: string,
    password: string,
    role: string,
    country: string,
    companyName: string
}

type Action = {
    type: 'ADD' | 'UPDATE' |  'GET' | 'DELETE',
    data: Partial<user>,  
}

export const UserReducer = (state: user, action: Action): user => {

    switch (action.type) {
        case 'ADD':
            return {
                ...state,
                id: action.data.id ?? state.id,
                mail: action.data.mail ?? state.mail,
                password: action.data.password ?? state.password,
                role: action.data.role ?? state.role,
                country: action.data.country ?? state.country,
                companyName: action.data.companyName ?? state.companyName
            }
        case 'UPDATE':
            return {
                ...state,
                id: action.data.id ?? state.id,
                mail: action.data.mail ?? state.mail,
                password: action.data.password ?? state.password,
                role: action.data.role ?? state.role,
                country: action.data.country ?? state.country,
                companyName: action.data.companyName ?? state.companyName

            };
        case 'GET':
            return state;
        case 'DELETE':
            return {
                ...initialUserState
            };
        default: return state
    }
}

export const initialUserState: user = {
    mail: '',
    password: '',
    role: '',
    country: '',
    companyName: '',
    id: 0
};


type userContextType = [
    user,
    Dispatch<Action>,
]
export const UserContext = createContext<userContextType>([initialUserState, () => { }])
