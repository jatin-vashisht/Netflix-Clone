const styles = (theme) => ({
    moviesContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        overflow: 'hidden',
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'center'
        },
    }
})

export default styles