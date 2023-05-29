import {FunctionComponent, useState} from "react";
import {Card, CardActions, CardHeader, CardMedia, IconButton, Typography,} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import {NasaImageAndVideoItem} from "../../../api/nasaImageAndVideoService";
import FavouriteButton from "../../../controls/specialised-buttons/FavouriteButton";


interface NasaImageCardProps {
  imageDetails: NasaImageAndVideoItem;
}

const NasaImageCard: FunctionComponent<NasaImageCardProps> = ({imageDetails}) => {
  const [isFavourite, setIsFavourite] = useState(false);

  const handleFavouriteClick = () => {
    //@TODO: Saving logic - not available on API. Could pretend with localStorage/idb
    setIsFavourite(!isFavourite);
  }

  return (
    <Card sx={{maxWidth: 345}}>
      <CardHeader
        title={imageDetails.data.title}
      />
      <CardMedia
        component="img"
        height="260"
        image={imageDetails.data.image_src ?? ""}
        alt={imageDetails.data.title}
      />
      <CardActions disableSpacing>
        <Typography color="text.secondary" sx={{marginRight: "auto"}}>
          {imageDetails.data.date_created.toDateString()}
        </Typography>
        <FavouriteButton isFavourite={isFavourite} aria-label="add to favorites" onClick={handleFavouriteClick}>
          <FavoriteIcon/>
        </FavouriteButton>
        <IconButton aria-label="share">
          <ShareIcon/>
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default NasaImageCard;
