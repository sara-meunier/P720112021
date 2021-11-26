<template>
  <v-container>
    <h2>Check out our upcoming events</h2>
    <v-row>
      <div
        v-for="event in events"
        :event="event"
        :key="event.id"
        class="col"
        >
        <router-link :to="'/event/' + event.id">
          <EventCard :event="event" />
        </router-link>
      </div>
    </v-row>
  </v-container>
</template>


<script>
import EventCard from '@/components/EventCard';
  export default {
    name: 'EventsList',
    components: {
      EventCard,
    },
    data() {
      return {
        event: {},
        events: [
          {
            id: 1,
            name: 'Charity Ball',
            category: 'Fundraising',
            description:
              'Spend an elegant night of dinner and dancing with us as we raise money for our new rescue farm.',
            featuredImage: 'https://placekitten.com/500/500',
            images: [
              'https://placekitten.com/500/500',
              'https://placekitten.com/500/500',
              'https://placekitten.com/500/500',
            ],
            location: '1234 Fancy Ave',
            date: '12-25-2019',
            time: '11:30',
          },
          {
            id: 2,
            name: 'Rescue Center Goods Drive',
            category: 'Adoptions',
            description:
              'Come to our donation drive to help us replenish our stock of pet food, toys, bedding, etc. We will have live bands, games, food trucks, and much more.',
            featuredImage: 'https://placekitten.com/500/500',
            images: ['https://placekitten.com/500/500'],
            location: '1234 Dog Alley',
            date: '11-21-2019',
            time: '12:00',
          },
        ],
      };
    },
  };
</script>
<style lang="scss" scoped>
  .events {
    margin-top: 100px;
    text-align: center;
  }
</style>