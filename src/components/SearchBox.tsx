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


  const cardTitle = title ? <CardHeader title={title}/> : null;
  const cardDescription = description ? <Typography paragraph={true}>{description}</Typography> : null;
  return (
    <Container>
      <Card>
        {cardTitle}
        <CardContent>
          {cardDescription}
          <FormGroup>
            <TextField
              value={searchTerm}
              onChange={(newSearchTerm) => setSearchTerm(newSearchTerm)}
              placeholder="Start your search..."
            />
          </FormGroup>
        </CardContent>
        <CardActions>
          <Button
            sx={{ml: "auto"}}
            variant={"contained"}
            color={"info"}
            onClick={() => onSearch(searchTerm)}
            disabled={isLoading}
          >
            {isLoading ? (
                <CircularProgress size={24} color={"info"}/>
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
