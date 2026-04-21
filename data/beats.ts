import { LifeBeat, LifeStage } from '@/types/game';

const beats: LifeBeat[] = [];

const add = (beat: LifeBeat) => beats.push(beat);

const addTemplateSet = (
  stage: LifeStage,
  beatType: LifeBeat['beatType'],
  prefix: string,
  lines: string[],
  config: Partial<LifeBeat> = {}
) => {
  lines.forEach((text, index) => {
    beats.push({
      id: `${prefix}_${index + 1}`,
      stage,
      beatType,
      text,
      ...config
    });
  });
};

// Birth (target ~20)
add({ id: 'birth_1', stage: 'birth', beatType: 'flash', label: 'Passing Time', text: 'You are born early and small.', tags: ['fragility'], effects: { health: -4 }, ageAdvance: [0, 0] });
add({ id: 'birth_2', stage: 'birth', beatType: 'chance', label: 'Chance', text: 'Your heartbeat drops during delivery.', deathChance: 0.08, causeOfDeath: 'birth complications', effects: { health: -5 }, damageEffects: { health: -8, stress: 3 }, softLossEffects: { wealth: -4, support: -2 }, tags: ['risk', 'health'], ageAdvance: [0, 0] });
add({ id: 'birth_3', stage: 'birth', beatType: 'forced', label: 'Life Happens', text: 'Medical bills arrive before your name settles.', tags: ['hardship', 'wealth'], effects: { wealth: -8, stress: 4 }, addFlags: ['poor'], ageAdvance: [0, 1] });
add({ id: 'birth_4', stage: 'birth', beatType: 'choice', label: 'You Choose', text: 'Care options are limited in your first months.', choices: [
  { id: 'birth_4a', label: 'Trust local clinic', effects: { health: 2, wealth: -2, support: 1 } },
  { id: 'birth_4b', label: 'Travel for care', effects: { health: 4, wealth: -6, stress: 2 } }
], ageAdvance: [0, 1] });
add({ id: 'birth_5', stage: 'birth', beatType: 'chance', label: 'Chance', text: 'A severe prenatal complication appears late.', deathChance: 0.12, causeOfDeath: 'pregnancy ended before birth', effects: { health: -7 }, damageEffects: { health: -10, support: -2 }, softLossEffects: { stress: 6, wealth: -4 }, tags: ['risk', 'health'], ageAdvance: [0, 0] });
add({ id: 'birth_6', stage: 'birth', beatType: 'consequence', label: 'Consequence', text: 'Your first year is shaped by whoever could stay.', tags: ['consequence'], effects: { support: 2, meaning: 1 }, ageAdvance: [0, 1] });

addTemplateSet('birth', 'flash', 'birth_flash', [
  'Winter in the hospital feels endless.',
  'A nurse remembers your face.',
  'Your crib is secondhand but clean.',
  'Some nights, you do not stop crying.',
  'A relative steps in for months.',
  'You learn the sound of tension before words.'
], { label: 'Passing Time', ageAdvance: [0, 1], effects: { stress: 1 } });

addTemplateSet('birth', 'forced', 'birth_forced', [
  'Your parents separate in your first year.',
  'A grandparent becomes your daily caregiver.',
  'Housing changes twice before age two.',
  'A local program covers your medicine.',
  'Paperwork decides what care you receive.',
  'Your family loses a stable income source.'
], { label: 'Life Happens', ageAdvance: [0, 1], effects: { stress: 3, support: -1 }, tags: ['hardship'] });

addTemplateSet('birth', 'chance', 'birth_chance', [
  'A fever spikes overnight.',
  'Breathing trouble returns suddenly.',
  'An infection spreads in the ward.',
  'A specialist takes your case.',
  'A vaccine reaction causes panic.',
  'A monitor alarm won’t stop.'
], {
  label: 'Chance',
  ageAdvance: [0, 1],
  deathChance: 0.06,
  causeOfDeath: 'early infant mortality',
  effects: { health: -4, stress: 2 },
  damageEffects: { health: -6, stress: 3 },
  softLossEffects: { wealth: -4, support: -2 },
  tags: ['health', 'risk']
});

const childhoodChoicePairs = [
  ['Work after school', 'Stay in school'],
  ['Tell the truth', 'Keep the peace'],
  ['Fight back', 'Walk away'],
  ['Join the team', 'Help at home'],
  ['Ask for help', 'Hide it'],
  ['Trust your talent', 'Play it safe'],
  ['Stay with friends', 'Stay with family'],
  ['Report the harm', 'Endure silently'],
  ['Take the chance', 'Protect yourself'],
  ['Speak up', 'Stay small']
];

