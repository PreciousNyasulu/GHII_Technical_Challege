import { IComputeService } from '../interfaces/compute.interface';
import { forceSimulation, forceLink, forceManyBody, forceCenter } from 'd3-force';
import { Node } from '../models/node.model';
import { Edge } from '../models/edge.model';


export class ComputeService implements IComputeService {
    private Nodes: Node[];
    private Edges: Edge[];

    constructor(nodes: Node[] = [], edges: Edge[] = []) {
        this.Nodes = nodes;
        this.Edges = edges;
    }

    // computes for the optimised modes using the FruchtermanReingold algorithm
    public async computeFruchtermanReingold(
        width: number = 1,
        height: number = 1,
        iterations: number = 300
    ): Promise<Node[]> {
        interface Link {
            source: string;
            target: string;
        }

        if (this.Nodes.length < 0 || this.Edges.length < 0) {
            throw ("Provided data is invalid, please check and confirm.");
         }

        const nodes: Node[] = this.Nodes.map(n => ({ ...n }));
        const links: Link[] = this.Edges.map(e => ({ source: e.StartNode, target: e.EndNode }));

        const simulation = forceSimulation(nodes)
            .force("link", forceLink(links).id((d: any) => d.Id).distance(0.1).strength(1))
            .force("charge", forceManyBody().strength(-1)) // repulsion force
            .force("center", forceCenter(width / 2, height / 2))
            .stop();

        // Run the simulation manually for deterministic layout
        for (let i = 0; i < iterations; i++) {
            simulation.tick();
        }

        // Normalize to fit inside 0–1 box
        const xMin = Math.min(...nodes.map(n => n.X ?? 0));
        const xMax = Math.max(...nodes.map(n => n.X ?? 0));
        const yMin = Math.min(...nodes.map(n => n.Y ?? 0));
        const yMax = Math.max(...nodes.map(n => n.Y ?? 0));

        const xRange = xMax - xMin || 1;
        const yRange = yMax - yMin || 1;

        for (const node of nodes) {
            node.X = (node.X! - xMin) / xRange;
            node.Y = (node.Y! - yMin) / yRange;
        }

        return Promise.resolve(nodes);
    }
}