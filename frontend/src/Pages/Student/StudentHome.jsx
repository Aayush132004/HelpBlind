import React from 'react'
import useGlobal from '../../utils/GlobalContext';
import Navbar from '../../components/Navbar';
const StudentHome = () => {
      const {language, setLanguage}= useGlobal();
  const {isAuthenticated,setIsAuthenticated}=useGlobal();
  const {user,setUser}=useGlobal();
   const {highContrast, setHighContrast} = useGlobal();
  return (
    <div>
      <Navbar/>
    </div>
  )
}

export default StudentHome
