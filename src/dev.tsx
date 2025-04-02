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
 * Local development entry point for your federated app.
 *
 * This file renders the main App component with sample props
 * to simulate the host application's environment during development.
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const root = document.getElementById('root');

if (root) {
  createRoot(root).render(
    <React.StrictMode>
      <App
        apiHost={window.location.host}
        customerId="demo"
        appId={1234}
        getAuthToken={async () => 'demo-token'}
      />
    </React.StrictMode>
  );
}
