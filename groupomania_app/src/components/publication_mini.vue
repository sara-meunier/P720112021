<template>
  <div class="publication_mini">
    <v-card class="card">
        <div class="card-content">
            <v-card-title>{{publication.title}}</v-card-title>
            <v-card-subtitle class="author">{{publication.author}}</v-card-subtitle>
            <v-card-text> {{publication/preview}}</v-card-text>
            <v-card-actions>
                <v-btn outlined rounded text>
                    Consulter
                </v-btn>
            </v-card-actions>
        </div>
    </v-card>
  </div>
</template>



<script>
  export default {
      props: ['publication'],
      name: "publication_mini",
      data: () => ({
      items: ['Les plus récent', 'Les plus populaires'],
      totalMessage: '4',
    }),

    computed: {},

    methods: {},
  }
</script>


<style lang="scss" scoped>
  .card {
    text-align: center;
  }
  .card-content {
    padding-top: 50px;
    position: absolute;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.35);
    top: 0;
    padding: 10px;
    height: 200px;
    width: 100%;
  }
</style>