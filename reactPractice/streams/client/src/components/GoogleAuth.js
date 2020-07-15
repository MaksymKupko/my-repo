import React from "react";

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
			window.gapi.client.init({
				clientId: process.env.REACT_APP_CLIENT_ID_KEY,
				scope: "email"
			})
		});
  }
  render() {
    return <div>Google Auth</div>;
  }
}

export default GoogleAuth;
