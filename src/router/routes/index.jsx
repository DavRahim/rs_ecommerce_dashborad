import MainLayout from "../../layout/MainLayout"
import ProtectRoutes from "./ProtectRoutes";
import { privateRoutes } from "./privateRoutes"

export const getRoutes = () => {
    // eslint-disable-next-line no-unused-vars
    const allRoute = [];
    privateRoutes.map(r=>{
        r.element = <ProtectRoutes route={r}>{r.element}</ProtectRoutes>
    })
    return{
        path: '/',
        element: <MainLayout/>,
        children: privateRoutes
    }
}