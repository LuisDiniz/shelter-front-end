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
    title: 'Campanha de Adoção Especial - "Um Lar para Todos"',
    excerpt: 'Participe da nossa campanha especial de adoção este final de semana e ajude os nossos animais a encontrar um lar amoroso.',
    content: `<p>Este fim de semana, o Canil/Gatil Municipal do Seixal realiza a campanha "Um Lar para Todos", uma iniciativa especial de adoção que visa encontrar lares amorosos para os nossos animais.</p>
    <p>A campanha acontecerá nos dias 25 e 26 de junho, das 10h às 18h, nas nossas instalações. Durante o evento, teremos:</p>
    <ul>
      <li>Sessões de aconselhamento sobre adoção responsável</li>
      <li>Veterinários disponíveis para responder a perguntas sobre cuidados com os animais</li>
      <li>Brindes para quem adotar um animal durante o evento</li>
      <li>Café e snacks para os visitantes</li>
    </ul>
    <p>Todos os animais adotados durante a campanha já estarão vacinados, desparasitados e esterilizados.</p>
    <blockquote>
      <p>"Adotar um animal é dar uma segunda chance a um ser que só quer amar e ser amado. Esperamos que muitos dos nossos queridos cães e gatos encontrem famílias durante esta campanha", diz Maria Santos, coordenadora do abrigo.</p>
    </blockquote>
    <p>Não perca esta oportunidade de transformar a sua vida e a de um animal carente. Venha conhecer nossos amigos de quatro patas que estão à espera de um lar!</p>`,
    date: '2023-06-20T10:00:00Z',
    author: 'Ana Rodrigues',
    imageUrl: 'https://images.pexels.com/photos/1904105/pexels-photo-1904105.jpeg',
    tags: ['adoção', 'campanha', 'evento']
  },
  {
    id: '2',
    title: 'Novo Espaço para Reabilitação de Animais Inaugurado',
    excerpt: 'O Canil/Gatil Municipal do Seixal inaugurou um novo espaço dedicado à reabilitação de animais com necessidades especiais.',
    content: `<p>Com grande alegria, anunciamos a inauguração do nosso novo espaço dedicado à reabilitação de animais com necessidades especiais. Este projeto, que esteve em desenvolvimento durante mais de um ano, finalmente tornou-se realidade graças ao apoio de doadores e voluntários dedicados.</p>
    <p>O novo espaço conta com:</p>
    <ul>
      <li>Área para fisioterapia animal</li>
      <li>Equipamentos especializados para reabilitação</li>
      <li>Espaço acolhedor para animais em recuperação</li>
      <li>Sala de treino para socialização</li>
    </ul>
    <p>Este investimento representa um grande avanço na nossa missão de cuidar de todos os animais, independentemente das suas condições de saúde ou desafios físicos.</p>
    <p>A cerimônia de inauguração contou com a presença de autoridades locais, voluntários e apoiadores do abrigo. Foi um momento emocionante para todos que acompanharam o desenvolvimento deste projeto desde o início.</p>
    <p>Agradecemos a todos que contribuíram para tornar este sonho realidade. Com este novo espaço, poderemos ajudar ainda mais animais a recuperar-se e encontrar lares amorosos.</p>`,
    date: '2023-05-15T14:30:00Z',
    author: 'Carlos Mendes',
    imageUrl: 'https://images.pexels.com/photos/6816849/pexels-photo-6816849.jpeg',
    tags: ['infraestrutura', 'reabilitação', 'novidades']
  },
  {
    id: '3',
    title: 'Doação de Ração e Materiais Recebida de Empresa Local',
    excerpt: 'A empresa PetCare Portugal fez uma generosa doação de ração e materiais para os animais do nosso abrigo.',
    content: `<p>Estamos extremamente gratos à empresa PetCare Portugal pela generosa doação recebida esta semana. A contribuição incluiu:</p>
    <ul>
      <li>500kg de ração para cães</li>
      <li>300kg de ração para gatos</li>
      <li>Cobertores e camas</li>
      <li>Brinquedos e acessórios</li>
      <li>Produtos de limpeza especializados</li>
    </ul>
    <p>Esta doação ajudará a manter nossos animais bem alimentados e confortáveis nos próximos meses. Parcerias como esta são fundamentais para a sustentabilidade do nosso trabalho.</p>
    <blockquote>
      <p>"Apoiar iniciativas como o Canil/Gatil Municipal do Seixal faz parte da nossa responsabilidade social corporativa. Estamos felizes em poder contribuir para o bem-estar desses animais", afirmou João Silva, diretor da PetCare Portugal.</p>
    </blockquote>
    <p>Encorajamos outras empresas locais a seguirem este exemplo, pois toda ajuda é valiosa para mantermos nosso trabalho de resgate e cuidado dos animais abandonados.</p>
    <p>Se sua empresa também deseja fazer uma doação, entre em contato conosco. Juntos, podemos fazer a diferença na vida desses animais!</p>`,
    date: '2023-04-10T09:15:00Z',
    author: 'Sofia Almeida',
    imageUrl: 'https://images.pexels.com/photos/5731866/pexels-photo-5731866.jpeg',
    tags: ['doação', 'parceria', 'empresas']
  }
]

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