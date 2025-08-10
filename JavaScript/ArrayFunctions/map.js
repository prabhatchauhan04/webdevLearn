let arr = [1 , 2 , 3, 4, 5];

// map new array bnata hai . purana array ko change nahi karta
// map function argument ke roop me ek callback function leta hai
// ye callback function har element par apply hota hai aur ek naya array return karta hai
// callback function ke 3 parameters hote hain: value, index, aur original array
// value: current element ka value
// index: current element ka index
// original array: original array jo map function par apply kiya gaya hai
let newArr = arr.map((value , index , a) => {
    console.log(`value: ${value}, index: ${index}, original array: ${a}`);
    return value * 2; // har element ko 2 se multiply kar raha hai
}); // callback function pass kiya hai ye 

console.log("Nya Array : " , newArr);




