import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { AppError } from "./_helpers/errorBoundaries/ErrorBoundaries";
import App from "./App";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "bootstrap-css-only/css/bootstrap.min.css";
// import "mdbreact/dist/css/mdb.css";

import { Provider } from "react-redux";
import store, { persistor } from "./store";
// import persistor from './store'

import { PersistGate } from "redux-persist/integration/react";

import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

Sentry.init({
  dsn: "https://09409ae496504f629a14052828d9ff66@o1206994.ingest.sentry.io/6340457",
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

const options = {
  timeout: 5000,
  offset: "75px",
  position: positions.TOP_RIGHT,
  transition: transitions.SCALE,
};

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AlertProvider template={AlertTemplate} {...options}>
        <BrowserRouter>
          <AppError>
            <App />
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </AppError>
        </BrowserRouter>
      </AlertProvider>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
