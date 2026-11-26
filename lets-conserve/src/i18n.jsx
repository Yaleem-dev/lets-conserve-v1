import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { CONTENT_I18N, isThin } from './content-i18n/index.js'
import { ha, yo, ig, pcm, ff, wo } from './i18n/ui/africa-west.js'
import { zu, xh, af, sn, rw, bm, tw, am, so, mg } from './i18n/ui/africa-south.js'
import { ar, ti, om } from './i18n/ui/africa-east.js'
import { EXTRAS } from './i18n/ui/extras.js'
import { GAPS } from './i18n/ui/gaps.js'
import { de, it, nl, pl } from './i18n/ui/europe1.js'
import * as EA from './i18n/ui/europe-asia.js'

/* One place for every language the app ships with. English is the source
   of truth: any missing key falls back to it, so a half-finished locale
   never renders a blank label. */
export const LANGS = [
  { id: 'en', label: 'English', native: 'English' },
  { id: 'es', label: 'Spanish', native: 'Español' },
  { id: 'fr', label: 'French', native: 'Français' },
  { id: 'pt', label: 'Portuguese', native: 'Português' },
  { id: 'ar', label: 'Arabic', native: 'العربية', dir: 'rtl' },
  { id: 'sw', label: 'Swahili', native: 'Kiswahili' },
  { id: 'ha', label: 'Hausa', native: 'Hausa' },
  { id: 'yo', label: 'Yoruba', native: 'Yorùbá' },
  { id: 'ig', label: 'Igbo', native: 'Igbo' },
  { id: 'pcm', label: 'Nigerian Pidgin', native: 'Naijá' },
  { id: 'ff', label: 'Fulfulde', native: 'Fulfulde' },
  { id: 'wo', label: 'Wolof', native: 'Wolof' },
  { id: 'zu', label: 'Zulu', native: 'isiZulu' },
  { id: 'xh', label: 'Xhosa', native: 'isiXhosa' },
  { id: 'af', label: 'Afrikaans', native: 'Afrikaans' },
  { id: 'sn', label: 'Shona', native: 'chiShona' },
  { id: 'rw', label: 'Kinyarwanda', native: 'Ikinyarwanda' },
  { id: 'bm', label: 'Bambara', native: 'Bamanankan' },
  { id: 'tw', label: 'Twi', native: 'Twi' },
  { id: 'am', label: 'Amharic', native: 'አማርኛ' },
  { id: 'ti', label: 'Tigrinya', native: 'ትግርኛ' },
  { id: 'om', label: 'Oromo', native: 'Afaan Oromoo' },
  { id: 'so', label: 'Somali', native: 'Soomaali' },
  { id: 'mg', label: 'Malagasy', native: 'Malagasy' },

  /* Europe */
  { id: 'de', label: 'German', native: 'Deutsch', region: 'europe' },
  { id: 'it', label: 'Italian', native: 'Italiano', region: 'europe' },
  { id: 'nl', label: 'Dutch', native: 'Nederlands', region: 'europe' },
  { id: 'pl', label: 'Polish', native: 'Polski', region: 'europe' },
  { id: 'sv', label: 'Swedish', native: 'Svenska', region: 'europe' },
  { id: 'da', label: 'Danish', native: 'Dansk', region: 'europe' },
  { id: 'nb', label: 'Norwegian', native: 'Norsk', region: 'europe' },
  { id: 'fi', label: 'Finnish', native: 'Suomi', region: 'europe' },
  { id: 'el', label: 'Greek', native: 'Ελληνικά', region: 'europe' },
  { id: 'cs', label: 'Czech', native: 'Čeština', region: 'europe' },
  { id: 'hu', label: 'Hungarian', native: 'Magyar', region: 'europe' },
  { id: 'ro', label: 'Romanian', native: 'Română', region: 'europe' },
  { id: 'ru', label: 'Russian', native: 'Русский', region: 'europe' },
  { id: 'uk', label: 'Ukrainian', native: 'Українська', region: 'europe' },
  { id: 'hr', label: 'Croatian', native: 'Hrvatski', region: 'europe' },
  { id: 'ca', label: 'Catalan', native: 'Català', region: 'europe' },
  { id: 'tr', label: 'Turkish', native: 'Türkçe', region: 'europe' },

  /* Asia */
  { id: 'zh', label: 'Chinese', native: '中文', region: 'asia' },
  { id: 'hi', label: 'Hindi', native: 'हिन्दी', region: 'asia' },
  { id: 'ja', label: 'Japanese', native: '日本語', region: 'asia' },
  { id: 'ko', label: 'Korean', native: '한국어', region: 'asia' },
  { id: 'vi', label: 'Vietnamese', native: 'Tiếng Việt', region: 'asia' },
  { id: 'th', label: 'Thai', native: 'ไทย', region: 'asia' },
  { id: 'id', label: 'Indonesian', native: 'Bahasa Indonesia', region: 'asia' },
  { id: 'ms', label: 'Malay', native: 'Bahasa Melayu', region: 'asia' },
  { id: 'tl', label: 'Filipino', native: 'Filipino', region: 'asia' },
  { id: 'bn', label: 'Bengali', native: 'বাংলা', region: 'asia' },
  { id: 'ur', label: 'Urdu', native: 'اردو', dir: 'rtl', region: 'asia' },
  { id: 'fa', label: 'Persian', native: 'فارسی', dir: 'rtl', region: 'asia' },
  { id: 'ta', label: 'Tamil', native: 'தமிழ்', region: 'asia' },
  { id: 'ne', label: 'Nepali', native: 'नेपाली', region: 'asia' },
]

