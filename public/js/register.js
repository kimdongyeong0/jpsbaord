function _0x13e1(){const _0x32673a=['1069452AdadCw','5450517tJrggu','473MYhoTZ','G-T7EQ6M18KS','166IvKQnj','4427880OdkmNo','AIzaSyCUJu-ylJ3_t6zoJfSVojeIYGw_2qXD26w','initializeApp','18070SUsjPK','4724505CGoUAV','56bwEbhI','120UOICLO','jpsboard-a1e0c.appspot.com','18296TyYeAu','122366241575','618107IetMax','jpsboard-a1e0c.firebaseapp.com'];_0x13e1=function(){return _0x32673a;};return _0x13e1();}const _0x444b8d=_0x84db;(function(_0xd7539f,_0x22c600){const _0x10d431=_0x84db,_0x41fab9=_0xd7539f();while(!![]){try{const _0x249115=-parseInt(_0x10d431(0x1ef))/0x1*(parseInt(_0x10d431(0x1e6))/0x2)+parseInt(_0x10d431(0x1e3))/0x3+-parseInt(_0x10d431(0x1e7))/0x4+parseInt(_0x10d431(0x1eb))/0x5+-parseInt(_0x10d431(0x1ed))/0x6*(-parseInt(_0x10d431(0x1f1))/0x7)+parseInt(_0x10d431(0x1ec))/0x8*(-parseInt(_0x10d431(0x1e2))/0x9)+-parseInt(_0x10d431(0x1ea))/0xa*(parseInt(_0x10d431(0x1e4))/0xb);if(_0x249115===_0x22c600)break;else _0x41fab9['push'](_0x41fab9['shift']());}catch(_0x2a1d7f){_0x41fab9['push'](_0x41fab9['shift']());}}}(_0x13e1,0xf25d5));function _0x84db(_0x35df66,_0x523868){const _0x13e1c4=_0x13e1();return _0x84db=function(_0x84db16,_0x341f58){_0x84db16=_0x84db16-0x1e1;let _0x2cf8e0=_0x13e1c4[_0x84db16];return _0x2cf8e0;},_0x84db(_0x35df66,_0x523868);}const firebaseConfig={'apiKey':_0x444b8d(0x1e8),'authDomain':_0x444b8d(0x1e1),'projectId':'jpsboard-a1e0c','storageBucket':_0x444b8d(0x1ee),'messagingSenderId':_0x444b8d(0x1f0),'appId':'1:122366241575:web:61c5a0f364dd707be7d702','measurementId':_0x444b8d(0x1e5)};firebase[_0x444b8d(0x1e9)](firebaseConfig);

//---------------------------------------------------------------//


  // '출생 연도' 셀렉트 박스 option 목록 동적 생성
  const yearOfAdmissionEl = document.querySelector('#birth-year')
  // option 목록 생성 여부 확인
  isYearOptionExisted = false;
  yearOfAdmissionEl.addEventListener('focus', function () {
    // year 목록 생성되지 않았을 때 (최초 클릭 시)
    if(!isYearOptionExisted) {
      isYearOptionExisted = true
      for(var i = 2000; i <= 2030; i++) {
        // option element 생성
        const YearOption = document.createElement('option')
        YearOption.setAttribute('value', i)
        YearOption.innerText = i
        // yearOfAdmissionEl의 자식 요소로 추가
        this.appendChild(YearOption);
      }
    }
  });


//---------------------------------------------------------------//


  const db = firebase.firestore();

  let localStorageSaved = localStorage.getItem('user');
  if (localStorageSaved !== null) {
    $('#userName').html(JSON.parse(localStorageSaved).displayName + ' 님');
  } else {
    $('#userName').html('로그인 또는 회원가입 후 서비스 이용이 가능합니다');
  }

  firebase.auth().onAuthStateChanged((user)=>{
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    }
  })

  verifyEmail = function() {
    // 이메일 검증 스크립트 작성
    let emailVal = $("#email-new").val();

    // 검증에 사용할 정규식 변수 regExp에 저장
    let regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    if (emailVal.match(regExp) == null) {
      //정규식에 맞지않으면 return null
      alert('이메일을 올바르게 입력해주세요');
    }
  };

  verifyPassword =function() {
    let passwordVal = $("#pw-new").val();

    let regExp = /^.*(?=^.{6,12}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

    if (passwordVal.match(regExp) == null) {
      //정규식에 맞지않으면 return null
      alert('특수문자(!@#$%^&+=), 영문자, 숫자를 포함한 6~12 자리의 비밀번호를 올바르게 입력해주세요');
    }
  }


  let is_checked = false;

  $('#checkbox').click(function(){
        // 1. checkbox element를 찾습니다.
        const checkbox = document.getElementById('checkbox');

        // 2. checked 속성을 체크합니다.
        is_checked = checkbox.checked;
  })

  let nickName = $('#nickName').val();
  let nickNameCheck = false;

  function checkNicknameExists(nickName) {
    // Check if the nickname already exists in the database
    db.collection('users')
      .where('nickName', '==', nickName)
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          // If the nickname already exists, throw an error
          throw new Error('Nickname already exists');
        } else {
          // If the nickname does not exist, add the user to the database
          db.collection('users')
            .add({ nickName })
            .then((docRef) => {
              console.log(`User added with ID: ${docRef.id}`);
            })
            .catch((error) => {
              console.error(`Error adding user: ${error}`);
            });
        }
      })
      .catch((error) => {
        console.error(`Error checking for nickname: ${error}`);
      });
  }

  $('#nickNameCheckButton').click(function(){
    checkNicknameExists();
  })


  $('#register').click(function(){
    let email = $('#email-new').val();
    let pw = $('#pw-new').val();
    let yearOfAdmission = $('#birth-year').val();
    let nickName = $('#nickName').val();
    let realName = $('#my-name').val();
    let stuName = $('#stuName').val();
    let deleteAgree = is_checked;
    let date = new Date()

    verifyEmail();
    verifyPassword();

    let yearOfAdmissionVal = $("#birth-year").val();

    if (yearOfAdmissionVal == null) {
      //정규식에 맞지않으면 return null
      alert('입학 연도를 입력해주세요');
    } else if (nickNameCheck == fasle) {
      alert('닉네임 중복 체크를 해주세요')
    } else {
      firebase.auth().createUserWithEmailAndPassword(email, pw).then((result)=>{

        let userInfo = {
          nickName : nickName,
          stuName : stuName,
          email : email,
          yearOfAdmission : yearOfAdmission,
          deleteAgree : deleteAgree,
          date: date,
          realName : realName,
        }
        db.collection('user').doc(result.user.uid).set(userInfo)
        result.user.updateProfile( {displayName : nickName} )
        setTimeout(() => window.location.href = 'index.html', 1000);
      })
    }
  })