addTemplateSet('childhood', 'flash', 'child_flash', [
  'Four quiet years pass quickly.',
  'You learn which moods are dangerous.',
  'A neighbor keeps an eye on you.',
  'Summer feels like a short truce.',
  'You memorize how to be less trouble.',
  'One teacher says your name with care.',
  'You sleep with one ear open.',
  'You find comfort in routine.'
], { label: 'Passing Time', ageAdvance: [1, 2], effects: { meaning: 1 } });

addTemplateSet('childhood', 'forced', 'child_forced', [
  'Your parents separate and money tightens.',
  'Rent rises and you move schools.',
  'You become the reliable child too early.',
  'Bullying becomes a daily background noise.',
  'A mentor appears and changes your confidence.',
  'Your household loses healthcare coverage.',
  'A sibling needs constant attention.',
  'A teacher publicly humiliates you.',
  'Someone in your home drinks heavily.',
  'Community support keeps food on the table.',
  'A close friend moves away suddenly.',
  'You start carrying adult worries.'
], { label: 'Life Happens', ageAdvance: [1, 2], effects: { stress: 4 }, tags: ['hardship'] });

addTemplateSet('childhood', 'chance', 'child_chance', [
  'A car skids toward the crosswalk.',
  'A bad fall leaves you breathless.',
  'An untreated infection gets worse.',
  'A coach unexpectedly champions you.',
  'A random scholarship opens one door.',
  'You are in the wrong place during violence.',
  'A neighbor intervenes at the right moment.',
  'A head injury changes school for months.',
  'A flood hits your block.',
  'A winter illness turns dangerous.'
], {
  label: 'Chance',
  ageAdvance: [1, 2],
  deathChance: 0.04,
  causeOfDeath: 'childhood accident',
  effects: { health: -6, stress: 3 },
  damageEffects: { health: -9, stress: 4 },
  softLossEffects: { wealth: -5, support: -2 },
  tags: ['risk', 'health']
});

childhoodChoicePairs.forEach((pair, idx) => {
  add({
    id: `child_choice_${idx + 1}`,
    stage: 'childhood',
    beatType: 'choice',
    label: 'You Choose',
    text: 'Pressure rises and you need to decide quickly.',
    choices: [
      { id: `child_choice_${idx + 1}_a`, label: pair[0], effects: { wealth: 3, stress: 3, meaning: -1 } },
      { id: `child_choice_${idx + 1}_b`, label: pair[1], effects: { meaning: 3, stress: 1, wealth: -1 } }
    ],
    ageAdvance: [1, 2],
    tags: ['choice']
  });
});

addTemplateSet('childhood', 'consequence', 'child_consequence', [
  'Neglect teaches you to disappear in plain sight.',
  'Being loved makes recovery easier than expected.',
  'Poverty follows you into every school decision.',
  'Early praise becomes a private source of courage.',
  'Shame hardens into distance.',
  'Small kindness keeps you reachable.',
  'Fear becomes your normal baseline.',
  'You begin to trust your own voice.'
], { label: 'Consequence', ageAdvance: [1, 2], effects: { meaning: 2, stress: 1 } });

// Adolescence
const teenTradeoffs = [
  ['Belong now', 'Be yourself'],
  ['Tell the truth', 'Keep the mask'],
  ['Take the risk', 'Play it safe'],
  ['Stay in school', 'Work full-time'],
  ['Say yes', 'Set boundaries'],
  ['Keep pushing', 'Rest and recover'],
  ['Stay in town', 'Leave early'],
  ['Confront them', 'Let it go'],
  ['Use substances', 'Walk away'],
  ['Protect your image', 'Ask for help'],
  ['Choose ambition', 'Choose presence'],
  ['Stay loyal', 'Choose yourself'],
  ['Keep the secret', 'Tell someone'],
  ['Hold on', 'Start over']
];

addTemplateSet('adolescence', 'flash', 'teen_flash', [
  'Your body changes faster than your certainty.',
  'You learn to perform confidence.',
  'Some friendships feel like oxygen.',
  'Silence becomes a strategy.',
  'You begin keeping two versions of yourself.',
  'Music carries what words cannot.',
  'A year disappears in exams.',
  'You keep one dream private.'
], { label: 'Passing Time', ageAdvance: [1, 1], effects: { meaning: 1 } });

