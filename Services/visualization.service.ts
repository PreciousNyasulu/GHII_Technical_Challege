import * as fs from 'fs';
import * as path from 'path';
import { Node } from '../models/node.model';
import { Edge } from '../models/edge.model';
import { IVisualizationService } from '../interfaces/visualization.interface';

export class VisualizationService implements IVisualizationService {


    //Generates graph from the given nodes the edges 
    public generateAndSaveGraphSvg(
        nodes: Node[]
        , edges: Edge[],
        outputPath: string = './graph.svg',
        width: number = 800,
        height: number = 600
    ): void {
        const scaleX = (x: number) => x * width;
        const scaleY = (y: number) => y * height;


        const edgeLines = edges.map((edge) => {
            const source = nodes.find(n => n.Id === edge.StartNode);
            const target = nodes.find(n => n.Id === edge.EndNode);
            if (!source || !target) return '';

            return `<line x1="${scaleX(source.X)}" y1="${scaleY(source.Y)}" x2="${scaleX(target.X)}" y2="${scaleY(target.Y)}" stroke="#ccc" stroke-width="1"/>`;
        }).join('\n');

        const nodeCircles = nodes.map(node => {
            return `<circle cx="${scaleX(node.X)}" cy="${scaleY(node.Y)}" r="5" fill="#4285f4"/>
            <text x="${scaleX(node.X) + 8}" y="${scaleY(node.Y)}" font-size="10" fill="#333">${node.Id}</text>`;
        }).join('\n');

        const svgContent = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" style="background: white;">
        ${edgeLines}
        ${nodeCircles}
        </svg>
    `.trim();

        const outputFullPath = path.resolve(outputPath);
        fs.writeFileSync(outputFullPath, svgContent, 'utf-8');
        console.log(`Graph SVG saved to: ${outputFullPath}`);
    }
}