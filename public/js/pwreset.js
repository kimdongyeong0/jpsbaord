function _0x13e1(){const _0x32673a=['1069452AdadCw','5450517tJrggu','473MYhoTZ','G-T7EQ6M18KS','166IvKQnj','4427880OdkmNo','AIzaSyCUJu-ylJ3_t6zoJfSVojeIYGw_2qXD26w','initializeApp','18070SUsjPK','4724505CGoUAV','56bwEbhI','120UOICLO','jpsboard-a1e0c.appspot.com','18296TyYeAu','122366241575','618107IetMax','jpsboard-a1e0c.firebaseapp.com'];_0x13e1=function(){return _0x32673a;};return _0x13e1();}const _0x444b8d=_0x84db;(function(_0xd7539f,_0x22c600){const _0x10d431=_0x84db,_0x41fab9=_0xd7539f();while(!![]){try{const _0x249115=-parseInt(_0x10d431(0x1ef))/0x1*(parseInt(_0x10d431(0x1e6))/0x2)+parseInt(_0x10d431(0x1e3))/0x3+-parseInt(_0x10d431(0x1e7))/0x4+parseInt(_0x10d431(0x1eb))/0x5+-parseInt(_0x10d431(0x1ed))/0x6*(-parseInt(_0x10d431(0x1f1))/0x7)+parseInt(_0x10d431(0x1ec))/0x8*(-parseInt(_0x10d431(0x1e2))/0x9)+-parseInt(_0x10d431(0x1ea))/0xa*(parseInt(_0x10d431(0x1e4))/0xb);if(_0x249115===_0x22c600)break;else _0x41fab9['push'](_0x41fab9['shift']());}catch(_0x2a1d7f){_0x41fab9['push'](_0x41fab9['shift']());}}}(_0x13e1,0xf25d5));function _0x84db(_0x35df66,_0x523868){const _0x13e1c4=_0x13e1();return _0x84db=function(_0x84db16,_0x341f58){_0x84db16=_0x84db16-0x1e1;let _0x2cf8e0=_0x13e1c4[_0x84db16];return _0x2cf8e0;},_0x84db(_0x35df66,_0x523868);}const firebaseConfig={'apiKey':_0x444b8d(0x1e8),'authDomain':_0x444b8d(0x1e1),'projectId':'jpsboard-a1e0c','storageBucket':_0x444b8d(0x1ee),'messagingSenderId':_0x444b8d(0x1f0),'appId':'1:122366241575:web:61c5a0f364dd707be7d702','measurementId':_0x444b8d(0x1e5)};firebase[_0x444b8d(0x1e9)](firebaseConfig);

//---------------------------------------------------------------//


const db = firebase.firestore();

  let localStorageSaved = localStorage.getItem('user');

  if (localStorageSaved == null) {
    $('#signRegister').append('<a class="btn btn-primary" id="sign&register" aria-current="page" href="./sign&register.html" style="margin-left: 8px;">로그인 & 회원가입</a>');
  } else if (localStorageSaved != null) {
    $('#signRegister').append('<a class="btn btn-primary" id="sign&register" aria-current="page" href="./sign&register.html" style="margin-left: 8px;">계정 관리</a>');
  }

  if (localStorageSaved !== null) {
    $('#userName').html(JSON.parse(localStorageSaved).displayName + ' 님');
  } else {
    $('#userName').html('로그인 또는 회원가입 후 서비스 이용이 가능합니다');
  }

  function sendPasswordReset() {
    const email = $('#pwReset').val();
    // [START auth_send_password_reset]
    firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
        alert('비밀번호 재설정 메일을 성공적으로 보냈습니다. 메일이 오지 않았다면 스팸메일함을 확인해주시기 바랍니다. 스팸메일함에도 메일이 오지 않았을 경우에는 개발팀에 문의헤주세요.')
        // Password reset email sent!
        // ..
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        alert(errorCode, errorMessage);
        // ..
      });
    // [END auth_send_password_reset]
  }

  $("#pwreset").click(function(){
    sendPasswordReset();
  });