addTemplateSet('adolescence', 'forced', 'teen_forced', [
  'Social pressure narrows your choices.',
  'A breakup rewires your confidence.',
  'Family conflict becomes daily weather.',
  'You start paying bills before adulthood.',
  'A trusted adult lets you down.',
  'A mentor gives you difficult honesty.',
  'Online humiliation follows you for months.',
  'A friend dies too young.',
  'You become caregiver at home.',
  'A teacher misreads you publicly.'
], { label: 'Life Happens', ageAdvance: [1, 2], effects: { stress: 5 }, tags: ['hardship'] });

addTemplateSet('adolescence', 'chance', 'teen_chance', [
  'A distracted driver drifts into your lane.',
  'A fever becomes a medical emergency.',
  'A scholarship committee notices your file.',
  'A violent incident erupts nearby.',
  'A random message changes your path.',
  'You blackout at a party.',
  'An injury sidelines your plans.',
  'A stranger steps in at the right second.',
  'An exam score opens one narrow door.',
  'A near-miss crash shakes you for years.'
], {
  label: 'Chance',
  ageAdvance: [1, 2],
  deathChance: 0.05,
  causeOfDeath: 'adolescent traumatic event',
  effects: { health: -7, stress: 4 },
  damageEffects: { health: -11, stress: 5 },
  softLossEffects: { wealth: -6, support: -2 },
  tags: ['risk', 'health']
});

teenTradeoffs.forEach((pair, idx) => {
  add({
    id: `teen_choice_${idx + 1}`,
    stage: 'adolescence',
    beatType: 'choice',
    label: 'You Choose',
    text: 'You have seconds to decide who you are becoming.',
    choices: [
      { id: `teen_choice_${idx + 1}_a`, label: pair[0], effects: { support: 2, stress: 3, meaning: -1 } },
      { id: `teen_choice_${idx + 1}_b`, label: pair[1], effects: { meaning: 4, stress: 1, support: -1 } }
    ],
    ageAdvance: [1, 2],
    tags: ['identity']
  });
});

addTemplateSet('adolescence', 'consequence', 'teen_consequence', [
  'You begin to carry old wounds into new rooms.',
  'Talent without support starts to burn.',
  'Belonging gives you momentum.',
  'Unresolved shame becomes isolation.',
  'Small discipline compounds into options.',
  'Addictive patterns become harder to hide.'
], { label: 'Consequence', ageAdvance: [1, 2], effects: { meaning: 1, stress: 2 } });

// Early adulthood
const earlyTradeoffs = [
  ['Take the salary', 'Take the purpose'],
  ['Stay in school', 'Earn money now'],
  ['Commit to love', 'Protect independence'],
  ['Buy stability', 'Keep flexibility'],
  ['Keep grinding', 'Scale back'],
  ['Move for work', 'Stay for people'],
  ['Tell the truth', 'Protect the relationship'],
  ['Start therapy', 'Push through'],
  ['Take on debt', 'Live smaller'],
  ['Choose prestige', 'Choose peace'],
  ['Build family', 'Delay parenthood'],
  ['Stick it out', 'Quit now'],
  ['Stay loyal', 'Leave early'],
  ['Accept promotion', 'Protect health'],
  ['Caregive at home', 'Hire help']
];

addTemplateSet('early_adulthood', 'flash', 'early_flash', [
  'Years blur into commutes and deadlines.',
  'You rent smaller to stay afloat.',
  'Your calendar fills before your needs do.',
  'Weekend sunlight starts to feel rare.',
  'You keep promising yourself a break.',
  'A quiet evening feels like luxury.',
  'You begin counting time in obligations.'
], { label: 'Passing Time', ageAdvance: [1, 2], effects: { stress: 2 } });

addTemplateSet('early_adulthood', 'forced', 'early_forced', [
  'Your company downsizes without warning.',
  'Rent rises faster than your paycheck.',
  'A parent needs financial help.',
  'A relationship grows distant under pressure.',
  'A close friend dies unexpectedly.',
  'You become the default problem-solver.',
  'Debt starts dictating your decisions.',
  'Healthcare costs derail your plans.',
  'Burnout follows you home each night.',
  'A manager rewards overwork.',
  'A legal issue consumes months.',
  'Your support network thins out.'
], { label: 'Life Happens', ageAdvance: [1, 3], effects: { stress: 6 }, tags: ['hardship'] });

