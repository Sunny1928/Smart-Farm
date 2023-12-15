<template>
  <div>
    <v-card
      class="mx-auto"
      max-width="344"
      outlined>
      <v-img
      height="250"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
      ></v-img>
      <v-card-text>
          <div class="text-overline d-flex">
            {{note.date}}
            <v-spacer></v-spacer>
            <v-icon>mdi-map-marker</v-icon>
            {{note.block_id}} - {{note.small_block_id}}
          </div>
      </v-card-text>
      <v-card-title class="text-h6">
        {{note.title}}
      </v-card-title>
      <v-card-text>
        {{note.comment}}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="deep-purple lighten-2"
          text
          @click="reserve">
          <v-icon>mdi-pencil</v-icon> Revise
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  components: {
  },
  data() {
    return {
      note:{
        date: "May 24 5:43pm",
        title:"Have A Nice Day in Farm",
        block_id: "farm1",
        small_block_id: "west",
        comment:"Excellent harvest the grapes have a rich flavor and aromaa rich flavor and aromaExcellent harvest the grapes have a rich flavor and aromaa rich flavor and aroma",
        writer: "Sunny Chuang"
      }
    }
  },
}
</script>

<style scoped>
.background{
  margin: 10px;
  padding: 10px;
  background-color: #fff;
  border-radius: 15px;
}
</style>
