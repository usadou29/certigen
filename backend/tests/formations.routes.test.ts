import request from 'supertest';
import app from '../src/server';
import { Formation } from '../src/models/formation';

jest.mock('../src/services/formation.service');

import * as formationService from '../src/services/formation.service';

const mockedService = formationService as jest.Mocked<typeof formationService>;

const sampleFormation: Formation = {
  id: '123',
  name: 'Software Craft',
  description: 'Desc',
  skillsDescription: 'Skills',
  startDate: '2026-01-08',
  endDate: '2026-01-09',
};

const anotherFormation: Formation = {
  id: '456',
  name: 'Pragmatic API Design',
  description: 'Desc',
  skillsDescription: 'Skills',
  startDate: '2026-01-12',
  endDate: '2026-01-13',
};

describe('GET /api/formations', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('retourne la liste des formations', async () => {
    mockedService.listFormations.mockResolvedValue([sampleFormation, anotherFormation]);

    const res = await request(app).get('/api/formations').expect(200);

    expect(res.body).toEqual([sampleFormation, anotherFormation]);
    expect(mockedService.listFormations).toHaveBeenCalled();
  });

  it('retourne 500 quand le service échoue', async () => {
    mockedService.listFormations.mockRejectedValue(new Error('boom'));

    const res = await request(app).get('/api/formations').expect(500);

    expect(res.body).toMatchObject({ message: 'boom' });
  });
});

describe('GET /api/formations/:id', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('retourne une formation existante', async () => {
    mockedService.getFormation.mockResolvedValue(sampleFormation);

    const res = await request(app).get(`/api/formations/${sampleFormation.id}`).expect(200);

    expect(res.body).toEqual(sampleFormation);
    expect(mockedService.getFormation).toHaveBeenCalledWith(sampleFormation.id);
  });

  it('retourne 404 quand la formation est introuvable', async () => {
    mockedService.getFormation.mockResolvedValue(null);

    await request(app).get('/api/formations/unknown').expect(404);
  });
});

describe('POST /api/formations', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('crée une formation lorsqu’on fournit les champs requis', async () => {
    mockedService.createFormation.mockResolvedValue(sampleFormation);

    const res = await request(app)
      .post('/api/formations')
      .send({
        name: 'Software Craft',
        description: '',
        skillsDescription: '',
        startDate: '2026-01-08',
        endDate: '2026-01-09',
      })
      .expect(201);

    expect(res.body).toEqual(sampleFormation);
    expect(mockedService.createFormation).toHaveBeenCalled();
  });

  it('retourne 400 quand les champs obligatoires sont manquants', async () => {
    await request(app)
      .post('/api/formations')
      .send({ name: '', startDate: '', endDate: '' })
      .expect(400);
  });

  it('retourne 500 quand le service échoue', async () => {
    mockedService.createFormation.mockRejectedValue(new Error('boom'));

    const res = await request(app)
      .post('/api/formations')
      .send({
        name: 'Test',
        description: '',
        skillsDescription: '',
        startDate: '2026-01-01',
        endDate: '2026-01-02',
      })
      .expect(500);

    expect(res.body).toMatchObject({ message: 'boom' });
  });
});

describe('PUT /api/formations/:id', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('met à jour une formation existante', async () => {
    mockedService.updateFormation.mockResolvedValue(sampleFormation);

    const res = await request(app)
      .put('/api/formations/123')
      .send({ description: 'Nouveau texte' })
      .expect(200);

    expect(res.body).toEqual(sampleFormation);
    expect(mockedService.updateFormation).toHaveBeenCalledWith('123', expect.any(Object));
  });

  it('retourne 404 quand la formation n’existe pas', async () => {
    mockedService.updateFormation.mockResolvedValue(null);

    await request(app).put('/api/formations/123').send({ description: 'Nouveau' }).expect(404);
  });

  it('retourne 400 quand aucune propriété n’est envoyée', async () => {
    await request(app).put('/api/formations/123').send({}).expect(400);
  });

  it('retourne 500 quand le service échoue', async () => {
    mockedService.updateFormation.mockRejectedValue(new Error('boom'));

    const res = await request(app).put('/api/formations/123').send({ description: 'test' }).expect(500);

    expect(res.body).toMatchObject({ message: 'boom' });
  });
});

describe('DELETE /api/formations/:id', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('supprime la formation et retourne 204', async () => {
    mockedService.deleteFormation.mockResolvedValue();

    await request(app).delete('/api/formations/123').expect(204);
    expect(mockedService.deleteFormation).toHaveBeenCalledWith('123');
  });

  it('retourne 500 quand le service échoue', async () => {
    mockedService.deleteFormation.mockRejectedValue(new Error('boom'));

    const res = await request(app).delete('/api/formations/123').expect(500);
    expect(res.body).toMatchObject({ message: 'boom' });
  });
});
