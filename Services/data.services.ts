import { Node } from '../models/node.model';
import { Edge } from '../models/edge.model';
import {IFileReaderService} from '../interfaces/filereader.interface';
import { IDataService } from '../interfaces/dataservice.interface';
import { FileReaderService } from '../Services/filereader.service';

export class DataService implements IDataService {
    private fileReader: IFileReaderService;
    constructor() {
        this.fileReader = new FileReaderService();
    }
    async getNodes(): Promise<Node[]> {
        const fileContent = await this.fileReader.ReadFileAsync('./_data/nodes.json');
        return JSON.parse(fileContent);
    }

    async getEdges(): Promise<Edge[]> {
        const fileContent = await this.fileReader.ReadFileAsync('./_data/edges.json');
        return JSON.parse(fileContent);
    }
}