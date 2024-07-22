// coffee-preference.js


import { database, ref, set } from './firebase-config.js';
document.addEventListener('DOMContentLoaded', async () => {
    const userEmail = 'kim@gmail.com'; // 사용자의 이메일 주소를 여기에 입력하세요
    const userDocRef = doc(firestore, 'user', userEmail);

    try {
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
            const userData = docSnap.data();
            const userName = userData.name;
            console.log('User Name:', userName); // 또는 페이지에 사용자 이름을 표시합니다.
            document.getElementById('userName').innerText = `Welcome, ${userName}`;
        } else {
            console.log('No such document!');
        }
    } catch (error) {
        console.error('Error getting document:', error);
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const hotCoffeeButton = document.getElementById('hotCoffeeButton');
    const icedCoffeeButton = document.getElementById('icedCoffeeButton');

    hotCoffeeButton.addEventListener('click', () => {
        savePreference('Hot Coffee');
    });

    icedCoffeeButton.addEventListener('click', () => {
        savePreference('Iced Coffee');
    });
});

function savePreference(coffeeType) {

    const userId = localStorage.getItem('userEmail'); // 실제 사용자 ID
    const timestamp = Date.now(); // UNIX 타임스탬프 사용

    // 경로를 유효한 문자열로 설정합니다.
    const path = `preferences/${userId}/${timestamp}`;

    set(ref(database, path), {
        coffeeType: coffeeType,
        timestamp: new Date(timestamp).toISOString()
    })
    .then(() => {
        alert('Preference saved!');
    })
    .catch((error) => {
        console.error('Error saving preference:', error);
    });
}
