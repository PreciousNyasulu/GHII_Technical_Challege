export interface IFileReaderService {
    ReadFileAsync(filePath: string): Promise<string>;
}