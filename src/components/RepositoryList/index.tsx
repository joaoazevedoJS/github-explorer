import { FC } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

import { Container } from './styles';
import { useRepository } from '../../hooks/repository';

const RepositoryList: FC = () => {
  const { repositories } = useRepository();

  return (
    <Container>
      {repositories.map(repository => (
        <Link key={repository.id} to={`/repositories/${repository.full_name}`}>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />

          <div>
            <strong>{repository.full_name}</strong>
            <p>{repository.description}</p>
          </div>

          <FiChevronRight size={20} />
        </Link>
      ))}
    </Container>
  );
};

export { RepositoryList };
