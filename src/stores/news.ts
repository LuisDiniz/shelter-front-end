import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// Types
interface NewsItem {
  id: string
  title: string
  excerpt: string
  content: string
  date: string
  author: string
  imageUrl: string
  tags: string[]
}

// Mock data for news
const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'Cãominhada no parque da amora',
    excerpt: 'Participe na Cãominhada 2026, no dia 9 de maio, no Parque da Amora. Uma iniciativa solidária aberta a toda a comunidade, com inscrições gratuitas e recolha de donativos para apoiar animais do concelho do Seixal.',
    content: `
  <p>
    No próximo dia <strong>9 de maio, às 9h00</strong>, realiza-se no 
    <strong>Parque da Amora</strong> mais uma edição da já habitual 
    <strong>Cãominhada</strong>, uma iniciativa solidária que convida toda a comunidade 
    a participar numa manhã diferente, em companhia dos seus amigos de quatro patas.
  </p>

  <p>
    O ponto de encontro será no <strong>CROACS – Centro de Recolha Oficial de Animais de 
    Companhia do Seixal</strong>, situado na Av. da República, n.º 175, em Arrentela. 
    A participação é <strong>gratuita</strong> e aberta a todos, podendo a inscrição ser 
    feita antecipadamente através do email 
    <a href="mailto:caominhada2026@gmail.com">caominhada2026@gmail.com</a> 
    ou no próprio dia, no local.
  </p>

  <p>
    Para além do convívio e da atividade física ao ar livre, esta iniciativa tem também 
    um forte cariz solidário. Os participantes são convidados a contribuir com 
    <strong>donativos</strong>, nomeadamente:
  </p>

  <ul>
    <li>Ração seca e húmida para cães e gatos</li>
    <li>Mantas e camas</li>
    <li>Areia para gatos</li>
  </ul>

  <p>
    Os participantes terão ainda direito a um <strong>kit de participação</strong>, 
    tornando esta experiência ainda mais especial.
  </p>

  <p>
    Organizada com o apoio de entidades locais, a Cãominhada pretende promover o 
    bem-estar animal, sensibilizar para a adoção responsável e reforçar os laços entre a 
    comunidade e as associações de proteção animal.
  </p>

  <p>
    <strong>Traga a família, convide amigos e venha fazer parte desta caminhada solidária!</strong>
  </p>`,
    date: '2026-05-05T22:00:00Z',
    author: 'Grupo de voluntários no Canil-Gatil Municipal do Seixal',
    imageUrl: 'https://res.cloudinary.com/dlqmc28to/image/upload/v1777999746/WhatsApp_Image_2026-05-03_at_10.39.30_rozuue.jpg',
    tags: ['CROACS', 'cães', 'passeios', 'cãominhada']
  },
  {
    id: '2',
    title: 'O CROACS vai às ruas aos sábados',
    excerpt: 'O CROACS Sai à Rua aconteceu no dia 21 de fevereiro de 2026 e foi um verdadeiro sucesso, levando o Centro de Recolha Oficial de Animais de Companhia do Seixal (CROACS) e o Grupo de Voluntários no Canil/Gatil Municipal do Seixal a procurar realizar a iniciativa todos os sábados.',
    content: `<p>O objetivo passa por proporcionar de forma regular momentos especiais como os vividos no passado dia 21 de fevereiro, marcados por passeios, brincadeira e socialização com os patudos que aguardam adoção responsável.</p>
    <p>O CROACS volta assim a sair à rua já este sábado, 28 de fevereiro, das 10 às 12.30 horas. A realização da iniciativa nos sábados seguintes será previamente comunicada nas redes sociais da autarquia e na agenda do site.</p>
    <p>Participe nestas ações simples, mas que fazem toda a diferença para os patudos!</p>
    <p><b>Ponto de encontro:</b> Frente ribeirinha, junto ao CROACS (Av. da República n.º 175, Arrentela – Seixal)</p>
    <p>O Grupo de Voluntários no Canil/Gatil Municipal do Seixal representa um apoio fundamental e um parceiro ativo e dedicado à causa animal, assegurando melhor qualidade de vida aos animais acolhidos no CROACS, proporcionando-lhes contacto humano, estímulos exteriores e momentos essenciais de socialização, como:</p>
    
    <ul>
      <li>Passeios ao ar livre: socialização essencial, tanto com humanos como com outros estímulos do exterior;</li>
      <li>Interação humana positiva: contacto com o ambiente exterior;</li>
      <li>Socialização essencial: momentos de brincadeira e liberdade, que contribuem para o bem-estar físico e emocional;</li>
      <li>Brincadeiras e estímulos novos: interação positiva, reforçando a confiança e facilitando futuras adoções.</li>
    </ul>
    
    <br/>
    <p><b>Fonte:</b> <a href="https://www.cm-seixal.pt/noticia/o-croacs-volta-sair-rua-ja-este-sabado">https://www.cm-seixal.pt/noticia/o-croacs-volta-sair-rua-ja-este-sabado</a></p>`,
    date: '2026-02-21T10:00:00Z',
    author: 'Câmera Municipal do Seixal',
    imageUrl: 'https://res.cloudinary.com/dlqmc28to/image/upload/v1773879116/Passeio_gyecxx.jpg',
    tags: ['CROACS', 'cães', 'passeios']
  }  
]


