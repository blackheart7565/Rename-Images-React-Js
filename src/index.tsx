import React from 'react';
import ReactDOM from 'react-dom/client';

import { RenameImage } from "./components/RenameImage";
import { ThemeProvider } from "./components/provider/ThemeProvider";

import "./assets/fonts-import.scss";
import "./styles/index.css";
import "./styles/reset.css";
import "./styles/theme.css";

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>
		<ThemeProvider>
			<RenameImage />
		</ThemeProvider>
	</React.StrictMode>
);