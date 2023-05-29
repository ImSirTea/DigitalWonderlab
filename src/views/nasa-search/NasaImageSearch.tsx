import React, {FunctionComponent, useRef, useState} from "react";
import NasaImageGallery from "./subcomponents/NasaImageGallery";
import {NasaImageAndVideoItem, nasaImageAndVideoService} from "../../api/nasaImageAndVideoService";
import SearchBox from "../../components/SearchBox";
import {useLoadingState} from "../../utils/stateManagement";
import {Box} from "@mui/material";

export const NasaImageSearch: FunctionComponent<any> = () => {
  const [nasaImageDetails, setNasaImageDetails] = useState<NasaImageAndVideoItem[]>([]);

  const [isNasaSearchLoading, searchNasa] = useLoadingState(async (searchTerm: string) => {
      setNasaImageDetails(await nasaImageAndVideoService.getImageOrVideoByFilter({q: searchTerm}));

      if (nasaImageGalleryRef.current) {
        nasaImageGalleryRef.current.scrollIntoView({behavior: "smooth"});
      }
    }
  );

  const nasaImageGalleryRef = useRef<HTMLDivElement | null>(null);

  return <>
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <SearchBox title="Welcome to NASA Image and Video search"
                 description="To begin searching, add a search term to the box below and hit search"
                 onSearch={searchNasa}
                 isLoading={isNasaSearchLoading}/>
    </Box>
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <NasaImageGallery imageDetails={nasaImageDetails}/>
    </Box>
  </>;
}

export default NasaImageSearch;