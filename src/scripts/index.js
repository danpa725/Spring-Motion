// import { handleInput } from "./handleInput";
import {add, subs, mult, divide} from "./calcVector.js";
import {vector} from "./createVector";

const box = document.querySelector(".box");

// 캔버스 셋업
const canvas = document.getElementById("canvas");
// 해상도에 따라서 캔버스 셋업
function setupCanvas(canvas) {
    let dpr = window.devicePixelRatio || 1;
    let rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    let ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    return ctx;
  }
const ctx = setupCanvas(canvas);

//! 기본 상수 정의
const ORIGIN = {x:0,y:0};
const WIDTH_MID = canvas.width/2;
const HEIGHT_MID = canvas.height/2
const setPosition = {x:WIDTH_MID, y:HEIGHT_MID};

// 물질 상수 정의
const m = 1.25;
const c = 0.99;
const k = 0.04;
const g = {x:0, y: 9.81};

// 늘어난 길이 x 정의
let x = vector(ORIGIN, ORIGIN);

// 초기 위치 벡터 정의
let loc = {x:WIDTH_MID, y:HEIGHT_MID + 500};

// 힘 벡터 정의
let f = vector(ORIGIN, ORIGIN);
// 가속도 벡터 정의
let a = vector(ORIGIN, ORIGIN);
// 속도 벡터 정의
let vel = vector(ORIGIN, ORIGIN);

function updatePosition(e){
    let elemLeft = canvas.offsetLeft + canvas.clientLeft;
    let elemTop = canvas.offsetTop + canvas.clientTop;

    let x = e.pageX - elemLeft;
    let y = e.pageY - elemTop;
    loc = {x, y};
    
    window.requestAnimationFrame(update);
} 

// 전체적인 모션(위치) 업데이트
function update() {
    // 캔버스 초기화
    ctx.clearRect(0, 0, canvas.width+1000, canvas.height + 1000);

    // 늘어난 길이 업데이트
    x = subs(loc, setPosition);

    // 힘 업데이트
    f = mult(x, -1*k);
    f = add(f, mult(g, m));

    // 가속도 업데이트
    a = divide(f, m);

    // 속도 업데이트
    vel = add(vel, a);
    vel = mult(vel, c);

    // 최종 위치 업데이트
    loc = add(loc, vel);

    // 스프링 애니메이션 생성
    ctx.beginPath();
    // 공 그리기
    ctx.arc(loc.x, loc.y, 30, 0, 2*Math.PI); 
    
    // 선 그리기
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'gray';
    ctx.moveTo(WIDTH_MID, HEIGHT_MID);
    ctx.lineTo(loc.x, loc.y);
    ctx.stroke();
    ctx.closePath();
    ctx.fillStyle = 'tomato'; ctx.fill();

    // canvas.removeEventListener('click', updatePosition)
    // box.setAttribute('translateX', `${loc.x}px`);
    // box.setAttribute('translateY', `${loc.y}px`);
    //! vel.x가 0.001 이하까지 애니메이션 반복
    if (Math.abs(vel.x) > 0.001) window.requestAnimationFrame(update);
}
canvas.onclick = updatePosition;

window.requestAnimationFrame(update)




// const input = document.querySelectorAll("input");
// const btn = document.querySelector("#btn");

// let constants = [];
// input.addEventListener("input", updateValue);
// const updateValue = (e) => e.map((item) => constants.append(item));

// btn.addEventListener("click", calculateValue);
// const calculateValue = () => handleInput(constants[0], constants[1], constants[2]);
// console.log(calculateValue);