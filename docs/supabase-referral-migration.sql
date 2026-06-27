-- Crest — Migrazione referral per la tabella waitlist
-- Esegui questo SQL in Supabase → SQL Editor → New query → Run.
-- Senza questa migrazione il sito continua a funzionare, ma SENZA il referral
-- (il codice fa fallback automatico ai soli campi nome/email/castello).

-- 1) Colonne referral
alter table public.waitlist add column if not exists ref_code    text;
alter table public.waitlist add column if not exists referred_by text;

-- 2) Unicità del proprio codice + indici per i conteggi
create unique index if not exists waitlist_ref_code_key     on public.waitlist (ref_code);
create        index if not exists waitlist_referred_by_idx  on public.waitlist (referred_by);
create        index if not exists waitlist_created_at_idx   on public.waitlist (created_at);

-- 3) (Opzionale) Backfill: assegna un codice agli iscritti già esistenti
update public.waitlist
   set ref_code = substr(md5(random()::text || id::text), 1, 9)
 where ref_code is null;

-- ──────────────────────────────────────────────────────────────────────────
-- NOTE SULLA SICUREZZA (RLS)
--
-- L'INSERT del form usa la anon key: la policy INSERT-only per il ruolo anon
-- resta valida (ref_code e referred_by sono colonne normali, si inseriscono).
--
-- La LETTURA della posizione (/api/referral-status) avviene LATO SERVER.
-- Per funzionare ha bisogno di SELECT sulla tabella:
--   • Opzione A (consigliata): imposta su Vercel la env var SUPABASE_SERVICE_KEY
--     (service_role key da Supabase → Project Settings → API). Bypassa RLS,
--     non è mai esposta al client. NON serve aprire SELECT al ruolo anon.
--   • Opzione B: se non vuoi usare la service key, abilita una policy SELECT per
--     anon (sconsiglia: rende la lista leggibile a chi ha la anon key).
--
-- Con l'Opzione A la lista resta privata e il referral funziona pienamente.
-- ──────────────────────────────────────────────────────────────────────────
