import HomeNavbar from '../components/HomeNavBar'
import AdminNavbar from '../components/AdminNavbar'
import UserNavbar from '../components/UserNavbar'


export default function NavBar({user,setUser}){
    return (
        <>    
            {user?.role === 'user' && <UserNavbar user={user} setUser={setUser}/>}
            {user?.role === 'admin' && <AdminNavbar />} 
        </>
    );
}











