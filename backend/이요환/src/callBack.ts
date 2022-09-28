//콜백 함수는 다른 함수의 인자로 들어가서 그 함수에 의해서 호출되는놈~~

//callback함수를 인자로 받는 함수
function func(element : number[], callback : any) : number[] { //함수를 인자로 넣으면 자료형을 어떻게 지정해야하지???
    const arr : number[]= [];

    for (let i = 0; i < element.length; i++) {
        if (callback(element[i])) arr.push(element[i]);
    }
    return arr;
}
const test : number[] = [4,5,6,7,8,9,0];
const arr : number[] = func(test, (n : number) => n > 6);

console.log(arr);