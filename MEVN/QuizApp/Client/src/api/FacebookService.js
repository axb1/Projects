

class FacebookService {
    static init() {
        window.fbAsyncInit = function() {
          window.FB.init({
            appId            : '3869199266499669',
            autoLogAppEvents : true,
            xfbml            : true,
            version          : 'v2.10'
          });
          window.FB.AppEvents.logPageView();
        };
    
        (function(d, s, id){
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) {return;}
          js = d.createElement(s); js.id = id;
          js.src = "//connect.facebook.net/en_US/sdk.js";
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
      }

      static login() {
        window.FB.login(function(response) {
            if (response.authResponse) {
                console.log("Nice");
            } else {
                console.log("Not nice");
                // cancelled
            }
        });
    }
}



export default FacebookService;