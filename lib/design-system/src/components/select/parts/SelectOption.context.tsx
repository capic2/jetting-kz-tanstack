import { createContext, useContext } from 'react';

import type { PropsWithChildren } from 'react';

interface SelectOptionContextValue {
  isDisabled: boolean | undefined;
}

export const SelectOptionContext = createContext<SelectOptionContextValue>({
  isDisabled: undefined,
});

export function SelectOptionProvider({
  children,
  isDisabled,
}: PropsWithChildren<SelectOptionContextValue>) {
  return (
    <SelectOptionContext.Provider value={{ isDisabled }}>
      {children}
    </SelectOptionContext.Provider>
  );
}

export function useSelectOptionContext() {
  const context = useContext(SelectOptionContext);

  if (!context) {
    throw new Error(
      'useSelectOptionContext must be used within an SelectOptionProvider'
    );
  }

  return context;
}
