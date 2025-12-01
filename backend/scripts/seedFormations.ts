import { supabase } from '../src/lib/supabaseClient';
import { FormationPayload } from '../src/models/formation';

const payloads: FormationPayload[] = [
  { name: 'Software Craft', description: '', skillsDescription: '', startDate: '2026-01-08', endDate: '2026-01-09' },
  { name: 'Pragmatic API Design', description: '', skillsDescription: '', startDate: '2026-01-12', endDate: '2026-01-13' },
  { name: 'Pair/Mob Programming', description: '', skillsDescription: '', startDate: '2026-01-15', endDate: '2026-01-16' },
  { name: 'Test-Driven Development (TDD)', description: '', skillsDescription: '', startDate: '2026-01-22', endDate: '2026-01-23' },
  { name: 'Pragmatic Architecture', description: '', skillsDescription: '', startDate: '2026-01-29', endDate: '2026-01-30' },
  { name: 'GenAI Craft Experience', description: '', skillsDescription: '', startDate: '2026-02-12', endDate: '2026-02-13' },
  { name: 'Crafting Security', description: '', skillsDescription: '', startDate: '2026-02-05', endDate: '2026-02-06' },
  { name: '.Net Craft', description: '', skillsDescription: '', startDate: '2026-02-16', endDate: '2026-02-17' },
  { name: 'Metrics', description: '', skillsDescription: '', startDate: '2026-02-19', endDate: '2026-02-20' },
  { name: 'Software Craft Advanced', description: '', skillsDescription: '', startDate: '2026-03-09', endDate: '2026-03-10' },
  { name: 'Casual Functional Programming', description: '', skillsDescription: '', startDate: '2026-03-12', endDate: '2026-03-13' },
  { name: 'Domain-Driven-Design (DDD)', description: '', skillsDescription: '', startDate: '2026-03-16', endDate: '2026-03-17' },
  { name: 'Working on Legacy Code (WOLC)', description: '', skillsDescription: '', startDate: '2026-03-19', endDate: '2026-03-20' },
  { name: 'Python Craft', description: '', skillsDescription: '', startDate: '2026-03-23', endDate: '2026-03-24' },
  { name: 'Infrastructure as Code', description: '', skillsDescription: '', startDate: '2026-03-26', endDate: '2026-03-27' },
  { name: 'Crafting Front-end Code (CFEC)', description: '', skillsDescription: '', startDate: '2026-03-30', endDate: '2026-03-31' },
  { name: 'Living Documentation AI', description: '', skillsDescription: '', startDate: '2026-04-02', endDate: '2026-04-03' },
  { name: 'Context Engineering', description: '', skillsDescription: '', startDate: '2026-04-09', endDate: '2026-04-10' },
  { name: 'EventStorming for architects', description: '', skillsDescription: '', startDate: '2026-04-13', endDate: '2026-04-14' },
  { name: 'FinDev : Finance-Aware Engineering', description: '', skillsDescription: '', startDate: '2026-04-16', endDate: '2026-04-17' },
  { name: 'BDD - Behavior Driven Development', description: '', skillsDescription: '', startDate: '2026-05-06', endDate: '2026-05-07' },
  { name: 'GreenIT', description: '', skillsDescription: '', startDate: '2026-05-21', endDate: '2026-05-22' },
  { name: 'Tech Lead Craft', description: '', skillsDescription: '', startDate: '2026-05-28', endDate: '2026-05-29' },
  { name: 'Immersion Craft (sur 3 jours)', description: '', skillsDescription: '', startDate: '2026-06-01', endDate: '2026-06-03' },
  { name: 'Crafting Springboot Services', description: '', skillsDescription: '', startDate: '2026-06-11', endDate: '2026-06-12' },
  { name: 'Crafting Machine Learning Powered products', description: '', skillsDescription: '', startDate: '2026-06-18', endDate: '2026-06-19' },
];

const mapPayloadToDb = (payload: FormationPayload) => ({
  name: payload.name,
  description: payload.description,
  skills_description: payload.skillsDescription,
  start_date: payload.startDate,
  end_date: payload.endDate,
});

const upsertFormations = async () => {
  const { data: existing, error: fetchError } = await supabase.from('formations').select('name');
  if (fetchError) {
    throw fetchError;
  }

  const existingNames = new Set<string>((existing ?? []).map((row: Record<string, unknown>) => String(row.name)));

  const creations = payloads.filter((formation) => !existingNames.has(formation.name));
  if (creations.length === 0) {
    console.log('Toutes les formations existent déjà en base.');
    return;
  }

  const { error: insertError } = await supabase
    .from('formations')
    .insert(creations.map(mapPayloadToDb));
  if (insertError) {
    throw insertError;
  }

  console.log(`Ajoutées ${creations.length} formations.`);
};

upsertFormations().catch((err) => {
  console.error('Erreur lors du seed des formations', err);
  process.exit(1);
});
