import { FC, useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { RepositoryList } from '../../components/RepositoryList';

import { useRepository } from '../../hooks/repository';
import { useToast } from '../../hooks/toast';

import logoImg from '../../assets/logo.svg';

import { Container } from './styles';

interface FormData {
  username: string;
  repository: string;
}

const Dashboard: FC = () => {
  const { addRepository } = useRepository();
  const { addToast } = useToast();

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    (data: FormData) => {
      if (!data.username || !data.repository) {
        addToast({
          title: 'Informe todos os campos!',
          type: 'info',
        });

        return;
      }

      addRepository(data);

      formRef.current?.reset();
    },
    [addRepository, addToast],
  );

  return (
    <Container>
      <img src={logoImg} alt="Github Explorer" />

      <h1>Explore repositórios no Github.</h1>

      <Form onSubmit={handleSubmit} ref={formRef}>
        <Input name="username" placeholder="Nome do usuário" />
        <Input name="repository" placeholder="Digite o nome do repositório" />

        <Button>Pesquisar</Button>
      </Form>

      <RepositoryList />
    </Container>
  );
};

export default Dashboard;
