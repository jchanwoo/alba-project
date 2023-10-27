function fnOAuthNew(snscode) {
    var gourl = "https://www.alba.co.kr/main.asp?utm_source=google&utm_medium=paidsearch&utm_campaign=local&utm_content=pc_cpc&utm_term=%EC%95%8C%EB%B0%94%EC%B2%9C%EA%B5%AD&gclid=CjwKCAjw-eKpBhAbEiwAqFL0mtevoAptTKXchY7uUU6ELQtfUarloxMJFf8g2fgxspKFx4_R2M_3AxoC6lsQAvD_BwE";
    if (gourl == "") {	//gourl이 없는 경우에는 opener 경로로 판단함.
        gourl = opener.document.location.href;
    }
    gourl = gourl.toLowerCase();

    if (gourl.indexOf("/auth/loginperson.asp") > 0 ||
        gourl.indexOf("/person/resume/") > 0 ||
        gourl.indexOf("/person/online/") > 0 ||
        gourl.indexOf("/person/email/") > 0 ||
        gourl.indexOf("/person/resumeread/") > 0 ||
        gourl.indexOf("/person/cert/") > 0) {
        alert("해당 서비스는 개인회원으로 로그인 후 이용가능합니다.");
    } else if (gourl.indexOf("/auth/loginbiz.asp") > 0 || gourl.indexOf("/biz/") > 0) {
        alert("해당 서비스는 기업회원으로 로그인 후 이용가능합니다.");
    } else {
        OauthLoginCLS.doLogin(snscode);

        var category2 = "";
        if (snscode == "F") category2 = "FACEBOOK";
        else if (snscode == "N") category2 = "NAVER";
        else if (snscode == "K") category2 = "KAKAO";
        else if (snscode == "G") category2 = "GOOGLE";
        else if (snscode == "A") category2 = "APPLE";

        BA.Collect("EVENT", {
            "category1": "로그인 - 알바천국"
        ,	"category2": category2
        ,	"pageurl": location.pathname
        });
    }
}

//---------------------------------------------------------------
// COMMON OAUTH
//---------------------------------------------------------------
var OAUTH_CONFIG = {"SITE":"ALBA", "SVCTYPE":"REAL", "ADULTCERT":"", "MOBILE":"N", "POPUP":"Y"};
var OAUTH_SITECD = {"FACEBOOK":"FACEBOOK", "NAVER":"NAVER", "KAKAO":"KAKAO", "GOOGLE":"GOOGLE", "APPLE":"APPLE"};
OauthLoginCLS.init();
//---------------------------------------------------------------
// FACEBOOK OAUTH
//---------------------------------------------------------------
window.fbAsyncInit = function() {
    FB.init({ appId:OAUTH_FAPPID.ALBA, cookie:true, version:'v12.0', xfbml:true });
    FB.getLoginStatus(function(response) {
        if (response.status === "connected") {
            FB.logout(function(response) {});
        }
    });
};
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/ko_KR/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
//---------------------------------------------------------------
// KAKAO OAUTH
//---------------------------------------------------------------
Kakao.init(OAUTH_KAPPID.ALBA);
//---------------------------------------------------------------
// GOOGLE OAUTH
//---------------------------------------------------------------
window.googleInit = function() {
    gapi.load("auth2", function() {
        window.gauth = gapi.auth2.init({
            client_id: OAUTH_GAPPID.ALBA
        });
        gauth.then(function() {
            if (gauth.isSignedIn.get()) {
                gauth.signOut();
            }
        }, function() {
        });
    });
};

