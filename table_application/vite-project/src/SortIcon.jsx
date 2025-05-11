import SwapVertIcon from '@mui/icons-material/SwapVert';
import IconButton from '@mui/material/IconButton';

const SortIcon = ({ onClick }) => (
    <IconButton aria-label="SwapVert" disabled={false} onClick={onClick}>
        <SwapVertIcon />
    </IconButton>
);

export default SortIcon;
