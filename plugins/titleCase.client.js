export default defineNuxtPlugin(() => {
  return {
    provide: {
      titleCase: (str) => {
        const words = str.split(' ')
        const result = []

        words.forEach((word) => {
          if (word.charAt(0) !== '(')
            result.push(word.charAt(0).toUpperCase() + word.slice(1))
          else result.push(word)
        })
        return result.join(' ')
      },
    },
  }
})
