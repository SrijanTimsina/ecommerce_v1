import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
	<React.StrictMode>
		<PayPalScriptProvider deferLoading={true}>
			<App />
		</PayPalScriptProvider>
	</React.StrictMode>
);
