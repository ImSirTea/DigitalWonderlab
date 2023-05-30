import {FunctionComponent, useMemo, useState} from "react";
import {Card, CardActions, CardHeader, CardMedia, Chip, IconButton, Stack, Typography,} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import {NasaImageAndVideoItem} from "../../../api/nasaImageAndVideoService";
import FavouriteButton from "../../../controls/specialised-buttons/FavouriteButton";
import {stringToHslColor} from "../../../utils/colours";


interface NasaImageCardProps {
  imageDetails: NasaImageAndVideoItem;
  onShare: () => void;
}

const NasaImageCard: FunctionComponent<NasaImageCardProps> = ({imageDetails, onShare}) => {
  const [isFavourite, setIsFavourite] = useState(false);
  
  const handleFavouriteClick = () => {
    //@TODO: Saving logic - not available on API. Could pretend with localStorage/idb
    setIsFavourite(!isFavourite);
  };
  
  const keywordChips = useMemo(() =>
      imageDetails.data.keywords?.map((keyword) =>
        <Chip key={keyword}
              size="small"
              label={keyword}
              sx={{
                backgroundColor: stringToHslColor(keyword),
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "no-wrap",
                maxWidth: "15rem"
              }}
        />)
      ?? null
    , [imageDetails]);
  
  return (
    <Card sx={{maxWidth: 345}}>
      <CardHeader
        title={imageDetails.data.title}
        subheader={<Stack sx={{paddingTop: "8px"}} spacing={1} direction="row" useFlexGap
                          flexWrap="wrap">{keywordChips}</Stack>}
      />
      <CardMedia
        component="img"
        height="260"
        loading="lazy"
        image={imageDetails.data.image_src ?? ""}
        alt={imageDetails.data.title}
      />
      <CardActions disableSpacing>
        <Typography color="text.secondary" sx={{marginRight: "auto"}}>
          {imageDetails.data.date_created.toDateString()}
        </Typography>
        <FavouriteButton isFavourite={isFavourite} aria-label="add to favorites" onClick={handleFavouriteClick}/>
        <IconButton aria-label="share" onClick={onShare}>
          <ShareIcon/>
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default NasaImageCard;
