<script setup lang="ts">
import { ref } from 'vue'

const shelterInfo = ref({
  foundingYear: 1997,
  totalAnimalsHelped: 3500,
  currentAnimals: 80,
  adoptionsLastYear: 150,
  volunteers: 20
})

const milestones = ref([
  {
    year: 1997,
    title: 'Fundação da Associação',
    description: 'A nossa jornada começou com um gesto simples, mas transformador: a esterilização de gatos de rua, numa altura em que ainda pouco se falava de programas CED (então chamados CER). Iniciámos este trabalho com as colónias do concelho do Seixal, enfrentando o desconhecimento geral da população sobre este tema. Foi um trabalho pioneiro no concelho, guiado apenas pela vontade de ajudar.',
    imageUrl: 'https://res.cloudinary.com/dlqmc28to/image/upload/v1771242682/PHOTO-2025-09-13-21-21-55_on6lnw.jpg'
  },
  {
    year: 2003,
    title: 'Iniciamos um projeto de voluntariado no Canil Municipal (atualmente CROACS)',
    description: 'Foi nesta altura que foi criado o gatil, com condições muito básicas, mas que representava um enorme passo em frente até então, nenhum centro de recolha no distrito de Setúbal dispunha de um espaço dedicado exclusivamente aos gatos. Sem redes sociais ou meios de comunicação digitais, espalhámos a palavra como podíamos. Aos poucos, conseguimos reunir um grupo de voluntários vindos de várias zonas do distrito. O CROACS tornou-se o primeiro centro de recolha do país a contar com o apoio de um grupo de voluntários.',
    imageUrl: 'https://res.cloudinary.com/dlqmc28to/image/upload/v1771242682/PHOTO-2025-02-15-17-50-10_d9gvv5.jpg'
  },
  {
    year: 2009,
    title: 'Encontro Nacional de Associações e Organizações',
    description: 'Organizámos um encontro de âmbito nacional que reuniu associações e organizações de todo o país. O foco foi a partilha de experiências e a discussão sobre as mudanças que começavam a surgir nos centros de recolha e na sociedade. Um momento marcante de união e construção conjunta de um futuro mais digno para os animais.',
    imageUrl: 'https://res.cloudinary.com/dlqmc28to/image/upload/v1771242682/PHOTO-2025-09-14-15-31-19_2_vv5de3.jpg'
  },
  {
    year: 2014,
    title: 'Cedência das Instalações Atuais',
    description: 'Foi-nos cedido o espaço onde atualmente desenvolvemos grande parte do nosso trabalho. Apesar das limitações estruturais, este local tornou-se um verdadeiro refúgio para os nossos animais. Pode não haver luxo, mas há amor, dedicação e respeito valores que sempre nortearam a nossa missão. Aqui, o princípio permanece inalterado: acima de tudo, estão os animais.',
    imageUrl: 'https://res.cloudinary.com/dlqmc28to/image/upload/ar_3:4,c_crop/c_fill,g_north,h_221,w_394/IMG_3127_uivuqz2_wbrmsq.jpg'
  },
  {
    year: 2025,
    title: 'Remodelação de algumas instalações',
    description: 'Foram realizadas obras de remodelações na lavandaeria e na enfermaria',
    imageUrl: 'https://res.cloudinary.com/dlqmc28to/image/upload/v1771244516/IMG_7286_u4knxb.jpg'
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
          Conheça a trajetória do Grupo de voluntários no Canil-Gatil Municipal do Seixal 
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
              <img src="https://res.cloudinary.com/dlqmc28to/image/upload/v1771242682/PHOTO-2025-09-14-15-31-19_rpgcq1.jpg" alt="Nossa Missão" 
                class="rounded-lg shadow-md w-full h-auto object-cover aspect-square" />
            </div>
            <div class="md:w-2/3">
              <h2 class="text-2xl font-bold text-secondary-800 mb-4">Quem nós somos?</h2>
              <p class="text-secondary-700 mb-4">
                Somos uma associação sem fins lucrativos, movida por um profundo amor e respeito 
                por todos os animais, dos mais pequenos aos maiores, dos mais calmos aos mais irrequietos, 
                dos saudáveis aos que mais necessitam de cuidados. A nossa missão é clara: estender a mão
                e o coração àqueles que verdadeiramente precisam, oferecendo-lhes proteção, carinho e 
                uma nova esperança.
              </p>
              <h2 class="text-2xl font-bold text-secondary-800 mb-4">As nossas principais atividades</h2>
              <p class="text-secondary-700 mb-4">
                A nossa ação desenvolve-se em várias frentes, sempre com o bem-estar animal como prioridade. 
                Prestamos apoio aos animais alojados no CROACS, apoio no tratamento do gatil, no passeio dos 
                cães. Paralelamente, apoiamos tutores carenciados, trabalhamos com animais de rua, prestando-lhes cuidados veterinários
                básicos, promovendo a esterilização através do programa CED (Captura, Esterilização e Devolução) 
                e garantindo-lhes alimentação regular.
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