export type Score = { label: string; value: number; note: string };
export type Review = {
  slug: string;
  brand: string;
  name: string;
  category: 'cafe' | 'cocina';
  type: string;
  badge: string;
  score: number;
  verdict: string;
  summary: string;
  forWhom: string[];
  notFor: string[];
  scores: Score[];
  best: string[];
  worst: string[];
  nobodyTells: string;
  nobodyTellsDetail: string;
  alternatives: { name: string; note: string; score: number; slug?: string }[];
  budgets: { range: string; choice: string; reason: string }[];
  faqs: { q: string; a: string }[];
  updates: { date: string; text: string }[];
  sources: string[];
  priceLabel: string;
  imageKind: 'coffee' | 'airfryer';
  analysisType: 'Análisis editorial documentado' | 'Probado por Hiperfoco';
};

export const reviews: Review[] = [
  {
    slug: 'delonghi-magnifica-evo', brand: "De’Longhi", name: 'Magnifica Evo', category: 'cafe', type: 'Cafetera superautomática',
    badge: 'La compraríamos hoy', score: 9.1,
    verdict: 'Una de las compras más equilibradas si quieres pasar del grano a la taza sin menús interminables ni un mantenimiento complicado.',
    summary: 'La elegiríamos para espresso, café largo y bebidas con leche ocasionales. No es la mejor para quien quiere muchísimas recetas automáticas o un control cercano al barismo manual.',
    forWhom: ['Quieres buen café sin aprender barismo', 'Buscas controles claros y mantenimiento razonable', 'Tomas sobre todo espresso o café largo'],
    notFor: ['Quieres muchas recetas automáticas con leche', 'Buscas la máquina más barata posible', 'Quieres controlar cada variable de extracción'],
    scores: [
      {label:'Calidad del café',value:9.2,note:'Consistente cuando ajustas bien molienda y dosis.'},
      {label:'Facilidad de uso',value:9.5,note:'Botones directos y curva de aprendizaje corta.'},
      {label:'Limpieza',value:9.1,note:'Grupo extraíble y rutinas claras.'},
      {label:'Ruido',value:8.2,note:'Correcto, aunque el molinillo se oye.'},
      {label:'Durabilidad',value:8.9,note:'Construcción sólida para su gama.'},
      {label:'Calidad-precio',value:9.4,note:'Especialmente recomendable cuando aparece en oferta.'},
    ],
    best:['Muy sencilla de entender desde el primer día','Buen café con pocos ajustes','Grupo de infusión extraíble','Relación calidad-precio convincente'],
    worst:['Personalización limitada frente a gamas superiores','La leche manual exige algo de práctica','El resultado depende bastante del grano elegido'],
    nobodyTells:'El primer café no sirve para juzgarla.',
    nobodyTellsDetail:'Las superautomáticas necesitan varios cafés para estabilizarse y para que encuentres el ajuste de molienda, intensidad y volumen que encaja contigo. Una valoración hecha con la primera taza suele ser injusta.',
    alternatives:[
      {name:'Philips Serie 3300 LatteGo',note:'Más cómoda si tomas cappuccino a diario.',score:8.7,slug:'philips-3300-lattego'},
      {name:'De’Longhi Rivelia',note:'Más premium y personalizable.',score:9.3},
      {name:'De’Longhi Magnifica S',note:'Más económica y más básica.',score:8.4},
    ],
    budgets:[
      {range:'Hasta 300 €',choice:'Magnifica S',reason:'Menos funciones, pero una compra muy sensata.'},
      {range:'Entre 300 y 500 €',choice:'Magnifica Evo',reason:'El mejor equilibrio de esta familia.'},
      {range:'Más de 500 €',choice:'Rivelia',reason:'Más diseño, perfiles y personalización.'},
    ],
    faqs:[
      {q:'¿Hace buen espresso?',a:'Ofrece un espresso consistente para uso doméstico, aunque no sustituye el control de una máquina manual con buen molinillo.'},
      {q:'¿Es difícil de limpiar?',a:'No. Requiere vaciar bandeja y posos, aclarar el grupo y seguir la descalcificación indicada.'},
      {q:'¿Sirve para café con leche?',a:'Sí, pero la experiencia depende de la variante y del sistema de leche incluido.'},
      {q:'¿Qué café en grano conviene?',a:'Tueste medio, fresco y poco aceitoso. Los granos muy brillantes pueden ensuciar más el molinillo.'},
    ],
    updates:[{date:'5 agosto 2026',text:'Revisión completa de estructura y criterios.'},{date:'18 julio 2026',text:'Añadida comparación con Philips 3300.'}],
    sources:['Manual y ficha técnica del fabricante','Documentación de mantenimiento','Opiniones verificadas y patrones recurrentes','Comparación de especificaciones con rivales directos'],
    priceLabel:'Precio pendiente de verificar', imageKind:'coffee', analysisType:'Análisis editorial documentado'
  },
  {
    slug:'philips-3300-lattego',brand:'Philips',name:'Serie 3300 LatteGo',category:'cafe',type:'Cafetera superautomática',badge:'Mejor para café con leche',score:8.7,
    verdict:'La recomendación más fácil para quien prepara bebidas con leche varias veces por semana y valora una limpieza rápida.',
    summary:'Su punto fuerte no es ofrecer el espresso más complejo, sino reducir la fricción diaria del cappuccino y el latte.',
    forWhom:['Tomas café con leche con frecuencia','Quieres limpiar el sistema en pocos pasos','Compartes la máquina con varias personas'],
    notFor:['Solo bebes espresso','Buscas el precio mínimo','Quieres textura de leche de nivel barista'],
    scores:[{label:'Calidad del café',value:8.4,note:'Buena para el usuario general.'},{label:'Café con leche',value:9.4,note:'Su gran ventaja competitiva.'},{label:'Limpieza',value:9.5,note:'Pocas piezas y enjuague rápido.'},{label:'Ruido',value:8.8,note:'Cómoda en cocinas abiertas.'},{label:'Facilidad de uso',value:9.2,note:'Interfaz muy accesible.'},{label:'Calidad-precio',value:8.1,note:'Mejor cuando está rebajada.'}],
    best:['Sistema de leche muy fácil de desmontar','Uso intuitivo','Buen nivel de ruido','Adecuada para varios usuarios'],
    worst:['El espresso no es el más intenso de su segmento','A precio completo tiene rivales fuertes','Poca utilidad diferencial si nunca usas leche'],
    nobodyTells:'La limpieza es la función que más usarás.',nobodyTellsDetail:'En una cafetera con leche, la facilidad de enjuague influye más en la satisfacción a largo plazo que tener tres recetas adicionales. Si limpiar da pereza, acabarás dejando de usar esa función.',
    alternatives:[{name:'Magnifica Evo',note:'Mejor equilibrio para café negro.',score:9.1,slug:'delonghi-magnifica-evo'},{name:'Philips Serie 5500',note:'Más recetas y perfiles.',score:9.0},{name:'Rivelia',note:'Más diseño y personalización.',score:9.3}],
    budgets:[{range:'Hasta 300 €',choice:'Philips Serie 2200',reason:'Más sencilla y normalmente más barata.'},{range:'Entre 300 y 500 €',choice:'Philips 3300',reason:'La opción cómoda para bebidas con leche.'},{range:'Más de 500 €',choice:'Philips 5500 o Rivelia',reason:'Más variedad y personalización.'}],
    faqs:[{q:'¿LatteGo se limpia de verdad rápido?',a:'Su diseño evita tubos internos y permite separar las piezas con facilidad.'},{q:'¿Es silenciosa?',a:'Es relativamente contenida para una superautomática doméstica.'},{q:'¿Hace café molido?',a:'Depende de la referencia exacta; conviene comprobar la ficha del modelo concreto.'}],
    updates:[{date:'5 agosto 2026',text:'Primera versión editorial completa.'}],sources:['Ficha oficial de Philips','Manual de usuario','Comparativas técnicas','Opiniones verificadas'],priceLabel:'Precio pendiente de verificar',imageKind:'coffee',analysisType:'Análisis editorial documentado'
  },
  {
    slug:'ninja-foodi-max-af400',brand:'Ninja',name:'Foodi MAX AF400',category:'cocina',type:'Freidora de aire de doble cesta',badge:'Mejor para familias',score:8.9,
    verdict:'Una freidora de aire muy práctica cuando necesitas preparar dos alimentos con tiempos diferentes y servirlos a la vez.',
    summary:'La doble cesta aporta una ventaja real en casas con varias personas, aunque ocupa bastante encimera.',
    forWhom:['Cocinas para tres o más personas','Preparas dos alimentos a la vez','Tienes espacio suficiente en la encimera'],notFor:['Vives solo y cocinas pequeñas raciones','Tienes una cocina muy compacta','Buscas el modelo más económico'],
    scores:[{label:'Cocción',value:9.1,note:'Resultados consistentes.'},{label:'Capacidad',value:9.6,note:'Su gran argumento de compra.'},{label:'Facilidad de uso',value:9.0,note:'Controles claros.'},{label:'Limpieza',value:8.7,note:'Cestas manejables, pero voluminosas.'},{label:'Espacio',value:7.4,note:'Necesita una encimera amplia.'},{label:'Calidad-precio',value:8.6,note:'Compensa si aprovechas las dos zonas.'}],
    best:['Dos zonas independientes','Función de sincronización útil','Buena capacidad familiar','Controles fáciles de aprender'],worst:['Ocupa bastante espacio','Puede ser excesiva para una o dos personas','Las dos cestas implican más piezas que limpiar'],
    nobodyTells:'La doble cesta solo compensa si la usas de verdad.',nobodyTellsDetail:'Pagar más por dos zonas tiene sentido cuando preparas acompañamiento y plato principal a la vez. Si casi siempre cocinas una sola cosa, una cesta grande puede resultar más sencilla y ocupar menos.',
    alternatives:[{name:'Cosori Turbo Blaze',note:'Más compacta y sencilla.',score:8.8},{name:'Ninja Double Stack',note:'Aprovecha mejor el espacio vertical.',score:9.0},{name:'Philips Dual Basket',note:'Alternativa directa de doble zona.',score:8.7}],
    budgets:[{range:'Hasta 120 €',choice:'Cosori de cesta única',reason:'Más sencilla para pocas personas.'},{range:'Entre 120 y 220 €',choice:'Ninja AF400',reason:'Muy completa para familias.'},{range:'Premium',choice:'Ninja Double Stack',reason:'Mejor aprovechamiento del espacio.'}],
    faqs:[{q:'¿Se pueden usar las dos cestas a la vez?',a:'Sí, con tiempos y temperaturas independientes.'},{q:'¿Ocupa mucho?',a:'Sí. Conviene medir la encimera antes de comprar.'},{q:'¿Es buena para cuatro personas?',a:'Su capacidad encaja bien con hogares de tres o cuatro personas, según las raciones.'}],
    updates:[{date:'5 agosto 2026',text:'Primera versión editorial completa.'}],sources:['Ficha oficial de Ninja','Manual del producto','Comparación con modelos de doble cesta','Opiniones verificadas'],priceLabel:'Precio pendiente de verificar',imageKind:'airfryer',analysisType:'Análisis editorial documentado'
  }
];

export const categories = [
  {slug:'cafe',name:'Café',description:'Cafeteras, molinillos y accesorios para acertar sin perderte entre especificaciones.',icon:'☕'},
  {slug:'cocina',name:'Cocina inteligente',description:'Pequeños electrodomésticos que de verdad ahorran tiempo y espacio.',icon:'◌'},
];
