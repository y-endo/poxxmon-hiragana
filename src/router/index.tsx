import { createBrowserRouter } from 'react-router-dom';

import { Home } from '@/pages/Home';
import { Lobby } from '@/pages/Lobby';
import { Stage } from '@/pages/Stage';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/lobby',
      element: <Lobby />,
    },
    {
      path: '/stage/:id',
      element: <Stage />,
    },
  ],
  {
    basename: '/pokemon',
  }
);
