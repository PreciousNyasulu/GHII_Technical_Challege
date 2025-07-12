import { Node } from '../models/node.model';
import { Edge } from '../models/edge.model';

export interface IDataService {
    getNodes(): Promise<Node[]>;
    getEdges(): Promise<Edge[]>;
}