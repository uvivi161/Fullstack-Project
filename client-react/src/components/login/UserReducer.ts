import { createContext, Dispatch } from "react"

export type user = {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    adress: string,
    phone: string
}

type Action = {
    type: 'ADD' | 'UPDATE' | 'GET' | 'DELETE',
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
            }
        case 'UPDATE':
            return {
                ...state,
                id: action.data.id ?? state.id,
                firstName: action.data.firstName ?? state.firstName,
                lastName: action.data.lastName ?? state.lastName,
                email: action.data.email ?? state.email,
                password: action.data.password ?? state.password,
                adress: action.data.adress ?? state.adress,
                phone: action.data.phone ?? state.phone,
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
    firstName: 'INITIAL',
    lastName: 'initial',
    email: '',
    password: '',
    adress: '',
    phone: '',
    id: 0
};

type userContextType = [
    user,
    Dispatch<Action>,
]
export const UserContext = createContext<userContextType>([initialUserState, () => { }])