addTemplateSet('early_adulthood', 'chance', 'early_chance', [
  'A highway crash unfolds ahead.',
  'A scan finds something unclear.',
  'An investor unexpectedly backs you.',
  'A random recommendation changes your career.',
  'A panic attack strikes at work.',
  'You are mugged on your way home.',
  'A medication reaction turns severe.',
  'A freak accident sidelines you.',
  'A public mistake goes viral.',
  'A stranger offers a critical referral.'
], {
  label: 'Chance',
  ageAdvance: [1, 3],
  deathChance: 0.07,
  causeOfDeath: 'early adult crisis',
  effects: { health: -8, stress: 5 },
  damageEffects: { health: -12, stress: 6 },
  softLossEffects: { wealth: -8, support: -2 },
  tags: ['risk', 'health']
});

earlyTradeoffs.forEach((pair, idx) => {
  add({
    id: `early_choice_${idx + 1}`,
    stage: 'early_adulthood',
    beatType: 'choice',
    label: 'You Choose',
    text: 'You cannot optimize everything at once.',
    choices: [
      { id: `early_choice_${idx + 1}_a`, label: pair[0], effects: { wealth: 5, stress: 4, meaning: -1 } },
      { id: `early_choice_${idx + 1}_b`, label: pair[1], effects: { meaning: 4, stress: 1, wealth: -2 } }
    ],
    ageAdvance: [1, 3]
  });
});

addTemplateSet('early_adulthood', 'consequence', 'early_consequence', [
  'Years of overwork settle into your chest.',
  'Money stress keeps narrowing your options.',
  'Supportive people make healing possible.',
  'Ambition pays, but distance grows.',
  'You stayed too long and burnout hardened.',
  'Purpose, once found, keeps you moving.',
  'Unpaid care changed your entire decade.',
  'Avoided pain now returns with interest.'
], { label: 'Consequence', ageAdvance: [1, 3], effects: { stress: 2, meaning: 1 } });

// Midlife
const midTradeoffs = [
  ['Keep status', 'Change careers'],
  ['Stay married', 'Leave honestly'],
  ['Care for parents', 'Protect boundaries'],
  ['Keep pushing', 'Prioritize health'],
  ['Hold grudges', 'Attempt repair'],
  ['Chase money', 'Chase meaning'],
  ['Stay silent', 'Speak hard truth'],
  ['Endure routine', 'Start over']
];

addTemplateSet('midlife', 'flash', 'mid_flash', [
  'Midlife arrives while you are still catching up.',
  'Your body starts sending invoices.',
  'Old dreams feel both near and far.',
  'You measure years by funerals and graduations.',
  'Silence becomes harder to ignore.',
  'The mirror starts telling the truth.'
], { label: 'Passing Time', ageAdvance: [1, 3], effects: { stress: 1 } });

addTemplateSet('midlife', 'forced', 'mid_forced', [
  'A parent’s health collapses quickly.',
  'Your role at work is suddenly eliminated.',
  'A long relationship fractures.',
  'A child needs crisis support.',
  'Housing instability returns unexpectedly.',
  'A legal dispute drains resources.',
  'A friend’s death rearranges priorities.',
  'Chronic pain limits your days.',
  'You become responsible for everyone again.',
  'Medical debt arrives in waves.',
  'Your social world shrinks.'
], { label: 'Life Happens', ageAdvance: [1, 3], effects: { stress: 6 }, tags: ['hardship'] });

addTemplateSet('midlife', 'chance', 'mid_chance', [
  'A scan reveals a dangerous anomaly.',
  'A mild symptom masks a serious condition.',
  'A night drive turns catastrophic.',
  'A lucky break rescues your finances.',
  'A stroke warning appears and fades.',
  'A random mentor opens one final door.',
  'An infection gets severe fast.',
  'You avoid a violent incident by seconds.'
], {
  label: 'Chance',
  ageAdvance: [1, 3],
  deathChance: 0.11,
  causeOfDeath: 'midlife medical or traumatic event',
  effects: { health: -10, stress: 5 },
  damageEffects: { health: -14, stress: 6 },
  softLossEffects: { wealth: -9, support: -2 },
  tags: ['risk', 'health']
});

midTradeoffs.forEach((pair, idx) => {
  add({
    id: `mid_choice_${idx + 1}`,
    stage: 'midlife',
    beatType: 'choice',
    label: 'You Choose',
    text: 'What you choose now will shape the rest.',
    choices: [
      { id: `mid_choice_${idx + 1}_a`, label: pair[0], effects: { wealth: 4, stress: 3, meaning: -1 } },
      { id: `mid_choice_${idx + 1}_b`, label: pair[1], effects: { meaning: 4, stress: 1, wealth: -1 } }
    ],
    ageAdvance: [1, 3]
  });
});

