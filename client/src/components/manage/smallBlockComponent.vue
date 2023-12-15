<template>
  <v-card>

    <v-data-table
    :headers="headers"
    :items="smallBlocks"
    :items-per-page="-1"
    class="elevation-1"
    item-key="id"
    :search="search">

      <template v-slot:top>
        <v-toolbar flat>
        <v-toolbar-title>Small Block In {{block}} Data</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical>
        </v-divider>
        <v-spacer></v-spacer>
        <v-dialog
            v-model="dialog"
            max-width="500px">
            <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on">
                Add new block
            </v-btn>
            </template>

            <v-card>
            <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                <v-row>
                    <v-text-field
                    v-model="editedItem.name"
                    label="small block name"
                    :rules="[required]">
                    </v-text-field>
                </v-row>
                </v-container>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                color="blue darken-1"
                text
                @click="close">
                cancel
                </v-btn>
                <v-btn
                color="blue darken-1"
                text
                @click="save"
                :disabled="editedItem.name==''">
                save
                </v-btn>
            </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
            <v-card-title class="text-h5">Are you sure to delete this small block</v-card-title>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">sure</v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
            </v-card>
        </v-dialog>

        </v-toolbar>
      </template>

      <template v-slot:item.actions="{ item }">
          <v-icon
          small
          class="mr-2"
          @click="editItem(item)">
          mdi-pencil
          </v-icon>
          <v-icon
          small
          class="mr-2"
          @click="deleteItem(item)">
          mdi-delete
          </v-icon>
          <v-icon
          small
          @click="navigateTo({
            name: 'manageData',
            params: {
              smallBlockId: item.id,
            }
          })">
          mdi-eye
        </v-icon>
      </template>

      <template v-slot:no-data>
          <p class="ma-3">You haven't add any data</p>
          <p class="ma-3">If you add, click the reset button</p>
          <v-btn
          class="mb-3"
          color="primary"
          @click="initialize">
          Reset
          </v-btn>
      </template>
    </v-data-table>
  </v-card>

</template>
  
  <script>
  import SmallBlockService from '@/services/smallBlockService'
  
  export default {
    data: () => ({
      blockId: 0,
      search:'',
      required: (value) => !!value || 'Required.',
      dialog: false,
      dialogDelete: false,
      headers: [
      {
          text: 'id',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        {
          text: 'name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'func', value: 'actions', sortable: false },
      ],
      block:'',
      smallBlocks: [],
      editedIndex: -1,
      editedItem: {
        name: '',
      },
      defaultItem: {
        name: '',
      },
    }),
  
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Add small block' : 'Edit small block'
      },
    },
  
    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },
  
    created () {
      this.$loading(true)
      this.initialize()
      this.$loading(false)
    },
  
    methods: {
      filterOnlyCapsText (value, search, item) {
        return value != null &&
              search != null &&
              typeof value === 'string' &&
              value.toString().indexOf(search) !== -1
      },
  
      navigateTo (route) {
        this.$router.push(route)
      },
  
      async initialize () {
      },
  
      editItem (item) {
        this.editedIndex = this.smallBlocks.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
  
      deleteItem (item) {
        this.editedIndex = this.smallBlocks.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },
  
      async deleteItemConfirm () {
        try{
          await SmallBlockService.delete(this.editedItem)
          this.closeDelete()
          window.location.reload();
        }catch(err){
          console.log(err)
        }
      },
  
      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
  
      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
  
      async save () {
        this.$loading(true)
        if (this.editedIndex > -1) {
          try{
            await SmallBlockService.put(this.editedItem)
            window.location.reload()
          }catch(err){
            console.log(err)
          }
        } else {
          try{
            let item = this.editedItem
            item.blockId = this.blockId
            await SmallBlockService.post(item)
            window.location.reload()
          }catch(err){
            console.log(err)
          }
        }
        this.close()
        this.$loading(false)
      },
    },
  }
  </script>
  