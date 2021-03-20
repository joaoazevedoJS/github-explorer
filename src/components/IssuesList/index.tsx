import { FC, useCallback, useEffect, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { useToast } from '../../hooks/toast';

import api from '../../services/api';

import { Container } from './styles';

interface Issue {
  title: string;
  id: number;
  html_url: string;
  user: {
    login: string;
  };
}

interface IssuesListProps {
  repository: string;
}

const IssuesList: FC<IssuesListProps> = ({ repository }) => {
  const [page, setPage] = useState(2);
  const [isLast, setisLast] = useState(true);
  const [issues, setIssues] = useState<Issue[]>([]);

  const { addToast } = useToast();

  useEffect(() => {
    async function loadIssues() {
      const response = await api.get<Issue[]>(
        `repos/${repository}/issues?page=1`,
      );

      setIssues(response.data);

      if (response.data.length > 0) {
        setisLast(false);
      }
    }

    loadIssues();
  }, [repository]);

  const handleLoadIssues = useCallback(async () => {
    try {
      const response = await api.get<Issue[]>(
        `repos/${repository}/issues?page=${page}`,
      );

      if (response.data.length === 0) {
        setisLast(true);
      } else {
        setIssues([...issues, ...response.data]);
      }

      setPage(page + 1);
    } catch (error) {
      addToast({
        title: 'Aconteceu um erro, por favor tente novamente!',
        type: 'error',
      });
    }
  }, [repository, page, issues, addToast]);

  return (
    <Container>
      {issues.map(issue => (
        <li key={issue.id}>
          <a target="blank" href={issue.html_url}>
            <strong>{issue.title}</strong>
            <p>{issue.user.login}</p>
          </a>

          <FiChevronRight size={20} />
        </li>
      ))}

      {!isLast && (
        <button type="button" onClick={handleLoadIssues}>
          Carregar mais!
        </button>
      )}
    </Container>
  );
};

export { IssuesList };
