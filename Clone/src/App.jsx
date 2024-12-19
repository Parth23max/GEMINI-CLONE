import React from 'react'
import { createContext, useContext, useState ,useEffect} from "react";
import Sidebar from './Components/Sidebar/Sidebar'
import Main from './Components/Main/Main'
import { ThemeProvider } from './Context/Theme'

function App() {
  const [themeMode, setThemeMode] = useState("light")
  const lightTheme=()=>{
    setThemeMode("light")
  }
  const darkTheme=()=>{
    setThemeMode("dark")
  }
  

  useEffect(() => {
    document.querySelector('html').classList.remove("light","dark")
    document.querySelector('html').classList.add(themeMode)
    
  }, [themeMode])

  return (
    <ThemeProvider value={{themeMode,lightTheme,darkTheme}}>
      <Sidebar/>
      <Main/>
    </ThemeProvider>
  )
}

export default App