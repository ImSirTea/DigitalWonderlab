import React, {FunctionComponent, useMemo, useState} from "react";
import {NasaImageAndVideoItem} from "../../../api/nasaImageAndVideoService";
import NasaImageCard from "./NasaImageCard";
import {Box, Container} from "@mui/material";
import ImageList from "../../../components/ImageList";
import ShareLinkDialog from "../../../components/ShareLinkDialog";

interface NasaImageGalleryProps {
  imageDetails: NasaImageAndVideoItem[];
}


export const NasaImageGallery: FunctionComponent<NasaImageGalleryProps> = ({imageDetails}) => {
  const [imageDetailsToShare, setImageDetailsToShare] = useState<NasaImageAndVideoItem | null>(null);
  
  function onShareItem(imageDetails: NasaImageAndVideoItem) {
    setImageDetailsToShare(imageDetails);
  }
  
  const nasaImageCards = useMemo(() => imageDetails.map((details) =>
      <NasaImageCard key={details.data.nasa_id}
                     imageDetails={details}
                     onShare={() => onShareItem(details)}
      />)
    , [imageDetails]);
  
  const shareLinkDialog = imageDetailsToShare && imageDetailsToShare.data.image_src ?
    <ShareLinkDialog onClose={() => setImageDetailsToShare(null)} open={true}
                     linkUrl={imageDetailsToShare.data.image_src}/> : null;
  
  return <Container>
    <Box>
      <ImageList children={nasaImageCards}/>
      {shareLinkDialog}
    </Box>
  </Container>;
};

export default NasaImageGallery;