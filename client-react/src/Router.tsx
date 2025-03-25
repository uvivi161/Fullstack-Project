import { useContext } from "react";
import { UserContext } from "./components/login/UserReducer";
import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from "./components/Layout/AppLayout";
import FileUploader from "./components/FileUploader";
import HomePage from "./components/Layout/HomePage";

interface AuthGuardProps {
    children: React.ReactNode;
}

function AuthGuard({ children } : AuthGuardProps) {
    const [user] = useContext(UserContext);
    return user.id !== 0 ? children : <Navigate to="/" replace />; 
}

export const myRouter = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        errorElement: <>main error</>,
        children: [
            {
                path: '/', element: <HomePage />
            },
            {
                path: '/FileUploader', element: <FileUploader/>
            }
            // {
            //     path: 'ShowRecipe', element: <RecipeLayout />
            //     , children:
            //         [
            //             {
            //                 path: 'list',
            //                 element: <ShowRecipe />
            //             },
            //             {
            //                 path: ":id",
            //                 element: <RecipeDetails />
            //             }
            //         ]
            // }
        ]
    }
]);