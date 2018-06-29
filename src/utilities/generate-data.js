import { range } from 'd3-array'

import generateRandomIntInclusive from './generate-random-int-inclusive'

const firstOrderCategories = ["Morocco", "Venezuela", "Congo", "Italy", "Puerto Rico", "Sri Lanka", "Poland", "Malaysia", "Seychelles", "Réunion", "Ukraine", "Afghanistan", "Libya", "New Zealand", "Mauritius"],
      secondOrderCategories = ["Golf", "Volleyball", "Swimming", "Badminton", "Gynastics", "Rugby", "Ice Hockey", "Rowing", "Fencing", "Surfing"],
      firstFilteredCategories = ["computer", "lamp shade", "drill press", "bananas", "tomato", "ipod"],
      secondFilteredCategories = ["thermostat", "couch", "lotion", "slipper", "key chain", "glass"],
      thirdFilteredCategories = ["chameleon","gazelle","porcupine","peccary","grizzly bear","jaguar","otter","ewe","pony","mongoose","bighorn","doe","cheetah","elk","puma","tiger","bison","basilisk","ape","yak","mare","waterbuck","mustang","chicken","vicuna"]

function generateData(n) {
    return range(n).map(
        (n) => ({
            "firstOrder": firstOrderCategories[generateRandomIntInclusive(0,firstOrderCategories.length-1)],
            "secondOrder": secondOrderCategories[generateRandomIntInclusive(0,secondOrderCategories.length-1)],
            "firstFilter": firstFilteredCategories[generateRandomIntInclusive(0,firstFilteredCategories.length-1)],
            "secondFilter": secondFilteredCategories[generateRandomIntInclusive(0,secondFilteredCategories.length-1)],
            "thirdFilter": thirdFilteredCategories[generateRandomIntInclusive(0,thirdFilteredCategories.length-1)],
            "name": "c-" + n,
            "value": generateRandomIntInclusive(5, 25)
        })
    )
}

function generateDataDeferred(n) {
    return new Promise(res => {
        setTimeout(() => {
            res(generateData(n))
        }, 5000)
    })
}

async function generateDataAsync(n) {
    return await generateDataDeferred(n)
}

export default generateData
export { generateDataAsync, generateDataDeferred }