//   {
//     id: '1',
//     title: 'Campanha de Adoção Especial - "Um Lar para Todos"',
//     excerpt: 'Participe da nossa campanha especial de adoção este final de semana e ajude os nossos animais a encontrar um lar amoroso.',
//     content: `<p>Este fim de semana, o Canil/Gatil Municipal do Seixal realiza a campanha "Um Lar para Todos", uma iniciativa especial de adoção que visa encontrar lares amorosos para os nossos animais.</p>
//     <p>A campanha acontecerá nos dias 25 e 26 de junho, das 10h às 18h, nas nossas instalações. Durante o evento, teremos:</p>
//     <ul>
//       <li>Sessões de aconselhamento sobre adoção responsável</li>
//       <li>Veterinários disponíveis para responder a perguntas sobre cuidados com os animais</li>
//       <li>Brindes para quem adotar um animal durante o evento</li>
//       <li>Café e snacks para os visitantes</li>
//     </ul>
//     <p>Todos os animais adotados durante a campanha já estarão vacinados, desparasitados e esterilizados.</p>
//     <blockquote>
//       <p>"Adotar um animal é dar uma segunda chance a um ser que só quer amar e ser amado. Esperamos que muitos dos nossos queridos cães e gatos encontrem famílias durante esta campanha", diz Maria Santos, coordenadora do abrigo.</p>
//     </blockquote>
//     <p>Não perca esta oportunidade de transformar a sua vida e a de um animal carente. Venha conhecer nossos amigos de quatro patas que estão à espera de um lar!</p>`,
//     date: '2023-06-20T10:00:00Z',
//     author: 'Ana Rodrigues',
//     imageUrl: 'https://images.pexels.com/photos/1904105/pexels-photo-1904105.jpeg',
//     tags: ['adoção', 'campanha', 'evento']
//   },
//   {
//     id: '2',
//     title: 'Novo Espaço para Reabilitação de Animais Inaugurado',
//     excerpt: 'O Canil/Gatil Municipal do Seixal inaugurou um novo espaço dedicado à reabilitação de animais com necessidades especiais.',
//     content: `<p>Com grande alegria, anunciamos a inauguração do nosso novo espaço dedicado à reabilitação de animais com necessidades especiais. Este projeto, que esteve em desenvolvimento durante mais de um ano, finalmente tornou-se realidade graças ao apoio de doadores e voluntários dedicados.</p>
//     <p>O novo espaço conta com:</p>
//     <ul>
//       <li>Área para fisioterapia animal</li>
//       <li>Equipamentos especializados para reabilitação</li>
//       <li>Espaço acolhedor para animais em recuperação</li>
//       <li>Sala de treino para socialização</li>
//     </ul>
//     <p>Este investimento representa um grande avanço na nossa missão de cuidar de todos os animais, independentemente das suas condições de saúde ou desafios físicos.</p>
//     <p>A cerimônia de inauguração contou com a presença de autoridades locais, voluntários e apoiadores do abrigo. Foi um momento emocionante para todos que acompanharam o desenvolvimento deste projeto desde o início.</p>
//     <p>Agradecemos a todos que contribuíram para tornar este sonho realidade. Com este novo espaço, poderemos ajudar ainda mais animais a recuperar-se e encontrar lares amorosos.</p>`,
//     date: '2023-05-15T14:30:00Z',
//     author: 'Carlos Mendes',
//     imageUrl: 'https://images.pexels.com/photos/6816849/pexels-photo-6816849.jpeg',
//     tags: ['infraestrutura', 'reabilitação', 'novidades']
//   },
//   {
//     id: '3',
//     title: 'Doação de Ração e Materiais Recebida de Empresa Local',
//     excerpt: 'A empresa PetCare Portugal fez uma generosa doação de ração e materiais para os animais do nosso abrigo.',
//     content: `<p>Estamos extremamente gratos à empresa PetCare Portugal pela generosa doação recebida esta semana. A contribuição incluiu:</p>
//     <ul>
//       <li>500kg de ração para cães</li>
//       <li>300kg de ração para gatos</li>
//       <li>Cobertores e camas</li>
//       <li>Brinquedos e acessórios</li>
//       <li>Produtos de limpeza especializados</li>
//     </ul>
//     <p>Esta doação ajudará a manter nossos animais bem alimentados e confortáveis nos próximos meses. Parcerias como esta são fundamentais para a sustentabilidade do nosso trabalho.</p>
//     <blockquote>
//       <p>"Apoiar iniciativas como o Canil/Gatil Municipal do Seixal faz parte da nossa responsabilidade social corporativa. Estamos felizes em poder contribuir para o bem-estar desses animais", afirmou João Silva, diretor da PetCare Portugal.</p>
//     </blockquote>
//     <p>Encorajamos outras empresas locais a seguirem este exemplo, pois toda ajuda é valiosa para mantermos nosso trabalho de resgate e cuidado dos animais abandonados.</p>
//     <p>Se sua empresa também deseja fazer uma doação, entre em contato conosco. Juntos, podemos fazer a diferença na vida desses animais!</p>`,
//     date: '2023-04-10T09:15:00Z',
//     author: 'Sofia Almeida',
//     imageUrl: 'https://images.pexels.com/photos/5731866/pexels-photo-5731866.jpeg',
//     tags: ['doação', 'parceria', 'empresas']
//   }
// ]

