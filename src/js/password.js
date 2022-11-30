const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
const lower = "abcdefghijklmnopqrstuvwxyz".split("")
const numbers = "0123456789".split("")
const extra = "@!?#*+-_;:$%|".split("")
const max = upper.length + lower.length + numbers.length + extra.length

const generatePwd = function() {
    let needed = 7;
    
    
    let required = []
    
    while (required.length != needed*4) {
        required.push(upper[Math.floor(Math.random() * upper.length)])
        required.push(lower[Math.floor(Math.random() * lower.length)])
        required.push(numbers[Math.floor(Math.random() * numbers.length)])
        required.push(extra[Math.floor(Math.random() * extra.length)])
    }
    
    required = required.sort((a, b) => Math.random() - 0.5).join("")
    
    document.getElementById('output').innerHTML = required
    document.getElementById('passwordin').value = required
    checkPwd(required)
}

const sample = function(len, amount) {
    let start = Date.now()
    let chars = 0
    
    while (Date.now() - start < 1000) {
        for (let i = 0; i < len; i++) {
            for (let j = 0; j < amount; j++) {
                new String("x".repeat(len*2)) // only here to simulate some sort of thing what brutforcing does
                chars += 1
            }
        }
    }
    
    return  chars;
} 

const benchmarkCharsPerSec = sample(100, max)
const checkPwd = function(x) {
    if (x == "") return
    let len = x.length
    let set = [...new Set(x.split(""))]
    let diversity = Math.ceil(set.length / len * 100)
    
    let chars = 0;

    if (upper.some(e => set.includes(e))) chars += upper.length
    if (lower.some(e => set.includes(e))) chars += lower.length
    if (numbers.some(e => set.includes(e))) chars += numbers.length
    if (extra.some(e => set.includes(e))) chars += extra.length

    let charsPs = Math.ceil(benchmarkCharsPerSec * (max / chars))

    document.getElementById('length').innerHTML = (
        len < 10 ? "Terrible" :
        len < 20 ? "Okay-ish" :
        len < 30 ? "Standard" :
        len < 50 ? "Good" :
        len < 80 ? "Very Good" :
        len < 100 ? "Perfect" :
        len < 150 ? "Outstanding" :
        len > 150 ? "Overkill" : ""
    )
    document.getElementById('diversity').innerHTML = `${diversity}%`
    document.getElementById('combinations').innerHTML = `${set.length}^${x.length}`
    document.getElementById('combinations+').innerHTML = `${chars}^${x.length}`
    document.getElementById('charsPsec').innerHTML = `${charsPs.toFixed()}`
    document.getElementById('pwdsPsec').innerHTML = `${Math.round(charsPs/ Math.round((len * chars)) * 100)}`

}

const showinfo = function(x) {
    let text = {
        'len': "If the length of the password is...\nbelow 10, then its \"Terrible\"\nbelow 20, then its \"Okay-ish\"\nbelow 30, then its \"Standard\"\nbelow 50, then its \"Good\"\nbelow 80, then its \"Very Good\"\nbelow 100, then its \"Perfect\"\nbelow 150, then its \"Outstanding\"\nover 150, then is \"Overkill\"",
        'div': "How many percent of all characters are unique? e.g.\n\"AB\" = 100% unique\n\"AA\" = 50% unique\nYou may want to aim for...\n100% in case of an short password\n80% in case of an medium password\n60% in case of an long password\nEverything over 80 characters basically doesn't matter",
        'com': "How many unique strings can be formed using the characters used in given password aiming for the same length",
        'co+': "How many unique strings can be formed using all characters from used sets aiming for the same length as given password",
        'cps': "How many characters can your device (single thread!) brute-force using all the used character sets",
        'pps': "How many passwords can your device (single thread!) brute-force using all the used character sets and given password length",
        'cst': "A character set describes a list of unique characters. e.g.\n-  \"a, b, c, ...\"\n-  \"A, B, C, ...\"\n-  \"1, 2, 3, ...\"\n-  \"!, ?, #, ...\"\nare each - one - sets\nIf only one character from these sets is used, the whole set will be used for calculations!",
        'wig': "Given the Combinations and Passwords per second, you can figure out how long it would take to brute-force your password. (assuming it would be the last to get figured out)\nA (what an average person calls) good password takes at best a month to get brute-forced!\nSo aiming for at minimum a decade is the way to go!"
    }
    alert(text[x])
}