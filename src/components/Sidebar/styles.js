const styles = (theme) => ({
    imageLink: {
        display: 'flex',
        justifyContent: 'center',
        padding: '10% 0'
    },
    image: {
        width: '70%'
    },
    link: {
        color: theme.palette.text.primary,
        textDecoration: 'none'
    },
    genreImages: {
        filter: theme.palette.mode === 'dark'? 'dark' : 'invert(1)',
    }
})

export default styles   