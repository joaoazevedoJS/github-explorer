import { FC } from 'react';

import { Providers } from './hooks';

import Routes from './routes';

import GlobalStyled from './styles/global';

const App: FC = () => {
  return (
    <Providers>
      <GlobalStyled />

      <Routes />
    </Providers>
  );
};

export default App;
