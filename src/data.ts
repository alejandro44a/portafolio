// Single source of truth for portfolio content (migrated from v1: github.com/alejandro44a/portafolio)

export const profile = {
  name: 'Alejandro Abrego',
  role: 'Ingeniero de Software',
  school: 'UANL — FIME',
  semester: '6to semestre',
  location: 'García, Nuevo León, MX',
  timezone: 'America/Monterrey',
  coords: ['25°48′55″ N', '100°35′00″ W'],
  email: 'alejandrogo563@gmail.com',
  phone: '8132538553',
  github: 'https://github.com/alejandro44a',
};

export type Project = {
  title: string;
  kind: string;
  summary: string;
  description: string;
  tech: string[];
  images: string[];
  features: string[];
};

export const projects: Project[] = [
  {
    title: 'Traductor LSM',
    kind: 'IA · Visión',
    summary: 'Interpretación de Lengua de Señas Mexicana en tiempo real.',
    description:
      'Aplicación de comunicación inclusiva que traduce la Lengua de Señas Mexicana (LSM) a texto y voz. Conectada a una Raspberry Pi con cámara para captura de gestos, con planes de funcionar directamente con la cámara del móvil.',
    tech: ['Python', 'OpenCV', 'Raspberry Pi', 'Android', 'Machine Learning'],
    images: ['project-translator.jpg', '5.jpg'],
    features: ['Reconocimiento de señas en tiempo real', 'Traducción a texto y voz', 'Modo traductor y modo aprendizaje', 'Historial de traducciones', 'Conexión con Raspberry Pi y cámara'],
  },
  {
    title: 'Gestor de Gastos',
    kind: 'Móvil · Fintech',
    summary: 'Finanzas personales multiplataforma con gráficas interactivas.',
    description:
      'App completa para gestión de finanzas personales con Flutter y Firebase, para Android e iOS. Registra ingresos y gastos, visualiza tendencias semanales y mensuales, categoriza movimientos y analiza el presupuesto.',
    tech: ['Flutter', 'Firebase', 'Android', 'iOS'],
    images: ['project-expenses.jpg', 'expenses-1.jpg', 'expenses-2.jpg', 'expenses-3.jpg', 'expenses-4.jpg'],
    features: ['Dashboard con saldo y estadísticas', 'Tendencias semanales y mensuales', 'Categorías con gráfico circular', 'Registro de ingresos y egresos', 'Balance ingresos vs gastos'],
  },
  {
    title: 'FIME Asteroid',
    kind: 'Juego · Arcade',
    summary: 'Arcade inspirado en Asteroids con temática FIME-UANL.',
    description:
      'Juego arcade inspirado en el clásico Asteroids con elementos visuales de la Facultad de Ingeniería Mecánica y Eléctrica (FIME). Sistema de puntuación, power-ups y controles táctiles optimizados.',
    tech: ['Kotlin', 'KorGE', 'Android'],
    images: ['project-asteroid.jpg', '2.jpg'],
    features: ['High scores', 'Power-ups durante el juego', 'Controles táctiles', 'Gráficos retro arcade', 'Interfaz inspirada en FIME'],
  },
];

export const experience = [
  { company: 'Banorte', role: 'Operaciones Bancarias', period: '2024 — 2025', points: ['Sistemas para gestión de operaciones bancarias', 'Atención y orientación a clientes', 'Metas de servicio en equipo'] },
  { company: 'Amazon', role: 'Control de Inventarios', period: '2021 — 2022', points: ['Control y verificación de inventarios', 'Clasificación de paquetes', 'Coordinación para tiempos de entrega'] },
  { company: 'MESA', role: 'Apoyo en Producción', period: '2019 — 2020', points: ['Inventarios y control de materiales', 'Organización del área de trabajo', 'Asistencia en producción'] },
];

export const skills = [
  { title: 'Lenguajes', items: ['Java', 'Kotlin', 'Dart', 'TypeScript', 'JavaScript', 'Python', 'C', 'C++', 'C#'] },
  { title: 'Frameworks & Tools', items: ['React', 'Flutter', 'Firebase', 'KorGE', 'Git', 'OpenCV'] },
  { title: 'Datos', items: ['SQL', 'Modelado de tablas', 'Power BI', 'Excel'] },
  { title: 'Humanas', items: ['Trabajo en equipo', 'Comunicación', 'Adaptabilidad', 'Resolución de problemas'] },
];

export const education = [
  { school: 'Universidad Autónoma de Nuevo León', degree: 'Ingeniería en Software', period: '2022 — 2027', status: 'En curso' },
  { school: 'CECyTE García 1', degree: 'Técnico en Sistemas Informáticos', period: '2018 — 2021', status: 'Completado' },
];

export const stack = ['React', 'TypeScript', 'Flutter', 'Kotlin', 'Python', 'Firebase', 'OpenCV', 'Three.js', 'SQL', 'Java'];
