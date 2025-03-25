
<h1 align="center">Launchpad Example App 🏗</h1>

<p align="center">
    <i>Powered by Dragonfruit AI's Launchpad Platform<br/>Build your own computer vision app in minutes.</i>
</p>

<p align="center">
    <a href="https://app.dragonfruit.ai/launchpad" target="_blank">
        <img alt="DragonFruit AI Logo" src="docs/copyright/df-logo.png" width=284/>
    </a>
</p>



## Overview

Launchpad provides the ability for 3rd party developers to build and integrate custom
applications into the platform. This allows custom functionality to be added and for
developers to leverage the platform's real-time inference capabilities combined with
their own services.

----

## Quick Start

This is an example app demonstrating how to build applications for
Dragonfruit AI's Launchpad platform.

> [!TIP]
> Fork this repo and walk through this quick start guid step-by-step to create your
> own custom Dragonfruit AI Launchpad application.

### 1. Setup Development Environment

In a terminal, run the following commands to set up your development environment:
```bash
# (1.1) clone the repository
git clone https://github.com/dragonfruit-ai/launchpad.git
# (1.2) navigate to the hello-world example
cd launchpad/examples/starter-app
# (1.3) install dependencies
yarn install
```

### 2. Run Development Server

Next, run the development server and view the starter app:
```bash
# (2.1) start the development server
yarn dev
# (2.2) Visit `http://localhost:8500` to see the app.
```

### 3. Customize the App

Customize the text shown in the app by editing `AppContent.tsx`. 

> [!TIP]
> With the development server running, you'll see the changes live upon saving.

### 4. Deploy your App

Now that you've customized the app, build and deploy it to a public URL
for integration with Dragonfruit AI's Launchpad platform.

```bash
# (4.1) Build the app into the `./dist` directory
yarn build
# (4.2) Deploy the `./dist` directory to a public URL with netlify, vercel, or similar.
#       We are specifically interested in `./dist/remote.js` which will export the `App`
```

<details>
<summary>Deploy with Netlify</summary>

```bash
# 1. Install the Netlify CLI
yarn global add netlify-cli
# 2. Login to Netlify
netlify login
# 3. Deploy the app
netlify deploy --dir=dist
```

</details>

<details>
<summary>Deploy with Vercel</summary>

```bash
# 1. Install the Vercel CLI
yarn global add vercel
# 2. Login to Vercel
vercel login
# 3. Deploy the app
vercel --prod
```

</details>

<details>
<summary>Temporarily deploy with <a href="https://app.netlify.com/drop">Netlify Drop</a></summary>

1. Visit [Netlify Drop](https://app.netlify.com/drop)
2. Drag and drop the `dist` directory onto the website

</details>


### 5. Integrate with Launchpad

Finally, integrate your app with Dragonfruit AI's Launchpad platform.

We are currently in beta, please contact Support on the [Dragonfruit AI Discord Server](https://discord.gg/mh5A46w2vV) for applying to be part of the program.


---------

## Developer Notes

For advanced developers, here are some additional notes:

<details>
<summary><b>Advanced Developer Notes</b></summary>

### Required Dependencies

- Node.js (LTS version recommended)
- Yarn package manager (recommended)
- React 18.0.0 (**strict requirement** for federation compatibility)
- React-dom 18.0.0 (**strict requirement** for federation compatibility)
- Webpack 5 with Module Federation (**strict requirement** for federation compatibility)

### Recommended Development Stack

- TypeScript for type safety and better development experience
- Styled Components for CSS-in-JS styling and component isolation
- ESLint and Prettier for code quality and formatting

### Architecture

All you need to do is modify the `AppContent.tsx` file to build your
custom application. The rest of the codebase mostly handles the
integration with Dragonfruit AI's Launchpad platform and the Webpack
Module Federation setup.

```bash
/
├── package.json         # Project dependencies
├── tsconfig.json        # TypeScript configuration
├── webpack.config.js    # Webpack configuration
└── src/
    ├── App.tsx          # Root component using Launchpad interface
    ├── AppContent.tsx   # >>> Your custom app, modify this! <<<
    ├── dev.tsx          # Local development entry point
    ├── dev_index.html   # Local development HTML template
    └── dragonfruit/
        ├── api.ts       # Dragonfruit Querying example
        └── context.tsx  # Dragonfruit Launchpad inferface
```

Builds after running `yarn build`
```
/dist
├── index.html   # local entrypoint, can use to debug
├── main.js      # local entrypoint
└── remote.js    # remote component that needs to be served for launchpad
```

### Module Federation

This app uses Webpack Module Federation to expose components to the
host application. The `webpack.config.js` file contains the necessary
configuration to expose the `App` component.

Module Federation allows for dynamic loading of components from a
remote URL, enabling a parent application to load and render this
child application if it's hosted publicly.

#### Exposing Components

The app exposes its main component through Webpack Module Federation:

```javascript
// webpack.config.js
exposes: {
  './App': './src/App'
}
```

#### Parent App Integration

To use this component in a host application:

```javascript
const CustomApp = React.lazy(() => import('App/App'));

// Render with required props
<CustomApp
  host="your-host-domain"
  customer_id="123"
  app_id={1}
  getAuthToken={async () => 'your-auth-token'}
/>
```

#### Importing Components from Remote

**Coming Soon**
Documentation for importing and using remote components from our host app will be available in future updates.

### Launchpad Interface

#### Required Props

The following props are automatically provided by the host application when the component is invoked. You don't need to manually provide these values during integration:

- `host`: The domain where the app is hosted
- `customer_id`: Unique identifier for the customer
- `app_id`: Numeric identifier for the application
- `getAuthToken`: Function that returns a Promise resolving to an authentication token

#### API Usage Example

This example demonstrates how to make authenticated API calls to Dragonfruit's backend services. Here's a sample API call pattern:

```typescript
import { getSampleData } from './dragonfruit/api';
import { useDfAppContext } from './dragonfruit/context';

// Example usage in a component
const { api_host, customer_id, getAuthToken, app_id } = useDfAppContext();

const fetchData = async () => {
  const data = await getSampleData(api_host, customer_id, getAuthToken, api_host);
  // Process the data
};
```

### Development Guidelines

1. **Styling**: Use styled-components for styling. This ensures style isolation and consistent theming.

2. **TypeScript**: Maintain proper type definitions for all components and functions.

3. **Context Usage**: Utilize ParentAppContext for accessing host application data and authentication.

4. **Module Federation**: Follow the established pattern for exposing components:
   - Wrap with necessary providers (ParentAppContext)
   - Export through webpack.config.js
   - Maintain singleton shared dependencies

### Building for Production

```bash
yarn build
```

This creates a production build in the `dist` directory.

### Best Practices

1. Keep the bundle size minimal by only including necessary dependencies
2. Maintain proper TypeScript types for better integration
3. Follow React best practices and hooks guidelines
4. Use the ParentAppContext for accessing host application data
5. Ensure proper error handling and loading states

</details>

----
