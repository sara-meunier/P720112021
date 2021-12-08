<template>
  <div class="publication_mini">
    <v-card class="card">
      <div class="card-content"> 
        <v-card-title>{{publication.title}}</v-card-title>
        <v-container fill-height class="v-card__subtitle">
          <i class="material-icons">face</i>
          <v-layout>{{publication.author}}</v-layout>
        </v-container>
        <v-card-text> {{publication.preview}}</v-card-text>
        <v-card-actions class="d-flex justify-space-between">
          <v-btn outlined rounded text>
            <router-link :to="'/publication/' + publication.id"> 
              Consulter
            </router-link>
          </v-btn>
          <v-container fill-height class="like"> {{publication.numberLike}}<i class="material-icons">favorite_border</i></v-container>
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
      items: ['Les plus récents', 'Les plus populaires'],
      totalMessage: '5 - placeholder',
    }),

    computed: {},

    methods: {},
  }
</script>


<style lang="scss" scoped>

  .material-icons {
    font-size: 20px;
    margin-right: 5px;
  }

  .card {
    text-align: justify;
    border-radius:10px !important;
    margin-bottom: 10px;
  }
  .card-content {
    padding-top: 10px;
    margin-top : 30px;
    top: 0;
    padding: 0px;
    max-height: 250px;
    width: 100%;
  }

  .author {
    text-align: left;
    font-style: italic;
    color:#091f43 !important;
  }

  .v-btn {
    border-color: #091f43 !important;
    color: #091f43 !important;
  }

  .v-btn a {
    color: #091f43 !important;
    text-decoration: none !important;
    font-style: bold !important;
  }

  .like {
    text-align: right;
    justify-content:end;
  }

</style>