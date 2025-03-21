import { SxProps, Theme } from '@mui/system';

export const containerStyle: SxProps<Theme> = {
    display: 'flex',
    flexDirection: 'row',
    gap: '20px',
    width: '100%',
    padding: '30px',
};

export const leftBoxStyle: SxProps<Theme> = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    flex: '0 0 30%',
    border: '2px solid black',
    padding: '20px',
    borderRadius: '10px',
};

export const rightBoxStyle: SxProps<Theme> = {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    border: '2px solid black',
    padding: '20px',
    borderRadius: '10px',
};

export const documentTitleStyle: SxProps<Theme> = {
    marginBottom: '20px',
    fontWeight: 'bold',
};

export const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
};