'use client';
import React from 'react';
import { Overview } from '@/interface/Overview';
import { Ticket } from '@/interface/Ticket';
interface TicketContextType {
  tickets: any[];
  setTickets: React.Dispatch<React.SetStateAction<any[]>>;
}
const TicketContext = React.createContext<TicketContextType>({
  tickets: [],
  setTickets: () => {},
});

export const TicketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tickets, setTickets] = React.useState<any[]>([]);

  return (
    <TicketContext.Provider value={{ tickets, setTickets }}>
      {children}
    </TicketContext.Provider>
  );
};

export function useTicketContext() {
  const context = React.useContext(TicketContext);

  if (context === undefined) {
    throw new Error('useTicket must be used within a TicketProvider');
  }
  return context;
}
