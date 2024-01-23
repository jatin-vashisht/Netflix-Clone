const styles = (theme) => ({
    root: {
        display: 'flex',
        height: '100%'
    },
    toolbar: {
        height: '70px'
    },
    content: {
        flexGrow: 1,
        padding: '2rem',
        [theme.breakpoints.up('md')]: {
            padding: '2rem 1rem 2rem 4rem'
        }
    }
})

export default styles