export const RTL = ['ar', 'ff', 'ur', 'fa']

export function dirOf(lang) {
  const hit = LANGS.find((l) => l.id === lang)
  return hit && hit.dir ? hit.dir : 'ltr'
}

const en = {
  'lang.label': 'Language',
  'lang.search': 'Search a language',
  'lang.title': 'Choose a language',
  'lang.more': 'More languages',
  'lang.group.core': 'Most used',
  'lang.group.africa': 'More languages: Africa',
  'lang.group.europe': 'More languages: Europe',
  'lang.group.asia': 'More languages: Asia',
  'nav.home': 'Home',
  'nav.learn': 'Learn',
  'nav.discover': 'Discover',
  'nav.quest': 'Quest',
  'nav.explore': 'Explore',

  'app.description': 'Your personal guide for eco-action',

    'home.cardLearn': 'Short explanations.',
  'home.cardAct': 'Ways to act.',
  'home.cardRes': 'Resources.',
  'home.welcome': 'Welcome',
  'home.heroA': 'Your personal guide',
  'home.heroB': 'for',
  'home.heroC': 'eco-action.',
  'home.line1': 'Learn something.',
  'home.line2': 'Discover something.',
  'home.line3': 'Do something.',
  'home.weekQuest': 'This week\u2019s quest',
  'home.startLearning': 'Start learning',
  'home.thisWeek': 'This week',
  'home.markComplete': 'Mark complete',
  'home.done': 'Done',
  'home.points': 'points',
  'home.creatures': 'Eco-Creatures',
  'home.creatureQ': 'Which eco-creature are you?',
  'home.orgs': 'Organizations near you',
  'home.fullDirectory': 'Full directory',
  'home.didYouKnow': 'Did you know',
  'home.fourThings': 'Four things worth knowing',
  'home.moreInLearn': 'More in Learn',
  'home.supportUs': 'Support us',
  'home.supportLine': 'Ideas, funding or a partnership? Send a note.',
  'home.copyEmail': 'Copy email',
  'home.copied': 'Copied',

  'learn.chapter': 'Chapter 01',
  'learn.title': 'Understand an issue',
  'learn.explainers': 'Explainers',
  'learn.pickOne': 'Pick one',
  'learn.goDeeper': 'Go deeper',
  'learn.watch': 'Watch',
  'learn.shortLessons': 'Short lessons',
  'learn.knowledgeCheck': 'Knowledge check',
  'learn.fiveQ': 'Five questions, {n} points',
  'learn.whyBother': 'Why bother',
  'learn.guessing': 'Guessing teaches nothing.',
  'quiz.newSet': 'New set of questions',
  'home.newFacts': 'Show new facts',
  'learn.next': 'Next',
  'learn.findWay': 'Find a way to act',

  'discover.chapter': 'Chapter 02',
  'discover.title': 'Find your path',
  'discover.directory': 'Directory',
  'discover.whereWork': 'Where the work happens',
  'discover.listed': '{n} listed',
  'discover.search': 'Search by name',
  'discover.all': 'All',
  'discover.guides': 'Action guides',
  'discover.habit': 'Turn it into a habit',
  'discover.repeat': 'Pick one and repeat it.',
  'discover.goQuest': 'Go to Quest',
  'discover.nothing': 'Nothing matches. Try another region.',

  'quest.chapter': 'Chapter 03',
  'quest.title': 'Take your first step',
  'quest.points': 'points',
  'quest.record': 'Your record',
  'quest.doneOf': '{a} of {b} done',
  'quest.all': 'All quests',
  'quest.pickFits': 'Pick what fits',
  'quest.reset': 'Reset',
  'quest.addUp': 'Points add up with every quest.',
  'quest.exploreRes': 'Explore resources',

  'explore.chapter': 'Chapter 04',
  'explore.title': 'A couple of resources',
  'explore.curated': 'Curated',
  'explore.whyFew': 'Why so few',
  'explore.shortList': 'A short list you can trust',
  'explore.turnOne': 'Turn one into a quest',

  'common.learnMore': 'Learn more',

  'footer.sections': 'Sections',
  'footer.startHere': 'Start here',
  'footer.understand': 'Understand, act, repeat.',
  'footer.collab': 'In collaboration with Yaleem-dev',
  'footer.support': 'Support us',


  'learn.result': 'Result',
  'learn.tryAgain': 'Try again',
  'learn.bonusEarned': 'Bonus earned. {n} points.',
  'learn.readThen': 'Read the cards, then retry.',
  'learn.questionOf': 'Question {a} of {b}',
  'learn.rightSoFar': '{n} right',
  'learn.seeResult': 'See result',
  'discover.guideLabel': 'Guide',
  'menu.label': 'Menu',
  'nav.primary': 'Primary',
  'nav.mobile': 'Mobile',
  'skip.content': 'Skip to content',
  'home.letsHome': 'Let’s Conserve home',
  'error.kicker': 'Something broke',
  'error.title': 'This section did not load',
  'creatures.your': 'Your creature',
  'creatures.share': 'Share my creature',
  'creatures.playAgain': 'Play again',

  'badge.seed': 'Seed',
  'badge.sprout': 'Sprout',
  'badge.grove': 'Grove',
  'badge.canopy': 'Canopy',
}

