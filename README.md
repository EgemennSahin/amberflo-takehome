## Getting Started

First, install the dependencies with:

```bash
npm install
```

Secondly, make sure you have the following environment variables:

```bash
AMBERFLO_API_KEY=<your-api-key-here>
ENVIRONMENT="http://localhost:3000"
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

When deploying, make sure you change your ENVIRONMENT variable to your domain to make sure you don't run into CORS issues.

## Things I would have wanted to add

- Adding Redux to store the data, and therefore being able to get one meter's data without having to pick between:
  - Calling GET and then finding the meter with the id (Too much network usage)
  - Using the Context API to store the data on fetch (Implemented this with fetch on data loss for improved UX)
- Styling with Material UI (First time)
- Consolidations
  - CreateMeter.tsx and Meter.tsx into Meter.tsx as they are similar components (did not extensively optimize code for to optimize for time)
  - create_meter, get_meters, and update_meter API routes into meter route as they are each different methods (POST, GET, PUT)
- Checking for errors
  - Creating and updating meters currently send the user to the landing page without any confirmation except for the new data
  -
