import { createStitches, createTheme } from "@stitches/core";
import merge from "just-merge";
import {
  Auth as AuthProps,
  Localization,
  I18nVariables,
  SocialLayouts,
} from "../../types";
import { VIEWS } from "../../constants";
import {
  EmailAuth,
  EmailAuthProps,
  ForgottenPassword,
  MagicLink,
  SocialAuth,
  UpdatePassword,
} from "./interfaces";
import { UserContextProvider, useUser } from "./UserContext";

import * as _defaultLocalization from "../../../common/lib/Localization";
import {
  Accessor,
  createEffect,
  createMemo,
  createSignal,
  JSX,
  JSXElement,
  Match,
  mergeProps,
  onMount,
  Show,
  Switch,
} from "solid-js";
import { createStore } from "solid-js/store";

const defaultLocalization: Localization = { ..._defaultLocalization };

export const { getCssText } = createStitches();

function Auth(props: AuthProps): JSX.Element | null {
  /**
   * Localization support
   */

  const mergedProps = createMemo(() => {
    const merged = mergeProps(
      {
        socialLayout: SocialLayouts.horizontal,
        view: "sign_in",
        onlyThirdPartyProviders: false,
        magicLink: false,
        showLinks: true,
        theme: "default",
        localization: { lang: "en" },
      },
      props
    );
    return merged;
  });

  const i18n: Accessor<I18nVariables> = createMemo(() => {
    const merged = merge(
      //@ts-ignore
      defaultLocalization[mergedProps().localization.lang ?? "en"],
      mergedProps().localization ?? {}
    );
    return merged;
  });

  const [authView, setAuthView] = createSignal(mergedProps().view);
  const [defaultEmail, setDefaultEmail] = createSignal("");
  const [defaultPassword, setDefaultPassword] = createSignal("");
  const [themes, setThemes] = createSignal({});

  /**
   * Simple boolean to detect if authView 'sign_in' or 'sign_up' is used
   *
   * @returns boolean
   */
  const [SignView, setSignView] = createSignal();

  onMount(() => {
    setSignView(authView() === "sign_in" || authView() === "sign_up");
  });

  createEffect(() => {
    /**
     * Create default theme
     *
     * createStitches()
     * https://stitches.dev/docs/api#theme
     *
     * to add a new theme use  createTheme({})
     * https://stitches.dev/docs/api#theme
     */
    setSignView(authView() === "sign_in" || authView() === "sign_up");
    createStitches({
      theme: merge(
        mergedProps().appearance?.theme?.default ?? {},
        mergedProps().appearance?.variables?.default ?? {}
      ),
    });

    const themes: any = {};
    const themeKeys =
      mergedProps().appearance?.theme &&
      //@ts-ignore
      Object.keys(mergedProps().appearance?.theme);

    if (themeKeys) {
      mergedProps().appearance?.theme &&
      //@ts-ignore
        Object.values(mergedProps().appearance?.theme).map((theme, i) => {
          const key = themeKeys[i];
          // ignore default theme
          if (key === "default") return {};

          const merged = merge(
            (mergedProps().appearance &&
              mergedProps().appearance?.theme &&
              mergedProps().appearance?.theme?.[key]) ??
              {},
            (mergedProps().appearance &&
              mergedProps().appearance?.variables &&
              mergedProps().appearance?.variables?.[key]) ??
              {}
          );

          themes[themeKeys[i]] = merged;
        });
    }

    setThemes(themes);
  });

  /**
   * Wraps around all auth components
   * renders the social auth providers if SignView is true
   *
   * also handles the theme override
   *
   */
  const Container = (props: { children: JSXElement }) => (
    <div
      class={
        mergedProps().theme !== "default"
          ? createTheme(
              merge(
                // @ts-ignore
                mergedProps().appearance?.theme[mergedProps().theme],
                mergedProps().appearance?.variables?.[mergedProps().theme] ?? {}
              )
            )
          : ""
      }
    >
      <Show when={SignView()}>
        <SocialAuth
          appearance={mergedProps().appearance}
          supabaseClient={mergedProps().supabaseClient}
          providers={mergedProps().providers}
          socialLayout={mergedProps().socialLayout}
          redirectTo={mergedProps().redirectTo}
          onlyThirdPartyProviders={mergedProps().onlyThirdPartyProviders}
          i18n={i18n()}
          view={authView() as "sign_in" | "sign_up"}
        />
      </Show>
      {/* {!onlyThirdPartyProviders && props.children} */}
      <Show when={!mergedProps().onlyThirdPartyProviders}>
        {props.children}
      </Show>
    </div>
  );

  createEffect(() => {
    /**
     * Overrides the authview if it is changed externally
     */
    setAuthView(mergedProps().view);
  });

  const [emailProp, setEmailProp] = createStore<
    Omit<EmailAuthProps, "authView" | "id">
  >({
    supabaseClient: mergedProps().supabaseClient,
    setAuthView,
    defaultEmail: defaultEmail(),
    defaultPassword: defaultPassword(),
    setDefaultEmail,
    setDefaultPassword,
    redirectTo: mergedProps().redirectTo,
    magicLink: mergedProps().magicLink,
    showLinks: mergedProps().showLinks,
    i18n: i18n(),
  });

  /**
   * View handler, displays the correct Auth view
   * all views are wrapped in <Container/>
   */
  return (
    <Switch fallback={null}>
      <Match when={authView() === VIEWS.SIGN_IN}>
        <Container>
          <EmailAuth
            {...emailProp}
            authView={"sign_in"}
            appearance={mergedProps().appearance}
          />
        </Container>
      </Match>

      <Match when={authView() === VIEWS.SIGN_UP}>
        <Container>
          <EmailAuth
            appearance={mergedProps().appearance}
            supabaseClient={mergedProps().supabaseClient}
            authView={"sign_up"}
            setAuthView={setAuthView}
            defaultEmail={defaultEmail()}
            defaultPassword={defaultPassword()}
            setDefaultEmail={setDefaultEmail}
            setDefaultPassword={setDefaultPassword}
            redirectTo={mergedProps().redirectTo}
            magicLink={mergedProps().magicLink}
            showLinks={mergedProps().showLinks}
            i18n={i18n()}
          />
        </Container>
      </Match>

      <Match when={authView() === VIEWS.FORGOTTEN_PASSWORD}>
        <Container>
          <ForgottenPassword
            appearance={mergedProps().appearance}
            supabaseClient={mergedProps().supabaseClient}
            setAuthView={setAuthView}
            redirectTo={mergedProps().redirectTo}
            showLinks={mergedProps().showLinks}
            i18n={i18n()}
          />
        </Container>
      </Match>

      <Match when={authView() === VIEWS.MAGIC_LINK}>
        <Container>
          <MagicLink
            appearance={mergedProps().appearance}
            supabaseClient={mergedProps().supabaseClient}
            setAuthView={setAuthView}
            redirectTo={mergedProps().redirectTo}
            showLinks={mergedProps().showLinks}
            i18n={i18n()}
          />
        </Container>
      </Match>

      <Match when={authView() === VIEWS.UPDATE_PASSWORD}>
        <Container>
          <UpdatePassword
            appearance={mergedProps().appearance}
            supabaseClient={mergedProps().supabaseClient}
            i18n={i18n()}
          />
        </Container>
      </Match>
    </Switch>
  );
}

Auth.ForgottenPassword = ForgottenPassword;
Auth.UpdatePassword = UpdatePassword;
Auth.MagicLink = MagicLink;
Auth.UserContextProvider = UserContextProvider;
Auth.useUser = useUser;

export default Auth;
