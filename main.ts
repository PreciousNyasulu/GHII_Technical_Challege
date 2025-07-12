import { DataService } from './Services/data.services';
import { Node } from './models/node.model';
import { Edge } from './models/edge.model';
import { IComputeService } from './interfaces/compute.interface';
import { ComputeService } from './Services/compute.service';
import { VisualizationService } from './Services/visualization.service';
import { IVisualizationService } from './interfaces/visualization.interface';

async function main() {
	const dataService = new DataService();
	let nodes: Node[] = await dataService.getNodes();
	let edges: Edge[] = await dataService.getEdges();
	try {
		console.log('Nodes:', nodes.map(node => ({ id: node.Id, X: node.X, Y: node.Y })));
		console.log('Edges:', edges);
	} catch (error) {
		console.error('Error fetching data:', error);
	}

	const computeService: IComputeService = new ComputeService(nodes, edges);
	try {
		const optimisedNodes: Node[] = await computeService.computeFruchtermanReingold();
		console.log("Optimized Node Positions (normalized to 1x1 box):");
		optimisedNodes.forEach(n => {
			console.log(`${n.Id}: (${n.X.toFixed(4)}, ${n.Y.toFixed(4)})`);
		});

		const visualizationService: IVisualizationService = new VisualizationService();
		visualizationService.generateAndSaveGraphSvg(nodes, edges, "./Visualization/graph.svg", 800, 600);

	} catch (error) {
		console.error('Error computing layout:', error);
	}
}
main();