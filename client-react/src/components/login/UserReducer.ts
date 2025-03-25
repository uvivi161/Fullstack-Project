import { createContext, Dispatch } from "react"

export type user = {
    id: number,
    email: string,
    password: string,
    role: string,
    country: string
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
                email: action.data.email ?? state.email,
                password: action.data.password ?? state.password,
                role: action.data.role ?? state.role,
                country: action.data.country ?? state.country
            }
        case 'UPDATE':
            return {
                ...state,
                id: action.data.id ?? state.id,
                email: action.data.email ?? state.email,
                password: action.data.password ?? state.password,
                role: action.data.role ?? state.role,
                country: action.data.country ?? state.country
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
    email: '',
    password: '',
    role: '',
    country: '',
    id: 0
};

type userContextType = [
    user,
    Dispatch<Action>,
]
export const UserContext = createContext<userContextType>([initialUserState, () => { }])
