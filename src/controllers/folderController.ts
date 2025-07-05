import { FolderService } from '@services/folderService';
import { Context } from 'elysia';

export class FolderController {
    constructor(private service: FolderService) { }
}
