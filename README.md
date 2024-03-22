## How to run the app:
1.	Firstly, clone the concert-reservation and concert-server projects. 
2.	Within the concert-server project, create a .env file and perform the step follow the attach file in email add the following lines of code:

SUPABASE_URL= (follow the instructions provided in the attached document in an email)
SUPABASE_ANON_KEY= (follow the instructions provided in the attached document in an email)

3.	In the terminal of concert-reservation project, navigate to the concert-reservation directory and run the following command to start the development mode:

-	`npm install`

-	`npm run dev`

Similarly, in another terminal window, navigate to the concert-server directory and run the following command to start the server in development mode:

-	`npm install`

-	`npm run start:dev`

Upon successful execution, you will observe that concert-reservation is running on port 3000, while concert-server is running on port 4000.

## Overview:
Frontend (concert-reservation):
•	Built using Next.js, a React framework for server-side rendering and client-side navigation.
•	Handles user interaction, rendering views, and communicating with backend services. 
•	Utilizes React Context, a state management library, to manage application state efficiently. This allows for seamless updates and synchronization of data across different components of the application.

Backend (concert-server):
•	Developed with NestJS, a progressive Node.js framework for building efficient, reliable, and scalable server-side applications. 
•	Implements RESTful APIs and handles business logic, data processing, and integration with external services. 

Database (Supabase):
•	Stores application data such as user profiles, concert details, and reservation information.
•	Utilizes a relational database management system for structured data storage. 

## Libraries/Packages Used:
•	Next.js: A React framework for building server-side rendered (SSR) and statically generated web applications. It provides features like automatic code splitting, routing, and server-side rendering, enhancing performance and SEO.

•	NestJS: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications. It follows the modular architecture pattern and integrates seamlessly with TypeScript, providing features like dependency injection, middleware, and decorators for building robust APIs.

•	React Context: A state management library in React for sharing data across the component tree without having to pass props manually at every level. It simplifies the process of managing application state, enabling components to access and update shared data efficiently.

•	Supabase: An open-source alternative to Firebase for building modern web applications with PostgreSQL as the database backend. It provides features like real-time database, authentication, authorization, and serverless functions, enabling developers to build scalable and secure applications quickly.

•	dotenv: A zero-dependency module for loading environment variables from a .env file into process.env. It simplifies configuration management by allowing developers to define environment-specific variables and secrets without hardcoding them into the codebase.

•	axios: A promise-based HTTP client for making asynchronous HTTP requests in the browser and Node.js. It simplifies the process of sending HTTP requests and handling responses, providing features like interceptors, request cancellation, and error handling.

•	Jest: A JavaScript testing framework for writing unit tests and integration tests for React components, NestJS services, and API endpoints. It provides features like test runners, assertions, mocks, and spies for ensuring code quality and reliability.

## Run the unit tests:

• follow the instructions provided in the attached document in an email and run the following command to start the test.

-	`npm run test`

