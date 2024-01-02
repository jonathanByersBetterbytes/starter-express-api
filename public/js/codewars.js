

// Complete the function that accepts a string parameter, and reverses each word in the string. All spaces in the string should be retained.



let str = 'string of words'
function funky(str1){
    let newStr = str1.split(' ').map(word => word.split('').reverse().join('')).join(' ')
    console.log(newStr)
}

funky(str)