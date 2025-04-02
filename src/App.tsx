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
 * Entry point for your Dragonfruit AI federated app.
 *
 * The `App` component is exposed via Module Federation, which is defined in the `webpack.config.js` file.
 */

import React from 'react';
import {AppContent} from './AppContent';
import {DfAppContextProvider, DfAppProps, useDfAppContext} from './dragonfruit/context';

/**
 * Exported root/main component that wraps your custom content and provides
 * the useDfAppContext hook to all child components. This component will
 * be consumed by the host application, which will pass in relevant Dragonfruit
 * Launchpad application data.
 *
 * NOTE: You probably don't need to modify this. Rather edit the `AppContent` component.
 */
export const App: React.FC<DfAppProps> = (props) => {
  return (
    <DfAppContextProvider {...props}>
      <AppContent />
    </DfAppContextProvider>
  );
};

// very important that your app is the default export,
// otherwise module federation won't work properly
export default App;
