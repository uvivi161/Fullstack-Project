

import { Link, Outlet } from 'react-router-dom';
import AccountMenu from './AccountMenu'

const AppLayout = () => {
    return(<>
            <div style={{ width: "100%", height: '100%' }}>
            <div style={{ backgroundColor: '#FFC300', position: 'sticky', top: '0', zIndex: 1000, display: 'flex', flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
                <nav style={{ marginRight: '20px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row-reverse' }}>
                    <Link to="/" style={{ margin: '0 10px' }}>HomePage</Link>
                    <Link to="/FileUploader" style={{ margin: '0 10px' }}>UploadFile</Link>
                    <Link to="/CreateMeeting" style={{ margin: '0 10px' }}>create meeting</Link>
                    {/* {user.id != 0 && <Link to='/RecipeForm'>Add recipe </Link>} */}
                </nav>
                <AccountMenu />
            </div>
            <div >
                <Outlet />
            </div>
        </div>
    </>)
}

export default AppLayout;