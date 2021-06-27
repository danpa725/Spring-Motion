const CRITERION = 2;

// 벡터의 덧셈
export const add = (vec1, vec2) => {
    const x1 = vec1?.x;
    const y1 = vec1?.y;
    const x2 = vec2?.x;
    const y2 = vec2?.y;

    let x;
    let y;
    x = x1 + x2;
    y = y1 + y2;

    const calcVec = { x, y };
    return calcVec;
};
// 벡터의 뺄셈
export const subs = (vec1, vec2) => {
    const x1 = vec1?.x;
    const y1 = vec1?.y;
    const x2 = vec2?.x;
    const y2 = vec2?.y;

    let x;
    let y;
    x = x1 - x2;
    y = y1 - y2;

    const calcVec = { x, y };
    return calcVec;
};

//! vec2 가 숫자라면, 그냥 나누기
export const divide = (vec1, vec2) => {
    if (vec2.length !== CRITERION) {
        const x1 = vec1?.x;
        const y1 = vec1?.y;

        let x;
        let y;
        x = x1 / vec2;
        y = y1 / vec2;

        const calcVec = { x, y };
        return calcVec;
    }
    if (vec2.length === CRITERION) {
        return;
    }
};

//! vec2 가 숫자라면, 그냥 곱하기
export const mult = (vec1, vec2) => {
    if (vec2.length !== CRITERION) {
        const x1 = vec1?.x;
        const y1 = vec1?.y;

        let x;
        let y;
        x = x1 * vec2;
        y = y1 * vec2;

        const calcVec = { x, y };
        return calcVec;
    }
    if (vec2.length === CRITERION) {
        return;
    }
};
