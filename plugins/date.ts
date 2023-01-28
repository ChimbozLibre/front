import {
  differenceInCalendarDays as distance,
  format,
  formatDistanceToNowStrict
} from 'date-fns'
// @ts-ignore
import { fr, enGB } from 'date-fns/locale/index'

const locales = { fr, enGB }

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      distance,
      format: (date: number | Date, pattern: string) =>
        format(date, pattern, {
          locale: locales[nuxtApp.$i18n.locale.value as keyof typeof locales]
        }),
      distanceToNow: (date: number | Date) =>
        formatDistanceToNowStrict(date, {
          addSuffix: true,
          locale: locales[nuxtApp.$i18n.locale.value as keyof typeof locales]
        })
    }
  }
})
