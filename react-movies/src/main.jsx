import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes, Link } from "react-router";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/FavouriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import UpcomingMoviesPage from "./pages/UpcomingMoviesPage";
import TopRatedMoviesPage from "./pages/TopRatedMoviePage";
import PopularMoviesPage from "./pages/PopularMoviePage";
import NowPlayingMoviesPage from "./pages/NowPlayingMoviesPage";
import PopularPeoplePage from "./pages/PopularPeoplePage";
import ActorDetailsPage from "./pages/ActorDetailsPage";
import WatchlistMoviesPage from "./pages/WatchlistMoviesPage";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#5E35B1",
    },
    secondary: {
      main: "#00ACC1",
    },
    success: {
      main: "#43A047",
    }
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
        <MoviesContextProvider>
          <Routes>
            <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
            <Route path="/reviews/:id" element={ <MovieReviewPage /> } />
            <Route path="/movies/:id" element={<MoviePage />} />
            <Route path="/:pageId" element={<HomePage />} />
            <Route path="*" element={ <Navigate to="/1" /> } />
            <Route path="/reviews/form" element={ <AddMovieReviewPage /> } />
            <Route path="/movies/upcoming" element={<UpcomingMoviesPage/>}/>
            <Route path="/movies/toprated/:pageId" element={<TopRatedMoviesPage/>}/>
            <Route path="/movies/popular/:pageId" element={<PopularMoviesPage/>}/>
            <Route path="/movies/nowplaying" element={<NowPlayingMoviesPage/>}/>
            <Route path="/people/popular/:pageId" element={<PopularPeoplePage/>}/>
            <Route path="/actors/:id" element={<ActorDetailsPage/>}/>
            <Route path="/movies/watchlist" element={<WatchlistMoviesPage/>}/>


          </Routes>
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    </ThemeProvider>
  );
};



const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App />);
