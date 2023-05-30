import React, {FunctionComponent, useRef, useState} from "react";
import {NasaImageAndVideoItem, nasaImageAndVideoService} from "../../api/nasaImageAndVideoService";
import SearchBox from "../../components/SearchBox";
import {useLoadingState} from "../../utils/stateManagement";
import {Box, Fab, Stack, Zoom} from "@mui/material";
import useOnScreen from "../../utils/hooks/useOnScreen";
import ArrowUpward from "@mui/icons-material/ArrowUpward";
import NasaImageGallery from "./subcomponents/NasaImageGallery";
import LavaLampCanvas from "../../components/LavaLampCanvas/LavaLampCanvas";

export const NasaImageSearch: FunctionComponent = () => {
  const searchRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const searchIsVisible = useOnScreen(searchRef);
  
  const [nasaImageDetails, setNasaImageDetails] = useState<NasaImageAndVideoItem[]>([]);
  
  const [isNasaSearchLoading, searchNasa] = useLoadingState(async (searchTerm: string) => {
      setNasaImageDetails(await nasaImageAndVideoService.getImageOrVideoByFilter({q: searchTerm}));
      galleryRef.current?.scrollIntoView({behavior: "smooth"});
    }
  );
  
  const onReturnToTop = () => {
    searchRef.current?.scrollIntoView({behavior: "smooth"});
  };
  
  const returnToTop = !searchIsVisible ? <Zoom in={!searchIsVisible} unmountOnExit>
    <Fab sx={{
      position: 'fixed',
      bottom: 16,
      right: 16,
    }}
         aria-label="Return to top"
         color="primary"
         onClick={() => onReturnToTop()}>
      <ArrowUpward/>
    </Fab>
  </Zoom> : null;
  
  return <>
    <Box sx={{position: "relative", top: "0", left: "0", padding: "0"}}>
      <LavaLampCanvas/>
    </Box>
    <Stack>
      <Box
        ref={searchRef}
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <SearchBox
          title="Welcome to NASA Image and Video search"
          description="To begin searching, add a search term to the box below and hit search"
          onSearch={searchNasa}
          isLoading={isNasaSearchLoading}/>
      </Box>
      <Box
        ref={galleryRef}
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        mt="15rem"
      >
        <NasaImageGallery imageDetails={nasaImageDetails}/>
      </Box>
    </Stack>
    
    {returnToTop}
  </>;
};

export default NasaImageSearch;