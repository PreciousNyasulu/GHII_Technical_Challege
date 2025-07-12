// function greet(name: string):string{
//     return `Hello, ${name}!`;
// }

// console.log(greet("Precious"));

import {IFileReaderService} from './interfaces/filereader.interface';
import { FileReaderService } from './Services/filereader.service';
const fileReader: IFileReaderService = new FileReaderService();  
async function main() {
	const fileContent = await fileReader.ReadFileAsync('./test.json');
	console.log(fileContent);
}

main();