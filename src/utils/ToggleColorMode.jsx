import { ThemeProvider, createTheme } from "@mui/material";
import { createContext, useMemo, useState } from "react";

export const ColorModeContext = createContext()

const ToggleColorMode = ({children}) => {
    const [mode, setMode] = useState(localStorage.getItem('backgroundMode') || 'light')

    const theme = useMemo(() => createTheme({
        palette: {
            mode
        }
    }), [mode])

    const toggleColorMode = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
        localStorage.setItem('backgroundMode',mode === 'light'? 'dark' : 'light')
    }


    return (
        <ColorModeContext.Provider value={{mode, setMode, toggleColorMode}}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}

export default ToggleColorMode