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
 * Your custom App content.
 */

import React from 'react';
import styled from 'styled-components';
import {useDfAppContext} from './dragonfruit/context';

// Styled components for your custom app component
// We recommend always using styled components to keep your styles organized
// so that global theme changes can be made easily.
const AppContainer = styled.div`
  padding: 20px;
  border-radius: 8px;
  background-color: #f5f5f5;
  text-align: center;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 16px;
`;

const Message = styled.p`
  color: #666;
  font-size: 18px;
`;

/**
 * Your custom app content.
 * @constructor
 */
export const AppContent: React.FC = () => {
  const ctx = useDfAppContext();
  return (
    <AppContainer>
      <Title>Your Custom App!</Title>
      <Message>This is a federated component running on {ctx.apiHost}, and compatible with the Dragonfruit AI Launchpad app platform.</Message>
    </AppContainer>
  );
};
