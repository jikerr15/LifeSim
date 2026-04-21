import { LifeEvent } from '@/types/game';

export const lifeEvents: LifeEvent[] = [
  { id: 'birth_complication', stage: 'birth', type: 'chance', text: 'Complications emerge during birth.', weight: 1, deathChance: 0.03, causeOfDeath: 'birth complications', surviveText: 'You survive a dangerous first day.', tags: ['health', 'risk'], effects: { health: -10, stress: 3 } },
  { id: 'birth_quiet', stage: 'birth', type: 'forced', text: 'You arrive quietly into a waiting room of tired faces.', weight: 4, tags: ['family'], effects: { support: 2, meaning: 1 } },
  { id: 'birth_crisis', stage: 'birth', type: 'chance', text: 'A regional crisis destabilizes your first year.', weight: 1, deathChance: 0.015, causeOfDeath: 'early-life disease', surviveText: 'You endure a hard first year.', tags: ['hardship'], effects: { wealth: -8, stress: 8 } },
  { id: 'birth_kind_nurse', stage: 'birth', type: 'forced', text: 'An attentive caregiver spots a hidden problem early.', weight: 2, tags: ['health', 'recovery'], effects: { health: 8, support: 3 } },
  { id: 'birth_move', stage: 'birth', type: 'forced', text: 'Your family relocates shortly after you are born.', weight: 2, tags: ['instability'], effects: { stress: 5, support: -2 } },
  { id: 'birth_scarcity', stage: 'birth', type: 'forced', text: 'Essentials are scarce in your early home.', weight: 2, tags: ['hardship', 'wealth'], effects: { health: -4, wealth: -10, stress: 6 } },

  { id: 'child_school_friend', stage: 'childhood', type: 'forced', text: 'You make your first close friend at school.', tags: ['friendship'], effects: { support: 8, meaning: 4 }, ageAdvance: [1, 2] },
  { id: 'child_bullied', stage: 'childhood', type: 'choice', text: 'A group starts targeting you at school.', tags: ['stress', 'school'], choices: [
    { id: 'tell_teacher', label: 'Tell a teacher', effects: { support: 4, stress: -2, meaning: 2 } },
    { id: 'stay_silent', label: 'Stay silent and endure', effects: { stress: 8, meaning: -3 } },
    { id: 'fight_back', label: 'Fight back', effects: { stress: 4, support: -2, meaning: 1 }, deathChance: 0.005, causeOfDeath: 'childhood violence' }
  ], ageAdvance: [1, 2] },
  { id: 'child_art', stage: 'childhood', type: 'choice', text: 'You discover joy in making art.', tags: ['meaning'], choices: [
    { id: 'pursue_art', label: 'Keep practicing', effects: { meaning: 7, stress: -2 } },
    { id: 'drop_art', label: 'Drop it for practical routines', effects: { wealth: 2, meaning: -2 } }
  ], ageAdvance: [1, 3] },
  { id: 'child_illness', stage: 'childhood', type: 'chance', text: 'A severe illness spreads through your town.', tags: ['health', 'risk'], deathChance: 0.025, causeOfDeath: 'childhood illness', surviveText: 'You recover, but slowly.', effects: { health: -12, stress: 6 }, ageAdvance: [1, 2] },
  { id: 'child_mentor', stage: 'childhood', type: 'forced', text: 'A teacher notices your potential and encourages you.', tags: ['opportunity'], effects: { meaning: 6, support: 5, wealth: 2 }, ageAdvance: [1, 2] },
  { id: 'child_family_split', stage: 'childhood', type: 'forced', text: 'Your household fractures under pressure.', tags: ['family', 'hardship'], effects: { support: -10, stress: 10 }, ageAdvance: [1, 2] },
  { id: 'child_move', stage: 'childhood', type: 'forced', text: 'Another move forces you to start over again.', tags: ['instability'], effects: { support: -4, stress: 5 }, ageAdvance: [1, 2] },
  { id: 'child_sports', stage: 'childhood', type: 'choice', text: 'You are invited to join a local sports team.', tags: ['health', 'social'], choices: [
    { id: 'join_sports', label: 'Join the team', effects: { health: 6, support: 4, stress: -2 } },
    { id: 'decline_sports', label: 'Decline politely', effects: { meaning: 1 } }
  ], ageAdvance: [1, 3] },
  { id: 'child_accident', stage: 'childhood', type: 'chance', text: 'A careless moment turns into a serious accident.', tags: ['risk', 'health'], deathChance: 0.012, causeOfDeath: 'childhood accident', surviveText: 'You survive with a lasting scar.', effects: { health: -10, stress: 5, meaning: 1 }, ageAdvance: [1, 2] },
  { id: 'child_help_home', stage: 'childhood', type: 'choice', text: 'You can spend afternoons helping at home or studying extra.', tags: ['family', 'school'], choices: [
    { id: 'help_home', label: 'Help at home', effects: { support: 5, wealth: 2, meaning: 2 } },
    { id: 'extra_study', label: 'Study extra', effects: { wealth: 4, stress: 3, meaning: 1 } }
  ], ageAdvance: [1, 2] },

  { id: 'teen_identity', stage: 'adolescence', type: 'choice', text: 'You begin questioning who you are and what matters.', tags: ['meaning'], choices: [
    { id: 'explore', label: 'Explore openly', effects: { meaning: 8, support: -1, stress: 2 } },
    { id: 'conform', label: 'Conform for safety', effects: { stress: 4, support: 2, meaning: -3 } }
  ], ageAdvance: [1, 2] },
  { id: 'teen_exam', stage: 'adolescence', type: 'choice', text: 'A major exam may shape your options.', tags: ['school', 'opportunity'], choices: [
    { id: 'intense_study', label: 'Study intensely', effects: { wealth: 6, stress: 8, health: -2 } },
    { id: 'balanced', label: 'Keep balance', effects: { wealth: 3, stress: 2, meaning: 2 } }
  ], ageAdvance: [1, 2] },
  { id: 'teen_first_love', stage: 'adolescence', type: 'chance', text: 'You fall deeply in love for the first time.', tags: ['love'], deathChance: 0, surviveText: 'It changes how you see people.', effects: { support: 7, meaning: 6, stress: 2 }, ageAdvance: [1, 2] },
  { id: 'teen_breakup', stage: 'adolescence', type: 'forced', text: 'A close relationship ends suddenly.', tags: ['loss'], effects: { support: -5, stress: 9, meaning: -2 }, ageAdvance: [1, 2] },
  { id: 'teen_substance', stage: 'adolescence', type: 'choice', text: 'Friends pressure you into risky substance use.', tags: ['risk', 'health'], choices: [
    { id: 'join_in', label: 'Join them', effects: { support: 2, health: -8, stress: 1 }, deathChance: 0.02, causeOfDeath: 'overdose' },
    { id: 'walk_away', label: 'Walk away', effects: { support: -2, meaning: 2, stress: -1 } }
  ], ageAdvance: [1, 2] },
  { id: 'teen_work', stage: 'adolescence', type: 'forced', text: 'You take part-time work to help with expenses.', tags: ['wealth', 'hardship'], effects: { wealth: 8, stress: 5, meaning: 1 }, ageAdvance: [1, 2] },
  { id: 'teen_injury', stage: 'adolescence', type: 'chance', text: 'A sports injury threatens your plans.', tags: ['health'], deathChance: 0.006, causeOfDeath: 'traumatic injury', surviveText: 'You recover after months of rehab.', effects: { health: -12, stress: 5 }, ageAdvance: [1, 2] },
  { id: 'teen_volunteer', stage: 'adolescence', type: 'forced', text: 'You volunteer and discover a wider world.', tags: ['meaning', 'community'], effects: { meaning: 8, support: 3 }, ageAdvance: [1, 2] },
  { id: 'teen_conflict_home', stage: 'adolescence', type: 'forced', text: 'Conflict at home escalates into daily tension.', tags: ['family', 'stress'], effects: { stress: 10, support: -6 }, ageAdvance: [1, 2] },
  { id: 'teen_scholarship', stage: 'adolescence', type: 'chance', text: 'A scholarship opportunity appears.', tags: ['opportunity', 'wealth'], surviveText: 'You get it and your path widens.', effects: { wealth: 12, meaning: 3, stress: -2 }, ageAdvance: [1, 2] },

  { id: 'adult_new_city', stage: 'adulthood', type: 'choice', text: 'You can move to a new city for work.', tags: ['work', 'opportunity'], choices: [
    { id: 'move', label: 'Take the leap', effects: { wealth: 10, support: -3, stress: 4, meaning: 2 } },
    { id: 'stay', label: 'Stay where you are', effects: { support: 3, wealth: 2, meaning: 1 } }
  ], ageAdvance: [2, 5] },
  { id: 'adult_caregiver', stage: 'adulthood', type: 'forced', text: 'A loved one falls ill, and you become a caregiver.', tags: ['family', 'health'], effects: { support: 4, stress: 10, meaning: 6, wealth: -4 }, ageAdvance: [2, 4] },
  { id: 'adult_layoff', stage: 'adulthood', type: 'forced', text: 'Your workplace downsizes and your role disappears.', tags: ['work', 'hardship'], effects: { wealth: -12, stress: 9, meaning: -3 }, ageAdvance: [2, 4] },
  { id: 'adult_promotion', stage: 'adulthood', type: 'forced', text: 'You earn a promotion after years of effort.', tags: ['work', 'wealth'], effects: { wealth: 12, stress: 4, meaning: 2 }, ageAdvance: [2, 4] },
  { id: 'adult_marriage', stage: 'adulthood', type: 'choice', text: 'You and a partner discuss building a life together.', tags: ['love'], choices: [
    { id: 'commit', label: 'Commit deeply', effects: { support: 12, meaning: 8, stress: -3 } },
    { id: 'stay_independent', label: 'Stay independent', effects: { support: -2, wealth: 3, meaning: 1 } }
  ], ageAdvance: [2, 5] },
  { id: 'adult_divorce', stage: 'adulthood', type: 'forced', text: 'The relationship you trusted comes apart.', tags: ['loss', 'love'], effects: { support: -12, stress: 11, wealth: -6, meaning: -4 }, ageAdvance: [2, 4] },
  { id: 'adult_startup', stage: 'adulthood', type: 'chance', text: 'You start a risky small business.', tags: ['risk', 'wealth'], deathChance: 0, surviveText: 'It survives a hard first phase.', effects: { wealth: 14, stress: 10, meaning: 3 }, ageAdvance: [2, 5] },
  { id: 'adult_burnout', stage: 'adulthood', type: 'forced', text: 'Years of pressure catch up to your body.', tags: ['stress', 'health'], effects: { health: -14, stress: 9, meaning: -2 }, ageAdvance: [2, 3] },
  { id: 'adult_therapy', stage: 'adulthood', type: 'choice', text: 'You consider asking for professional support.', tags: ['recovery'], choices: [
    { id: 'go_therapy', label: 'Go to therapy', effects: { stress: -10, meaning: 5, support: 3 } },
    { id: 'avoid_therapy', label: 'Push through alone', effects: { stress: 5, meaning: -2 } }
  ], ageAdvance: [2, 4] },
  { id: 'adult_accident', stage: 'adulthood', type: 'chance', text: 'A highway crash unfolds in seconds.', tags: ['risk'], deathChance: 0.03, causeOfDeath: 'traffic accident', surviveText: 'You survive after a long recovery.', effects: { health: -16, stress: 8 }, ageAdvance: [2, 3] },
  { id: 'adult_parenthood', stage: 'adulthood', type: 'forced', text: 'You become responsible for a child.', tags: ['family'], effects: { support: 6, stress: 8, meaning: 9, wealth: -3 }, ageAdvance: [2, 5] },
  { id: 'adult_friend_loss', stage: 'adulthood', type: 'forced', text: 'You lose a close friend unexpectedly.', tags: ['loss'], effects: { support: -6, stress: 7, meaning: -1 }, ageAdvance: [2, 4] },
  { id: 'adult_home_purchase', stage: 'adulthood', type: 'choice', text: 'You can buy a home with significant debt.', tags: ['wealth', 'stability'], choices: [
    { id: 'buy_home', label: 'Buy the home', effects: { wealth: 8, stress: 5, support: 2 } },
    { id: 'rent', label: 'Keep renting', effects: { stress: -1, wealth: 1 } }
  ], ageAdvance: [2, 5] },
  { id: 'adult_community', stage: 'adulthood', type: 'forced', text: 'You find purpose in community organizing.', tags: ['meaning', 'community'], effects: { meaning: 10, support: 7, stress: 2 }, ageAdvance: [2, 4] },
  { id: 'adult_chronic_condition', stage: 'adulthood', type: 'chance', text: 'A chronic condition enters your life.', tags: ['health'], deathChance: 0.02, causeOfDeath: 'chronic illness', surviveText: 'You adapt, but life narrows.', effects: { health: -18, stress: 6, meaning: -2 }, ageAdvance: [2, 4] },

  { id: 'late_retirement', stage: 'late_life', type: 'choice', text: 'You can retire now or keep working.', tags: ['work', 'aging'], choices: [
    { id: 'retire', label: 'Retire', effects: { stress: -8, meaning: 3, wealth: -2 } },
    { id: 'work_on', label: 'Keep working', effects: { wealth: 6, stress: 4, health: -4 } }
  ], ageAdvance: [1, 4] },
  { id: 'late_grandchild', stage: 'late_life', type: 'forced', text: 'A younger generation enters your life.', tags: ['family'], effects: { support: 8, meaning: 7 }, ageAdvance: [1, 3] },
  { id: 'late_loneliness', stage: 'late_life', type: 'forced', text: 'Your circle shrinks and days get quieter.', tags: ['isolation'], effects: { support: -10, stress: 6, meaning: -4 }, ageAdvance: [1, 3] },
  { id: 'late_hobby', stage: 'late_life', type: 'choice', text: 'You find time for a long-delayed hobby.', tags: ['meaning'], choices: [
    { id: 'join_group', label: 'Join a group', effects: { support: 6, meaning: 5, stress: -2 } },
    { id: 'alone_hobby', label: 'Keep it private', effects: { meaning: 4, support: 1 } }
  ], ageAdvance: [1, 3] },
  { id: 'late_hospital', stage: 'late_life', type: 'chance', text: 'You are admitted to the hospital with serious symptoms.', tags: ['health', 'risk'], deathChance: 0.12, causeOfDeath: 'organ failure', surviveText: 'You are discharged, weaker than before.', effects: { health: -16, stress: 5 }, ageAdvance: [1, 2] },
  { id: 'late_partner_loss', stage: 'late_life', type: 'forced', text: 'You lose your life partner.', tags: ['loss', 'love'], effects: { support: -12, stress: 9, meaning: -6 }, ageAdvance: [1, 3] },
  { id: 'late_reconcile', stage: 'late_life', type: 'forced', text: 'You reconcile with someone from your past.', tags: ['recovery', 'family'], effects: { support: 8, meaning: 5, stress: -3 }, ageAdvance: [1, 3] },
  { id: 'late_fall', stage: 'late_life', type: 'chance', text: 'A fall turns into a dangerous medical spiral.', tags: ['risk', 'health'], deathChance: 0.1, causeOfDeath: 'complications from a fall', surviveText: 'You recover mobility slowly.', effects: { health: -14, stress: 4 }, ageAdvance: [1, 2] },
  { id: 'late_reflection', stage: 'late_life', type: 'forced', text: 'You spend more time reflecting on your choices.', tags: ['meaning'], effects: { meaning: 4, stress: -2 }, ageAdvance: [1, 3] },
  { id: 'late_old_age', stage: 'late_life', type: 'chance', text: 'Time itself becomes the central risk.', tags: ['aging'], minAge: 70, deathChance: 0.16, causeOfDeath: 'old age', surviveText: 'Another year is granted.', effects: { health: -10, stress: 1 }, ageAdvance: [1, 2] }
];
