
export default function generateRandomString(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export function generateName() {
    // Define arrays of vowels and consonants
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    const consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'];
  
    let name = '';
  
    // Randomly determine the length of the name (between 4 and 8 characters)
    const nameLength = Math.floor(Math.random() * 5) + 4;
  
    // Generate the name character by character
    for (let i = 0; i < nameLength; i++) {
      // Determine if the current character should be a vowel or a consonant
      const isVowel = i === 0 || Math.random() < 0.5;
  
      // Randomly select a vowel or consonant and append it to the name string
      if (isVowel) {
        name += vowels[Math.floor(Math.random() * vowels.length)];
      } else {
        name += consonants[Math.floor(Math.random() * consonants.length)];
      }
    }
  
    return name;
  }