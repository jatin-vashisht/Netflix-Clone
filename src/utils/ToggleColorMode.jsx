import { ThemeProvider, createTheme } from "@mui/material";
import { createContext, useMemo, useState } from "react";

export const ColorModeContext = createContext()

const ToggleColorMode = ({children}) => {
    const [mode, setMode] = useState('light')

    const toggleColorMode = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
    }

    const theme = useMemo(() => createTheme({
        palette: {
            mode
        }
    }), [mode])

    return (
        <ColorModeContext.Provider value={{mode, setMode, toggleColorMode, theme}}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}

export default ToggleColorMode