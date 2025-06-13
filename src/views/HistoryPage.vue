<script setup lang="ts">
import { ref, onMounted } from 'vue'

const shelterInfo = ref({
  foundingYear: 2010,
  totalAnimalsHelped: 3500,
  currentAnimals: 120,
  adoptionsLastYear: 280,
  volunteers: 45
})

const milestones = ref([
  {
    year: 2010,
    title: 'Fundação',
    description: 'O Grupo de voluntários noo Canil/Gatil Municipal do Seixal foi fundado por um pequeno grupo de cidadãos preocupados com o bem-estar animal na região.',
    imageUrl: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg'
  },
  {
    year: 2012,
    title: 'Novas Instalações',
    description: 'Graças ao apoio da Câmara Municipal do Seixal e de doações privadas, conseguimos mudar para instalações maiores e mais adequadas.',
    imageUrl: 'https://images.pexels.com/photos/18268400/pexels-photo-18268400.jpeg'
  },
  {
    year: 2015,
    title: 'Programa de Apadrinhamento',
    description: 'Lançamos o programa de apadrinhamento, permitindo que pessoas que não podem adotar possam ainda assim contribuir para o bem-estar de um animal específico.',
    imageUrl: 'https://images.pexels.com/photos/1444321/pexels-photo-1444321.jpeg'
  },
  {
    year: 2018,
    title: 'Programa Educativo',
    description: 'Iniciamos um programa educativo, visitando escolas locais para sensibilizar os mais jovens sobre o abandono animal e a importância da adoção responsável.',
    imageUrl: 'https://images.pexels.com/photos/7516363/pexels-photo-7516363.jpeg'
  },
  {
    year: 2020,
    title: 'Aniversário de 10 Anos',
    description: 'Celebramos uma década de trabalho com um grande evento virtual durante a pandemia, conseguindo angariar fundos significativos para o abrigo.',
    imageUrl: 'https://images.pexels.com/photos/6646865/pexels-photo-6646865.jpeg'
  },
  {
    year: 2023,
    title: 'Expansão das Instalações',
    description: 'Inauguramos uma nova área dedicada exclusivamente aos gatos e um espaço para reabilitação de animais com necessidades especiais.',
    imageUrl: 'https://images.pexels.com/photos/17036739/pexels-photo-17036739.jpeg'
  }
])

</script>

<template>
  <div class="bg-gray-50 py-12">
    <div class="container mx-auto px-4">
      <!-- Hero Section -->
      <div class="max-w-4xl mx-auto text-center mb-16">
        <h1 class="text-3xl md:text-4xl font-bold text-secondary-800 mb-4">Nossa História</h1>
        <p class="text-lg text-secondary-600">
          Conheça a trajetória do Grupo de voluntários noo Canil/Gatil Municipal do Seixal 
          e o impacto que temos feito na comunidade e na vida dos animais.
        </p>
      </div>

      <!-- Key Stats -->
      <section class="mb-16">
        <div class="bg-white rounded-lg shadow-md p-8">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div class="text-center">
              <div class="text-3xl font-bold text-primary-500 mb-2">{{ shelterInfo.foundingYear }}</div>
              <div class="text-secondary-600">Ano de fundação</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-primary-500 mb-2">{{ shelterInfo.totalAnimalsHelped }}+</div>
              <div class="text-secondary-600">Animais ajudados</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-primary-500 mb-2">{{ shelterInfo.currentAnimals }}</div>
              <div class="text-secondary-600">Animais atualmente</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-primary-500 mb-2">{{ shelterInfo.adoptionsLastYear }}</div>
              <div class="text-secondary-600">Adoções no último ano</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-primary-500 mb-2">{{ shelterInfo.volunteers }}</div>
              <div class="text-secondary-600">Voluntários ativos</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Our Mission -->
      <section class="mb-16">
        <div class="bg-primary-50 rounded-lg p-8 border border-primary-100">
          <div class="flex flex-col md:flex-row gap-8 items-center">
            <div class="md:w-1/3">
              <img src="https://images.pexels.com/photos/7474346/pexels-photo-7474346.jpeg" alt="Nossa Missão" 
                class="rounded-lg shadow-md w-full h-auto object-cover aspect-square" />
            </div>
            <div class="md:w-2/3">
              <h2 class="text-2xl font-bold text-secondary-800 mb-4">Nossa Missão</h2>
              <p class="text-secondary-700 mb-4">
                O Grupo de voluntários noo Canil/Gatil Municipal do Seixal tem como missão resgatar, reabilitar e encontrar lares permanentes 
                para cães e gatos abandonados ou maltratados na região do Seixal.
              </p>
              <p class="text-secondary-700 mb-4">
                Acreditamos que todos os animais merecem uma segunda chance e trabalhamos incansavelmente para garantir seu bem-estar, 
                fornecendo abrigo, alimentação, cuidados veterinários e, acima de tudo, amor.
              </p>
              <p class="text-secondary-700">
                Além disso, buscamos educar a comunidade sobre a importância da adoção responsável e dos cuidados adequados com os animais de estimação, 
                promovendo uma convivência harmoniosa entre humanos e animais.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Timeline/Milestones -->
      <section class="mb-16">
        <h2 class="text-2xl font-bold text-secondary-800 mb-8 text-center">Nossa Trajetória</h2>
        
        <div class="space-y-12">
          <div 
            v-for="(milestone, index) in milestones" 
            :key="`milestone-${index}`"
            class="flex flex-col md:flex-row gap-8 items-center"
            :class="{ 'md:flex-row-reverse': index % 2 !== 0 }"
          >
            <div class="md:w-1/3">
              <div class="relative">
                <div class="absolute top-0 left-0 bg-primary-500 text-white font-bold py-2 px-4 rounded-tl-lg rounded-br-lg">
                  {{ milestone.year }}
                </div>
                <img :src="milestone.imageUrl" :alt="milestone.title" 
                  class="rounded-lg shadow-md w-full h-auto object-cover aspect-video" />
              </div>
            </div>
            <div class="md:w-2/3">
              <h3 class="text-xl font-semibold text-secondary-800 mb-2">{{ milestone.title }}</h3>
              <p class="text-secondary-700">{{ milestone.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <div class="mt-16 bg-secondary-800 rounded-lg p-8 text-white text-center">
        <h2 class="text-2xl font-bold mb-4">Faça parte dessa história!</h2>
        <p class="text-lg mb-6">
          Ajude-nos a continuar transformando a vida de animais que precisam de uma nova chance.
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <router-link to="/como-ajudar" class="btn bg-primary-500 text-white hover:bg-primary-600">
            Como Ajudar
          </router-link>
          <router-link to="/animais" class="btn bg-white text-secondary-800 hover:bg-gray-100">
            Adotar um Animal
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>