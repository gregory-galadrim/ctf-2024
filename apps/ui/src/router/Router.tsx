import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SCOREBOARD_IDENTIFIER } from 'steps';
import { NotFoundPage } from '../pages/NotFound';
import { ScoreboardPage } from '../pages/scoreboard/Scoreboard';
import { ROUTE_PATH_TO_ELEMENT } from './routeDefinitions';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {Object.entries(ROUTE_PATH_TO_ELEMENT).map(([path, page], index) => (
          <Route key={index} path={path} element={page} />
        ))}
        <Route path={SCOREBOARD_IDENTIFIER} element={<ScoreboardPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};
