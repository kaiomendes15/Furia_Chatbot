const setChatTextColorScheme = (darkmode: boolean, role: string): string => {
    if (darkmode) {
        if (role === 'user') {
            return '#212529' 
        }

        if (role === 'model') {
            return '#212529'
        }
    }

    if (role === 'user') {
        return '#d9dadb' 
    }

    return '#d9dadb'
}

const setChatBackgroundColorScheme = (darkmode: boolean, role: string): string => {
    if (darkmode) {
        if (role === 'user') {
            return '#d9dadb' 
        }

        if (role === 'model') {
            return '#f1f3f5'
        }
    }

    if (role === 'user') {
        return "#1a1a1a" 
    }

    return '#262626'
}

export { setChatTextColorScheme, setChatBackgroundColorScheme }