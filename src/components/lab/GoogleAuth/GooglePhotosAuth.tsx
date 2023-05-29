// import { useGoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
const clientId = import.meta.env.VITE_CLIENT_ID;
const redirectUri = 'http://127.0.0.1:3000';
const scope = 'https://www.googleapis.com/auth/photoslibrary.readonly';

const authorizationUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
const GooglePhotosAuth = () => {
	const [authorizationCode, setAuthorizationCode] = useState('');
	// const login = useGoogleLogin({
	// 	onSuccess: (codeResponse) => console.log(codeResponse),
	// 	flow: 'auth-code',
	// });
	return (
		<div>
			<h1>Google Photos Authorization</h1>
			<button onClick={null}>Authorize</button>
			{/* {authorizationCode ? <p>Authorization code: {authorizationCode}</p> : <button onClick={null}>Authorize</button>} */}
			{/* <GoogleLogin
				shape="circle"
				onSuccess={(credentialResponse) => {
					console.log(credentialResponse);
				}}
				onError={() => {
					console.log('Login Failed');
				}}
				locale="en_US"
			/> */}
		</div>
	);
};

export default GooglePhotosAuth;
