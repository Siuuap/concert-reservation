'use client';
import React from 'react';

interface TicketContextType {
  tickets: any[];
  setTickets: React.Dispatch<React.SetStateAction<any[]>>;
  history: any[];
  setHistory: React.Dispatch<React.SetStateAction<any[]>>;
}
const TicketContext = React.createContext<TicketContextType>({
  tickets: [],
  setTickets: () => {},
  history: [],
  setHistory: () => {},
});

export const TicketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tickets, setTickets] = React.useState<any[]>([]);
  const [history, setHistory] = React.useState<any[]>([]);

  return (
    <TicketContext.Provider
      value={{ tickets, setTickets, history, setHistory }}
    >
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
