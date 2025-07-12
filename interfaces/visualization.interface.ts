import { Edge } from "../models/edge.model";
import { Node } from "../models/node.model";

export interface IVisualizationService{
    generateAndSaveGraphSvg(
        nodes: Node[]
        ,edges: Edge[],
        outputPath: string ,
        width: number,
        height: number ): void;
}