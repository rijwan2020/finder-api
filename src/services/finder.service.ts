import { Finder } from "@models/finder.model";
import { FinderRepository } from "@repositories/finder.repository";

export class FinderService {
    constructor(private finderRepo: FinderRepository) { }

    getFinders = (params: {
        parent_id?: number;
    }) => this.finderRepo.getAll(params);

    create = async (data: {
        name: string;
        type: string;
        parent_id?: number;
    }) => {
        console.log('Input:', data);
        const finder = await this.finderRepo.create(data);
        console.log('Created:', finder?.toJSON?.());
        if (data.parent_id) {
            await this.adjustChild(data.parent_id);
        }
        return finder?.toJSON();
    }

    adjustChild = async (id: number, type: string = 'increment') => {
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
}
