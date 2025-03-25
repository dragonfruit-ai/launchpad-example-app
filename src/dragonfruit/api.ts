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
 * API utility for fetching sample data from Dragonfruit's backend.
 *
 * Demonstrates how to make authenticated requests using host-provided credentials.
 */

import axios from 'axios';

export interface SampleData {
  id: string;
  name: string;
  description: string;
}

/**
 * Fetches sample data from the Dragonfruit AI backend.
 *
 * Makes an authenticated GET request using the provided host, customer ID,
 * authentication token, and app ID.
 *
 * @param api_host - The API host domain.
 * @param customer_id - The customer identifier.
 * @param getAuthToken - Function to retrieve the authentication token.
 * @param app_id - The application identifier.
 * @returns A promise resolving to an array of SampleData, or an empty array on failure.
 */
export const getSampleData = async (
  api_host: string,
  customer_id: number,
  getAuthToken: () => Promise<string>,
  app_id: number
): Promise<SampleData[]> => {
  try {
    if (api_host && customer_id && getAuthToken && app_id) {
      const token = await getAuthToken();
      const response = await axios.get(
        `${api_host}/customer/${customer_id}/apps/${app_id}/sample`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    }
    return [];
  } catch (error) {
    console.error('Error fetching sample data:', error);
    return [];
  }
};
