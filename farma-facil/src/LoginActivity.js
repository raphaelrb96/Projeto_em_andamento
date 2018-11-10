function loginFace() {
	let ui = new firebaseui.auth.AuthUI(firebase.auth());

	let uiConfig = {
	  callbacks: {
	    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
	      // User successfully signed in.
	      // Return type determines whether we continue the redirect automatically
	      // or whether we leave that to developer to handle.
	      //window.location.assign('index.html');
	      return true;
	    },
	    uiShown: function() {
	      // The widget is rendered.
	      // Hide the loader.
	    }
	  },
	  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
	  signInFlow: 'popup',
	  signInSuccessUrl: 'index.html',
	  signInOptions: [
	    // Leave the lines as is for the providers you want to offer your users.
	    firebase.auth.FacebookAuthProvider.PROVIDER_ID
	  ],
	  // Terms of service url.
	  tosUrl: '',
	  // Privacy policy url.
	  privacyPolicyUrl: 'privacidade.html'
	};

	ui.start('#firebaseui-auth-container', uiConfig);

}

loginFace();
