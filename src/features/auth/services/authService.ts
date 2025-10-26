import { supabaseService } from "@/lib/supabaseService";

export async function login(email: string, password: string) {
  const { data, error } = await supabaseService.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

export async function logout() {
  const { error } = await supabaseService.auth.signOut();
  if (error) throw error;
}
