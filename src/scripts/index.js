import { add, subs, mult, divide } from "./calcVector.js";
import { vector } from "./createVector";
import { setupCanvas } from "./setupCanvas.js";

// 캔버스 셋업
const canvas = document.getElementById("canvas");
const ctx = setupCanvas(canvas);

//! 기본 상수 정의
const ORIGIN = { x: 0, y: 0 };
const WIDTH_MID = canvas.width / 2;
const HEIGHT_MID = canvas.height / 2;

// 물질 상수 정의
const m = 0.5;
const c = 0.8;
const k = 0.01;
const g = { x: 0, y: 9.81 };

// 공의 갯수
const MAX_NUM = 10;

// 공의 좌표 스펙을 배열에 저장
let ballSpec = [];

//! 공 좌표 연산 idx
let idx = 1;

// 공의 기본 벡터 저장.
const setBall = (ballNum) => {
    idx = 1;
    for (let idx = 0; idx < ballNum; idx++) {
        let location = { x: WIDTH_MID, y: HEIGHT_MID - idx * 3 };

        // 늘어난 길이 x 정의 - 0벡터
        let x = vector(ORIGIN, ORIGIN);
        // 힘 벡터 정의 - 0벡터
        let f = vector(ORIGIN, ORIGIN);
        // 가속도 벡터 정의 - 0벡터
        let a = vector(ORIGIN, ORIGIN);
        // 속도 벡터 정의 - 0벡터
        let vel = vector(ORIGIN, ORIGIN);

        let spec = { location, x, f, a, vel };

        ballSpec[idx] = spec;
    }
};

setBall(MAX_NUM);

function updatePosition(e) {
    // window.cancelAnimationFrame(update);
    // 볼 위치 초기화
    setBall(MAX_NUM);
    let elemLeft = canvas.offsetLeft + canvas.clientLeft;
    let elemTop = canvas.offsetTop + canvas.clientTop;

    let x = e.pageX - elemLeft;
    let y = e.pageY - elemTop;
    ballSpec[0].location = { x, y };

    window.requestAnimationFrame(update);
}

function calculateCoord(idx) {
    let { location, x, f, a, vel } = ballSpec[idx];

    let upperLoc = ballSpec[idx - 1]?.location;

    // 늘어난 길이 업데이트 - 위치 벡터의 시초
    x = subs(location, upperLoc);

    // 힘 업데이트
    f = mult(x, -1 * k);
    f = add(f, mult(g, m));

    // 가속도 업데이트
    a = divide(f, m);

    // 속도 업데이트
    vel = add(vel, a);
    vel = mult(vel, c);

    // 최종 위치 업데이트
    location = add(location, vel);
    // 스프링 애니메이션 생성
    ctx.beginPath();
    // 공 그리기
    ctx.arc(location.x, location.y, 15, 0, 2 * Math.PI);
    // 선 그리기
    ctx.lineWidth = 5;
    ctx.strokeStyle = "gray";
    // moveTo 부분을 위에 위치한 공의 위치로 변경해야 함.
    ctx.moveTo(upperLoc.x, upperLoc.y);

    ctx.lineTo(location.x, location.y);

    ctx.stroke();
    ctx.closePath();
    ctx.fillStyle = "tomato";
    ctx.fill();

    // 연산된 좌표 업데이트
    ballSpec[idx] = { location, x, f, a, vel };
}

// 전체적인 모션(위치) 업데이트
function update() {
    ctx.clearRect(0, 0, canvas.width + 100000, canvas.height + 100000);

    if (idx < MAX_NUM) {
        calculateCoord(idx);
        idx++;

        if (Math.abs(ballSpec[0].location.x > 0.0001)) {
            window.requestAnimationFrame(update);
        }
        // //! vel.x가 0.001 이하까지 애니메이션 반복
    }
    if (idx === MAX_NUM) idx = 1;
}

// 클릭 위치에 공 놓기
canvas.onclick = updatePosition;

// 애니메이션 시작
window.requestAnimationFrame(update);