const es = {
  'lang.label': 'Idioma',
  'nav.home': 'Inicio',
  'nav.learn': 'Aprender',
  'nav.discover': 'Descubrir',
  'nav.quest': 'Retos',
  'nav.explore': 'Explorar',

  'app.description': 'Tu guía personal para la acción ecológica',

    'home.cardLearn': 'Explicaciones cortas.',
  'home.cardAct': 'Formas de actuar.',
  'home.cardRes': 'Recursos.',
  'home.welcome': 'Bienvenido',
  'home.heroA': 'Tu guía personal',
  'home.heroB': 'para la',
  'home.heroC': 'acción ecológica.',
  'home.line1': 'Aprende algo.',
  'home.line2': 'Descubre algo.',
  'home.line3': 'Haz algo.',
  'home.weekQuest': 'El reto de esta semana',
  'home.startLearning': 'Empieza a aprender',
  'home.thisWeek': 'Esta semana',
  'home.markComplete': 'Marcar como hecho',
  'home.done': 'Hecho',
  'home.points': 'puntos',
  'home.creatures': 'Eco-Criaturas',
  'home.creatureQ': '¿Qué eco-criatura eres?',
  'home.orgs': 'Organizaciones cerca de ti',
  'home.fullDirectory': 'Directorio completo',
  'home.didYouKnow': 'Sabías que',
  'home.fourThings': 'Cuatro cosas que vale la pena saber',
  'home.moreInLearn': 'Más en Aprender',
  'home.supportUs': 'Apóyanos',
  'home.supportLine': '¿Ideas, financiación o una alianza? Escríbenos.',
  'home.copyEmail': 'Copiar correo',
  'home.copied': 'Copiado',

  'learn.chapter': 'Capítulo 01',
  'learn.title': 'Entiende un tema',
  'learn.explainers': 'Explicaciones',
  'learn.pickOne': 'Elige una',
  'learn.goDeeper': 'Ve más lejos',
  'learn.watch': 'Mira',
  'learn.shortLessons': 'Lecciones cortas',
  'learn.knowledgeCheck': 'Prueba de conocimiento',
  'learn.fiveQ': 'Cinco preguntas, {n} puntos',
  'learn.whyBother': 'Para qué sirve',
  'learn.guessing': 'Adivinar no enseña nada.',
  'learn.next': 'Siguiente',
  'learn.findWay': 'Encuentra cómo actuar',

  'discover.chapter': 'Capítulo 02',
  'discover.title': 'Encuentra tu camino',
  'discover.directory': 'Directorio',
  'discover.whereWork': 'Dónde ocurre el trabajo',
  'discover.listed': '{n} en la lista',
  'discover.search': 'Buscar por nombre',
  'discover.all': 'Todos',
  'discover.guides': 'Guías de acción',
  'discover.habit': 'Conviértelo en hábito',
  'discover.repeat': 'Elige una y repítela.',
  'discover.goQuest': 'Ir a Retos',
  'discover.nothing': 'Nada coincide. Prueba otra región.',

  'quest.chapter': 'Capítulo 03',
  'quest.title': 'Da tu primer paso',
  'quest.points': 'puntos',
  'quest.record': 'Tu registro',
  'quest.doneOf': '{a} de {b} hechos',
  'quest.all': 'Todos los retos',
  'quest.pickFits': 'Elige lo que encaje',
  'quest.reset': 'Reiniciar',
  'quest.addUp': 'Los puntos se suman con cada reto.',
  'quest.exploreRes': 'Explorar recursos',

  'explore.chapter': 'Capítulo 04',
  'explore.title': 'Recursos',
  'explore.curated': 'Seleccionados',
  'explore.whyFew': 'Por qué tan pocos',
  'explore.shortList': 'Una lista corta en la que confiar',
  'explore.turnOne': 'Convierte uno en reto',

  'common.learnMore': 'Saber más',

  'footer.sections': 'Secciones',
  'footer.startHere': 'Empieza aquí',
  'footer.understand': 'Entiende, actúa, repite.',
  'footer.collab': 'En colaboración con Yaleem-dev',
  'footer.support': 'Apóyanos',

  'badge.seed': 'Semilla',
  'badge.sprout': 'Brote',
  'badge.grove': 'Arboleda',
  'badge.canopy': 'Copa',
}

