import React from "react";
import Masonry from "@mui/lab/Masonry";


interface ImagesMasonryProps extends React.PropsWithChildren {
}

const ImagesMasonry = ({children}: ImagesMasonryProps) => {
  return <Masonry sx={{alignContent: "center"}} columns={3} spacing={4}>
    {children ?? "No images to show!"}
  </Masonry>;
};

export default ImagesMasonry;