import {FunctionComponent, useState} from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Container,
  FormGroup,
  Typography,
} from "@mui/material";
import TextField from "../controls/TextField";
import Button from "../controls/Button";

interface SearchBoxProps {
  title?: string;
  description?: string;
  initialSearchTerm?: string;
  searchText?: string;
  isLoading?: boolean;
  onSearch: (searchTerm: string) => void;
}

export const NasaImageSearchBox: FunctionComponent<SearchBoxProps> = ({
                                                                        initialSearchTerm = "",
                                                                        onSearch,
                                                                        searchText = "Search",
                                                                        isLoading = false,
                                                                        title = "",
                                                                        description = ""
                                                                      }) => {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [errorMessage, setErrorMessage] = useState("");
  
  
  const cardTitle = title ? <CardHeader title={title}/> : null;
  const cardDescription = description ? <Typography paragraph={true}>{description}</Typography> : null;
  
  const onSubmitSearch = () => {
    if (searchTerm === "") {
      setErrorMessage("A value must be provided");
      return;
    }
    
    setErrorMessage("");
    onSearch(searchTerm);
  };
  return (
    <Container>
      <Card>
        {cardTitle}
        <CardContent>
          {cardDescription}
          <FormGroup>
            <TextField
              error={errorMessage !== ""}
              helperText={errorMessage}
              value={searchTerm}
              onChange={(newSearchTerm) => setSearchTerm(newSearchTerm)}
              onSubmit={() => onSubmitSearch()}
              placeholder="Start your search..."
              autoFocus
            />
          </FormGroup>
        </CardContent>
        <CardActions>
          <Button
            sx={{ml: "auto"}}
            variant="contained"
            color="primary"
            onClick={() => onSubmitSearch()}
            disabled={isLoading}
          >
            {isLoading ? (
                <CircularProgress size={24} color="primary"/>
              ) :
              searchText
            }
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default NasaImageSearchBox;
