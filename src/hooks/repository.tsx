import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { useToast } from './toast';

import api from '../services/api';

export interface Repository {
  id: number;
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface AddRepositoryProps {
  username: string;
  repository: string;
}

interface RepositoryContextData {
  repositories: Repository[];
  addRepository(data: AddRepositoryProps): void;
  getRepositoryByFullName(fullname: string): Promise<Repository | null>;
}

const RepositoryContext = createContext<RepositoryContextData>(
  {} as RepositoryContextData,
);

const RepositoryProvider: FC = ({ children }) => {
  const { addToast } = useToast();

  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storagedRepositories = localStorage.getItem(
      '@GithubExplorer:repositories',
    );

    return storagedRepositories ? JSON.parse(storagedRepositories) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      '@GithubExplorer:repositories',
      JSON.stringify(repositories),
    );
  }, [repositories]);

  const addRepository = useCallback(
    async (data: AddRepositoryProps) => {
      const fullname = `${data.username}/${data.repository}`;

      const repositoryAlreadyAdded = repositories.find(
        repository =>
          repository.full_name.toLocaleLowerCase() ===
          fullname.toLocaleLowerCase(),
      );

      if (repositoryAlreadyAdded) {
        addToast({
          title: 'Repositório já foi adicionado!',
          type: 'warn',
        });

        return;
      }

      try {
        const response = await api.get<Repository>(`/repos/${fullname}`);

        setRepositories([...repositories, response.data]);
      } catch (e) {
        addToast({
          title: 'Erro ao adicionar repositório!',
          description:
            'Aconteceu um erro ao adicionar um repositório, por favor tente novamente!',
          type: 'error',
        });
      }
    },
    [repositories, addToast],
  );

  const getRepositoryByFullName = useCallback(
    async (fullname: string) => {
      const repository = repositories.find(
        repo =>
          repo.full_name.toLocaleLowerCase() === fullname.toLocaleLowerCase(),
      );

      if (!repository) {
        try {
          const response = await api.get<Repository>(`/repos/${fullname}`);

          return response.data;
        } catch (error) {
          return null;
        }
      }

      return repository ?? null;
    },
    [repositories],
  );

  return (
    <RepositoryContext.Provider
      value={{ repositories, addRepository, getRepositoryByFullName }}
    >
      {children}
    </RepositoryContext.Provider>
  );
};

function useRepository(): RepositoryContextData {
  const context = useContext(RepositoryContext);

  if (!context) {
    throw new Error('useRepository must be used within an RepositoryContext');
  }

  return context;
}

export { RepositoryProvider, useRepository };
