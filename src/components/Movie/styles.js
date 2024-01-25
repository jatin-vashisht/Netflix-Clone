const styles = (theme) => ({
    movie: {
        padding: '10px',
    },
    title: {
        color: theme.palette.text.primary,
        textOverflow: 'ellipsis',
        width: '200px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        marginTop: '10px',
        marginBottom: 0,
        textAlign: 'center'
    },
    links: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bolder',
        textDecoration: 'none',
        [theme.breakpoints.up('xs')]: {
            display: 'flex',
            flexDirection: 'column'
        },
        '&:hover': {
            cursor: 'pointer',
        }
    },
    image: {
        borderRadius: '20px',
        height: '275px',
        '&:hover': {
            transform: 'scale(1.05)',
            transition: 'all 0.25s',
        }
    }
})

export default styles