addTemplateSet('midlife', 'consequence', 'mid_consequence', [
  'Years of stress become a physical condition.',
  'Purpose keeps you intact during loss.',
  'Unresolved resentment isolates you.',
  'Consistent care deepens your relationships.',
  'Financial fear continues to govern decisions.',
  'Boundaries slowly restore your health.',
  'Distance with family hardens into estrangement.'
], { label: 'Consequence', ageAdvance: [1, 3], effects: { meaning: 1, stress: 2 } });

// Late life
addTemplateSet('late_life', 'flash', 'late_flash', [
  'Mornings take longer than they used to.',
  'You keep a list of medications in your pocket.',
  'Old memories become vividly present.',
  'Small beauty carries disproportionate weight.',
  'Days feel both slow and short.'
], { label: 'Passing Time', ageAdvance: [1, 2], effects: { meaning: 2 } });

addTemplateSet('late_life', 'forced', 'late_forced', [
  'You lose someone who held your history.',
  'Mobility declines this year.',
  'Care needs begin to define your schedule.',
  'A family conflict remains unresolved.',
  'Your world becomes physically smaller.',
  'A reconciliation offers late peace.',
  'You become dependent on others for daily tasks.',
  'Your savings are less stable than hoped.'
], { label: 'Life Happens', ageAdvance: [1, 2], effects: { stress: 5 }, tags: ['hardship'] });

addTemplateSet('late_life', 'chance', 'late_chance', [
  'A fall turns dangerous in seconds.',
  'A heart rhythm turns unstable overnight.',
  'An infection spreads rapidly.',
  'A procedure succeeds against odds.',
  'A stroke warning arrives with no time to plan.',
  'A near-miss leaves you shaken but alive.'
], {
  label: 'Chance',
  ageAdvance: [1, 2],
  deathChance: 0.2,
  causeOfDeath: 'late-life medical decline',
  effects: { health: -12, stress: 4 },
  damageEffects: { health: -16, stress: 5 },
  softLossEffects: { support: -3, meaning: -1 },
  tags: ['risk', 'health']
});

add({
  id: 'late_choice_1',
  stage: 'late_life',
  beatType: 'choice',
  label: 'You Choose',
  text: 'Your doctor says to slow down now.',
  choices: [
    { id: 'late_choice_1a', label: 'Listen and adapt', effects: { health: 3, stress: -2, meaning: 2 } },
    { id: 'late_choice_1b', label: 'Keep pushing', effects: { wealth: 2, health: -6, stress: 4 } }
  ],
  ageAdvance: [1, 2]
});
add({
  id: 'late_choice_2',
  stage: 'late_life',
  beatType: 'choice',
  label: 'You Choose',
  text: 'Someone who hurt you reaches out.',
  choices: [
    { id: 'late_choice_2a', label: 'Reply', effects: { meaning: 3, support: 2, stress: -1 } },
    { id: 'late_choice_2b', label: 'Ignore', effects: { stress: 1, meaning: -1 } }
  ],
  ageAdvance: [1, 2]
});
add({
  id: 'late_choice_3',
  stage: 'late_life',
  beatType: 'choice',
  label: 'You Choose',
  text: 'You can preserve savings or fund one meaningful trip.',
  choices: [
    { id: 'late_choice_3a', label: 'Keep savings', effects: { wealth: 3, meaning: -1 } },
    { id: 'late_choice_3b', label: 'Take the trip', effects: { wealth: -3, meaning: 4, support: 1 } }
  ],
  ageAdvance: [1, 2]
});

addTemplateSet('late_life', 'consequence', 'late_consequence', [
  'The life you built decides who sits beside your bed.',
  'Purpose softens fear in your final years.',
  'Isolation makes each setback heavier.',
  'Love outlives your strongest years.',
  'Regret asks for attention before the end.',
  'You leave more kindness than certainty.'
], { label: 'Consequence', ageAdvance: [1, 2], effects: { meaning: 2 } });

const setAgeBounds = (id: string, minAge?: number, maxAge?: number) => {
  const target = beats.find((beat) => beat.id === id);
  if (!target) return;
  target.minAge = minAge;
  target.maxAge = maxAge;
};

// Guardrails for age-appropriate content in childhood.
setAgeBounds('child_forced_12', 10, 12); // "adult worries" should not appear too early.
setAgeBounds('child_chance_5', 10, 12); // scholarship opportunities should appear in late childhood.
setAgeBounds('child_choice_10', 9, 12); // "Speak up / Stay small" works better later in childhood.

export const lifeBeats = beats;
