import { Elysia } from 'elysia';
import { FolderRepository } from '@repositories/folderRepository';
import { FolderService } from '@services/folderService';
import { FolderController } from '@controllers/folderController';

const repo = new FolderRepository();
const service = new FolderService(repo);
const controller = new FolderController(service);

export const folderRoute = new Elysia({ prefix: '/folders' });
