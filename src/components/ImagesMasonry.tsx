import React from "react";
import Masonry from "@mui/lab/Masonry";
import {Box} from "@mui/material";


interface ImagesMasonryProps {
  children: React.JSX.Element[];
}

const ImagesMasonry = ({children}: ImagesMasonryProps) => {
  return <>
    {!children.length ? <Box display="flex" justifyContent="center">No images to show!</Box> : null}
    <Masonry sx={{alignContent: "center"}} columns={3} spacing={4}>
      {children}
    </Masonry>
  </>;
};

export default ImagesMasonry;