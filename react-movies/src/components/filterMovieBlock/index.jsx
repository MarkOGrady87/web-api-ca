import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getGenres } from "../../api/tmdb-api";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../spinner";
import Grid from "@mui/material/Grid";

const formControl = {
  margin: 1,
  minWidth: "90%",
  backgroundColor: "rgb(255, 255, 255)",
};

export default function FilterMoviesBlock(props) {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  const genres = data.genres;
  if (genres[0].name !== "All") {
    genres.unshift({ id: "0", name: "All" });
  }

  const handleChange = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value);
  };

  const handleTextChange = (e, props) => {
    handleChange(e, "name", e.target.value);
  };

  const handleGenreChange = (e) => {
    handleChange(e, "genre", e.target.value);
  };

  const handleSortChange = (e) => {
    handleChange(e, "sort", e.target.value);
  }

  const handleDateFromChange = (e) => {
    handleChange(e, "dateFrom", e.target.value);
  }

  const handleDateToChange = (e) => {
    handleChange(e, "dateTo", e.target.value);
  }


  return (
    <>
      <Grid size={12} sx={{ mb: 3 }}>
        <Grid container justifyContent={"center"}>
          <Grid size={3}>
            <TextField
              sx={{ ...formControl }}
              id="filled-search"
              label="Search field"
              type="search"
              value={props.titleFilter}
              onChange={handleTextChange}
            />
          </Grid>

          <Grid size={2}>
            <FormControl sx={{ ...formControl }}>
              <InputLabel id="genre-label">Genre</InputLabel>
              <Select
                labelId="genre-label"
                id="genre-select"
                defaultValue=""
                value={props.genreFilter}
                onChange={handleGenreChange}
              >
                {genres.map((genre) => {
                  return (
                    <MenuItem key={genre.id} value={genre.id}>
                      {genre.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={2}>
            <FormControl sx={{ ...formControl }}>
              <InputLabel id="sort-label">Sort By</InputLabel>
              <Select
                labelId="sort-label"
                id="sort-select"
                defaultValue=""
                value={props.sortOption}
                onChange={handleSortChange}
              >
                <MenuItem value="release_desc">Release Date: Newest First</MenuItem>
                <MenuItem value="release_asc">Release Date: Oldest First</MenuItem>
                <MenuItem value="popularity_desc">Popularity: Highest First</MenuItem>
                <MenuItem value="popularity_asc">Popularity: Lowest First</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={2}>
            <TextField
              sx={{ ...formControl }}
              id="date-from"
              label="Release Date From"
              type="date"
              value={props.dateFromFilter}
              onChange={handleDateFromChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid size={2}>
            <TextField
              sx={{ ...formControl }}
              id="date-to"
              label="Release Date To"
              type="date"
              value={props.dateToFilter}
              onChange={handleDateToChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>


        </Grid>
      </Grid>
    </>
  );
}
