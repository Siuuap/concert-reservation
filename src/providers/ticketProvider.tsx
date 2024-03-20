import { TicketProvider } from '@/contexts/ticketContext';

export const Providers: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <TicketProvider>{children}</TicketProvider>;
};