const fr = {
  'lang.label': 'Langue',
  'nav.home': 'Accueil',
  'nav.learn': 'Apprendre',
  'nav.discover': 'Découvrir',
  'nav.quest': 'Défis',
  'nav.explore': 'Explorer',

  'app.description': 'Votre guide personnel pour l\u2019action écologique',

    'home.cardLearn': 'Courtes explications.',
  'home.cardAct': 'Façons d’agir.',
  'home.cardRes': 'Ressources.',
  'home.welcome': 'Bienvenue',
  'home.heroA': 'Votre guide personnel',
  'home.heroB': 'pour',
  'home.heroC': 'l\u2019action écologique.',
  'home.line1': 'Apprenez quelque chose.',
  'home.line2': 'Découvrez quelque chose.',
  'home.line3': 'Faites quelque chose.',
  'home.weekQuest': 'Le défi de la semaine',
  'home.startLearning': 'Commencer à apprendre',
  'home.thisWeek': 'Cette semaine',
  'home.markComplete': 'Marquer comme fait',
  'home.done': 'Fait',
  'home.points': 'points',
  'home.creatures': 'Éco-créatures',
  'home.creatureQ': 'Quelle éco-créature êtes-vous ?',
  'home.orgs': 'Organisations près de chez vous',
  'home.fullDirectory': 'Annuaire complet',
  'home.didYouKnow': 'Le saviez-vous',
  'home.fourThings': 'Quatre choses à savoir',
  'home.moreInLearn': 'Plus dans Apprendre',
  'home.supportUs': 'Soutenez-nous',
  'home.supportLine': 'Des idées, un financement ou un partenariat ? Écrivez-nous.',
  'home.copyEmail': 'Copier l\u2019e-mail',
  'home.copied': 'Copié',

  'learn.chapter': 'Chapitre 01',
  'learn.title': 'Comprendre un enjeu',
  'learn.explainers': 'Explications',
  'learn.pickOne': 'Choisissez-en une',
  'learn.goDeeper': 'Aller plus loin',
  'learn.watch': 'Regarder',
  'learn.shortLessons': 'Leçons courtes',
  'learn.knowledgeCheck': 'Quiz de connaissances',
  'learn.fiveQ': 'Cinq questions, {n} points',
  'learn.whyBother': 'À quoi bon',
  'learn.guessing': 'Deviner n\u2019apprend rien.',
  'learn.next': 'Suivant',
  'learn.findWay': 'Trouver comment agir',

  'discover.chapter': 'Chapitre 02',
  'discover.title': 'Trouvez votre voie',
  'discover.directory': 'Annuaire',
  'discover.whereWork': 'Là où le travail se fait',
  'discover.listed': '{n} référencées',
  'discover.search': 'Rechercher par nom',
  'discover.all': 'Toutes',
  'discover.guides': 'Guides d\u2019action',
  'discover.habit': 'Faites-en une habitude',
  'discover.repeat': 'Choisissez-en un et répétez.',
  'discover.goQuest': 'Aller aux défis',
  'discover.nothing': 'Aucun résultat. Essayez une autre région.',

  'quest.chapter': 'Chapitre 03',
  'quest.title': 'Faites le premier pas',
  'quest.points': 'points',
  'quest.record': 'Votre bilan',
  'quest.doneOf': '{a} sur {b} faits',
  'quest.all': 'Tous les défis',
  'quest.pickFits': 'Choisissez ce qui vous convient',
  'quest.reset': 'Réinitialiser',
  'quest.addUp': 'Les points s\u2019accumulent à chaque défi.',
  'quest.exploreRes': 'Explorer les ressources',

  'explore.chapter': 'Chapitre 04',
  'explore.title': 'Ressources',
  'explore.curated': 'Sélection',
  'explore.whyFew': 'Pourquoi si peu',
  'explore.shortList': 'Une courte liste fiable',
  'explore.turnOne': 'Transformez-en une en défi',

  'common.learnMore': 'En savoir plus',

  'footer.sections': 'Sections',
  'footer.startHere': 'Commencez ici',
  'footer.understand': 'Comprendre, agir, répéter.',
  'footer.collab': 'En collaboration avec Yaleem-dev',
  'footer.support': 'Soutenez-nous',

  'badge.seed': 'Graine',
  'badge.sprout': 'Pousse',
  'badge.grove': 'Bosquet',
  'badge.canopy': 'Canopée',
}

const zh = {
  'lang.label': '语言',
  'nav.home': '首页',
  'nav.learn': '学习',
  'nav.discover': '发现',
  'nav.quest': '挑战',
  'nav.explore': '资源',

  'app.description': '你的生态行动个人指南',

    'home.cardLearn': '简短解说。',
  'home.cardAct': '行动方式。',
  'home.cardRes': '资源。',
  'home.welcome': '欢迎',
  'home.heroA': '你的个人指南',
  'home.heroB': '为了',
  'home.heroC': '生态行动。',
  'home.line1': '学一点。',
  'home.line2': '发现一点。',
  'home.line3': '做一点。',
  'home.weekQuest': '本周挑战',
  'home.startLearning': '开始学习',
  'home.thisWeek': '本周',
  'home.markComplete': '标记完成',
  'home.done': '已完成',
  'home.points': '积分',
  'home.creatures': '生态生灵',
  'home.creatureQ': '你是哪种生态生灵？',
  'home.orgs': '你附近的组织',
  'home.fullDirectory': '完整名录',
  'home.didYouKnow': '你知道吗',
  'home.fourThings': '四件值得知道的事',
  'home.moreInLearn': '在学习中查看更多',
  'home.supportUs': '支持我们',
  'home.supportLine': '有想法、资金或合作意向？写信给我们。',
  'home.copyEmail': '复制邮箱',
  'home.copied': '已复制',

  'learn.chapter': '第 01 章',
  'learn.title': '了解一个议题',
  'learn.explainers': '解说',
  'learn.pickOne': '选一个',
  'learn.goDeeper': '深入了解',
  'learn.watch': '观看',
  'learn.shortLessons': '短课',
  'learn.knowledgeCheck': '知识检测',
  'learn.fiveQ': '五道题，{n} 积分',
  'learn.whyBother': '为什么重要',
  'learn.guessing': '猜不会学到东西。',
  'learn.next': '下一节',
  'learn.findWay': '找到行动方式',

  'discover.chapter': '第 02 章',
  'discover.title': '找到你的路径',
  'discover.directory': '名录',
  'discover.whereWork': '工作在哪里发生',
  'discover.listed': '已收录 {n} 个',
  'discover.search': '按名称搜索',
  'discover.all': '全部',
  'discover.guides': '行动指南',
  'discover.habit': '把它变成习惯',
  'discover.repeat': '选一个并重复。',
  'discover.goQuest': '前往挑战',
  'discover.nothing': '没有匹配结果。试试其他地区。',

  'quest.chapter': '第 03 章',
  'quest.title': '迈出第一步',
  'quest.points': '积分',
  'quest.record': '你的记录',
  'quest.doneOf': '已完成 {a} / {b}',
  'quest.all': '所有挑战',
  'quest.pickFits': '挑合适的',
  'quest.reset': '重置',
  'quest.addUp': '每个挑战都会累加积分。',
  'quest.exploreRes': '浏览资源',

  'explore.chapter': '第 04 章',
  'explore.title': '资源',
  'explore.curated': '精选',
  'explore.whyFew': '为什么这么少',
  'explore.shortList': '一份可信的短名单',
  'explore.turnOne': '把它变成挑战',

  'common.learnMore': '了解更多',

  'footer.sections': '栏目',
  'footer.startHere': '从这里开始',
  'footer.understand': '理解，行动，重复。',
  'footer.collab': '与 Yaleem-dev 合作',
  'footer.support': '支持我们',

  'badge.seed': '种子',
  'badge.sprout': '幼苗',
  'badge.grove': '树林',
  'badge.canopy': '树冠',
}

