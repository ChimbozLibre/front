<template>
  <GlobalContainer>
    <template #left-column>
      <GlobalCard color="blue" top>
        <div class="flex col fullwidth">
          <SideNavEntries section="members" />
        </div>
      </GlobalCard>
      <br />
      <GlobalRules bot />
    </template>
    <GlobalCard header="wedding.webp" justified bg="wedding.gif">
      <div class="flex centered hstack">
        <router-link to="#today" class="btn-sm blue-bg"
          ><img
            draggable="false"
            @contextmenu.prevent
            alt="Caret"
            src="@/asset/img/icon/caret.webp"
            width="3"
            height="6"
            style="image-rendering: pixelated"
          />&nbsp;{{ $t("wedding.section.today") }}</router-link
        >
        <router-link to="#divorce" class="btn-sm blue-bg"
          ><img
            draggable="false"
            @contextmenu.prevent
            alt="Caret"
            src="@/asset/img/icon/caret.webp"
            width="3"
            height="6"
            style="image-rendering: pixelated"
          />&nbsp;{{ $t("wedding.section.divorces") }}</router-link
        >
        <router-link to="#best" class="btn-sm blue-bg"
          ><img
            draggable="false"
            @contextmenu.prevent
            alt="Caret"
            src="@/asset/img/icon/caret.webp"
            width="3"
            height="6"
            style="image-rendering: pixelated"
          />&nbsp;{{ $t("wedding.section.holding") }}</router-link
        >
        <router-link to="#broken" class="btn-sm blue-bg"
          ><img
            draggable="false"
            @contextmenu.prevent
            alt="Caret"
            src="@/asset/img/icon/caret.webp"
            width="3"
            height="6"
            style="image-rendering: pixelated"
          />&nbsp;{{ $t("wedding.section.held") }}</router-link
        >
      </div>
      <br />
      <span v-html="$t('wedding.description')"></span>
    </GlobalCard>
    <br /><GlobalCard id="last" v-if="data">
      <template #header>{{ $t("wedding.section.last") }}</template>
      {{ $t("date.on") }} <b>{{ formatDate(data.last.date, "PPp") }}</b
      >, <b>{{ data.last.id }}</b
      ><sup>{{ $t("score.nth") }}</sup> {{ $t("wedding.name") }}. <br /><br />
      <div class="wedding">
        <img
          draggable="false"
          @contextmenu.prevent
          alt="Star"
          src="@/asset/img/social/wedding/wedding.svg"
        />
        <GlobalAvatar
          class="witness witness1"
          :avatar="data.last.witness1.look.avatar"
          emote="kawai"
          :hat="data.last.witness1.look.hat"
          :body="data.last.witness1.look.body"
          :shoe="data.last.witness1.look.shoe"
          :item0="data.last.witness1.look.item0"
          :item1="data.last.witness1.look.item1"
          :item2="data.last.witness1.look.item2"
        />
        <GlobalAvatar
          class="married married1"
          :avatar="data.last.married1.look.avatar"
          emote="luv"
          :hat="data.last.married1.look.hat"
          :body="data.last.married1.look.body"
          :shoe="data.last.married1.look.shoe"
          :item0="data.last.married1.look.item0"
          :item1="data.last.married1.look.item1"
          :item2="data.last.married1.look.item2"
        />
        <GlobalAvatar
          class="married married2"
          :avatar="data.last.married2.look.avatar"
          emote="luv"
          :hat="data.last.married2.look.hat"
          :body="data.last.married2.look.body"
          :shoe="data.last.married2.look.shoe"
          :item0="data.last.married2.look.item0"
          :item1="data.last.married2.look.item1"
          :item2="data.last.married2.look.item2"
        />
        <GlobalAvatar
          class="witness witness2"
          :avatar="data.last.witness2.look.avatar"
          emote="kawai"
          :hat="data.last.witness2.look.hat"
          :body="data.last.witness2.look.body"
          :shoe="data.last.witness2.look.shoe"
          :item0="data.last.witness2.look.item0"
          :item1="data.last.witness2.look.item1"
          :item2="data.last.witness2.look.item2"
        />
      </div>
      <br />
      {{ $t("wedding.wishes") }}<br />
      <UserLink :user="data.last.married1" /> &amp;
      <UserLink :user="data.last.married2" /><br />
      <span v-html="$t('wedding.marriedbyguruji')"></span><br />
      <UserLink :user="data.last.witness1" /> &amp;
      <UserLink :user="data.last.witness2" />. </GlobalCard
    ><br />
    <GlobalCard id="today" v-if="data">
      <template #header
        ><img
          src="@/asset/img/social/wedding/mariage2.webp"
          alt="Marriage icon"
          width="143"
          height="64"
        /><br />{{ $t("wedding.title.today") }}
      </template>
      {{ $t("date.Today") }}, <b>{{ formatDate(Date.now(), "PP") }}</b
      >, <b>{{ data.today.length }}</b> {{ $t("wedding.celebrated") }}.
      <br /><br />
      <div class="fullwidth" v-for="wedding of data.today" :key="wedding.id">
        {{ $t("date.On") }} <b>{{ formatDate(wedding.date, "PPp") }}</b
        >,<br />
        <UserLink :user="wedding.married1" /> &amp;
        <UserLink :user="wedding.married2" /> {{ $t("wedding.gotmarried")
        }}<br />
        {{ $t("wedding.gotwitnessed") }} <UserLink :user="wedding.witness1" />
        {{ $t("wedding.andof") }} <UserLink :user="wedding.witness2" /><br />
        <i
          ><router-link :to="'/weddings/' + wedding.id">{{
            wedding.id
          }}</router-link
          ><sup>{{ $t("score.nth") }}</sup> {{ $t("wedding.name") }}</i
        >
      </div>
    </GlobalCard>
    <br />
    <GlobalCard id="best" v-if="data">
      <template #header
        ><img
          src="@/asset/img/social/wedding/mariage2.webp"
          alt="Marriage icon"
          width="143"
          height="64"
        /><br />Les 20 mariages qui tiennent&nbsp;!
      </template>
      <template #subtitle
        >Ça commence pour un jour... ça fini pour toujours !</template
      >
      <table class="fullwidth">
        <colgroup>
          <col width="30" />
          <col width="100%" />
          <col width="50" />
          <col width="50" />
        </colgroup>
        <thead>
          <tr>
            <th>#</th>
            <th>Couple</th>
            <th>Mariage</th>
            <th>Jours</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(wedding, index) in data.best" :key="index">
            <td>{{ index + 1 }}</td>
            <td>
              <UserLink :user="wedding.married1" /> et
              <UserLink :user="wedding.married2" />
            </td>
            <td>
              <i
                >n°<router-link :to="'/weddings/' + wedding.id">{{
                  wedding.id
                }}</router-link></i
              >
            </td>
            <td>
              <b>{{ formatDistance(wedding.date, Date.now()) }}</b>
            </td>
          </tr>
        </tbody>
      </table>
    </GlobalCard>
    <br />
    <GlobalCard id="divorce" v-if="data">
      <template #header
        ><img
          src="@/asset/img/social/wedding/divorce2.webp"
          alt="Divorce icon"
          width="143"
          height="64"
        /><br />Les divorces depuis 24 heures
      </template>
      <template #subtitle
        >Le mariage est virtuel mais la douleur est réelle&nbsp;!</template
      >
      <b>{{ data.divorce.length }}</b> couples ont été brisés&nbsp;!<br /><br />
      <table class="fullwidth">
        <colgroup>
          <col width="100" />
          <col width="100%" />
          <col width="50" />
          <col width="50" />
        </colgroup>
        <thead>
          <tr>
            <th>Heure</th>
            <th>Couple brisé</th>
            <th>Mariage</th>
            <th>Jours</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(wedding, index) in data.divorce" :key="index">
            <td>{{ formatDate(wedding.dateend, "p") }}</td>
            <td>
              <UserLink :user="wedding.married1" /> a plaqué
              <UserLink :user="wedding.married2" />
            </td>
            <td>
              <i
                >n°<router-link :to="'/weddings/' + wedding.id">{{
                  wedding.id
                }}</router-link></i
              >
            </td>
            <td>
              <b>{{ formatDistance(wedding.datebegin, wedding.dateend) }}</b>
            </td>
          </tr>
        </tbody>
      </table>
    </GlobalCard>
    <br />
    <GlobalCard id="broken" v-if="data">
      <template #header
        ><img
          src="@/asset/img/social/wedding/mariage2.webp"
          alt="Marriage icon"
          width="143"
          height="64"
        /><br />Les 20 mariages qui ont tenu !
      </template>
      <template #subtitle>C'est fini... mais ça a duré !!! </template>
      <table class="fullwidth">
        <colgroup>
          <col width="30" />
          <col width="100%" />
          <col width="50" />
          <col width="50" />
        </colgroup>
        <thead>
          <tr>
            <th>#</th>
            <th>Couple</th>
            <th>Mariage</th>
            <th>Jours</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(wedding, index) in data.broken" :key="index">
            <td>{{ index + 1 }}</td>
            <td>
              <UserLink :user="wedding.married1" /> et
              <UserLink :user="wedding.married2" />
            </td>
            <td>
              <i
                >n°<router-link :to="'/weddings/' + wedding.id">{{
                  wedding.id
                }}</router-link></i
              >
            </td>
            <td>
              <b>{{ formatDistance(wedding.datebegin, wedding.dateend) }}</b>
            </td>
          </tr>
        </tbody>
      </table>
    </GlobalCard>
    <template #right-column
      ><GlobalCard
        header="ensavoirplus.webp"
        :width="154"
        :height="34"
        top
        v-if="data"
        color="blue"
      >
        <img
          src="@/asset/img/puce.svg"
          alt="Caret"
          draggable="false"
          @contextmenu.prevent
          height="17"
          width="17"
        />
        En tout, <b>Guruji</b> a célébré <b>{{ data.stats.total }}</b> mariages.
        <br /><br />
        <img
          src="@/asset/img/social/wedding/divorce.webp"
          alt="Divorce"
          draggable="false"
          @contextmenu.prevent
          width="56"
          height="39"
        /><br />
        <b>{{ data.stats.divorce }}</b> mariés ont divorcé. <br /><br />
        <img
          src="@/asset/img/social/wedding/mariage.webp"
          alt="Wedding"
          draggable="false"
          @contextmenu.prevent
          width="56"
          height="39"
        /><br />
        En ce moment, <b>{{ data.stats.total - data.stats.divorce }}</b> couples
        sont heureux, donc ça laisse
        <b>{{
          data.stats.members - (data.stats.total - data.stats.divorce) * 2
        }}</b>
        célibs !!! <br /><img
          src="@/asset/img/social/wedding/mariage2.webp"
          alt="Wedding"
          draggable="false"
          @contextmenu.prevent
          width="130"
          height="58"
          style="width: 100%"
        /><br />
        <h3>Archive de tous les mariages</h3>
        <br />
        <form @submit.prevent="search()" class="flex fullwidth">
          <input
            required
            min="1"
            :max="data.stats.total"
            name="id"
            type="number"
            class="btn-md"
            :placeholder="$t('placeholder.weddingid')"
          /><button type="submit" class="btn-action">go</button>
        </form>
        <br />
        <form @submit.prevent="search()" class="flex fullwidth">
          <input
            required
            minlength="3"
            maxlength="15"
            pattern="[\w\.\-_@]{3,15}"
            name="username"
            type="text"
            class="btn-md"
            autocomplete="username"
            :placeholder="$t('placeholder.username')"
          /><button type="submit" class="btn-action">go</button>
        </form>
      </GlobalCard></template
    >
  </GlobalContainer>
