import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterBlock from "../filterActorBlock";
import ActorList from "../actorList";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";

function ActorListPageTemplate({ title, actors, page, action, onPageChange }) {
  const [nameFilter, setNameFilter] = useState("");

  let displayedActors = actors.filter((a) => {
    return a.name.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
  });

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
  };

  return (
    <>
      <Grid container>
        <Grid size={12}>
          <Header title={title} />
        </Grid>
        <Grid size={12}>
          <Grid container justifyContent={"center"}>
            <Grid
              key="find"
              size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 10 }}
              sx={{ mt: 1 }}
            >
              <FilterBlock
                onUserInput={handleChange}
                titleFilter={nameFilter}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid size={12}>
          <ActorList action={action} actors={displayedActors} />
        </Grid>
      </Grid>
      <Grid sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Pagination
          count={10}
          page={page}
          onChange={onPageChange}
          showFirstButton
          showLastButton
        />
      </Grid>
    </>
  );
}
export default ActorListPageTemplate;