const hi = {
  'lang.label': 'भाषा',
  'nav.home': 'होम',
  'nav.learn': 'सीखें',
  'nav.discover': 'खोजें',
  'nav.quest': 'चुनौती',
  'nav.explore': 'संसाधन',

  'app.description': 'पर्यावरण कार्य के लिए आपका निजी मार्गदर्शक',

    'home.cardLearn': 'छोटी व्याख्याएँ।',
  'home.cardAct': 'काम करने के तरीके।',
  'home.cardRes': 'संसाधन।',
  'home.welcome': 'स्वागत है',
  'home.heroA': 'आपका निजी मार्गदर्शक',
  'home.heroB': 'पर्यावरण',
  'home.heroC': 'कार्य के लिए।',
  'home.line1': 'कुछ सीखें।',
  'home.line2': 'कुछ खोजें।',
  'home.line3': 'कुछ करें।',
  'home.weekQuest': 'इस हफ़्ते की चुनौती',
  'home.startLearning': 'सीखना शुरू करें',
  'home.thisWeek': 'इस हफ़्ते',
  'home.markComplete': 'पूरा चिह्नित करें',
  'home.done': 'पूरा',
  'home.points': 'अंक',
  'home.creatures': 'इको-जीव',
  'home.creatureQ': 'आप कौन से इको-जीव हैं?',
  'home.orgs': 'आपके आसपास के संगठन',
  'home.fullDirectory': 'पूरी सूची',
  'home.didYouKnow': 'क्या आप जानते हैं',
  'home.fourThings': 'जानने योग्य चार बातें',
  'home.moreInLearn': 'सीखें में और देखें',
  'home.supportUs': 'हमारा साथ दें',
  'home.supportLine': 'विचार, फ़ंडिंग या साझेदारी? हमें लिखें।',
  'home.copyEmail': 'ईमेल कॉपी करें',
  'home.copied': 'कॉपी हो गया',

  'learn.chapter': 'अध्याय 01',
  'learn.title': 'किसी मुद्दे को समझें',
  'learn.explainers': 'व्याख्या',
  'learn.pickOne': 'एक चुनें',
  'learn.goDeeper': 'और गहराई में',
  'learn.watch': 'देखें',
  'learn.shortLessons': 'छोटे पाठ',
  'learn.knowledgeCheck': 'ज्ञान जाँच',
  'learn.fiveQ': 'पाँच सवाल, {n} अंक',
  'learn.whyBother': 'क्यों ज़रूरी',
  'learn.guessing': 'अंदाज़ा लगाने से कुछ नहीं सीखते।',
  'learn.next': 'आगे',
  'learn.findWay': 'करने का तरीका खोजें',

  'discover.chapter': 'अध्याय 02',
  'discover.title': 'अपना रास्ता खोजें',
  'discover.directory': 'सूची',
  'discover.whereWork': 'काम कहाँ होता है',
  'discover.listed': '{n} सूचीबद्ध',
  'discover.search': 'नाम से खोजें',
  'discover.all': 'सभी',
  'discover.guides': 'कार्य मार्गदर्शिकाएँ',
  'discover.habit': 'इसे आदत बनाएं',
  'discover.repeat': 'एक चुनें और दोहराएं।',
  'discover.goQuest': 'चुनौती पर जाएँ',
  'discover.nothing': 'कुछ नहीं मिला। दूसरा क्षेत्र आज़माएँ।',

  'quest.chapter': 'अध्याय 03',
  'quest.title': 'पहला कदम बढ़ाएँ।',
  'quest.points': 'अंक',
  'quest.record': 'आपका रिकॉर्ड',
  'quest.doneOf': '{b} में से {a} पूरे',
  'quest.all': 'सभी चुनौतियाँ',
  'quest.pickFits': 'जो फिट हो चुनें',
  'quest.reset': 'रीसेट',
  'quest.addUp': 'हर चुनौती से अंक जुड़ते हैं।',
  'quest.exploreRes': 'संसाधन देखें',

  'explore.chapter': 'अध्याय 04',
  'explore.title': 'संसाधन',
  'explore.curated': 'चयनित',
  'explore.whyFew': 'इतने कम क्यों',
  'explore.shortList': 'भरोसेमंद छोटी सूची',
  'explore.turnOne': 'इसे चुनौती बनाएं',

  'common.learnMore': 'और जानें',

  'footer.sections': 'अनुभाग',
  'footer.startHere': 'यहाँ से शुरू करें',
  'footer.understand': 'समझें, करें, दोहराएं।',
  'footer.collab': 'Yaleem-dev के सहयोग से',
  'footer.support': 'हमारा साथ दें',

  'badge.seed': 'बीज',
  'badge.sprout': 'अंकुर',
  'badge.grove': 'बाग',
  'badge.canopy': 'छत्र',
}

