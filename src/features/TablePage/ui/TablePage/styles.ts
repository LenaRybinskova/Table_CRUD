export const styles = {
    styledPaper: {
        position: 'relative',
        padding: 3,
        maxWidth: 500,
        minWidth: 400,
        borderRadius: 2,
        width: '100%',
        height: 'auto',
    },
    styledStack: {
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        alignItems: 'flex-start',
    },
    container: {
        display: 'flex',
        gap: 4,
        alignItems: 'flex-start',
    },
    createDocumentBox: {
        flex: '0 0 250px',
    },
    createDocumentTitle: {
        mb: 2,
    },
    documentListBox: {
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
    },
    documentListTitle: {
        mb: 2,
    },
    gridBox: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(200px, 1fr))',
        gap: '10px',
        width: '100%',
    },
    circularProgress: {
        display: 'flex',
        justifyContent: 'center',
        mt: 3,
    },
};