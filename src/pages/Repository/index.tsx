import { FC, useEffect, useState } from 'react';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import { IssuesList } from '../../components/IssuesList';

import {
  Repository as RepositoryProps,
  useRepository,
} from '../../hooks/repository';

import { Header, RepositoryInfo } from './styles';
import { useToast } from '../../hooks/toast';

interface RepositoryParam {
  repository: string;
}

const Repository: FC = () => {
  const { params } = useRouteMatch<RepositoryParam>();
  const history = useHistory();

  const { getRepositoryByFullName } = useRepository();
  const { addToast } = useToast();

  const [repository, setRepository] = useState<RepositoryProps | null>(null);

  useEffect(() => {
    getRepositoryByFullName(params.repository).then(response => {
      if (!response) {
        addToast({
          title: 'Aconteceu um erro!',
          description:
            'Não foi possivel encontrar o repósitorio! tente novamente!',
          type: 'error',
        });

        history.push('/');
      } else {
        setRepository(response);
      }
    });
  }, [params.repository, getRepositoryByFullName, addToast, history]);

  return (
    <>
      <Header>
        <img src={logoImg} alt="Github Explorer" />

        <Link to="/">
          <FiChevronLeft size={20} />
          Voltar
        </Link>
      </Header>

      {repository && (
        <RepositoryInfo>
          <header>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />

            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
          </header>

          <ul>
            <li>
              <strong>{repository.stargazers_count}</strong>
              <span>Stars</span>
            </li>

            <li>
              <strong>{repository.forks_count}</strong>
              <span>Forks</span>
            </li>

            <li>
              <strong>{repository.open_issues_count}</strong>
              <span>Issues abertas</span>
            </li>
          </ul>
        </RepositoryInfo>
      )}

      <IssuesList repository={params.repository} />
    </>
  );
};

export default Repository;
