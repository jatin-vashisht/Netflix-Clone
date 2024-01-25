const styles = (theme) => ({
    imageLink: {
        display: 'flex',
        justifyContent: 'center',
        padding: '10% 0'
    },
    image: {
        width: '150px'
    },
    link: {
        color: theme.palette.text.primary,
        textDecoration: 'none'
    },
    genreImage: {
        filter: theme.palette.mode === 'dark' && 'invert(1)',
    }
})

export default styles   