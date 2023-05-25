import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<GoogleOAuthProvider
			onScriptLoadSuccess={() => console.log('done')}
			clientId="900060458839-akv3r66ifh4mcq51l7pm8uaqqf1m7j6f.apps.googleusercontent.com"
		>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</GoogleOAuthProvider>
	</React.StrictMode>,
);
