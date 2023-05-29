import React, {FunctionComponent, useMemo} from "react";
import {NasaImageAndVideoItem} from "../../../api/nasaImageAndVideoService";
import NasaImageCard from "./NasaImageCard";
import {Box, Container} from "@mui/material";
import ImagesMasonry from "../../../components/ImagesMasonry";

interface NasaImageGalleryProps {
  imageDetails: NasaImageAndVideoItem[];
}


export const NasaImageGallery: FunctionComponent<NasaImageGalleryProps> = ({imageDetails}) => {
  const nasaImageCards = useMemo(() => imageDetails.map((details) =>
      <NasaImageCard key={details.data.nasa_id}
                     imageDetails={details}
      />)
    , [imageDetails]);

  return <Container>
    <Box>
      <ImagesMasonry children={nasaImageCards}/>
    </Box>
  </Container>;
};

export default NasaImageGallery;