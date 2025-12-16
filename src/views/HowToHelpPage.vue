<script setup lang="ts">
import { ref } from 'vue'

const donationOptions = ref([
  {
    title: 'Doações Financeiras',
    description: 'A sua ajuda financeira é vital para mantermos nossas operações. Todas as doações são utilizadas para alimentação, cuidados veterinários e manutenção das nossas instalações.',
    steps: [
      'Transferência bancária para a conta: PT50003600229910007534465',
      'MBWAY (exclusivamente): 966420094 ou 966420094',
    ],
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  {
    title: 'Doações de Materiais',
    description: 'Aceitamos diversos materiais que são essenciais para o funcionamento diário do abrigo.',
    steps: [
      'Ração húmida(patê) ou seca para gatos e cães',
      'Leite para gatinhos',
      'Areia de gato', 
      'Produtos de limpeza, resguardos e toalhitas',
      'Cobertores, toalhas, camas e transportadoras',
      'Medicamentos, desparasitantes internos e externos',
      'Brinquedos para animais'
    ],
    icon: 'M20 7l-8-4-8 4m16 0v10a2 2 0 11-4 0v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5a2 2 0 00-2 2v3.104a7 7 0 001.325 4.108'
  },
  {
    title: 'Apadrinhamento',
    description: 'Apadrinhar um animal é uma forma de ajudar enquanto ele aguarda por uma família definitiva',
    steps: [
      'Escolha um animal para apadrinhar',
      'Contribua mensalmente com um valor que será usado para seus cuidados',
      'Receba atualizações regulares sobre o seu afilhado',
      'Visite-o sempre que desejar',
    ],
    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
  },
  {
    title: 'Sócio',
    description: 'Tornar-se sócio e contribua com um valor semestral ou anual',
    steps: [
      'Contribui para pagamentos de despesas fixas',
      'Flexibilidade de pagemento semestral (12€ a cada 6 meses) ou anual (24€)',
      'Receba atualizações da associação',
      'Desconto em serviços oferecidos por parceiros da associação',
    ],
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
  },    
])

const volunteerOptions = ref([
  {
    title: 'Voluntariado Regular',
    description: 'Torne-se um voluntário regular e ajude-nos com tarefas como:',
    steps: [
      'Passeios com os cães',
      'Alimentação dos animais',
      'Limpeza das instalações',
      'Socialização com os animais',
      'Ajuda em campanhas de recolha de alimentos e outros eventos',
    ],
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
  },
  {
    title: 'Habilidades profissionais',
    description: 'Oferaça a sua experiência e competências profissionais',
    steps: [
      'Fotografia e vídeo para melhorar anúncios de adoção.',
      'Trabalhos de pedreiro, pintura, carpintaria e pequenas reparações para apoiar remodelações e melhorias das instalações do abrigo.',
      'Design gráfico e programação para ajudar com o nosso site',
      'Tradução e revisão de textos para ampliar o alcance da comunicação.',
      'Gestão de redes sociais para promover campanhas.'
    ],
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
  },
])

const sponsorshipOptions = ref([
  {
    title: 'Apadrinhamento',
    description: 'Apadrinhar um animal é uma forma de ajudar enquanto ele aguarda por uma família definitiva',
    steps: [
      'Escolha um animal para apadrinhar',
      'Contribua mensalmente com um valor que será usado para seus cuidados',
      'Receba atualizações regulares sobre o seu afilhado',
      'Visite-o sempre que desejar',
    ],
    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
  },
])

const otherWaysToHelp = ref([
  {
    title: 'Divulgação',
    description: 'Ajude a divulgar nosso trabalho e os animais para adoção nas redes sociais. Uma simples partilha pode mudar uma vida.',
    icon: 'M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z'
  },
  {
    title: 'Eventos',
    description: 'Participe ou ajude a organizar eventos para recolher alimentos ou arrecadar fundos.',
    icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
  },
  // {
  //   title: 'Habilidades Profissionais',
  //   description: 'Ofereça seus conhecimentos profissionais (veterinários, fotógrafos, pedreiros, designers, programadores, etc).',
  //   icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
  // },
  {
    title: 'Empresas Parceiras',
    description: 'Se representa uma empresa ou negócio, pode apoiar-nos através de parcerias solidárias, patrocínios ou campanhas.',
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
  },
])
</script>

<template>
  <div class="bg-gray-50 py-12">
    <div class="container mx-auto px-4">
      <!-- Hero Section -->
      <div class="max-w-4xl mx-auto text-center mb-16">
        <h1 class="text-3xl md:text-4xl font-bold text-secondary-800 mb-4">Como Ajudar</h1>
        <p class="text-lg text-secondary-600">
          Existem diversas maneiras de contribuir para o bem-estar dos nossos animais. 
          Sua ajuda é fundamental para continuarmos nosso trabalho.
        </p>
      </div>

      <!-- Donation Section -->
      <section class="mb-16">
        <h2 class="text-2xl font-bold text-secondary-800 mb-8 text-center">Doações</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div 
            v-for="(option, index) in donationOptions" 
            :key="`donation-${index}`"
            class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <div class="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="option.icon" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-secondary-800 mb-2">{{ option.title }}</h3>
            <p class="text-secondary-600 mb-4">{{ option.description }}</p>
            <ul class="space-y-2 text-secondary-700">
              <li v-for="(step, stepIndex) in option.steps" :key="`donation-step-${index}-${stepIndex}`" class="flex items-start">
                <span class="text-primary-500 mr-2">•</span>
                <span>{{ step }}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Volunteer Section -->
      <section class="mb-16">
        <h2 class="text-2xl font-bold text-secondary-800 mb-8 text-center">Voluntariado</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div 
            v-for="(option, index) in volunteerOptions" 
            :key="`volunteer-${index}`"
            class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <div class="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="option.icon" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-secondary-800 mb-2">{{ option.title }}</h3>
            <p class="text-secondary-600 mb-4">{{ option.description }}</p>
            <ul class="space-y-2 text-secondary-700">
              <li v-for="(step, stepIndex) in option.steps" :key="`volunteer-step-${index}-${stepIndex}`" class="flex items-start">
                <span class="text-primary-500 mr-2">•</span>
                <span>{{ step }}</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="mt-8 bg-primary-50 rounded-lg p-6 border border-primary-200">
          <h3 class="text-lg font-semibold text-secondary-800 mb-2">Como se tornar um voluntário?</h3>
          <p class="text-secondary-700 mb-4">
            Para se tornar um voluntário, preencha nosso formulário online ou entre em contato diretamente conosco.
          </p>
          <button class="btn btn-primary">Inscrever-se como voluntário</button>
        </div>
      </section>


      <!-- Other Ways to Help -->
      <section>
        <h2 class="text-2xl font-bold text-secondary-800 mb-8 text-center">Outras formas de ajudar</h2>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="(option, index) in otherWaysToHelp" 
            :key="`other-${index}`"
            class="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300"
          >
            <div class="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="option.icon" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-secondary-800 mb-2">{{ option.title }}</h3>
            <p class="text-secondary-600">{{ option.description }}</p>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>