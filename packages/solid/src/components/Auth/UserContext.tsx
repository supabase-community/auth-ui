import { Session, SupabaseClient, User } from "@supabase/supabase-js";
import {
  createContext,
  createEffect,
  createSignal,
  useContext,
} from "solid-js";

import { createStore } from "solid-js/store";

export interface AuthSession {
  user: User | null;
  session: Session | null;
}

const UserContext = createContext<AuthSession>({ user: null, session: null});

export interface Props {
  supabaseClient: SupabaseClient;
  [propName: string]: any;
}

export const UserContextProvider = (props: Props) => {
  const { supabaseClient } = props;
  const [session, setSession] = createSignal<Session | null>(null);
  const [user, setUser] = createSignal<User | null>(null);

  createEffect(() => {
    setUser(session()?.user ?? null);
  });

  async function getSupabaseSession() {
    await supabaseClient.auth.getUser()
    const { data } = await supabaseClient.auth.getSession();
    setSession(data.session);
    setUser(data.session?.user ?? null);
  }

  createEffect(() => {
    getSupabaseSession();

    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  });

  const [value, setValue] = createStore<AuthSession>({
    session: session(),
    user: user(),
  });
  //@ts-ignore
  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserContextProvider.`);
  }
  return context;
};
