import { Router } from 'express';
import {
  createFormation,
  deleteFormation,
  getFormation,
  listFormations,
  updateFormation,
} from '../services/formation.service';
import { FormationPayload } from '../models/formation';

const router = Router();

const toStringValue = (value: unknown): string => (value === undefined || value === null ? '' : String(value));

const buildPayload = (body: Record<string, unknown>): FormationPayload => ({
  name: toStringValue(body.name),
  description: toStringValue(body.description),
  skillsDescription: toStringValue(body.skillsDescription),
  startDate: toStringValue(body.startDate),
  endDate: toStringValue(body.endDate),
});

const buildPatch = (body: Record<string, unknown>): Partial<FormationPayload> => {
  const patch: Partial<FormationPayload> = {};

  if (body.name !== undefined) {
    patch.name = toStringValue(body.name);
  }
  if (body.description !== undefined) {
    patch.description = toStringValue(body.description);
  }
  if (body.skillsDescription !== undefined) {
    patch.skillsDescription = toStringValue(body.skillsDescription);
  }
  if (body.startDate !== undefined) {
    patch.startDate = toStringValue(body.startDate);
  }
  if (body.endDate !== undefined) {
    patch.endDate = toStringValue(body.endDate);
  }

  return patch;
};

router.get('/', async (_req, res) => {
  try {
    const formations = await listFormations();
    return res.status(200).json(formations);
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const formation = await getFormation(req.params.id);
    if (!formation) {
      return res.status(404).json({ message: 'Formation introuvable.' });
    }
    return res.status(200).json(formation);
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
});

router.post('/', async (req, res) => {
  try {
    const payload = buildPayload(req.body);
    if (!payload.name || !payload.startDate || !payload.endDate) {
      return res.status(400).json({ message: 'Les champs name, startDate et endDate sont requis.' });
    }
    const created = await createFormation(payload);
    return res.status(201).json(created);
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updates = buildPatch(req.body);
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: 'Aucune mise à jour fournie.' });
    }
    const updated = await updateFormation(req.params.id, updates);
    if (!updated) {
      return res.status(404).json({ message: 'Formation introuvable.' });
    }
    return res.status(200).json(updated);
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await deleteFormation(req.params.id);
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
});

export default router;
