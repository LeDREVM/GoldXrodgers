-- Script pour créer le bucket de storage via SQL
-- ⚠️ NOTE : Cette méthode nécessite les permissions service_role
-- Alternative : Créez le bucket manuellement dans l'interface Supabase (Storage > Buckets)

-- ============================================
-- CRÉATION DU BUCKET "trade-screens"
-- ============================================

-- Vérifier si le bucket existe déjà
DO $$
DECLARE
    bucket_exists BOOLEAN;
BEGIN
    SELECT EXISTS (
        SELECT 1 
        FROM storage.buckets 
        WHERE name = 'trade-screens'
    ) INTO bucket_exists;
    
    IF bucket_exists THEN
        RAISE NOTICE '⚠️ Le bucket "trade-screens" existe déjà';
    ELSE
        -- Créer le bucket
        INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
        VALUES (
            'trade-screens',
            'trade-screens',
            false, -- Private bucket
            10485760, -- 10 MB en bytes
            ARRAY['image/png', 'image/jpeg', 'image/jpg', 'image/webp']
        );
        
        RAISE NOTICE '✅ Bucket "trade-screens" créé avec succès';
    END IF;
END $$;

-- ============================================
-- VÉRIFICATION
-- ============================================

SELECT 
    id,
    name,
    public as is_public,
    file_size_limit,
    allowed_mime_types,
    created_at
FROM storage.buckets 
WHERE name = 'trade-screens';

-- Si vous voyez une ligne avec is_public = false, c'est bon ! ✅
