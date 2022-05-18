// 전역 변수 선언 및 할당
const x = 1;
const y = 2;

// 전역 함수 정의
function Hans(H) {
  // 지역 변수 선언
  const x = 50;
  const y = "b";

  // 메서드 호출
  // 처음에 문자열이 들어가서 문자열로 타입 변환됨
  console.log("전역 함수 내부에서 메서드 호출: " + H + x + y);
}

// 함수 호출
Hans(100);

// 메서드 호출
// 처음에 문자열이 들어가서 문자열로 타입 변환됨
console.log("전역 스코프에서 메서드 호출: " + x + y);