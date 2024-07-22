document.addEventListener('DOMContentLoaded', () => {
    // 로컬 스토리지에서 이메일 정보 가져오기
    const userEmail = localStorage.getItem('userEmail');

    // 이메일 정보가 있을 경우 표시
    if (userEmail) {
        document.getElementById('user-email').textContent = userEmail;
    } else {
        document.getElementById('user-email').textContent = '이메일 정보를 찾을 수 없습니다.';
    }

    // 로그아웃 버튼 클릭 이벤트 리스너
    document.getElementById('logout').addEventListener('click', () => {
        // 로컬 스토리지에서 이메일 정보 삭제
        localStorage.removeItem('userEmail');
        // 로그인 페이지로 리다이렉션
        window.location.href = '/index.html';
    });

});

// weather.js
const apiKey = '5d72409c8fbd44d4967e97f56774e375';
const city = 'Seoul';  // 사용자 입력 또는 브라우저 위치를 기반으로 설정

async function getWeather() {
    try {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.getElementById('coffeeRecommendation').textContent = '날씨 데이터를 받아오는 중 오류가 발생하였습니다.';
        return null;
    }
}

function recommendCoffee(weather) {
    if (!weather) return '오류!';
    const temp = weather.main.temp;
    let coffeeRecommendation = '';

    if (temp < 10) {
        coffeeRecommendation = '따뜻한 커피';
    } else if (temp >= 10 && temp <= 25) {
        coffeeRecommendation = 'Latte';
    } else {
        coffeeRecommendation = '차가운 커피';
    }

    return coffeeRecommendation;
}

document.addEventListener('DOMContentLoaded', async () => {
    const weather = await getWeather();
    const coffee = recommendCoffee(weather);
    document.getElementById('coffeeRecommendation').textContent = ` ${coffee}`;
});
