<template>
  <GlobalContainer>
    <template #left-column>
      <GlobalCard color="blue" top v-if="data">
        <template #header
          ><router-link to="/online"
            ><h1>{{ data.connected }}</h1>
            {{ $t("online", data.connected) }}</router-link
          ></template
        >
        <div>{{ data.members }} {{ $t("members.text", data.members) }}</div>
        {{ data.last24 }} {{ $t("members.past", data.last24) }} </GlobalCard
      ><br />
      <router-link to="/shop">
        <GlobalCard
          color="yellow"
          header="packs.webp"
          :width="154"
          :height="96"
          class="packs"
          v-if="data"
        >
          <template #button>
            <GlobalButton color="yellow" icon="register.svg">Pack</GlobalButton>
          </template>
          <Pack name="supporter" :looks="data.shop.looks" />
        </GlobalCard>
      </router-link>
      <br />
    </template>
    <Demo />
    <br />
    <GlobalCard v-if="data">
      <template #subtop
        ><router-link to="/chaparazzi" class="chaparazzi-link">{{
          $t("section.chaparazzi")
        }}</router-link></template
      >
      <div class="gallery flex">
        <div
          class="flex col photo"
          v-for="photo of data.gallery"
          :key="photo.name"
          style="margin: auto"
        >
          <router-link :to="'/chaparazzi/' + photo.name">
            <img
              draggable="false"
              @contextmenu.prevent
              :src="`gallery/${photo.name}`"
              :alt="photo.name" /></router-link
          ><b>{{ formatDatePhotos(photo.date) }}</b>
        </div>
      </div>
      <div style="text-align: right">
        <router-link to="/chaparazzi">
          <img
            src="@/asset/img/puce.svg"
            alt="Puce"
            draggable="false"
            @contextmenu.prevent
            height="17"
            width="17"
          />
          {{ $t("chaparazzi.more") }}
        </router-link>
      </div>
    </GlobalCard>
    <template #right-column>
      <GlobalCard color="blue" header="games.gif" v-if="data">
        <div class="fullwidth">
          <img src="@/asset/img/game/bacteria/head.gif" />
          <img src="@/asset/img/game/bacteria/bg.gif" />
          <GlobalAvatar
            style="margin-top: -66px; margin-bottom: 13px"
            :avatar="data.bacteria.user.look.avatar"
            :emote="data.bacteria.user.look.emote"
            :hat="data.bacteria.user.look.hat"
            :body="data.bacteria.user.look.body"
            :shoe="data.bacteria.user.look.shoe"
            :item0="data.bacteria.user.look.item0"
            :item1="data.bacteria.user.look.item1"
            :item2="data.bacteria.user.look.item2"
          />
          <div class="game-champion">
            <UserLink :user="data.bacteria.user" /><br />{{
              $t("champion.bacteria")
            }}
          </div>
          <img src="@/asset/img/game/patojdur/head.gif" />
          <img src="@/asset/img/game/patojdur/bg.gif" />
          <GlobalAvatar
            style="margin-top: -66px; margin-bottom: 13px"
            :avatar="data.patojdur.user.look.avatar"
            :emote="data.patojdur.user.look.emote"
            :hat="data.patojdur.user.look.hat"
            :body="data.patojdur.user.look.body"
            :shoe="data.patojdur.user.look.shoe"
            :item0="data.patojdur.user.look.item0"
            :item1="data.patojdur.user.look.item1"
            :item2="data.patojdur.user.look.item2"
          />
          <div class="game-champion">
            <UserLink :user="data.patojdur.user" /><br />{{
              $t("champion.patojdur")
            }}
          </div>
          <img src="@/asset/img/game/mazo/head.gif" />
          <img src="@/asset/img/game/mazo/bg.gif" />
          <GlobalAvatar
            style="margin-top: -66px; margin-bottom: 13px"
            :avatar="data.mazo.user.look.avatar"
            :emote="data.mazo.user.look.emote"
            :hat="data.mazo.user.look.hat"
            :body="data.mazo.user.look.body"
            :shoe="data.mazo.user.look.shoe"
            :item0="data.mazo.user.look.item0"
            :item1="data.mazo.user.look.item1"
            :item2="data.mazo.user.look.item2"
          />
          <div class="game-champion">
            <UserLink :user="data.mazo.user" /><br />{{ $t("champion.mazo") }}
          </div>
        </div></GlobalCard
      >
    </template>
  </GlobalContainer>
</template>
<script>
import Demo from "@/component/Demo.vue";
import Pack from "@/component/Pack.vue";
import { format } from "date-fns";
import { fr, enGB } from "date-fns/locale";
const locales = { fr, enGB };

// @vuese
// @group View
// Login page
export default {
  name: "LoginView",
  components: {
    Pack,
    Demo,
  },
  data() {
    return {
      data: null,
    };
  },
  async beforeRouteEnter(to, from, next) {
    next((vm) =>
      vm.api.get("/api/login.json").then((res) => (vm.data = res.data))
    );
  },
  async beforeRouteUpdate(to, from, next) {
    const req = await this.api.get("/api/login.json");
    this.data = req.data;
    next();
  },
  methods: {
    login() {
      this.$store.dispatch("auth/login");
    },
    formatDatePhotos(date) {
      return format(new Date(date), "PP", {
        locale: locales[navigator.language.split("-")[0]],
      });
    },
  },
  metaInfo: {
    title: "section.login",
  },
};
</script>
<style lang="scss">
.packs .card-btn {
  background: linear-gradient(
    to bottom,
    var(--dark-card-blue),
    var(--dark-card-blue) 50%,
    var(--main-card-yellow) 50%
  ) !important;
}
</style>
<style lang="scss" scoped>
.login-form {
  justify-content: center;
}

.game-champion {
  background: linear-gradient(to bottom, #58a8db, var(--selected-main-card));
  margin-bottom: var(--md-gap);
}

.chaparazzi-link {
  font-weight: normal;
  fill: var(--light);
}

.chaparazzi-link:hover {
  text-decoration: none;
}

.gallery {
  flex-wrap: wrap;
}

.gallery .photo {
  width: 30%;
}

.gallery .photo img {
  border: 1px solid var(--main-bg);
  width: 100%;
}
</style>
