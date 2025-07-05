import { FolderRepository } from "@repositories/folder.repository";

export class FolderService {
    constructor(private folderRepo: FolderRepository) { }

    getFolders = (params: {
        parent_id?: number;
    }) => {
        return this.folderRepo.getAll(params);
    };
}
