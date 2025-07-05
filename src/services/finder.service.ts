import { Finder } from "@models/finder.model";
import { FinderRepository } from "@repositories/finder.repository";
import { Op } from "sequelize";

export class FinderService {
    constructor(private finderRepo: FinderRepository) { }

    getFinders = (params: {
        parent_id?: string;
        type?: string;
    }) => {
        const where: any = {};

        const parentId = params.parent_id ? Number(params.parent_id) : undefined;
        if (parentId) {
            where.parent_id = { [Op.eq]: parentId };
        } else {
            where.parent_id = { [Op.eq]: null };
        }

        if (params.type != undefined) {
            where.type = { [Op.eq]: params.type }
        }
        return this.finderRepo.getAll(where);
    }

    create = async (data: {
        name: string;
        type: string;
        parent_id?: number;
    }) => {
        const finder = await this.finderRepo.create(data);
        if (data.parent_id) {
            await this.adjustChild(data.parent_id);
        }
        return finder?.toJSON();
    }

    adjustChild = async (
        id: number, type: string = 'increment'
    ) => {
        const finder: Finder | null = await this.finderRepo.getById(id);
        if (finder) {
            const total_child = finder?.toJSON().total_child || 0;
            const payloadUpdate = {
                total_child: type === 'increment' ? total_child + 1 : total_child - 1,
            }
            await this.finderRepo.update(id, payloadUpdate);
        }
        return true;
    }

    update = (
        id: number,
        data: { name: string }
    ) => this.finderRepo.update(id, data);

    delete = async (id: number) => {
        const finder: Finder | null = await this.finderRepo.getById(id);
        await this.finderRepo.delete(id);
        await this.finderRepo.deleteByParentId(id);
        const parentId = finder?.toJSON().parent_id || undefined;
        if (parentId) {
            this.adjustChild(parentId, 'decrement');
        }
        return true;
    }
}
