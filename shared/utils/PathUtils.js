import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

export class PathUtils {
	static getRootPath() {
		return path.join(dirname(fileURLToPath(import.meta.url)), '../..')
	}
}
