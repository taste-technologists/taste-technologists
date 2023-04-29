const generateRandomString = () => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < 17; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const firstNames = ['Liam', 'Emma', 'Noah', 'Olivia', 'William', 'Ava', 'James',
  'Isabella', 'Logan', 'Sophia', 'Benjamin', 'Mia', 'Mason', 'Charlotte', 'Elijah',
  'Amelia', 'Lucas', 'Hank', 'Oliver', 'Eve', 'Jackson', 'Abigail', 'Aiden', 'Emily',
  'Carter', 'Liz', 'Jayden', 'Mila', 'Ethan', 'Ella', 'Steve', 'Avery',
  'Alexander', 'Sofia', 'Michael', 'Camila', 'Matthew', 'Aria', 'Levi', 'Scarlett',
  'Nicholas', 'Victoria', 'Isaac', 'Chloe', 'Daniel', 'Madison', 'Joseph', 'Grace',
  'Samuel', 'Lily', 'Eleanor', 'Chidi', 'Tahani', 'Jason', 'Michael', 'Janet', 'Derek',
  'Vicky', 'Glenn', 'Simone', 'Brent', 'John', 'Kamilah', 'Mindy', 'Doug', 'Joy', 'Evelyn',
  'Waymond', 'Deirdre',
];

export const Reviews = [
  {
    userID: generateRandomString(),
    user: `${firstNames[Math.floor(Math.random() * firstNames.length)]}`,
    rating: Math.round(Math.random() + 4),
    comment: 'This recipe was fantastic! My whole family loved it.',
    created: new Date(Date.now() - Math.floor(Math.random() * (7 * 24 * 60 * 60 * 1000))),
    edited: new Date(Date.now() - Math.floor(Math.random() * (7 * 24 * 60 * 60 * 1000))),
  },
  {
    userID: generateRandomString(),
    user: `${firstNames[Math.floor(Math.random() * firstNames.length)]}`,
    rating: Math.round(Math.random() + 2),
    comment: 'This recipe was pretty good, but I think it could use some more flavor.',
    created: new Date(Date.now() - Math.floor(Math.random() * (7 * 24 * 60 * 60 * 1000))),
    edited: new Date(Date.now() - Math.floor(Math.random() * (7 * 24 * 60 * 60 * 1000))),
  },
  {
    userID: generateRandomString(),
    user: `${firstNames[Math.floor(Math.random() * firstNames.length)]}`,
    rating: Math.round(Math.random() + 1),
    comment: "This recipe didn't turn out great. I'm not sure what went wrong.",
    created: new Date(Date.now() - Math.floor(Math.random() * (7 * 24 * 60 * 60 * 1000))),
    edited: new Date(Date.now() - Math.floor(Math.random() * (7 * 24 * 60 * 60 * 1000))),
  },
  {
    userID: generateRandomString(),
    user: `${firstNames[Math.floor(Math.random() * firstNames.length)]}`,
    rating: Math.round(Math.random() + 4),
    comment: 'I really enjoyed this recipe. It was easy to make and tasted great.',
    created: new Date(Date.now() - Math.floor(Math.random() * (7 * 24 * 60 * 60 * 1000))),
    edited: new Date(Date.now() - Math.floor(Math.random() * (7 * 24 * 60 * 60 * 1000))),
  },
  {
    userID: generateRandomString(),
    user: `${firstNames[Math.floor(Math.random() * firstNames.length)]}`,
    rating: Math.round(Math.random()),
    comment: 'I did not like this recipe at all. It was very bland.',
    created: new Date(Date.now() - Math.floor(Math.random() * (7 * 24 * 60 * 60 * 1000))),
    edited: new Date(Date.now() - Math.floor(Math.random() * (7 * 24 * 60 * 60 * 1000))),
  },
  {
    userID: generateRandomString(),
    user: `${firstNames[Math.floor(Math.random() * firstNames.length)]}`,
    rating: Math.round(Math.random() + 4),
    comment: 'This recipe was amazing! I loved the combination of flavors.',
    created: new Date(Date.now() - Math.floor(Math.random() * (7 * 24 * 60 * 60 * 1000))),
    edited: new Date(Date.now() - Math.floor(Math.random() * (7 * 24 * 60 * 60 * 1000))),
  },
  {
    userID: generateRandomString(),
    user: `${firstNames[Math.floor(Math.random() * firstNames.length)]}`,
    rating: Math.round(Math.random() + 4),
    comment: 'The recipe was easy to follow and turned out great!',
    created: new Date(Date.now() - Math.floor(Math.random() * (7 * 24 * 60 * 60 * 1000))),
    edited: new Date(Date.now() - Math.floor(Math.random() * (7 * 24 * 60 * 60 * 1000))),
  },
  {
    userID: generateRandomString(),
    user: `${firstNames[Math.floor(Math.random() * firstNames.length)]}`,
    rating: Math.round(Math.random() + 2),
    comment: 'I thought this recipe was just okay. It was a bit too spicy for my taste.',
    created: new Date(Date.now() - Math.floor(Math.random() * (7 * 24 * 60 * 60 * 1000))),
    edited: new Date(Date.now() - Math.floor(Math.random() * (7 * 24 * 60 * 60 * 1000))),
  },
  {
    userID: generateRandomString(),
    user: `${firstNames[Math.floor(Math.random() * firstNames.length)]}`,
    rating: Math.round(Math.random()),
    comment: 'This recipe was a disaster! I followed the instructions exactly and it still turned out terrible.',
    created: new Date(Date.now() - Math.floor(Math.random() * (7 * 24 * 60 * 60 * 1000))),
    edited: new Date(Date.now() - Math.floor(Math.random() * (7 * 24 * 60 * 60 * 1000))),
  },
  {
    userID: generateRandomString(),
    user: `${firstNames[Math.floor(Math.random() * firstNames.length)]}`,
    rating: Math.round(Math.random() + 4),
    comment: 'I really enjoyed making this recipe. It was a lot of fun!',
    created: new Date(Date.now() - Math.floor(Math.random() * (7 * 24 * 60 * 60 * 1000))),
    edited: new Date(Date.now() - Math.floor(Math.random() * (7 * 24 * 60 * 60 * 1000))),
  },
  {
    userID: generateRandomString(),
    user: `${firstNames[Math.floor(Math.random() * firstNames.length)]}`,
    rating: Math.round(Math.random() + 4),
    comment: 'This recipe was delicious! I will definitely be making it again.',
    created: new Date(Date.now() - Math.floor(Math.random() * (7 * 24 * 60 * 60 * 1000))),
    edited: new Date(Date.now() - Math.floor(Math.random() * (7 * 24 * 60 * 60 * 1000))),
  },
  {
    userID: generateRandomString(),
    user: `${firstNames[Math.floor(Math.random() * firstNames.length)]}`,
    rating: Math.round(Math.random() + 2),
    comment: 'I had high hopes for this recipe, but it didn\'t turn out as expected.',
    created: new Date(Date.now() - Math.floor(Math.random() * (7 * 24 * 60 * 60 * 1000))),
    edited: new Date(Date.now() - Math.floor(Math.random() * (7 * 24 * 60 * 60 * 1000))),
  },
  {
    userID: generateRandomString(),
    user: `${firstNames[Math.floor(Math.random() * firstNames.length)]}`,
    rating: Math.round(Math.random() + 4),
    comment: 'This recipe was a big hit with my friends! I will be making it again.',
    created: new Date(Date.now() - Math.floor(Math.random() * (7 * 24 * 60 * 60 * 1000))),
    edited: new Date(Date.now() - Math.floor(Math.random() * (7 * 24 * 60 * 60 * 1000))),
  },
  {
    userID: generateRandomString(),
    user: `${firstNames[Math.floor(Math.random() * firstNames.length)]}`,
    rating: Math.round(Math.random() + 3),
    comment: 'The recipe was a bit too complicated for me, but the end result was worth it.',
    created: new Date(Date.now() - Math.floor(Math.random() * (7 * 24 * 60 * 60 * 1000))),
    edited: new Date(Date.now() - Math.floor(Math.random() * (7 * 24 * 60 * 60 * 1000))),
  },
  {
    userID: generateRandomString(),
    user: `${firstNames[Math.floor(Math.random() * firstNames.length)]}`,
    rating: Math.round(Math.random() + 4),
    comment: 'I loved making this recipe! It was easy and delicious.',
    created: new Date(Date.now() - Math.floor(Math.random() * (7 * 24 * 60 * 60 * 1000))),
    edited: new Date(Date.now() - Math.floor(Math.random() * (7 * 24 * 60 * 60 * 1000))),
  },
  {
    userID: generateRandomString(),
    user: `${firstNames[Math.floor(Math.random() * firstNames.length)]}`,
    rating: 5,
    comment: 'This recipe was absolutely amazing! I can\'t wait to make it again.',
    created: new Date(Date.now() - Math.floor(Math.random() * (7 * 24 * 60 * 60 * 1000))),
    edited: new Date(Date.now() - Math.floor(Math.random() * (7 * 24 * 60 * 60 * 1000))),
  },
  {
    userID: generateRandomString(),
    user: `${firstNames[Math.floor(Math.random() * firstNames.length)]}`,
    rating: 5,
    comment: 'My family and I loved this recipe. It was so delicious!',
    created: new Date(Date.now() - Math.floor(Math.random() * (7 * 24 * 60 * 60 * 1000))),
    edited: new Date(Date.now() - Math.floor(Math.random() * (7 * 24 * 60 * 60 * 1000))),
  },
  {
    userID: generateRandomString(),
    user: `${firstNames[Math.floor(Math.random() * firstNames.length)]}`,
    rating: 4,
    comment: 'This recipe was pretty good, but it could use a little more seasoning. Overall, I think I would make it again',
    created: new Date(Date.now() - Math.floor(Math.random() * (7 * 24 * 60 * 60 * 1000))),
    edited: new Date(Date.now() - Math.floor(Math.random() * (7 * 24 * 60 * 60 * 1000))),
  },
  {
    userID: generateRandomString(),
    user: `${firstNames[Math.floor(Math.random() * firstNames.length)]}`,
    rating: 5,
    comment: 'I\'m in love with this recipe! It\'s definitely one of my new favorites.',
    created: new Date(Date.now() - Math.floor(Math.random() * (7 * 24 * 60 * 60 * 1000))),
    edited: new Date(Date.now() - Math.floor(Math.random() * (7 * 24 * 60 * 60 * 1000))),
  },
  {
    userID: generateRandomString(),
    user: `${firstNames[Math.floor(Math.random() * firstNames.length)]}`,
    rating: 4,
    comment: 'This recipe was good, but it didn\'t blow me away. Still worth making though!',
    created: new Date(Date.now() - Math.floor(Math.random() * (7 * 24 * 60 * 60 * 1000))),
    edited: new Date(Date.now() - Math.floor(Math.random() * (7 * 24 * 60 * 60 * 1000))),
  },
  {
    userID: generateRandomString(),
    user: `${firstNames[Math.floor(Math.random() * firstNames.length)]}`,
    rating: 2,
    comment: 'The recipe was a bit bland and could use more flavor, but I appreciate the effort put into creating it.',
    created: new Date(Date.now() - Math.floor(Math.random() * (7 * 24 * 60 * 60 * 1000))),
    edited: new Date(Date.now() - Math.floor(Math.random() * (7 * 24 * 60 * 60 * 1000))),
  },
  {
    userID: generateRandomString(),
    user: `${firstNames[Math.floor(Math.random() * firstNames.length)]}`,
    rating: 3,
    comment: 'The recipe was average, but I think it could be improved with some more seasoning or herbs.',
    created: new Date(Date.now() - Math.floor(Math.random() * (7 * 24 * 60 * 60 * 1000))),
    edited: new Date(Date.now() - Math.floor(Math.random() * (7 * 24 * 60 * 60 * 1000))),
  },
  {
    userID: generateRandomString(),
    user: `${firstNames[Math.floor(Math.random() * firstNames.length)]}`,
    rating: Math.round(Math.random() * 3),
    comment: 'This recipe was okay, but it could have been better. There were some aspects of it that I didn\';t really enjoy.',
    created: new Date(Date.now() - Math.floor(Math.random() * (7 * 24 * 60 * 60 * 1000))),
    edited: new Date(Date.now() - Math.floor(Math.random() * (7 * 24 * 60 * 60 * 1000))),
  },
  {
    userID: generateRandomString(),
    user: `${firstNames[Math.floor(Math.random() * firstNames.length)]}`,
    rating: Math.round(Math.random() * 3),
    comment: 'It wasn\'t my favorite recipe, but it wasn\'t terrible either. I\'m not sure if I would make it again, but it was worth a try.',
    created: new Date(Date.now() - Math.floor(Math.random() * (7 * 24 * 60 * 60 * 1000))),
    edited: new Date(Date.now() - Math.floor(Math.random() * (7 * 24 * 60 * 60 * 1000))),
  },
];
