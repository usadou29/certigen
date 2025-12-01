import { PostgrestError } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';
import { Formation, FormationPayload } from '../models/formation';

type FormationRow = {
  id: string;
  name: string;
  description: string | null;
  skills_description: string | null;
  start_date: string;
  end_date: string;
};

const columns = ['id', 'name', 'description', 'skills_description', 'start_date', 'end_date'];

const mapFromDb = (row: FormationRow): Formation => ({
  id: row.id,
  name: row.name,
  description: row.description ?? '',
  skillsDescription: row.skills_description ?? '',
  startDate: row.start_date,
  endDate: row.end_date,
});

const mapToDb = (payload: FormationPayload) => ({
  name: payload.name,
  description: payload.description,
  skills_description: payload.skillsDescription,
  start_date: payload.startDate,
  end_date: payload.endDate,
});

const mapPatchToDb = (payload: Partial<FormationPayload>) => {
  const patch: Record<string, string> = {};

  if (payload.name !== undefined) patch.name = payload.name;
  if (payload.description !== undefined) patch.description = payload.description;
  if (payload.skillsDescription !== undefined) patch.skills_description = payload.skillsDescription;
  if (payload.startDate !== undefined) patch.start_date = payload.startDate;
  if (payload.endDate !== undefined) patch.end_date = payload.endDate;

  return patch;
};

const handleError = (error: PostgrestError | null): void => {
  if (error) {
    throw new Error(error.message ?? 'Erreur Supabase inattendue.');
  }
};

export const listFormations = async (): Promise<Formation[]> => {
  const { data, error } = await supabase
    .from('formations')
    .select(columns.join(', '))
    .order('created_at', { ascending: false });

  handleError(error);
  const rows = (data ?? []) as unknown as FormationRow[];
  return rows.map(mapFromDb);
};

export const getFormation = async (id: string): Promise<Formation | null> => {
  const { data, error } = await supabase
    .from('formations')
    .select(columns.join(', '))
    .eq('id', id)
    .maybeSingle();

  handleError(error);
  if (!data) {
    return null;
  }
  return mapFromDb(data as unknown as FormationRow);
};

export const createFormation = async (payload: FormationPayload): Promise<Formation> => {
  const { data, error } = await supabase
    .from('formations')
    .insert(mapToDb(payload))
    .select(columns.join(', '))
    .maybeSingle();

  handleError(error);
  if (!data) {
    throw new Error('Impossible de créer la formation.');
  }
  return mapFromDb(data as unknown as FormationRow);
};

export const updateFormation = async (
  id: string,
  payload: Partial<FormationPayload>
): Promise<Formation | null> => {
  const { data, error } = await supabase
    .from('formations')
    .update(mapPatchToDb(payload))
    .eq('id', id)
    .select(columns.join(', '))
    .maybeSingle();

  handleError(error);
  return data ? mapFromDb(data as unknown as FormationRow) : null;
};

export const deleteFormation = async (id: string): Promise<void> => {
  const { error } = await supabase.from('formations').delete().eq('id', id);
  handleError(error);
};
