/*
Copyright 2025 Dragonfruit AI

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

/**
 * Context provider for integrating with the host Dragonfruit AI launchpad platform.
 *
 * This file defines a React context to pass host application data (e.g., host, customer_id)
 * to the federated component forming your app. A hook is provided for easy access to the data.
 *
 * NOTE: This file will most likely be provided as an official Dragonfruit AI library in the near future.
 */

import React, { createContext, useContext } from 'react';

/**
 * Data available inside your federated component from the host Dragonfruit AI Launchpad application.
 * Accessible via the `useDfAppContext` hook.
 */
interface DfAppContextType {
  host: string;
  customer_id: string;
  app_id: number;
  getAuthToken: () => Promise<string>;
}

const DfAppContext = createContext<DfAppContextType | undefined>(undefined);

/**
 * Props passed to your federated component by the host Dragonfruit AI Launchpad application.
 */
export interface DfAppProps {
  host: string;
  customer_id: string;
  app_id: number;
  getAuthToken: () => Promise<string>;
}

interface DfAppContextProviderProps extends DfAppProps {
  children?: React.ReactNode;
}

/**
 * DfAppContextProvider component.
 *
 * Provides host launchpad application data to child components via the `useDfAppContext` context.
 */
export const DfAppContextProvider: React.FC<DfAppContextProviderProps> = ({
  host,
  customer_id,
  app_id,
  getAuthToken,
  children,
}) => {
  const value = {
    host,
    customer_id,
    app_id,
    getAuthToken,
  };

  return (
    <DfAppContext.Provider value={value}>
      {children}
    </DfAppContext.Provider>
  );
};

/**
 * Hook to access the parent launchpad context.
 *
 * Allows components to retrieve host launchpad platform data; must be used within a DfAppContextProvider.
 * @throws {Error} If used outside a DfAppContextProvider.
 */
export const useDfAppContext = (): DfAppContextType => {
  const context = useContext(DfAppContext);
  if (!context) {
    throw new Error('useDfAppContext must be used within a DfAppContextProvider');
  }
  return context;
};
