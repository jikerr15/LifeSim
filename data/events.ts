import { LifeEvent } from '@/types/game';

export const lifeEvents: LifeEvent[] = [
  {
    id: 'birth_ended_pregnancy',
    stage: 'birth',
    type: 'chance',
    title: 'Pregnancy Crisis',
    text: 'A severe complication threatens the pregnancy before labor begins.',
    weight: 0.5,
    deathChance: 0.035,
    causeOfDeath: 'pregnancy ended before birth',
    surviveText: 'Against the odds, you make it to delivery.',
    tags: ['risk', 'health'],
    effects: { health: -9, stress: 5 },
    ageAdvance: [0, 1]
  },
  { id: 'birth_complication', stage: 'birth', type: 'chance', title: 'Difficult Delivery', text: 'Complications emerge during birth and every second matters.', weight: 1, deathChance: 0.03, causeOfDeath: 'birth complications', tags: ['health', 'risk'], effects: { health: -10, stress: 3 }, ageAdvance: [0, 1] },
  { id: 'birth_quiet', stage: 'birth', type: 'forced', title: 'A Quiet Arrival', text: 'You arrive to exhausted but relieved faces in a dim hospital room.', weight: 3.5, tags: ['family'], effects: { support: 3, meaning: 2 }, ageAdvance: [0, 1] },
  { id: 'birth_crisis', stage: 'birth', type: 'chance', title: 'Unstable Start', text: 'Your first year unfolds during a local crisis and shortages.', weight: 1.2, deathChance: 0.02, causeOfDeath: 'early-life disease', tags: ['hardship'], effects: { wealth: -9, stress: 7 }, ageAdvance: [0, 1] },
  { id: 'birth_kind_nurse', stage: 'birth', type: 'forced', title: 'Early Intervention', text: 'A careful nurse catches a hidden issue before it worsens.', weight: 2, tags: ['health', 'recovery'], effects: { health: 7, support: 3 }, ageAdvance: [0, 1] },
  { id: 'birth_scarcity', stage: 'birth', type: 'forced', title: 'Scarcity', text: 'Your family struggles to meet basic needs in your first months.', weight: 2, tags: ['hardship', 'wealth'], effects: { health: -5, wealth: -11, stress: 7 }, ageAdvance: [0, 1] },

  { id: 'infancy_parent_bond', stage: 'childhood', type: 'forced', minAge: 1, maxAge: 3, title: 'Attachment', text: 'A caregiver consistently shows up and you learn the world can be safe.', tags: ['family'], effects: { support: 8, stress: -3, meaning: 3 }, ageAdvance: [1, 2] },
  { id: 'infancy_car_accident', stage: 'childhood', type: 'chance', minAge: 1, maxAge: 5, title: 'Backseat Collision', text: 'A routine drive turns into a serious crash.', tags: ['risk', 'health'], deathChance: 0.018, causeOfDeath: 'car accident', effects: { health: -12, stress: 7 }, ageAdvance: [1, 2] },
  { id: 'child_first_school', stage: 'childhood', type: 'choice', minAge: 4, maxAge: 8, title: 'First School Year', text: 'You are struggling in class and your family asks what you want to focus on.', tags: ['school'], choices: [
    { id: 'ask_for_help', label: 'Ask for tutoring and support', effects: { wealth: -2, stress: -2, meaning: 3, support: 2 } },
    { id: 'hide_it', label: 'Hide the struggle and pretend it is fine', effects: { stress: 7, meaning: -3 } },
    { id: 'double_down', label: 'Push hard alone every night', effects: { wealth: 3, stress: 5, health: -2, meaning: 1 } }
  ], ageAdvance: [1, 2] },
  { id: 'child_bullied', stage: 'childhood', type: 'choice', minAge: 7, maxAge: 12, title: 'Targeted at School', text: 'Bullying becomes persistent and starts affecting your sleep.', tags: ['stress', 'school'], choices: [
    { id: 'tell_trusted_adult', label: 'Tell a trusted adult and document it', effects: { support: 6, stress: -3, meaning: 2 } },
    { id: 'stay_silent', label: 'Stay silent and absorb it', effects: { stress: 10, meaning: -4, health: -2 } },
    { id: 'retaliate', label: 'Retaliate directly', effects: { stress: 5, support: -3 }, deathChance: 0.006, causeOfDeath: 'violent incident at school' }
  ], ageAdvance: [1, 2] },
  { id: 'child_illness', stage: 'childhood', type: 'chance', minAge: 3, maxAge: 12, title: 'Severe Infection', text: 'You get very sick and need urgent care.', tags: ['health', 'risk'], deathChance: 0.022, causeOfDeath: 'childhood illness', effects: { health: -12, stress: 5 }, ageAdvance: [1, 2] },
  { id: 'child_mentor', stage: 'childhood', type: 'forced', minAge: 8, maxAge: 12, title: 'Mentor Appears', text: 'A teacher notices your effort and invests time in you.', tags: ['opportunity'], effects: { meaning: 7, support: 5, wealth: 3 }, ageAdvance: [1, 2] },
  { id: 'child_family_split', stage: 'childhood', type: 'forced', minAge: 6, maxAge: 12, title: 'Home Changes', text: 'Adults in your home separate and routines collapse.', tags: ['family', 'hardship'], effects: { support: -11, stress: 11 }, ageAdvance: [1, 2] },
  { id: 'child_hobby', stage: 'childhood', type: 'choice', minAge: 8, maxAge: 12, title: 'Something You Love', text: 'You find one activity that makes time disappear.', tags: ['meaning'], choices: [
    { id: 'commit_hobby', label: 'Commit and practice consistently', effects: { meaning: 8, stress: -2, support: 2 } },
    { id: 'drop_hobby', label: 'Drop it for practical obligations', effects: { wealth: 2, meaning: -3, stress: 2 } }
  ], ageAdvance: [1, 2] },
  { id: 'child_help_home', stage: 'childhood', type: 'choice', minAge: 9, maxAge: 12, title: 'Responsibility Early', text: 'You can spend afternoons earning money or staying focused on school.', tags: ['family', 'school'], choices: [
    { id: 'help_home', label: 'Work to support your household', effects: { support: 4, wealth: 5, stress: 4, meaning: 1 } },
    { id: 'study', label: 'Focus on education while you can', effects: { wealth: 3, stress: 1, meaning: 2 } }
  ], ageAdvance: [1, 2] },

  { id: 'teen_identity', stage: 'adolescence', type: 'choice', minAge: 13, maxAge: 15, title: 'Identity Questions', text: 'You begin deciding whether to live as expected or as yourself.', tags: ['meaning'], choices: [
    { id: 'explore_openly', label: 'Explore openly with trusted people', effects: { meaning: 9, support: -1, stress: 2 } },
    { id: 'mask', label: 'Mask your feelings to avoid conflict', effects: { stress: 6, support: 2, meaning: -4 } }
  ], ageAdvance: [1, 2] },
  { id: 'teen_academics', stage: 'adolescence', type: 'choice', minAge: 15, maxAge: 18, title: 'High-Stakes Exams', text: 'Final exam season is approaching and everyone expects results.', tags: ['school', 'opportunity'], choices: [
    { id: 'balanced_plan', label: 'Use a balanced plan with rest and prep', effects: { wealth: 4, stress: 2, meaning: 2 } },
    { id: 'all_nighter', label: 'Cut sleep and push to the limit', effects: { wealth: 6, stress: 8, health: -3 } },
    { id: 'disengage', label: 'Disengage and accept lower results', effects: { stress: -2, wealth: -4, meaning: -1 } }
  ], ageAdvance: [1, 2] },
  { id: 'teen_relationship', stage: 'adolescence', type: 'choice', minAge: 15, maxAge: 18, title: 'First Serious Relationship', text: 'The relationship becomes intense and starts affecting everything else.', tags: ['love'], choices: [
    { id: 'communicate', label: 'Set boundaries and communicate clearly', effects: { support: 5, meaning: 4, stress: -1 } },
    { id: 'all_in', label: 'Go all in and neglect other areas', effects: { meaning: 5, support: 2, stress: 6 } },
    { id: 'end_it', label: 'End it to stabilize your life', effects: { stress: 3, meaning: -2, support: -1 } }
  ], ageAdvance: [1, 2] },
  { id: 'teen_substance', stage: 'adolescence', type: 'choice', minAge: 14, maxAge: 18, title: 'Risky Night', text: 'Friends push you to use substances at a party with no supervision.', tags: ['risk', 'health'], choices: [
    { id: 'join', label: 'Join in to fit in', effects: { support: 2, health: -9, stress: 2 }, deathChance: 0.024, causeOfDeath: 'overdose' },
    { id: 'decline', label: 'Decline and leave with one friend', effects: { support: -1, meaning: 3, stress: -1 } }
  ], ageAdvance: [1, 2] },
  { id: 'teen_work', stage: 'adolescence', type: 'forced', minAge: 15, maxAge: 18, title: 'Part-Time Work', text: 'You pick up regular shifts while trying to finish school.', tags: ['wealth', 'hardship'], effects: { wealth: 8, stress: 5, meaning: 1 }, ageAdvance: [1, 2] },
  { id: 'teen_injury', stage: 'adolescence', type: 'chance', minAge: 13, maxAge: 18, title: 'Serious Injury', text: 'An accident threatens your mobility for months.', tags: ['health'], deathChance: 0.008, causeOfDeath: 'traumatic injury', effects: { health: -13, stress: 6 }, ageAdvance: [1, 2] },
  { id: 'teen_scholarship', stage: 'adolescence', type: 'chance', minAge: 16, maxAge: 18, title: 'Scholarship Decision', text: 'A scholarship committee reviews your application.', tags: ['opportunity', 'wealth'], effects: { wealth: 11, meaning: 3, stress: -2 }, ageAdvance: [1, 2] },
  { id: 'teen_hit_by_car', stage: 'adolescence', type: 'chance', minAge: 13, maxAge: 18, title: 'Crosswalk Impact', text: 'A distracted driver runs a red light while you cross.', tags: ['risk', 'health'], deathChance: 0.018, causeOfDeath: 'hit by a car', effects: { health: -15, stress: 8 }, ageAdvance: [1, 2] },

  { id: 'adult_first_job', stage: 'adulthood', type: 'choice', minAge: 19, maxAge: 26, title: 'First Career Fork', text: 'You have to choose between stable pay and meaningful work.', tags: ['work'], choices: [
    { id: 'stable_job', label: 'Take the stable job with benefits', effects: { wealth: 8, stress: 3, meaning: 1 } },
    { id: 'mission_job', label: 'Take the mission-driven role', effects: { meaning: 8, wealth: 2, stress: 4 } },
    { id: 'gig_work', label: 'Freelance for flexibility', effects: { meaning: 3, stress: 6, wealth: 1 } }
  ], ageAdvance: [2, 4] },
  { id: 'adult_new_city', stage: 'adulthood', type: 'choice', minAge: 21, maxAge: 35, title: 'Move or Stay', text: 'A new city offers better pay but weakens your support network.', tags: ['work', 'opportunity'], choices: [
    { id: 'move', label: 'Move and restart your social life', effects: { wealth: 10, support: -4, stress: 5, meaning: 2 } },
    { id: 'stay', label: 'Stay and build where you are', effects: { support: 4, wealth: 3, meaning: 2 } }
  ], ageAdvance: [2, 5] },
  { id: 'adult_layoff', stage: 'adulthood', type: 'forced', minAge: 24, maxAge: 50, title: 'Layoff', text: 'A sudden restructuring removes your role.', tags: ['work', 'hardship'], effects: { wealth: -13, stress: 10, meaning: -3 }, ageAdvance: [2, 4] },
  { id: 'adult_promotion', stage: 'adulthood', type: 'forced', minAge: 27, maxAge: 50, title: 'Promotion', text: 'Your responsibilities and income both jump at once.', tags: ['work', 'wealth'], effects: { wealth: 12, stress: 4, meaning: 3 }, ageAdvance: [2, 4] },
  { id: 'adult_partnership', stage: 'adulthood', type: 'choice', minAge: 23, maxAge: 45, title: 'Building a Life Together', text: 'You and your partner are discussing long-term commitment.', tags: ['love'], choices: [
    { id: 'commit', label: 'Commit and actively invest in the relationship', effects: { support: 10, meaning: 7, stress: -2 } },
    { id: 'delay', label: 'Delay commitment and prioritize independence', effects: { support: -2, wealth: 4, meaning: 1 } }
  ], ageAdvance: [2, 4] },
  { id: 'adult_divorce', stage: 'adulthood', type: 'forced', minAge: 28, maxAge: 52, title: 'Separation', text: 'The relationship ends after years of strain.', tags: ['loss', 'love'], effects: { support: -13, stress: 11, wealth: -7, meaning: -5 }, ageAdvance: [2, 4] },
  { id: 'adult_parenthood', stage: 'adulthood', type: 'forced', minAge: 24, maxAge: 46, title: 'Parenthood', text: 'Your time, money, and emotional energy are suddenly reallocated.', tags: ['family'], effects: { support: 6, stress: 8, meaning: 9, wealth: -4 }, ageAdvance: [2, 5] },
  { id: 'adult_burnout', stage: 'adulthood', type: 'forced', minAge: 30, maxAge: 55, title: 'Burnout', text: 'Chronic pressure starts showing up as insomnia and fatigue.', tags: ['stress', 'health'], effects: { health: -14, stress: 10, meaning: -3 }, ageAdvance: [2, 3] },
  { id: 'adult_therapy', stage: 'adulthood', type: 'choice', minAge: 26, maxAge: 55, title: 'Asking for Help', text: 'You can get professional help, but it costs time and money.', tags: ['recovery'], choices: [
    { id: 'therapy', label: 'Start therapy and keep showing up', effects: { stress: -12, meaning: 6, support: 3, wealth: -2 } },
    { id: 'avoid', label: 'Avoid help and keep grinding', effects: { stress: 6, meaning: -3 } }
  ], ageAdvance: [2, 4] },
  { id: 'adult_highway_crash', stage: 'adulthood', type: 'chance', minAge: 19, maxAge: 55, title: 'Highway Crash', text: 'A multi-car pileup erupts in front of you.', tags: ['risk'], deathChance: 0.03, causeOfDeath: 'traffic accident', effects: { health: -16, stress: 8 }, ageAdvance: [2, 3] },
  { id: 'adult_chronic_condition', stage: 'adulthood', type: 'chance', minAge: 33, maxAge: 55, title: 'Chronic Diagnosis', text: 'A diagnosis forces permanent lifestyle changes.', tags: ['health'], deathChance: 0.022, causeOfDeath: 'chronic illness', effects: { health: -19, stress: 7, meaning: -2 }, ageAdvance: [2, 4] },

  { id: 'late_retirement', stage: 'late_life', type: 'choice', minAge: 56, maxAge: 70, title: 'Retirement Decision', text: 'You can retire now or continue working for more security.', tags: ['work', 'aging'], choices: [
    { id: 'retire', label: 'Retire and re-center your life', effects: { stress: -8, meaning: 4, wealth: -3 } },
    { id: 'continue_work', label: 'Keep working for financial safety', effects: { wealth: 7, stress: 4, health: -4 } }
  ], ageAdvance: [1, 4] },
  { id: 'late_grandchild', stage: 'late_life', type: 'forced', minAge: 56, maxAge: 80, title: 'New Generation', text: 'You become an anchor for younger family members.', tags: ['family'], effects: { support: 9, meaning: 8 }, ageAdvance: [1, 3] },
  { id: 'late_loneliness', stage: 'late_life', type: 'forced', minAge: 60, maxAge: 90, title: 'Loneliness', text: 'Your social circle shrinks and days become quieter.', tags: ['isolation'], effects: { support: -11, stress: 7, meaning: -4 }, ageAdvance: [1, 3] },
  { id: 'late_partner_loss', stage: 'late_life', type: 'forced', minAge: 60, maxAge: 95, title: 'Losing a Partner', text: 'You lose the person who knew your life best.', tags: ['loss', 'love'], effects: { support: -14, stress: 10, meaning: -6 }, ageAdvance: [1, 3] },
  { id: 'late_hospital', stage: 'late_life', type: 'chance', minAge: 58, maxAge: 95, title: 'Emergency Admission', text: 'A sudden health event sends you to intensive care.', tags: ['health', 'risk'], deathChance: 0.13, causeOfDeath: 'organ failure', effects: { health: -17, stress: 5 }, ageAdvance: [1, 2] },
  { id: 'late_fall', stage: 'late_life', type: 'chance', minAge: 65, maxAge: 95, title: 'Major Fall', text: 'A fall causes injuries that are difficult to recover from.', tags: ['risk', 'health'], deathChance: 0.1, causeOfDeath: 'complications from a fall', effects: { health: -14, stress: 4 }, ageAdvance: [1, 2] },
  { id: 'late_reconnect', stage: 'late_life', type: 'forced', minAge: 58, maxAge: 90, title: 'Reconnection', text: 'You reconnect with someone from earlier chapters of life.', tags: ['recovery', 'family'], effects: { support: 8, meaning: 5, stress: -3 }, ageAdvance: [1, 3] },
  { id: 'late_reflection', stage: 'late_life', type: 'choice', minAge: 60, maxAge: 100, title: 'Looking Back', text: 'You decide how to spend your remaining energy and attention.', tags: ['meaning'], choices: [
    { id: 'community', label: 'Invest in community and family', effects: { support: 6, meaning: 5, stress: -2 } },
    { id: 'private', label: 'Keep life small and private', effects: { stress: -1, meaning: 2, support: -1 } }
  ], ageAdvance: [1, 3] },
  { id: 'late_old_age', stage: 'late_life', type: 'chance', minAge: 72, maxAge: 110, title: 'Old Age', text: 'Your body slows and ordinary strain becomes harder to absorb.', tags: ['aging'], deathChance: 0.17, causeOfDeath: 'old age', effects: { health: -11, stress: 1 }, ageAdvance: [1, 2] }
];
