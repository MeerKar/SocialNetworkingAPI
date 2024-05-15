const username = [
  "Aaran",
  "Aaren",
  "Aarez",
  "Aarman",
  "Aaron",
  "Aaron-James",
  "Aarron",
  "Aaryan",
  "Aaryn",
  "Aayan",
  "Aazaan",
  "Abaan",
  "Abbas",
  "Abdallah",
  "Abdalroof",
  "Abdihakim",
  "Abdirahman",
  "Abdisalam",
  "Abdul",
  "Abdul-Aziz",
  "Abdulbasir",
  "Abdulkadir",
  "Abdulkarem",
  "Smith",
  "Jones",
  "Coollastname",
  "enter_name_here",
  "Ze",
  "Zechariah",
  "Zeek",
  "Zeeshan",
  "Zeid",
  "Zein",
  "Zen",
  "Zendel",
  "Zenith",
  "Zennon",
  "Zeph",
  "Zerah",
  "Zhen",
  "Zhi",
  "Zhong",
  "Zhuo",
  "Zi",
  "Zidane",
  "Zijie",
  "Zinedine",
  "Zion",
  "Zishan",
  "Ziya",
  "Ziyaan",
  "Zohaib",
  "Zohair",
  "Zoubaeir",
  "Zubair",
  "Zubayr",
  "Zuriel",
  "Xander",
  "Jared",
  "Courtney",
  "Gillian",
  "Clark",
  "Jared",
  "Grace",
  "Kelsey",
  "Tamar",
  "Alex",
  "Mark",
  "Tamar",
  "Farish",
  "Sarah",
  "Nathaniel",
  "Parker",
];

const Thoughts = [
  "Share your thoughts and experiences with friends and family.",
  "Connect with like-minded individuals and form communities.",
  "Discover trending topics and stay updated with the latest news.",
  "Express yourself through photos, videos, and posts.",
  "Engage in meaningful conversations on various interests and hobbies.",
  "Stay connected with friends across the globe and never miss a moment.",
  "Explore new ideas, perspectives, and cultures.",
  "Find inspiration from others and share your own creativity.",
  "Support causes you care about and make a positive impact.",
  "Celebrate milestones, achievements, and special moments with loved ones.",
];

const Reactions = [
  "Excited 😄",
  "Happy 😊",
  "Surprised 😮",
  "Impressed 😲",
  "Proud 😃",
  "Amazed 😯",
  "Grateful 🙏",
  "Interested 😃",
  "Curious 🤔",
  "Hopeful 🤞",
  "Inspired 💡",
  "Motivated 💪",
  "Encouraged 👍",
  "Enthusiastic 🎉",
  "Content 😌",
];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random full username
const getRandomUsername = () =>
  `${getRandomArrItem(username)} ${getRandomArrItem(username)}`;

// Generates random thoughts
const getRandomThoughts = (int) => {
  const maxReactions = 50;
  const minReactions = 1;
  const results = [];
  for (let i = 0; i < int; i++) {
    const thought = {
      thoughtName: getRandomArrItem(Thoughts),
      reactions: [],
    };
    const numReactions =
      Math.floor(Math.random() * (maxReactions - minReactions + 1)) +
      minReactions;
    for (let j = 0; j < numReactions; j++) {
      const reaction = {
        reactionBody: getRandomArrItem(Reactions),
        username: getRandomUsername(),
        createdAt: new Date(),
      };
      thought.reactions.push(reaction);
    }
    results.push(thought);
  }
  return results;
};

const getRandomEmail = () => {
  const usernameLength = Math.floor(Math.random() * (10 - 5 + 1)) + 5;
  const domain = [
    "gmail.com",
    "yahoo.com",
    "hotmail.com",
    "gmail.com",
    "hmail.com",
    "qmail.com",
    "aol.com",
  ][Math.floor(Math.random() * 6)];

  let usernames = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < usernameLength; i++) {
    usernames += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  return usernames + "@" + domain;
};

// Export the functions for use in seed.js
module.exports = { getRandomUsername, getRandomThoughts, getRandomEmail };