const pt = {
  'lang.label': 'Idioma',
  'nav.home': 'Início',
  'nav.learn': 'Aprender',
  'nav.discover': 'Descobrir',
  'nav.quest': 'Desafios',
  'nav.explore': 'Recursos',

  'app.description': 'O seu guia pessoal para a ação ecológica',

    'home.cardLearn': 'Explicações curtas.',
  'home.cardAct': 'Formas de agir.',
  'home.cardRes': 'Recursos.',
  'home.welcome': 'Bem-vindo',
  'home.heroA': 'O seu guia pessoal',
  'home.heroB': 'para a',
  'home.heroC': 'ação ecológica.',
  'home.line1': 'Aprenda algo.',
  'home.line2': 'Descubra algo.',
  'home.line3': 'Faça algo.',
  'home.weekQuest': 'O desafio desta semana',
  'home.startLearning': 'Começar a aprender',
  'home.thisWeek': 'Esta semana',
  'home.markComplete': 'Marcar como feito',
  'home.done': 'Feito',
  'home.points': 'pontos',
  'home.creatures': 'Eco-Criaturas',
  'home.creatureQ': 'Que eco-criatura é você?',
  'home.orgs': 'Organizações perto de você',
  'home.fullDirectory': 'Diretório completo',
  'home.didYouKnow': 'Sabia que',
  'home.fourThings': 'Quatro coisas que vale saber',
  'home.moreInLearn': 'Mais em Aprender',
  'home.supportUs': 'Apoie-nos',
  'home.supportLine': 'Ideias, financiamento ou parceria? Envie uma mensagem.',
  'home.copyEmail': 'Copiar e-mail',
  'home.copied': 'Copiado',

  'learn.chapter': 'Capítulo 01',
  'learn.title': 'Entenda um tema',
  'learn.explainers': 'Explicações',
  'learn.pickOne': 'Escolha uma',
  'learn.goDeeper': 'Aprofunde',
  'learn.watch': 'Assista',
  'learn.shortLessons': 'Lições curtas',
  'learn.knowledgeCheck': 'Teste de conhecimento',
  'learn.fiveQ': 'Cinco perguntas, {n} pontos',
  'learn.whyBother': 'Por que importa',
  'learn.guessing': 'Adivinhar não ensina nada.',
  'learn.next': 'Próximo',
  'learn.findWay': 'Encontre como agir',

  'discover.chapter': 'Capítulo 02',
  'discover.title': 'Encontre o seu caminho',
  'discover.directory': 'Diretório',
  'discover.whereWork': 'Onde o trabalho acontece',
  'discover.listed': '{n} listadas',
  'discover.search': 'Buscar por nome',
  'discover.all': 'Todas',
  'discover.guides': 'Guias de ação',
  'discover.habit': 'Transforme em hábito',
  'discover.repeat': 'Escolha um e repita.',
  'discover.goQuest': 'Ir para Desafios',
  'discover.nothing': 'Nada corresponde. Tente outra região.',

  'quest.chapter': 'Capítulo 03',
  'quest.title': 'Dê o primeiro passo',
  'quest.points': 'pontos',
  'quest.record': 'Seu registro',
  'quest.doneOf': '{a} de {b} feitos',
  'quest.all': 'Todos os desafios',
  'quest.pickFits': 'Escolha o que encaixa',
  'quest.reset': 'Redefinir',
  'quest.addUp': 'Os pontos somam a cada desafio.',
  'quest.exploreRes': 'Explorar recursos',

  'explore.chapter': 'Capítulo 04',
  'explore.title': 'Recursos',
  'explore.curated': 'Selecionados',
  'explore.whyFew': 'Por que tão poucos',
  'explore.shortList': 'Uma lista curta de confiança',
  'explore.turnOne': 'Transforme um em desafio',

  'common.learnMore': 'Saiba mais',

  'footer.sections': 'Secções',
  'footer.startHere': 'Comece aqui',
  'footer.understand': 'Entenda, aja, repita.',
  'footer.collab': 'Em colaboração com Yaleem-dev',
  'footer.support': 'Apoie-nos',

  'badge.seed': 'Semente',
  'badge.sprout': 'Rebento',
  'badge.grove': 'Bosque',
  'badge.canopy': 'Copa',
}

