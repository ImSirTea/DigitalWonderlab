import React, {FunctionComponent} from "react";
import List from '@mui/material/List';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import {Avatar, ListItem, ListItemAvatar, ListItemButton, ListItemText} from "@mui/material";
import CopyIcon from '@mui/icons-material/ContentPaste';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import {grey, lightBlue, purple} from "@mui/material/colors";
import {copyToClipboard} from "../utils/jsHelpers";
import {toast} from "react-toastify";

interface ShareLinkDialogProps {
  open: boolean;
  onClose: () => void;
  linkUrl: string;
  useFacebook?: boolean;
  useInstagram?: boolean;
  useClipboard?: boolean;
}

const ShareLinkDialog: FunctionComponent<ShareLinkDialogProps> = ({
                                                                    onClose,
                                                                    open,
                                                                    linkUrl,
                                                                    useClipboard = true,
                                                                    useFacebook = true,
                                                                    useInstagram = true
                                                                  }) => {
  
  function notYetImplementedShare() {
    toast("Not yet implemented", {type: "error"});
  }
  
  const clipboardCopy = useClipboard ? <ListItem onClick={() => copyToClipboard(linkUrl)} disableGutters>
    <ListItemButton>
      <ListItemAvatar>
        <Avatar sx={{bgcolor: grey[100], color: grey[600]}}>
          <CopyIcon/>
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary="Copy to clipboard"/>
    </ListItemButton>
  </ListItem> : null;
  
  const shareToFacebook = useFacebook ? <ListItem onClick={notYetImplementedShare} disableGutters>
    <ListItemButton>
      <ListItemAvatar>
        <Avatar sx={{bgcolor: lightBlue[100], color: lightBlue[600]}}>
          <FacebookIcon/>
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary="Share to Facebook"/>
    </ListItemButton>
  </ListItem> : null;
  
  const shareToInstagram = useInstagram ? <ListItem onClick={notYetImplementedShare} disableGutters>
    <ListItemButton>
      <ListItemAvatar>
        <Avatar sx={{bgcolor: purple[100], color: purple[600]}}>
          <InstagramIcon/>
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary="Share to Instagram"/>
    </ListItemButton>
  </ListItem> : null;
  
  return <Dialog onClose={onClose} open={open}>
    <DialogTitle>Share</DialogTitle>
    <List>
      {clipboardCopy}
      {shareToFacebook}
      {shareToInstagram}
    </List>
  </Dialog>;
};

export default ShareLinkDialog;