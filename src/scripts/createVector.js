export const vector = (point1, point2) => {
    
    const x1 = point1.x; const y1 = point1.y;
    const x2 = point2.x; const y2 = point2.y;
 
    // 크기와 방향을 가진 벡터
    const magnitude = Math.sqrt((x2-x1)*(x2-x1) + (y2-y1)*(y2-y1));
    const x = x2 - x1;
    const y = y2 - y1;
    
    const vector = {x,y,magnitude};

    return vector;
}


export const createVector = (x, y, magnitude) => {
    const vector = {x: x/magnitude, y: y/magnitude, magnitude};
    return vector;
}