const sw = {
  'lang.label': 'Lugha',
  'nav.home': 'Mwanzo',
  'nav.learn': 'Jifunze',
  'nav.discover': 'Gundua',
  'nav.quest': 'Changamoto',
  'nav.explore': 'Rasilimali',

  'app.description': 'Mwongozo wako binafsi wa hatua za mazingira',

    'home.cardLearn': 'Maelezo mafupi.',
  'home.cardAct': 'Njia za kutenda.',
  'home.cardRes': 'Rasilimali.',
  'home.welcome': 'Karibu',
  'home.heroA': 'Mwongozo wako binafsi',
  'home.heroB': 'wa',
  'home.heroC': 'hatua za mazingira.',
  'home.line1': 'Jifunze kitu.',
  'home.line2': 'Gundua kitu.',
  'home.line3': 'Fanya kitu.',
  'home.weekQuest': 'Changamoto ya wiki hii',
  'home.startLearning': 'Anza kujifunza',
  'home.thisWeek': 'Wiki hii',
  'home.markComplete': 'Weka alama imekamilika',
  'home.done': 'Imekamilika',
  'home.points': 'pointi',
  'home.creatures': 'Viumbe vya Mazingira',
  'home.creatureQ': 'Wewe ni kiumbe gani cha mazingira?',
  'home.orgs': 'Mashirika karibu nawe',
  'home.fullDirectory': 'Orodha kamili',
  'home.didYouKnow': 'Unajua?',
  'home.fourThings': 'Mambo manne ya kujua',
  'home.moreInLearn': 'Zaidi katika Jifunze',
  'home.supportUs': 'Tuunge mkono',
  'home.supportLine': 'Mawazo, ufadhili au ushirikiano? Tuandikie.',
  'home.copyEmail': 'Nakili barua pepe',
  'home.copied': 'Imenakiliwa',

  'learn.chapter': 'Sura 01',
  'learn.title': 'Elewa suala',
  'learn.explainers': 'Maelezo',
  'learn.pickOne': 'Chagua moja',
  'learn.goDeeper': 'Nenda ndani zaidi',
  'learn.watch': 'Tazama',
  'learn.shortLessons': 'Masomo mafupi',
  'learn.knowledgeCheck': 'Jaribio la maarifa',
  'learn.fiveQ': 'Maswali matano, pointi {n}',
  'learn.whyBother': 'Kwa nini',
  'learn.guessing': 'Kubahatisha hakufundishi.',
  'learn.next': 'Endelea',
  'learn.findWay': 'Tafuta njia ya kuchukua hatua',

  'discover.chapter': 'Sura 02',
  'discover.title': 'Tafuta njia yako',
  'discover.directory': 'Orodha',
  'discover.whereWork': 'Kazi inafanyika wapi',
  'discover.listed': '{n} zimeorodheshwa',
  'discover.search': 'Tafuta kwa jina',
  'discover.all': 'Zote',
  'discover.guides': 'Miongozo ya hatua',
  'discover.habit': 'Ifanye tabia',
  'discover.repeat': 'Chagua moja na urudie.',
  'discover.goQuest': 'Nenda kwa Changamoto',
  'discover.nothing': 'Hakuna kinacholingana. Jaribu eneo lingine.',

  'quest.chapter': 'Sura 03',
  'quest.title': 'Chukua hatua yako ya kwanza',
  'quest.points': 'pointi',
  'quest.record': 'Rekodi yako',
  'quest.doneOf': '{a} kati ya {b} imekamilika',
  'quest.all': 'Changamoto zote',
  'quest.pickFits': 'Chagua kinachokufaa',
  'quest.reset': 'Weka upya',
  'quest.addUp': 'Pointi huongezeka kwa kila changamoto.',
  'quest.exploreRes': 'Gundua rasilimali',

  'explore.chapter': 'Sura 04',
  'explore.title': 'Rasilimali',
  'explore.curated': 'Zilizochaguliwa',
  'explore.whyFew': 'Kwa nini chache',
  'explore.shortList': 'Orodha fupi ya kuaminika',
  'explore.turnOne': 'Geuza moja kuwa changamoto',

  'common.learnMore': 'Jifunze zaidi',

  'footer.sections': 'Sehemu',
  'footer.startHere': 'Anza hapa',
  'footer.understand': 'Elewa, tenda, rudia.',
  'footer.collab': 'Kwa ushirikiano na Yaleem-dev',
  'footer.support': 'Tuunge mkono',

  'badge.seed': 'Mbegu',
  'badge.sprout': 'Chipukizi',
  'badge.grove': 'Msitu',
  'badge.canopy': 'Kilele',
}

const BASE = {
  en, es, fr, zh, hi, pt, sw,
  ar, ti, om,
  ha, yo, ig, pcm, ff, wo,
  zu, xh, af, sn, rw, bm, tw, am, so, mg,
}

/* Extra keys added after the first packs shipped are merged per locale so a
   locale file never has to be rewritten wholesale. */
const NEW = {
  de, it, nl, pl, ja: EA.ja, ko: EA.ko, vi: EA.vi, th: EA.th, id: EA.id, ms: EA.ms,
  tl: EA.tl, bn: EA.bn, ur: EA.ur, fa: EA.fa, tr: EA.tr, ta: EA.ta, ne: EA.ne,
  sv: EA.sv, da: EA.da, nb: EA.nb, fi: EA.fi, el: EA.el, cs: EA.cs, hu: EA.hu,
  ro: EA.ro, ru: EA.ru, uk: EA.uk, hr: EA.hr, ca: EA.ca,
}

Object.assign(BASE, NEW)

export const STRINGS = Object.keys(BASE).reduce((acc, id) => {
  const merged = { ...BASE[id], ...(EXTRAS[id] || {}), ...(GAPS[id] || {}) }
  if (id !== 'en') {
    for (const k of Object.keys(en)) if (!merged[k]) merged[k] = en[k]
  }
  acc[id] = merged
  return acc
}, {})

/* Content translations live in ./content-i18n and are keyed by stable ids
   (t.climate.title, q.plant.title, c.lion.about ...). Anything missing
   falls through to the English string the component already holds. */
export function makeC(lang) {
  const table = CONTENT_I18N[lang] || {}
  /* English is the source. A missing translation falls back to it, so no
     page can ever render blank. */
  return (id, fallback) => table[id] || fallback
}

export function useContentReady() {
  return true
}

/* True only for the locales whose long-form reading library is still being
   translated. Used to show a short banner, never to hide content. */
export function useThin() {
  const { lang } = useContext(LangCtx)
  return isThin(lang)
}

export function useC() {
  const { lang } = useContext(LangCtx)
  return useMemo(() => makeC(lang), [lang])
}

export function makeT(lang) {
  const table = STRINGS[lang] || en
  return (key, vars) => {
    let out = table[key] || en[key] || key
    if (vars) {
      for (const k of Object.keys(vars)) out = out.split(`{${k}}`).join(String(vars[k]))
    }
    return out
  }
}

