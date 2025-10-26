import { supabaseService } from "@/lib/supabaseService";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabaseService.auth.getSession();
      setSession(data.session);
      setIsLoading(false);
    };

    getSession();

    const { data: listener } = supabaseService.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return { session, isLoading };
}
