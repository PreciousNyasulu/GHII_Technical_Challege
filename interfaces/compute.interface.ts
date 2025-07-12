import {Node } from '../models/node.model';

export interface IComputeService {
    computeFruchtermanReingold(
        width?: number,
        height?: number,
        iterations?: number
    ): Promise<Node[]>;
}