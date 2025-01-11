import { promisify } from 'util';
import { exec } from 'child_process';

const execAsync = promisify(exec);
const baseAPI = 'clever curl https://api.clever-cloud.com';

export async function checkCleverCli() {
    try {
        await execAsync('clever --version');
        return true;
    } catch (error) {
        return false;
    }
}

export async function getCleverApps() {
    try {
        const { stdout } = await execAsync(`${baseAPI}/v2/self/applications`);
        return JSON.parse(stdout);
    } catch (error) {
        throw new Error(`Failed to fetch Clever Cloud applications: ${error.message}`);
    }
}

export async function getCleverAccount() {
    try {
        const { stdout } = await execAsync(`${baseAPI}/v2/self`);
        return JSON.parse(stdout);
    } catch (error) {
        throw new Error('Not connected to Clever Cloud');
    }
}

export async function controlCleverApp(appId, action) {
    if (action !== 'restart') {
        throw new Error(`Unsupported action: ${action}`);
    }

    try {
        const { stdout } = await execAsync(`${baseAPI}/v2/self/applications/${appId}/instances -XPOST`);
        return JSON.parse(stdout);
    } catch (error) {
        throw new Error(`Failed to control Clever Cloud application: ${error.message}`);
    }
}
