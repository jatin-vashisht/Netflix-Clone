const styles = (theme) => ({
    searchContainer: {
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            justifyContent: 'center',
            width: '100%'
        }
    },
    input: {
        color: theme.palette.mode === 'light' && 'black',
        filter: theme.palette.mode === 'light' && 'invert(1)',
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            justifyContent: 'center',
            width: '100%'
        }
    },
})

export default styles   