import React from 'react';
import ReactDOM from 'react-dom/client';

import { RenameImage } from "./components/RenameImage";

import "./styles/reset.css";
import "./assets/fonts-import.scss";
import "./styles/theme.css";
import "./styles/index.css";

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>
		<RenameImage />
	</React.StrictMode>
);