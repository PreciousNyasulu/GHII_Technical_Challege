import { IFileReaderService } from '../interfaces/filereader.interface';
import * as fs from 'fs/promises';

export class FileReaderService implements IFileReaderService {

    //Reads file from disk
    async ReadFileAsync(filePath: string): Promise<string> {
        try {
            const fileContent = await fs.readFile(filePath, 'utf-8');
            return fileContent;
        } catch (error) {
            console.error(`Error reading file: ${error}`);
            throw error;
        }
    }
}