</template>

<script>
import { format, differenceInCalendarDays } from "date-fns";
import { fr, enGB } from "date-fns/locale";
const locales = { fr, enGB };

// @vuese
// @group View/Members
// Wedding page
export default {
  name: "WeddingView",
  data() {
    return {
      data: null,
    };
  },
  async beforeRouteEnter(to, from, next) {
    next((vm) =>
      vm.api.get("/api/weddings.json").then((res) => (vm.data = res.data))
    );
  },
  async beforeRouteUpdate(to, from, next) {
    const req = await this.api.get("/api/weddings.json");
    this.data = req.data;
    next();
  },
  methods: {
    formatDate(date, formatPattern) {
      return format(new Date(date), formatPattern, {
        locale: locales[navigator.language.split("-")[0]],
      });
    },
    formatDistance(datebegin, dateend) {
      return differenceInCalendarDays(new Date(dateend), new Date(datebegin), {
        locale: locales[navigator.language.split("-")[0]],
      });
    },
    search() {
      console.log("Envoyé!");
    },
  },
  metaInfo: {
    title: "section.wedding",
  },
};
</script>

<style lang="scss" scoped>
.fullwidth.light {
  background: #eef5fa;
  padding: 2px 0;
}

tr td:first-child {
  font-weight: bold;
}

.hstack {
  justify-content: center;
}

.wedding {
  position: relative;
  width: 400px;
  margin: auto;
}

@media (max-width: 464px) {
  .wedding {
    display: none;
  }
}

.witness,
.married {
  position: absolute;
}

.witness {
  top: 165px;
}

.married {
  top: 175px;
}

.witness1 {
  left: 70px;
}

.witness2 {
  left: 275px;
}

.married1 {
  left: 130px;
}

.married2 {
  left: 215px;
}

#today .fullwidth {
  padding: var(--md-gap);
}

#today .fullwidth:nth-child(2n + 1) {
  background: var(--light);
}
</style>
