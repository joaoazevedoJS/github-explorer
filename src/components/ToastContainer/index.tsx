import { FC } from 'react';
import { useTransition } from 'react-spring';

import { Alert } from './Toast';

import { useToast } from '../../hooks/toast';

import { Container } from './styles';

const ToastContainer: FC = () => {
  const { messages } = useToast();

  const messagesWithTransitions = useTransition(
    messages,
    message => message.id,
    {
      from: { right: '-120%', opacity: 0 },
      enter: { right: '0%', opacity: 1 },
      leave: { right: '-120%', opacity: 0 },
    },
  );

  return (
    <Container>
      {messagesWithTransitions.map(({ item, key, props }) => (
        <Alert key={key} message={item} style={props} />
      ))}
    </Container>
  );
};

export { ToastContainer };
