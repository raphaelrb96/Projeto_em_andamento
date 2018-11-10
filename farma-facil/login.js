(function (d, s, id) {
              var js,
                  fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
              js = d.createElement(s);js.id = id;
              js.src = 'https://connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v3.2&appId=1010408422494276&autoLogAppEvents=1';
              fjs.parentNode.insertBefore(js, fjs);
})(document, 'script', 'facebook-jssdk');

function loginFace() {
              var provider = firebase.auth.FacebookAuthProvider();
              firebase.auth().signInWithPopup(provider).then(function (result) {
                            window.location.assign('index.html');
              }).catch(function (error) {
                            alert('Erro ao fazer login. Tente novamente !');
              });
}