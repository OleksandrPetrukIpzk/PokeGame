'use client'
import {ReduxProvider} from "@/redux/provider";
import {DevTools, FormatSimple, Tolgee} from "@tolgee/web";
import engLocalization from './translations/eng/eng-localization.json'
import uaLocalization from './translations/ua/ua-localization.json'
import {TolgeeProvider} from "@tolgee/react";
import Cookies from "js-cookie";


export const tolgee = Tolgee().use(DevTools()).use(FormatSimple()).init({
    staticData: {
        en: engLocalization,
        ua: uaLocalization
    },
    defaultLanguage: Cookies.get('lang') !== undefined ? Cookies.get('lang') : 'en'
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
      <TolgeeProvider tolgee={tolgee}>
      <ReduxProvider>
        {children}
      </ReduxProvider>
      </TolgeeProvider>
      </body>
    </html>
  )
}