export const LangCtx = createContext({ lang: 'en', setLang: () => {}, t: makeT('en') })

export function useT() {
  return useContext(LangCtx).t
}

export function useLang() {
  return useContext(LangCtx)
}

/* Native select keeps the picker usable on every phone, keyboard and
   screen reader without shipping a custom listbox. */
export function LangSelect({ className = '' }) {
  const { lang, setLang, t } = useLang()
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const [groups, setGroups] = useState({})
  const box = useRef(null)
  const current = LANGS.find((l) => l.id === lang) || LANGS[0]

  useEffect(() => {
    if (!open) return
    const away = (e) => { if (box.current && !box.current.contains(e.target)) setOpen(false) }
    const esc = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', away)
    document.addEventListener('touchstart', away, { passive: true })
    document.addEventListener('keydown', esc)
    return () => {
      document.removeEventListener('mousedown', away)
      document.removeEventListener('touchstart', away)
      document.removeEventListener('keydown', esc)
    }
  }, [open])

  const term = q.trim().toLowerCase()
  const list = term
    ? LANGS.filter((l) => `${l.native} ${l.label} ${l.id}`.toLowerCase().includes(term))
    : LANGS.filter((l) => !l.region)

  return (
    <div ref={box} className={`relative shrink-0 ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('lang.title')}
        className="flex max-w-[5.1rem] items-center gap-1 rounded-full border-[1.5px] border-leaf-edge bg-leaf-3 py-1.5 pl-2 pr-2 text-[0.75rem] font-bold text-green-deep transition-colors hover:bg-leaf focus:outline-none focus-visible:ring-2 focus-visible:ring-green-deep sm:max-w-[11rem] sm:pl-2.5 sm:pr-3 sm:text-[0.8125rem]"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
          <circle cx="12" cy="12" r="8.5" />
          <path d="M3.5 12h17M12 3.5c2.4 2.4 3.6 5.4 3.6 8.5S14.4 18.1 12 20.5c-2.4-2.4-3.6-5.4-3.6-8.5S9.6 5.9 12 3.5z" />
        </svg>
        <span className="truncate">{current.native}</span>
        <svg viewBox="0 0 12 8" aria-hidden="true" className="h-2 w-2.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
          <path d="M1 1.5 6 6.5l5-5" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-1.5 w-[16rem] max-w-[calc(100vw-1.5rem)] overflow-hidden rounded-2xl border-[1.5px] border-line bg-card shadow-[0_18px_40px_-12px_rgba(15,45,30,0.45)]">
          <div className="border-b border-line p-2">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t('lang.search')}
              aria-label={t('lang.search')}
              autoFocus
              className="w-full rounded-lg border-[1.5px] border-line bg-page px-2.5 py-1.5 text-[0.8125rem] font-medium text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-green-deep"
            />
          </div>
          <ul role="listbox" aria-label={t('lang.title')} className="max-h-[min(56vh,17rem)] overflow-y-auto overscroll-contain p-1">
            {list.map((l) => (
              <li key={l.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected={l.id === lang}
                  onClick={() => { setLang(l.id); setOpen(false); setQ('') }}
                  className={`flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 text-left text-[0.8125rem] font-semibold transition-colors ${
                    l.id === lang ? 'bg-leaf text-green-deep' : 'text-ink hover:bg-leaf-3'
                  }`}
                >
                  <span className="truncate" dir={l.dir || 'ltr'}>{l.native}</span>
                  {l.id === lang && (
                    <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3 w-3 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                      <path d="M3 8.4 6.3 12 13 4.4" />
                    </svg>
                  )}
                </button>
              </li>
            ))}
            {!term && ['africa', 'europe', 'asia'].map((g) => {
              const rows = LANGS.filter((l) => l.region === g)
              const open2 = !!groups[g]
              return (
                <li key={g} className="mt-1 border-t border-line-soft pt-1">
                  <button
                    type="button"
                    aria-expanded={open2}
                    onClick={() => setGroups((v) => ({ ...v, [g]: !v[g] }))}
                    className="flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 text-left text-[0.75rem] font-bold uppercase tracking-wider text-slate transition-colors hover:bg-leaf-3"
                  >
                    <span className="truncate">{t('lang.group.' + g)}</span>
                    <svg viewBox="0 0 12 8" aria-hidden="true" className={`h-2 w-2.5 shrink-0 transition-transform ${open2 ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
                      <path d="M1 1.5 6 6.5l5-5" />
                    </svg>
                  </button>
                  {open2 && (
                    <ul>
                      {rows.map((l) => (
                        <li key={l.id}>
                          <button
                            type="button"
                            role="option"
                            aria-selected={l.id === lang}
                            onClick={() => { setLang(l.id); setOpen(false); setQ('') }}
                            className={`flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 text-left text-[0.8125rem] font-semibold transition-colors ${
                              l.id === lang ? 'bg-leaf text-green-deep' : 'text-ink hover:bg-leaf-3'
                            }`}
                          >
                            <span className="truncate" dir={l.dir || 'ltr'}>{l.native}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              )
            })}
            {list.length === 0 && (
              <li className="px-2.5 py-2 text-[0.8125rem] font-medium text-slate">{t('discover.nothing')}</li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}

export function LangDirSync() {
  const { lang } = useLang()
  useEffect(() => {
    const el = document.documentElement
    el.setAttribute('lang', lang)
    el.setAttribute('dir', dirOf(lang))
  }, [lang])
  return null
}
