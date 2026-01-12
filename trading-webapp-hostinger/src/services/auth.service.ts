// Authentication service
import { supabase } from "../lib/supabaseClient";
import { assertEmail, assertPassword } from "../lib/validators";

export async function signUp(email: string, password: string) {
  const e = assertEmail(email);
  const p = assertPassword(password);

  const { data, error } = await supabase.auth.signUp({
    email: e,
    password: p
  });

  if (error) throw new Error(error.message);
  return data;
}

export async function signIn(email: string, password: string) {
  const e = assertEmail(email);
  const p = assertPassword(password);

  const { data, error } = await supabase.auth.signInWithPassword({
    email: e,
    password: p
  });

  if (error) throw new Error(error.message);
  return data;
}

export async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw new Error(error.message);
  return data.session;
}
