import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

export type Expense = {
  id: string;
  name: string;
  category: string;
  amount: number;
  payee: string;
  refCheque: string;
  description: string;
  paymentMethod: string;
  status: string;
  date: string;
};

export type ExpenseContextType = {
  expenses: Expense[];
  setExpenses: Dispatch<SetStateAction<Expense[]>>;
};

export const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export type ExpenseProviderProps = {
  children: ReactNode;
};

export const ExpenseProvider = ({ children }: ExpenseProviderProps) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  return (
    <ExpenseContext.Provider value={{ expenses, setExpenses }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenseContext = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpenseContext must be used within an ExpenseProvider');
  }
  return context;
};