export const useNewsStore = defineStore('news', () => {
  const news = ref<NewsItem[]>([])
  const currentNewsItem = ref<NewsItem | null>(null)

  // Fetch all news
  const fetchNews = async () => {
    // In a real app, this would be an API call
    news.value = [...mockNews]
  }

  // Fetch a single news item
  const fetchNewsItem = async (id: string) => {
    // In a real app, this would be an API call
    const newsItem = mockNews.find(n => n.id === id)
    currentNewsItem.value = newsItem || null
  }

  // Get related news items (excluding current news)
  const relatedNews = computed(() => {
    if (!currentNewsItem.value) return []
    
    // In a real app, this would use tags or categories to find related content
    return news.value
      .filter(item => item.id !== currentNewsItem.value?.id)
      .slice(0, 3)
  })

  // Add a new news item
  const addNews = async (newsItem: Omit<NewsItem, 'id' | 'date'>) => {
    // In a real app, this would be an API call
    const newNewsItem = {
      ...newsItem,
      id: Date.now().toString(),
      date: new Date().toISOString()
    }
    news.value.unshift(newNewsItem)
  }

  // Update a news item
  const updateNews = async (id: string, updates: Partial<NewsItem>) => {
    // In a real app, this would be an API call
    const index = news.value.findIndex(n => n.id === id)
    if (index !== -1) {
      news.value[index] = { ...news.value[index], ...updates }
    }
  }

  // Delete a news item
  const deleteNews = async (id: string) => {
    // In a real app, this would be an API call
    news.value = news.value.filter(n => n.id !== id)
  }

  return {
    news,
    currentNewsItem,
    relatedNews,
    fetchNews,
    fetchNewsItem,
    addNews,
    updateNews,
    deleteNews
  }
})
