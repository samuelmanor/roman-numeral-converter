import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { defaultTheme, Provider } from "@adobe/react-spectrum";
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://a56702b0f68ec8f23bfbb13cc23a78d6@o4509073295933440.ingest.us.sentry.io/4509073297702912",
  integrations: [Sentry.browserTracingIntegration()],
  tracesSampleRate: 1.0, // Adjust this value in production as needed
  tracePropagationTargets: [
    "https://localhost:3000", // Frontend URL to trace requests
    "http://localhost:8080", // Backend URL to trace requests
  ],
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider theme={defaultTheme}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
