const GetRandomElementFromList = (listOfElements) => listOfElements[Math.floor(Math.random() * listOfElements.length)]

const GetRandomWordFromArrayAndLength = (array, length) => {
  return Array.from({ length: length }, () => array[Math.floor(Math.random() * array.length)]).join('')
}

export { GetRandomElementFromList, GetRandomWordFromArrayAndLength }
