import type { Dictionary } from './types';

// Neutral Spanish (tuteo).
export const es: Dictionary = {
  meta: {
    title: 'groundzerodevs · Software, presencia digital y soporte',
    description:
      'Construimos lo que tu negocio necesita y lo mantenemos en pie. Software, presencia digital y soporte continuo para pymes y startups en Chile y LATAM.',
  },
  ids: {
    services: 'servicios',
    work: 'casos',
    sustain: 'sostener',
    process: 'proceso',
    contact: 'contacto',
  },
  common: {
    homeHref: '/',
    newTab: '(se abre en una pestaña nueva)',
  },
  header: {
    navLabel: 'Principal',
    menu: 'Menú',
    nav: {
      services: 'Servicios',
      work: 'Casos',
      sustain: 'Sostener',
      process: 'Proceso',
      contact: 'Contacto',
    },
  },
  hero: {
    eyebrow: 'CHILE · LATAM — PARA PYMES Y STARTUPS',
    title: 'Construimos lo que tu negocio necesita.',
    titleMark: 'Y lo mantenemos en pie.',
    lead: 'Software a medida, presencia digital y soporte continuo. Desarrollamos con IA como herramienta; las decisiones y la revisión de cada cambio las hace una persona.',
    ctaPrimary: 'Hablemos por WhatsApp',
    ctaSecondary: 'Ver casos',
    pillarsLabel: 'Pilares',
    pillars: ['CONSTRUIR', 'PRESENCIA', 'SOSTENER'],
    caption: 'Todo sistema empieza en cero. Nosotros lo llevamos a producción.',
  },
  pillars: {
    label: '01 — SERVICIOS',
    title: 'Qué hacemos',
    items: [
      {
        number: '01',
        name: 'Construir',
        text: 'Software que resuelve un problema real, de la idea a producción.',
        items: ['Software a medida', 'Automatización e integraciones', 'MVP y prototipado'],
      },
      {
        number: '02',
        name: 'Presencia',
        text: 'Que te encuentren y te recuerden: web, redes y medición.',
        items: ['Community management', 'Diseño y desarrollo web', 'SEO y analítica'],
      },
      {
        number: '03',
        name: 'Sostener',
        text: 'Lo que construimos, funcionando: soporte, mantenimiento y mejoras.',
        items: ['Soporte a usuarios', 'Mantenimiento y SLA', 'Asesoría tecnológica'],
      },
    ],
  },
  cases: {
    label: '02 — CASOS',
    title: 'Lo que hemos construido y sostenido.',
    items: {
      umbral: {
        kind: 'PRODUCTO PROPIO · CONSTRUIR',
        status: 'ACCESO ANTICIPADO',
        name: 'Umbral',
        text: 'Fichas clínicas para psicólogos independientes en Chile. Cifrado, auditoría y normativa chilena.',
      },
      judired: {
        kind: 'PRODUCTO PROPIO · CONSTRUIR',
        status: 'BETA TESTING',
        name: 'JudiRed',
        text: 'CRM jurídico para abogados independientes y estudios en Chile. Causas, plazos procesales y Ley 21.719.',
      },
      morgado: {
        kind: 'CLIENTE · PRESENCIA',
        status: 'EN PRODUCCIÓN',
        name: 'Morgado, Cía. & Asociados',
        text: 'Sitio corporativo de un estudio jurídico en Santiago, más la gestión de su Instagram.',
      },
      journaling: {
        kind: 'CLIENTE · PRESENCIA',
        status: 'EN PRODUCCIÓN',
        name: 'Journaling En Red',
        text: 'Sitio de un servicio de acompañamiento psicosocial en Santiago.',
      },
      elizabeth: {
        kind: 'CLIENTE · PRESENCIA',
        status: 'EN PRODUCCIÓN',
        name: 'Elizabeth Maureira, Abogada',
        text: 'Sitio profesional de una abogada en Providencia, Santiago.',
      },
      champa: {
        kind: 'CLIENTE · PRESENCIA',
        status: 'EN DESARROLLO',
        name: 'Vidriería Champa',
        text: 'Sitio de una vidriería en Santiago con atención de emergencia 24/7 y cotización directa por WhatsApp.',
      },
    },
    thumbAlt: (name) => `Captura de ${name}`,
    thumbPending: (name) => `[CAPTURA PENDIENTE · ${name.toUpperCase()}]`,
    lab: {
      ariaLabel: 'Laboratorio',
      label: 'LABORATORIO · I+D',
      text: '— investigación propia: una compuerta multi-agente que autoriza o bloquea acciones de agentes de código antes de ejecutarse.',
    },
  },
  sustain: {
    label: '03 — SOSTENER',
    title: 'Construir es la mitad. La otra mitad es sostenerlo.',
    counters: [
      { value: '297', label: 'incidencias resueltas' },
      { value: '~46 h', label: 'mediana de resolución · Umbral (90 días)' },
      { value: '~19 h', label: 'mediana de resolución · Morgado (histórico)' },
      { value: '4', label: 'proyectos en mantenimiento', extra: '+4 en desarrollo' },
    ],
    note: {
      before: 'Datos al ',
      date: '18 nov 2026',
      after:
        ' (jul–nov 2026). Incluye correcciones, mejoras y auditorías de los proyectos en mantenimiento; los proyectos en desarrollo no suman. Medianas sobre incidencias cerradas: Umbral, últimos 90 días; Morgado, historial completo por tener pocas incidencias recientes.',
    },
  },
  process: {
    label: '04 — PROCESO',
    title: 'Cómo trabajamos',
    steps: [
      { name: 'Diagnóstico', text: 'Entendemos tu negocio y definimos qué construir primero.' },
      { name: 'Plan', text: 'Acordamos alcance, plazos y prioridades por escrito.' },
      { name: 'Construcción', text: 'Entregas cortas y visibles, con pruebas. Usamos IA para avanzar más rápido; una persona revisa cada cambio.' },
      { name: 'Operación', text: 'Nos quedamos: monitoreo, soporte y mejora continua.' },
    ],
  },
  contact: {
    label: '05 — CONTACTO',
    title: '¿Tienes algo en mente? Cuéntanos qué necesitas.',
    hours: 'Respondemos en horario hábil, hora de Chile.',
    name: 'Nombre',
    email: 'Correo',
    message: '¿Qué necesitas?',
    honeypot: 'No completes este campo',
    submit: 'Enviar mensaje',
    status: {
      sending: 'Enviando tu mensaje…',
      sent: 'Gracias, recibimos tu mensaje. Te responderemos en horario hábil.',
      invalid: 'Revisa los datos: necesitamos tu nombre, un correo válido y un mensaje de al menos 10 caracteres.',
      limit: 'Enviaste varios mensajes seguidos. Espera un momento e inténtalo de nuevo, o escríbenos por WhatsApp.',
      send: 'No pudimos enviar tu mensaje. Inténtalo otra vez o escríbenos por WhatsApp o a contacto@groundzerodevs.com.',
    },
  },
};
