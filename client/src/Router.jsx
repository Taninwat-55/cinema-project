import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import LandingPage from './pages/LandingPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import MovieDetailPage from './pages/MovieDetailPage';
import BookingPage from './pages/BookingPage';
import WatchlistPage from './pages/WatchlistPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <LandingPage /> },
      { path: '/sign-in', element: <SignInPage /> },
      { path: '/sign-up', element: <SignUpPage /> },
      // { path: "/movie-detail", element: <MovieDetailPage /> },
      { path: '/movie-detail/:id', element: <MovieDetailPage /> },
      // { path: "/booking", element: <BookingPage /> },
      { path: '/booking/:showing_id', element: <BookingPage /> },
      { path: '/watchlist', element: <WatchlistPage /> },
    ],
  },
  { path: '*', element: <h1>404 - Page Not Found</h1> },
]);
