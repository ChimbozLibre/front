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
    <GlobalCard header="book.webp" justified color="yellow">
      <div
        style="float: right; margin-top: -80px; width: 50%; position: relative"
      >
        <span v-html="$t('book.description')"></span>
      </div>
    </GlobalCard>
    <br /><GlobalCard>
      <img
        style="float: left"
        src="@/asset/img/book/search.webp"
        height="71"
        width="107"
        alt="Search icon"
      />
      <div style="display: inline-block">
        <h1>{{ $t("book.search") }}</h1>
        <form @submit.prevent="search()" class="flex">
          <input
            required
            autofocus
            minlength="3"
            maxlength="15"
            pattern="[\w\.\-_@]{3,15}"
            name="username"
            type="text"
            class="btn-md"
            autocomplete="username"
            :placeholder="$t('placeholder.username')"
            v-model="username"
            v-on:keyup="onKeypressValue()"
            v-on:keydown="onKeypressValue()"
          />
          <button type="submit" class="btn-action">go</button>
        </form>
        <div class="suggestions" v-if="suggestionsHere && this.username != ''">
          <ul>
            <li v-for="suggestion in suggestionsHere" :key="suggestion">
              <router-link :to="'/book/' + suggestion.mid">{{
                suggestion.pseudo
              }}</router-link>
            </li>
          </ul>
        </div>
      </div></GlobalCard
    ><br />
    <GlobalCard v-if="data"
      ><template #header>{{ $t("book.last") }}</template>
      <table class="fullwidth">
        <colgroup>
          <col width="10%" />
          <col width="45%" />
          <col width="45%" />
        </colgroup>
        <thead>
          <tr>
            <th>{{ $t("No") }}</th>
            <th>{{ $t("Pseudo") }}</th>
            <th>{{ $t("book.registeredon") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(member, index) in data.members" :key="index">
            <td>{{ member.id }}</td>
            <td><UserLink :user="member" /></td>
            <td>{{ formatDate(member.date) }}</td>
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
        color="blue"
        justified
        v-if="data"
      >
        <img
          src="@/asset/img/puce.svg"
          alt="Caret"
          draggable="false"
          @contextmenu.prevent
          height="17"
          width="17"
        /><b>{{ data.total }}</b> membres en tout.<br />
        <br />
        <b>Nouveaux</b><br />
        <img
          src="@/asset/img/puce.svg"
          alt="Caret"
          draggable="false"
          @contextmenu.prevent
          height="17"
          width="17"
        /><b>{{ data.day }}</b> depuis 24h!<br />
        <img
          src="@/asset/img/puce.svg"
          alt="Caret"
          draggable="false"
          @contextmenu.prevent
          height="17"
          width="17"
        /><b>{{ data.month }}</b> depuis 1 mois!<br />
        <br />
        <b>Les Genres :</b><br />
        <img
          src="@/asset/img/puce.svg"
          alt="Caret"
          draggable="false"
          @contextmenu.prevent
          height="17"
          width="17"
        />Fille(s) : <b>{{ data.female }}</b
        >&nbsp; <sub>({{ ((data.female / data.total) * 100).toFixed(2) }}%)</sub
        ><br />
        <img
          src="@/asset/img/puce.svg"
          alt="Caret"
          draggable="false"
          @contextmenu.prevent
          height="17"
          width="17"
        />Garçon(s) : <b>{{ data.male }}</b
        >&nbsp; <sub>({{ ((data.male / data.total) * 100).toFixed(2) }}%)</sub
        ><br />
        <img
          src="@/asset/img/puce.svg"
          alt="Caret"
          draggable="false"
          @contextmenu.prevent
          height="17"
          width="17"
        />Inconnu(s) : <b>{{ data.total - data.female - data.male }}</b
        >&nbsp;
        <sub
          >({{
            (
              ((data.total - data.female - data.male) / data.total) *
              100
            ).toFixed(2)
          }}%)</sub
        >
      </GlobalCard></template
    >
  </GlobalContainer>
</template>

<script>
import { format } from "date-fns";
import { fr, enGB } from "date-fns/locale";
const locales = { fr, enGB };

// @vuese
// @group View/Members/Book
// Book page
export default {
  name: "BookView",
  data() {
    return {
      data: null,
      username: "",
      suggestionsHere: null,
    };
  },
  methods: {
    onKeypressValue() {
      if (this.username != undefined && this.username != "") {
        this.api.get("api/test.json").then((res) => {
          if (res.data && res.data.length > 0) {
            this.suggestionsHere = res.data;
          }
        });
      }
    },
    search() {
      let id = 1;
      this.$router.push(`/book/${id}`);
    },
    formatDate(date) {
      return format(new Date(date), "PPp", {
        locale: locales[navigator.language.split("-")[0]],
      });
    },
  },
  async beforeRouteEnter(to, from, next) {
    next((vm) =>
      vm.api.get("/api/book.json").then((res) => (vm.data = res.data))
    );
  },
  async beforeRouteUpdate(to, from, next) {
    const req = await this.api.get("/api/book.json");
    this.data = req.data;
    next();
  },
  metaInfo: {
    title: "section.popularity",
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

.suggestions {
  background: var(--light);
  box-shadow: 0 0 var(--md-gap) var(--dark);
  position: absolute;
  cursor: default;
  z-index: 1;
}

.suggestions ul {
  padding: 0;
}

.suggestions li {
  overflow: hidden;
  display: list-item;
  text-align: left;
  padding: var(--md-gap);
}
</style>
