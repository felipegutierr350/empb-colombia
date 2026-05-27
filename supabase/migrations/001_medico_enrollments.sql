-- ============================================================
-- Estudio EMPB Colombia — tabla de enrolamiento de médicos
-- Ejecutar en Supabase Studio → SQL Editor → Run
-- ============================================================

create extension if not exists "pgcrypto";

create table if not exists public.medico_enrollments (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  especialidad text not null,
  email text not null,
  telefono text not null,
  institucion text not null,
  ciudad text not null,
  mensaje text,
  autorizacion_datos boolean not null default false,
  ip_origen text,
  created_at timestamptz not null default now()
);

-- Activar Row Level Security
alter table public.medico_enrollments enable row level security;

-- Política: permitir INSERT público (anon) — solo si la autorización está marcada
drop policy if exists "Insert público con autorización" on public.medico_enrollments;
create policy "Insert público con autorización"
  on public.medico_enrollments
  for insert
  to anon, authenticated
  with check (autorizacion_datos = true);

-- No se crean políticas SELECT/UPDATE/DELETE: por defecto bloqueadas
-- bajo RLS. Solo el service_role (server-side) puede leerlas.

-- Índice por fecha para listados rápidos
create index if not exists medico_enrollments_created_at_idx
  on public.medico_enrollments (created_at desc);
