import { createContext, FC, useCallback, useContext, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { ToastContainer } from '../components/ToastContainer';

export interface Message {
  id: string;
  type: 'success' | 'error' | 'warn' | 'info';
  title: string;
  description?: string;
}

interface ToastContextData {
  messages: Message[];
  addToast(data: Omit<Message, 'id'>): void;
  removeToast(id: string): void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: FC = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const addToast = useCallback(
    (data: Omit<Message, 'id'>) => {
      const id = uuid();

      const message: Message = {
        id,
        ...data,
      };

      setMessages([...messages, message]);
    },
    [messages],
  );

  const removeToast = useCallback(
    (id: string) => {
      const Toasts = messages.filter(message => message.id !== id);

      setMessages(Toasts);
    },
    [messages],
  );

  return (
    <ToastContext.Provider value={{ messages, addToast, removeToast }}>
      <ToastContainer />

      {children}
    </ToastContext.Provider>
  );
};

function useToast(): ToastContextData {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used whitin an ToastProvider');
  }

  return context;
}

export { ToastProvider, useToast };
