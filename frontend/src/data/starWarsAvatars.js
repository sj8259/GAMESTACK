// Star Wars Avatars Collection
export const starWarsAvatars = [
  {
    id: 'yoda',
    name: 'Yoda',
    emoji: '🟢',
    image: '/starwars-avatars/pngs/starwars-yoda.png', // Will need to add this image
    description: 'Wise Jedi Master'
  },
  {
    id: 'luke',
    name: 'Luke Skywalker',
    emoji: '👨‍🚀',
    image: '/starwars-avatars/pngs/starwars-luke.png', // Will need to add this image
    description: 'Jedi Knight'
  },
  {
    id: 'leia',
    name: 'Princess Leia',
    emoji: '👸',
    image: '/starwars-avatars/pngs/starwars-leia.png', // Will need to add this image
    description: 'Rebel Leader'
  },
  {
    id: 'vader',
    name: 'Darth Vader',
    emoji: '⚫',
    image: '/starwars-avatars/pngs/starwars-darth-vader.png',
    description: 'Dark Lord'
  },
  {
    id: 'r2d2',
    name: 'R2-D2',
    emoji: '🤖',
    image: '/starwars-avatars/pngs/starwars-r2-d2.png',
    description: 'Astromech Droid'
  },
  {
    id: 'c3po',
    name: 'C-3PO',
    emoji: '🟡',
    image: '/starwars-avatars/pngs/starwars-c-3po.png',
    description: 'Protocol Droid'
  },
  {
    id: 'bb8',
    name: 'BB-8',
    emoji: '🤖',
    image: '/starwars-avatars/pngs/starwars-bb-8.png',
    description: 'Astromech Droid'
  },
  {
    id: 'boba',
    name: 'Boba Fett',
    emoji: '🛡️',
    image: '/starwars-avatars/pngs/starwars-boba-fett.png',
    description: 'Bounty Hunter'
  },
  {
    id: 'stormtrooper',
    name: 'Stormtrooper',
    emoji: '⚪',
    image: '/starwars-avatars/pngs/starwars-stormtrooper.png',
    description: 'Imperial Soldier'
  },
  {
    id: 'han',
    name: 'Han Solo',
    emoji: '🪐',
    image: null, // No image available yet
    description: 'Smuggler'
  },
  {
    id: 'chewbacca',
    name: 'Chewbacca',
    emoji: '🐻',
    image: null, // No image available yet
    description: 'Wookiee Warrior'
  },
  {
    id: 'obiwan',
    name: 'Obi-Wan Kenobi',
    emoji: '🧙',
    image: null, // No image available yet
    description: 'Jedi Master'
  },
  {
    id: 'anakin',
    name: 'Anakin Skywalker',
    emoji: '⚔️',
    image: null, // No image available yet
    description: 'Jedi Knight'
  },
  {
    id: 'padme',
    name: 'Padmé Amidala',
    emoji: '👑',
    image: null, // No image available yet
    description: 'Queen of Naboo'
  },
  {
    id: 'mace',
    name: 'Mace Windu',
    emoji: '💜',
    image: null, // No image available yet
    description: 'Jedi Master'
  },
  {
    id: 'rey',
    name: 'Rey',
    emoji: '✨',
    image: null, // No image available yet
    description: 'Jedi Scavenger'
  },
  {
    id: 'finn',
    name: 'Finn',
    emoji: '🛡️',
    image: null, // No image available yet
    description: 'Resistance Fighter'
  },
  {
    id: 'poe',
    name: 'Poe Dameron',
    emoji: '✈️',
    image: null, // No image available yet
    description: 'X-Wing Pilot'
  },
  {
    id: 'kylo',
    name: 'Kylo Ren',
    emoji: '🔴',
    image: null, // No image available yet
    description: 'Dark Side Warrior'
  },
  {
    id: 'ahsoka',
    name: 'Ahsoka Tano',
    emoji: '🟠',
    image: null, // No image available yet
    description: 'Jedi Padawan'
  },
  {
    id: 'maul',
    name: 'Darth Maul',
    emoji: '🔴',
    image: null, // No image available yet
    description: 'Sith Lord'
  },
  {
    id: 'grievous',
    name: 'General Grievous',
    emoji: '🦾',
    image: null, // No image available yet
    description: 'Cyborg Warrior'
  },
  {
    id: 'jabba',
    name: 'Jabba the Hutt',
    emoji: '🟤',
    image: null, // No image available yet
    description: 'Crime Lord'
  }
];

export const getAvatarById = (id) => {
  return starWarsAvatars.find(avatar => avatar.id === id) || starWarsAvatars[0];
};

export const getAvatarEmoji = (id) => {
  const avatar = getAvatarById(id);
  return avatar ? avatar.emoji : '👤';
};

export const getAvatarName = (id) => {
  const avatar = getAvatarById(id);
  return avatar ? avatar.name : 'Default';
};

export const getAvatarImage = (id) => {
  const avatar = getAvatarById(id);
  return avatar?.image || null;
};

export const hasAvatarImage = (id) => {
  const avatar = getAvatarById(id);
  return avatar?.image != null;
};

