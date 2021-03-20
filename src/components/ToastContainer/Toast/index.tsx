import { FC, useEffect } from 'react';
import {
  FiAlertCircle,
  FiAlertTriangle,
  FiCheckCircle,
  FiX,
  FiXCircle,
} from 'react-icons/fi';

import { useToast, Message } from '../../../hooks/toast';

import { Container } from './styles';

interface AlertProps {
  message: Message;
  style: object;
}

const toastType = {
  info: <FiAlertCircle />,
  warn: <FiAlertTriangle />,
  success: <FiCheckCircle />,
  error: <FiXCircle />,
};

const Alert: FC<AlertProps> = ({ message, style }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [removeToast, message.id]);

  return (
    <Container type={message.type} style={style}>
      {toastType[message.type]}

      <div>
        <span>{message.title}</span>

        {message.description && <p>{message.description}</p>}
      </div>

      <button type="button" onClick={() => removeToast(message.id)}>
        <FiX size={20} />
      </button>
    </Container>
  );
};

export { Alert };
