import React, {FunctionComponent} from "react";
import {Box, ImageList as MuiImageList, ImageListItem as MuiImageListItem} from "@mui/material";


interface ImagesMasonryProps {
  children: React.JSX.Element[];
}

const ImageList: FunctionComponent<ImagesMasonryProps> = ({children}) => {
  return <>
    {!children.length ? <Box display="flex" justifyContent="center">No images to show!</Box> : null}
    <MuiImageList variant="masonry" cols={3} gap={32}>
      {children.map((child, key) => (<MuiImageListItem key={key}>{child}</MuiImageListItem>))}
    </MuiImageList>
  </>;
};

export default ImageList;