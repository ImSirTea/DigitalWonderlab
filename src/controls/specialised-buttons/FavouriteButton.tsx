import {IconButton, IconButtonProps, styled} from "@mui/material";
import {red} from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface FavouriteIconProps extends IconButtonProps {
  isFavourite: boolean;
}

const FavouriteButton = styled(({isFavourite, ...other}: FavouriteIconProps) => {
  return <IconButton {...other}><FavoriteIcon/></IconButton>;
})(({isFavourite}) => ({
  color: isFavourite ? red[500] : undefined,
}));

export default FavouriteButton;