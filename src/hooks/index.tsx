import { FC } from 'react';

import { ToastProvider } from './toast';
import { RepositoryProvider } from './repository';

const Providers: FC = ({ children }) => {
  return (
    <ToastProvider>
      <RepositoryProvider>{children}</RepositoryProvider>
    </ToastProvider>
  );
};

export { Providers };
