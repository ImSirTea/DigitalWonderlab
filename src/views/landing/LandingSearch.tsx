import { FunctionComponent, useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Container,
  FormGroup,
} from "@mui/material";
import { nasaImageAndVideoService } from "../../api/nasaImageAndVideoService";
import TextField from "../../controls/TextField";
import Button from "../../controls/Button";
import { useLoadingState } from "../../utils/stateManagement";

export const LandingSearch: FunctionComponent<any> = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [isNasaSearchLoading, searchNasa] = useLoadingState(async () =>
    console.log(
      await nasaImageAndVideoService.getImageOrVideoByFilter({ q: searchTerm })
    )
  );

  return (
    <Container>
      <Card>
        <CardContent>
          <FormGroup>
            <TextField
              value={searchTerm}
              onChange={(newSearchTerm) => setSearchTerm(newSearchTerm)}
            />
          </FormGroup>
        </CardContent>
        <CardActions>
          <Button
            sx={{ ml: "auto" }}
            variant={"contained"}
            color={"info"}
            onClick={() => searchNasa()}
            disabled={isNasaSearchLoading}
          >
            {isNasaSearchLoading ? (
              <CircularProgress size={24} color={"info"} />
            ) : (
              "Search ... NASA"
            )}
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default LandingSearch;
