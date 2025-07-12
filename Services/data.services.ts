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

    // Fetch nodes from JSON file
    async getNodes(): Promise<Node[]> {
        const fileContent = await this.fileReader.ReadFileAsync('./_data/nodes.json');
        const nodeData = JSON.parse(fileContent) as { nodes: { id: string, x: number, y: number }[]};
        return nodeData.nodes.map(node => ({ Id: node.id, X: node.x, Y: node.y }));
    }

    // Fetch edges from JSON file
    async getEdges(): Promise<Edge[]> {
        const fileContent = await this.fileReader.ReadFileAsync('./_data/edges.json');
        const edgeData = JSON.parse(fileContent) as { edges: string[][] };
        return edgeData.edges.map(edge => ({ StartNode: edge[0], EndNode: edge[1] }));
    }
}