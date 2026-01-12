-- Script de vérification de la base de données
-- Exécutez ce script dans SQL Editor pour vérifier que tout est configuré correctement

-- ============================================
-- 1. VÉRIFICATION DES TABLES
-- ============================================

DO $$
DECLARE
    table_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO table_count
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name IN ('profiles', 'trades', 'economic_events');
    
    IF table_count = 3 THEN
        RAISE NOTICE '✅ Tables créées : %/3', table_count;
    ELSE
        RAISE WARNING '❌ Tables manquantes : %/3 trouvées', table_count;
    END IF;
END $$;

-- ============================================
-- 2. VÉRIFICATION DES INDEX
-- ============================================

DO $$
DECLARE
    index_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO index_count
    FROM pg_indexes 
    WHERE schemaname = 'public' 
    AND tablename = 'trades'
    AND indexname IN ('trades_user_id_idx', 'trades_created_at_idx', 'trades_symbol_idx');
    
    IF index_count = 3 THEN
        RAISE NOTICE '✅ Index trades créés : %/3', index_count;
    ELSE
        RAISE WARNING '❌ Index trades manquants : %/3 trouvés', index_count;
    END IF;
END $$;

-- ============================================
-- 3. VÉRIFICATION DES POLITIQUES RLS
-- ============================================

DO $$
DECLARE
    rls_enabled BOOLEAN;
    policy_count INTEGER;
BEGIN
    -- Vérifier RLS sur trades
    SELECT relrowsecurity INTO rls_enabled
    FROM pg_class 
    WHERE relname = 'trades' AND relnamespace = 'public'::regnamespace;
    
    IF rls_enabled THEN
        RAISE NOTICE '✅ RLS activé sur trades';
    ELSE
        RAISE WARNING '❌ RLS non activé sur trades';
    END IF;
    
    -- Compter les politiques
    SELECT COUNT(*) INTO policy_count
    FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename IN ('profiles', 'trades', 'economic_events');
    
    IF policy_count >= 6 THEN
        RAISE NOTICE '✅ Politiques RLS créées : %', policy_count;
    ELSE
        RAISE WARNING '❌ Politiques RLS manquantes : % trouvées (minimum 6 attendues)', policy_count;
    END IF;
END $$;

-- ============================================
-- 4. VÉRIFICATION DU TRIGGER
-- ============================================

DO $$
DECLARE
    trigger_exists BOOLEAN;
BEGIN
    SELECT EXISTS (
        SELECT 1 
        FROM information_schema.triggers 
        WHERE trigger_name = 'on_auth_user_created'
        AND event_object_table = 'users'
        AND event_object_schema = 'auth'
    ) INTO trigger_exists;
    
    IF trigger_exists THEN
        RAISE NOTICE '✅ Trigger on_auth_user_created existe';
    ELSE
        RAISE WARNING '❌ Trigger on_auth_user_created manquant';
    END IF;
END $$;

-- ============================================
-- 5. VÉRIFICATION DES CONTRAINTES
-- ============================================

DO $$
DECLARE
    constraint_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO constraint_count
    FROM information_schema.table_constraints 
    WHERE table_schema = 'public' 
    AND table_name = 'trades'
    AND constraint_type = 'CHECK'
    AND constraint_name IN (
        SELECT constraint_name 
        FROM information_schema.constraint_column_usage 
        WHERE table_name = 'trades'
    );
    
    IF constraint_count >= 2 THEN
        RAISE NOTICE '✅ Contraintes CHECK sur trades : %', constraint_count;
    ELSE
        RAISE WARNING '❌ Contraintes CHECK manquantes sur trades : % trouvées', constraint_count;
    END IF;
END $$;

-- ============================================
-- 6. VÉRIFICATION DES DONNÉES DE TEST
-- ============================================

DO $$
DECLARE
    event_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO event_count
    FROM public.economic_events 
    WHERE source = 'seed';
    
    IF event_count >= 4 THEN
        RAISE NOTICE '✅ Événements de test créés : %', event_count;
    ELSE
        RAISE WARNING '⚠️ Événements de test : % trouvés (4 attendus)', event_count;
    END IF;
END $$;

-- ============================================
-- 7. VÉRIFICATION DE LA FONCTION
-- ============================================

DO $$
DECLARE
    function_exists BOOLEAN;
BEGIN
    SELECT EXISTS (
        SELECT 1 
        FROM pg_proc 
        WHERE proname = 'handle_new_user'
        AND pronamespace = 'public'::regnamespace
    ) INTO function_exists;
    
    IF function_exists THEN
        RAISE NOTICE '✅ Fonction handle_new_user existe';
    ELSE
        RAISE WARNING '❌ Fonction handle_new_user manquante';
    END IF;
END $$;

-- ============================================
-- 8. RÉSUMÉ FINAL
-- ============================================

SELECT 
    '📊 RÉSUMÉ DE LA BASE DE DONNÉES' as summary,
    (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public' AND table_name IN ('profiles', 'trades', 'economic_events')) as tables_count,
    (SELECT COUNT(*) FROM pg_indexes WHERE schemaname = 'public' AND tablename = 'trades') as trades_indexes_count,
    (SELECT COUNT(*) FROM pg_policies WHERE schemaname = 'public') as rls_policies_count,
    (SELECT COUNT(*) FROM public.economic_events WHERE source = 'seed') as seed_events_count;

-- ============================================
-- 9. VÉRIFICATION MANUELLE REQUISE
-- ============================================

SELECT 
    '⚠️ VÉRIFICATIONS MANUELLES REQUISES' as check_type,
    '1. Vérifiez que le bucket "trade-screens" existe dans Storage' as check_1,
    '2. Vérifiez que le bucket est PRIVATE' as check_2,
    '3. Vérifiez vos variables d''environnement (.env)' as check_3,
    '4. Testez l''authentification dans l''application' as check_4;
