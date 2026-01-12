// Storage service
import { supabase } from "../lib/supabaseClient";
import { MAX_UPLOAD_MB, STORAGE_BUCKET } from "../config/constants";
import { assertMaxFileSize } from "../lib/validators";

export async function uploadTradeScreenshot(file: File): Promise<string> {
  assertMaxFileSize(file, MAX_UPLOAD_MB);

  const { data: auth } = await supabase.auth.getUser();
  const userId = auth.user?.id;
  if (!userId) throw new Error("Non authentifié.");

  const ext = file.name.split(".").pop()?.toLowerCase() || "png";
  const safeExt = ["png", "jpg", "jpeg", "webp"].includes(ext) ? ext : "png";

  // Path : userId/uuid_timestamp.ext
  const path = `${userId}/${crypto.randomUUID()}_${Date.now()}.${safeExt}`;

  const { error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type
    });

  if (error) throw new Error(error.message);

  // On stocke une URL "signable" via createSignedUrl (plus tard si besoin)
  // Pour MVP: on retourne "bucket:path" ou le path seulement.
  return path;
}

export async function getSignedUrl(path: string, expiresInSeconds = 60 * 60) {
  const { data, error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .createSignedUrl(path, expiresInSeconds);

  if (error) throw new Error(error.message);
  return data.signedUrl;
}
