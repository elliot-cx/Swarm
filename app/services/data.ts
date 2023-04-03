import fs from 'fs';
import path from 'path';

type JSONData = { [key: string]: any };

export namespace DataService {
    const dataDirectory: string = "../private/";
    const dataInstances: { [key: string]: JSONData } = {};

    /**
     * Reads a JSON file with the given name and returns its contents as an object.
     * If the file doesn't exist, an empty object is returned.
     *
     * @param filename The name of the JSON file to read.
     * @returns The JSON object read from the file or an empty object.
     */
    function readJSON(filename: string): JSONData {
        const filePath = path.join(dataDirectory, `${filename}.json`);
        if (fs.existsSync(filePath)) {
            const fileContents = fs.readFileSync(filePath, 'utf-8');
            return JSON.parse(fileContents);
        } else {
            return {};
        }
    }

    /**
     * Writes the given JSON object to a file with the given name.
     *
     * @param filename The name of the file to write.
     * @param data The JSON object to write to the file.
     */
    function writeJSON(filename: string, data: JSONData) {
        const filePath = path.join(dataDirectory, `${filename}.json`);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    }

    /**
     * Returns an instance of the JSON object with the given name.
     * If the object hasn't been loaded yet, it's read from the corresponding JSON file.
     *
     * @param filename The name of the JSON file containing the object.
     * @returns The instance of the JSON object.
     */
    export function getDataInstance(filename: string): JSONData {
        if (!dataInstances[filename]) {
            const jsonData = readJSON(filename);
            dataInstances[filename] = jsonData;
        }
        return dataInstances[filename];
    }

    /**
     * Updates an instance of a JSON object with the given name.
     * The updated object is returned and also written to the corresponding JSON file.
     *
     * @param filename The name of the JSON file containing the object.
     * @param newData The updated data to set in the object.
     * @returns The updated instance of the JSON object.
     */
    export function updateDataInstance(filename: string, newData: JSONData): JSONData {
        const jsonData = getDataInstance(filename);
        Object.assign(jsonData, newData);
        writeJSON(filename, jsonData);
        return jsonData;
    }
}