import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

document.addEventListener('DOMContentLoaded', () => {
    // Firebase 설정 객체
    const firebaseConfig = {
  apiKey: "AIzaSyBUL5n2TjoroAaWa6IKvdCWWwK2sqd3UMw",
  authDomain: "projectcoffee-27885.firebaseapp.com",
  projectId: "projectcoffee-27885",
  storageBucket: "projectcoffee-27885.appspot.com",
  messagingSenderId: "79885377304",
  appId: "1:79885377304:web:16d7d8c0160198059d486d"
};

    // Firebase 초기화
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    // 로그인 버튼 클릭 이벤트 리스너
    document.getElementById('login').addEventListener('click', () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                document.getElementById('message').textContent = '로그인 성공';
              // 로그인 성공 시 로컬 스토리지에 이메일 저장
                localStorage.setItem('userEmail', email);
              // 로그인 성공 시 main.html로 이동
                window.location.href = 'projectCoffee/main.html';
            })
            .catch(error => {
                handleAuthError(error);
            });
    });

    // 회원가입 버튼 클릭 이벤트 리스너
    document.getElementById('signup').addEventListener('click', () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                document.getElementById('message').textContent = '회원가입 성공';
            })
            .catch(error => {
                handleAuthError(error);
            });
    });

    // 인증 오류 처리 함수
    function handleAuthError(error) {
        let errorMessage = '인증 오류가 발생했습니다.';
        switch (error.code) {
            case 'auth/invalid-email':
                errorMessage = '유효하지 않은 이메일 형식입니다.';
                break;
            case 'auth/user-disabled':
                errorMessage = '이 계정은 비활성화되었습니다.';
                break;
            case 'auth/user-not-found':
                errorMessage = '이 이메일로 등록된 사용자를 찾을 수 없습니다.';
                break;
            case 'auth/wrong-password':
                errorMessage = '잘못된 비밀번호입니다.';
                break;
            case 'auth/email-already-in-use':
                errorMessage = '이미 사용 중인 이메일입니다.';
                break;
            case 'auth/weak-password':
                errorMessage = '비밀번호가 너무 약합니다.';
                break;
             case 'auth/invalid-login-credentials':
                errorMessage = '로그인 자격 증명이 잘못되었습니다. 이메일과 비밀번호를 다시 확인하세요.';
                break;
            default:
                errorMessage = error.message;
        }
        document.getElementById('message').textContent = errorMessage;
    }
});
