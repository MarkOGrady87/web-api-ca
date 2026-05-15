import React from "react";
import { getPopularPeople } from "../api/tmdb-api";
import PageTemplate from "../components/templateActorListPage";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import { useParams, useNavigate } from "react-router";

const PopularPeoplePage = (props) => {
  const { pageId } = useParams();
  const navigate = useNavigate();
  const currentPage = pageId || 1;
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["popular-people", { pageId: currentPage }],
    queryFn: getPopularPeople,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const actors = data.results;

  const handlePageChange = (event, value) => {
    navigate(`/people/popular/${value}`);
  };

  return (
    <PageTemplate
      title="Popular Actors"
      actors={actors}
      page={currentPage}
      onPageChange={handlePageChange}
    />
  );
};
export default PopularPeoplePage;
