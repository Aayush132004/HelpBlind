import React from 'react'
import useGlobal from '../../utils/GlobalContext';
import Navbar from '../../components/Navbar';
const ScribeHome = () => {
  const {language, setLanguage}= useGlobal();
  const {isAuthenticated,setIsAuthenticated}=useGlobal();
  const {user,setUser}=useGlobal();
   const {highContrast, setHighContrast} = useGlobal();
   console.log(user)
  return (
    <div>
      <Navbar/>
    </div>
  )
}

export default ScribeHome
